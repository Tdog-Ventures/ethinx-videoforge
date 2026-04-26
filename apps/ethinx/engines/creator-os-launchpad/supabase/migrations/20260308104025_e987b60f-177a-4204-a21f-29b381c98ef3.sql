
-- Drop the restrictive policy and recreate as permissive
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.audit_leads;

CREATE POLICY "Allow anonymous inserts"
ON public.audit_leads
FOR INSERT
TO anon
WITH CHECK (true);
