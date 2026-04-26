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
    return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { type, agency_name, contact_name, email, website, current_clients, monthly_budget, why_partner, preferred_tier } = await req.json();

    const emails: { from: string; to: string; subject: string; html: string }[] = [];

    if (type === "new_application") {
      // Email to applicant
      emails.push({
        from: "ETHINX <noreply@ethinx.com>",
        to: email,
        subject: "ETHINX Partner Application Received",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ff80;">ETHINX Partner Program</h2>
            <p>Hi ${contact_name},</p>
            <p>Thanks for applying to the <strong>ETHINX Partner Program</strong> on behalf of <strong>${agency_name}</strong>.</p>
            <p>Our team will review your application within <strong>48 hours</strong> and be in touch with next steps.</p>
            <p style="color: #666; font-size: 14px; margin-top: 32px;">— The ETHINX Team</p>
          </div>
        `,
      });

      // Email to admin
      emails.push({
        from: "ETHINX System <noreply@ethinx.com>",
        to: "troy@ethinx.com",
        subject: `New Partner Application: ${agency_name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ff80;">New Partner Application</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Agency:</td><td style="padding: 8px;">${agency_name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Contact:</td><td style="padding: 8px;">${contact_name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Website:</td><td style="padding: 8px;">${website}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Clients:</td><td style="padding: 8px;">${current_clients}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${monthly_budget}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Tier:</td><td style="padding: 8px;">${preferred_tier}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Why:</td><td style="padding: 8px;">${why_partner}</td></tr>
            </table>
          </div>
        `,
      });
    } else if (type === "approved") {
      emails.push({
        from: "ETHINX <noreply@ethinx.com>",
        to: email,
        subject: "Welcome to the ETHINX Partner Program!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00ff80;">🎉 You're In!</h2>
            <p>Hi ${contact_name},</p>
            <p>Your application for <strong>${agency_name}</strong> has been <strong>approved</strong>.</p>
            <p>Our team will reach out within <strong>24 hours</strong> to onboard you.</p>
            <p>Welcome to the ETHINX Partner Program!</p>
            <p style="color: #666; font-size: 14px; margin-top: 32px;">— The ETHINX Team</p>
          </div>
        `,
      });
    }

    const results = [];
    for (const emailData of emails) {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
        const body = await r.json();
        if (!r.ok) {
          console.error(`Resend error for ${emailData.to}: ${JSON.stringify(body)}`);
          results.push({ to: emailData.to, error: body });
        } else {
          results.push({ to: emailData.to, success: true, ...body });
        }
      } catch (e) {
        console.error(`Failed to send to ${emailData.to}:`, e);
        results.push({ to: emailData.to, error: String(e) });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
