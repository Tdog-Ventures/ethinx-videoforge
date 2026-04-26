
-- Add admin SELECT and UPDATE policies for partner_applications
CREATE POLICY "Admin can select all applications"
  ON public.partner_applications
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admin can update all applications"
  ON public.partner_applications
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
