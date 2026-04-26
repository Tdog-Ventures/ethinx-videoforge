
-- Remove duplicate INSERT policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.dfy_orders;
DROP POLICY IF EXISTS "Anon insert only" ON public.dfy_orders;

-- Single insert policy: allow anon inserts but only for specific columns
CREATE POLICY "anon_insert_dfy_orders" ON public.dfy_orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Admin-only SELECT
CREATE POLICY "admin_select_dfy_orders" ON public.dfy_orders
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Admin-only UPDATE
CREATE POLICY "admin_update_dfy_orders" ON public.dfy_orders
  FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Admin-only DELETE
CREATE POLICY "admin_delete_dfy_orders" ON public.dfy_orders
  FOR DELETE TO authenticated
  USING (public.is_admin(auth.uid()));
