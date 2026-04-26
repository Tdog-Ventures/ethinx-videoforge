import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const { name, email, business_name, business_type, payment_plan } = await req.json();

    // Validate required fields
    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Cross-verify the order exists in dfy_orders before sending emails
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: order, error: orderError } = await supabase
      .from("dfy_orders")
      .select("id")
      .eq("email", email.trim())
      .eq("name", name.trim())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (orderError || !order) {
      console.error("Order verification failed:", orderError);
      return new Response(
        JSON.stringify({ error: "Order not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 403 }
      );
    }

    // Sanitize and truncate all user-supplied values
    const safeName = esc(name.trim().slice(0, 100));
    const safeEmail = esc(email.trim().slice(0, 255));
    const safeBusinessName = business_name ? esc(String(business_name).trim().slice(0, 200)) : "";
    const safeBusinessType = business_type ? esc(String(business_type).trim().slice(0, 100)) : "";
    const safePaymentPlan = esc(String(payment_plan || "standard").trim().slice(0, 50));

    // Email to customer
    const customerEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VideoForge <noreply@ethinx.solutions>",
        to: [email.trim()],
        subject: "Your VideoForge DFY Order is Confirmed",
        html: `
          <h2>Hey ${safeName}!</h2>
          <p>Thank you for choosing VideoForge. Your DFY video package order has been confirmed.</p>
          ${safeBusinessName ? `<p><strong>Business:</strong> ${safeBusinessName}</p>` : ""}
          <p>Our team will begin your video package within <strong>48 hours</strong>. We'll be in touch with next steps.</p>
          <p>— The VideoForge Team</p>
        `,
      }),
    });

    // Email to admin
    const adminEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "VideoForge <noreply@ethinx.solutions>",
        to: ["troy@ethinx.com"],
        subject: "New DFY Order Received",
        html: `
          <h2>New DFY Order</h2>
          <ul>
            <li><strong>Name:</strong> ${safeName}</li>
            <li><strong>Email:</strong> ${safeEmail}</li>
            <li><strong>Business:</strong> ${safeBusinessName || "N/A"}</li>
            <li><strong>Type:</strong> ${safeBusinessType || "N/A"}</li>
            <li><strong>Payment Plan:</strong> ${safePaymentPlan}</li>
          </ul>
        `,
      }),
    });

    const customerResult = await customerEmail.json();
    const adminResult = await adminEmail.json();

    return new Response(
      JSON.stringify({ customer: customerResult, admin: adminResult }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
