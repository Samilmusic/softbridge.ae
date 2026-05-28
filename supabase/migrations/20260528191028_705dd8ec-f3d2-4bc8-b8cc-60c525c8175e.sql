
-- 1. user_roles: restrict writes to admins only
CREATE POLICY "admins manage user_roles insert" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage user_roles update" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage user_roles delete" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. onboarding_submissions: remove email JWT fallback
DROP POLICY IF EXISTS "user reads own onboarding" ON public.onboarding_submissions;
CREATE POLICY "user reads own onboarding" ON public.onboarding_submissions
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'consultant')
  );

-- 3. otp_codes: explicit deny for anon/authenticated (service role bypasses RLS)
REVOKE ALL ON public.otp_codes FROM anon, authenticated;
CREATE POLICY "deny all otp access" ON public.otp_codes
  FOR ALL TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- 4. storage client-documents: staff-only update/delete
CREATE POLICY "staff update client-documents" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'client-documents' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'consultant')))
  WITH CHECK (bucket_id = 'client-documents' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'consultant')));

CREATE POLICY "staff delete client-documents" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'client-documents' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'consultant')));

-- 5. Revoke EXECUTE on internal SECURITY DEFINER functions from public/anon/authenticated.
-- These are trigger/helper functions and should not be callable directly via the API.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.seed_case_stages() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.on_stage_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
-- has_role is intentionally kept executable by authenticated since RLS policies invoke it.
