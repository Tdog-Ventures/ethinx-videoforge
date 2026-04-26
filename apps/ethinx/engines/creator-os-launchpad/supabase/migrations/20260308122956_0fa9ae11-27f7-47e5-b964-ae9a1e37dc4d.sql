-- Revoke public execute on is_admin to prevent admin identity enumeration
-- RLS policies using is_admin() in USING/WITH CHECK expressions run as table owner,
-- so revoking PUBLIC execute won't break RLS — only direct client RPC calls are blocked.
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO service_role;