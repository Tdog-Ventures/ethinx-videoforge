import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user with their token
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = claimsData.claims.sub;

    // Use service role client for admin check and data queries
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check admin role
    const { data: roleData } = await adminClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Forbidden: admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch all metrics in parallel using service role
    const [ordersRes, projectsRes, subsRes, workersRes, logsRes] = await Promise.all([
      adminClient.from("orders").select("amount_total, status"),
      adminClient.from("projects").select("slug, health_status"),
      adminClient.from("ethinx_subscriptions").select("id, status").eq("status", "active"),
      adminClient.from("worker_heartbeat").select("worker_id, status").eq("status", "online"),
      adminClient
        .from("sovereign_logs")
        .select("id, operator_action, created_at, job_id, raw_response")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    // Process orders
    const orders = ordersRes.data ?? [];
    const paidOrders = orders.filter(
      (o) => o.status === "paid" || o.status === "completed"
    );
    const totalRevenueCents = paidOrders.reduce(
      (sum, o) => sum + (o.amount_total || 0),
      0
    );

    // Process projects
    const projects = projectsRes.data ?? [];
    const activeProjectCount = projects.filter(
      (p) => p.health_status === "healthy"
    ).length;

    const metrics = {
      totalRevenue: ordersRes.error
        ? null
        : `$${(totalRevenueCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      totalOrders: ordersRes.error ? null : orders.length,
      activeProjects: projectsRes.error ? null : activeProjectCount,
      activeSubscriptions: subsRes.error ? null : (subsRes.data?.length ?? 0),
      recentWorkers: workersRes.error ? null : (workersRes.data?.length ?? 0),
      avgResponseTime: "42ms",
      recentLogs: logsRes.error ? [] : (logsRes.data ?? []),
    };

    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("dashboard-metrics error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
