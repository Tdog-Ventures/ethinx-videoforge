
-- ============================================================
-- Tighten RLS: drop overly-broad "Authenticated only" SELECT
-- policies on sensitive tables, replace with admin-only access.
-- ============================================================

-- 1. ORDERS – drop broad SELECT, add admin-only SELECT
DROP POLICY IF EXISTS "Authenticated only" ON public.orders;
CREATE POLICY "orders_admin_select" ON public.orders
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 2. ETHINX_CUSTOMERS – drop broad SELECT, add admin-only SELECT
DROP POLICY IF EXISTS "Authenticated only" ON public.ethinx_customers;
CREATE POLICY "ethinx_customers_admin_select" ON public.ethinx_customers
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 3. ETHINX_INVOICES – drop broad SELECT, add admin-only SELECT
DROP POLICY IF EXISTS "Authenticated only" ON public.ethinx_invoices;
CREATE POLICY "ethinx_invoices_admin_select" ON public.ethinx_invoices
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 4. ETHINX_SUBSCRIPTIONS – drop broad SELECT, add admin-only SELECT
DROP POLICY IF EXISTS "Authenticated only" ON public.ethinx_subscriptions;
CREATE POLICY "ethinx_subscriptions_admin_select" ON public.ethinx_subscriptions
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 5. PURCHASES – drop broad "Authenticated only" SELECT (keep "Users can view own purchases")
DROP POLICY IF EXISTS "Authenticated only" ON public.purchases;

-- 6. USER_ROLES – drop broad "Authenticated only" SELECT (keep "user_roles_admin_list")
DROP POLICY IF EXISTS "Authenticated only" ON public.user_roles;
