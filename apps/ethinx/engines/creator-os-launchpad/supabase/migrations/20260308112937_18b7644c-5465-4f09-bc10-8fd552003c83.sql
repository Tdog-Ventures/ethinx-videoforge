-- Revoke public execute on grant_admin and revoke_admin RPCs
-- These already have is_admin() checks, but revoking public execute adds defense-in-depth
REVOKE EXECUTE ON FUNCTION public.grant_admin(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_admin(text) TO service_role;

REVOKE EXECUTE ON FUNCTION public.revoke_admin(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.revoke_admin(text) TO service_role;