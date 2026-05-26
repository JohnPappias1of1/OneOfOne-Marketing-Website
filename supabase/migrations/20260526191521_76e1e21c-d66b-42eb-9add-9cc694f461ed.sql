
-- 1. Remove unrestricted anon UPDATE on chat_sessions
DROP POLICY IF EXISTS "Anyone can update own chat session" ON public.chat_sessions;

-- 2. Fix ghl_website_previews public exposure - exclude private rows
DROP POLICY IF EXISTS "Active GHL previews are publicly viewable" ON public.ghl_website_previews;
CREATE POLICY "Active public GHL previews are viewable"
ON public.ghl_website_previews
FOR SELECT
USING (is_active = true AND is_private = false);

-- 3. Lock down trigger-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
