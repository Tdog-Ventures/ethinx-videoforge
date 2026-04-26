
-- Allow authenticated users to INSERT audit logs for their own actions
CREATE POLICY "authenticated_insert_audit"
ON public.admin_audit
FOR INSERT
TO authenticated
WITH CHECK (actor_user_id = auth.uid());

-- Allow admins to SELECT sovereign_logs (for activity feed)
CREATE POLICY "admin_select_sovereign_logs"
ON public.sovereign_logs
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));
