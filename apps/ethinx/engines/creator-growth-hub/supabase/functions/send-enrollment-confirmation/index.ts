import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return new Response(
      JSON.stringify({ error: "Email service not configured" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const { name, email, tier } = await req.json();

    if (!name || !email || !tier) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, tier" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tierLabel = tier === "done_for_you" ? "Done For You" : "Creator System";

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px 24px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #0a0a0a; font-size: 24px; margin: 0;">You're In! 🎉</h1>
        </div>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">Hey ${name},</p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Your enrollment in the <strong>${tierLabel}</strong> tier is confirmed.
        </p>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          Welcome aboard — your journey starts now.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 16px; margin: 24px 0;">
          <p style="color: #166534; font-size: 14px; margin: 0;">
            <strong>Tier:</strong> ${tierLabel}<br/>
            <strong>Email:</strong> ${email}
          </p>
        </div>
        <p style="color: #333; font-size: 16px; line-height: 1.6;">
          We'll be in touch with your next steps shortly. In the meantime, keep an eye on your inbox.
        </p>
        <p style="color: #999; font-size: 13px; margin-top: 40px; text-align: center;">
          — The ETHINX Team
        </p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ETHINX <noreply@ethinx.solutions>",
        to: [email],
        subject: "You're In! Your ETHINX Creator Growth Enrollment is Confirmed",
        html: htmlBody,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API error:", JSON.stringify(resendData));
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resendData }),
        { status: resendRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-enrollment-confirmation:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
