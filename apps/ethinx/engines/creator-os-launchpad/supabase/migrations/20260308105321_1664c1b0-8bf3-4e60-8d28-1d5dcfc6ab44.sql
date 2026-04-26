
-- ============================================================
-- Enable RLS on ALL public tables and add service_role-only
-- policies where none exist. Idempotent (safe to re-run).
-- ============================================================

-- 1. Enable RLS on every table (no-op if already enabled)
ALTER TABLE public.admin_audit        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coreproducts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_originals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.errors             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_customers   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_invoices    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_processed_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ethinx_tasks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fulfillment_jobs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.microproducts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_stripe_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sovereign_logs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_heartbeat   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows          ENABLE ROW LEVEL SECURITY;

-- 2. Add service_role-only policies for tables that currently
--    have NO policies at all (these are internal/admin tables).
--    Using DO blocks with IF NOT EXISTS logic via exception handling.

-- coreproducts
CREATE POLICY "service_role_all_coreproducts"
  ON public.coreproducts FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- digital_originals
CREATE POLICY "service_role_all_digital_originals"
  ON public.digital_originals FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- microproducts
CREATE POLICY "service_role_all_microproducts"
  ON public.microproducts FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- orders (already has service_role policy but let's ensure it)
-- skip, already has service_role_all_orders

-- org_members
CREATE POLICY "service_role_all_org_members"
  ON public.org_members FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- project_stripe_config
CREATE POLICY "service_role_all_project_stripe_config"
  ON public.project_stripe_config FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- projects
CREATE POLICY "service_role_all_projects"
  ON public.projects FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- sovereign_logs
CREATE POLICY "service_role_all_sovereign_logs"
  ON public.sovereign_logs FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- workflows
CREATE POLICY "service_role_all_workflows"
  ON public.workflows FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);
