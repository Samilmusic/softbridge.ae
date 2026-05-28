
-- 1. OTP codes (server-only)
CREATE TABLE public.otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code_hash text NOT NULL,
  purpose text NOT NULL DEFAULT 'onboarding',
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_otp_codes_email_created ON public.otp_codes(email, created_at DESC);

GRANT ALL ON public.otp_codes TO service_role;
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;
-- No anon/authenticated policies: only service_role accesses this table.

-- 2. Onboarding submissions
CREATE TABLE public.onboarding_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  full_name text NOT NULL,
  whatsapp text,
  nationality text,
  business_activity text,
  preferred_jurisdiction text,
  number_of_visas integer DEFAULT 0,
  residency_required text,
  bank_account_required text,
  tax_registration_required text,
  website_required boolean,
  office_requirement text,
  setup_goals text[] DEFAULT ARRAY[]::text[],
  status text NOT NULL DEFAULT 'draft',
  client_id uuid,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.onboarding_submissions TO authenticated;
GRANT ALL ON public.onboarding_submissions TO service_role;

ALTER TABLE public.onboarding_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user reads own onboarding"
ON public.onboarding_submissions
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR lower(email) = lower(COALESCE((auth.jwt() ->> 'email')::text, ''))
  OR has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'consultant'::app_role)
);

CREATE POLICY "staff manage onboarding"
ON public.onboarding_submissions
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'consultant'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'consultant'::app_role));

CREATE TRIGGER onboarding_submissions_updated_at
BEFORE UPDATE ON public.onboarding_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
