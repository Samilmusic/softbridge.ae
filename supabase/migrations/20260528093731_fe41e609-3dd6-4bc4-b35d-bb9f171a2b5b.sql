
-- =========================================================
-- Enums
-- =========================================================
DO $$ BEGIN
  CREATE TYPE public.case_stage_key AS ENUM (
    'consultation','initial_approval','trade_name','ejari','license',
    'establishment_card','residency','visa_application','medical',
    'eid_fingerprint','eid_issuance','tax_registration','banking','lifetime_support'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.stage_status AS ENUM (
    'not_started','in_progress','waiting_client','under_review','completed','issue'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.case_overall_status AS ENUM ('active','on_hold','completed','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.document_status AS ENUM ('pending','uploaded','approved','rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.quote_status AS ENUM ('draft','sent','accepted','expired','converted');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Ensure 'admin' value exists on app_role (created in Phase 1)
DO $$ BEGIN
  ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'admin';
EXCEPTION WHEN others THEN NULL; END $$;

-- =========================================================
-- cases
-- =========================================================
CREATE TABLE public.cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  company_name text NOT NULL DEFAULT 'Unnamed Company',
  business_activity text,
  jurisdiction text,
  assigned_consultant text,
  current_stage public.case_stage_key NOT NULL DEFAULT 'consultation',
  progress_percentage integer NOT NULL DEFAULT 0,
  status public.case_overall_status NOT NULL DEFAULT 'active',
  expected_next_step text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.cases TO authenticated;
GRANT ALL ON public.cases TO service_role;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client read own case" ON public.cases FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.clients c WHERE c.id = cases.client_id AND c.user_id = auth.uid())
  OR has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant')
);
CREATE POLICY "staff manage cases" ON public.cases FOR ALL TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'))
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

CREATE TRIGGER cases_updated BEFORE UPDATE ON public.cases
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- case_stages
-- =========================================================
CREATE TABLE public.case_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  stage_key public.case_stage_key NOT NULL,
  position integer NOT NULL,
  status public.stage_status NOT NULL DEFAULT 'not_started',
  started_at timestamptz,
  completed_at timestamptz,
  client_action_required text,
  public_note text,
  internal_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (case_id, stage_key)
);
GRANT SELECT, UPDATE ON public.case_stages TO authenticated;
GRANT ALL ON public.case_stages TO service_role;
ALTER TABLE public.case_stages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client read own stages" ON public.case_stages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
    WHERE ca.id = case_stages.case_id AND cl.user_id = auth.uid()
  ) OR has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant')
);
CREATE POLICY "staff manage stages" ON public.case_stages FOR ALL TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'))
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

CREATE TRIGGER case_stages_updated BEFORE UPDATE ON public.case_stages
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed 14 stages on case creation
CREATE OR REPLACE FUNCTION public.seed_case_stages()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  stages text[] := ARRAY[
    'consultation','initial_approval','trade_name','ejari','license',
    'establishment_card','residency','visa_application','medical',
    'eid_fingerprint','eid_issuance','tax_registration','banking','lifetime_support'
  ];
  i int;
BEGIN
  FOR i IN 1..array_length(stages,1) LOOP
    INSERT INTO public.case_stages (case_id, stage_key, position, status)
    VALUES (NEW.id, stages[i]::public.case_stage_key, i,
            CASE WHEN i = 1 THEN 'in_progress'::public.stage_status ELSE 'not_started'::public.stage_status END);
  END LOOP;
  RETURN NEW;
END $$;

CREATE TRIGGER cases_seed_stages AFTER INSERT ON public.cases
FOR EACH ROW EXECUTE FUNCTION public.seed_case_stages();

-- =========================================================
-- activity_logs
-- =========================================================
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  action_title text NOT NULL,
  action_description text,
  status text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client read own activity" ON public.activity_logs FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
    WHERE ca.id = activity_logs.case_id AND cl.user_id = auth.uid()
  ) OR has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant')
);
CREATE POLICY "staff insert activity" ON public.activity_logs FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

-- Auto-log + recompute progress on stage completion
CREATE OR REPLACE FUNCTION public.on_stage_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  total int;
  done int;
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.activity_logs (case_id, action_title, action_description, status, created_by)
    VALUES (NEW.case_id, NEW.stage_key::text, NEW.public_note, NEW.status::text, auth.uid());

    IF NEW.status = 'completed' AND NEW.completed_at IS NULL THEN
      NEW.completed_at := now();
    END IF;

    SELECT count(*), count(*) FILTER (WHERE status='completed')
      INTO total, done FROM public.case_stages WHERE case_id = NEW.case_id;
    UPDATE public.cases
       SET progress_percentage = CASE WHEN total>0 THEN (done*100)/total ELSE 0 END,
           current_stage = COALESCE((
             SELECT stage_key FROM public.case_stages
              WHERE case_id = NEW.case_id AND status <> 'completed'
              ORDER BY position ASC LIMIT 1
           ), NEW.stage_key)
     WHERE id = NEW.case_id;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER case_stages_on_change BEFORE UPDATE ON public.case_stages
FOR EACH ROW EXECUTE FUNCTION public.on_stage_change();

-- =========================================================
-- documents
-- =========================================================
CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id uuid NOT NULL REFERENCES public.cases(id) ON DELETE CASCADE,
  document_type text NOT NULL,
  status public.document_status NOT NULL DEFAULT 'pending',
  file_url text,
  admin_note text,
  uploaded_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client read own docs2" ON public.documents FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
    WHERE ca.id = documents.case_id AND cl.user_id = auth.uid()
  ) OR has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant')
);
CREATE POLICY "client update own doc upload" ON public.documents FOR UPDATE TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
    WHERE ca.id = documents.case_id AND cl.user_id = auth.uid()
  )
);
CREATE POLICY "staff manage documents" ON public.documents FOR ALL TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'))
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

CREATE TRIGGER documents_updated BEFORE UPDATE ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- quotes + quote_requests
-- =========================================================
CREATE SEQUENCE IF NOT EXISTS public.quote_number_seq START 1000;

CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  whatsapp text,
  nationality text,
  business_activity text,
  preferred_jurisdiction text,
  number_of_visas integer DEFAULT 0,
  needs_residency text,
  needs_banking boolean DEFAULT false,
  needs_tax boolean DEFAULT false,
  needs_digital boolean DEFAULT false,
  office_requirement text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT SELECT ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public quote insert" ON public.quote_requests FOR INSERT TO anon, authenticated
WITH CHECK (
  length(full_name) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (whatsapp IS NULL OR length(whatsapp) <= 40)
  AND (business_activity IS NULL OR length(business_activity) <= 500)
  AND (message IS NULL OR length(message) <= 4000)
  AND COALESCE(number_of_visas,0) BETWEEN 0 AND 50
);
CREATE POLICY "staff read quote requests" ON public.quote_requests FOR SELECT TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

CREATE TABLE public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number text NOT NULL UNIQUE DEFAULT ('SB-' || to_char(now(),'YY') || '-' || nextval('public.quote_number_seq')),
  client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
  case_id uuid REFERENCES public.cases(id) ON DELETE SET NULL,
  quote_request_id uuid REFERENCES public.quote_requests(id) ON DELETE SET NULL,
  recipient_email text NOT NULL,
  recipient_name text,
  selected_jurisdiction text,
  number_of_visas integer DEFAULT 0,
  recommended_structure text,
  included_services jsonb NOT NULL DEFAULT '[]'::jsonb,
  optional_addons jsonb NOT NULL DEFAULT '[]'::jsonb,
  estimated_government_fees_min integer DEFAULT 0,
  estimated_government_fees_max integer DEFAULT 0,
  service_fees_min integer DEFAULT 0,
  service_fees_max integer DEFAULT 0,
  total_estimated_cost_min integer DEFAULT 0,
  total_estimated_cost_max integer DEFAULT 0,
  timeline_days_min integer DEFAULT 0,
  timeline_days_max integer DEFAULT 0,
  status public.quote_status NOT NULL DEFAULT 'sent',
  pdf_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.quotes TO authenticated;
GRANT ALL ON public.quotes TO service_role;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "client read own quotes" ON public.quotes FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM public.clients c WHERE c.id = quotes.client_id AND c.user_id = auth.uid())
  OR has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant')
);
CREATE POLICY "staff manage quotes" ON public.quotes FOR ALL TO authenticated
USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'))
WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant'));

CREATE TRIGGER quotes_updated BEFORE UPDATE ON public.quotes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- email_log additions
-- =========================================================
ALTER TABLE public.email_log
  ADD COLUMN IF NOT EXISTS email_type text,
  ADD COLUMN IF NOT EXISTS case_id uuid,
  ADD COLUMN IF NOT EXISTS client_id uuid;

-- =========================================================
-- Storage bucket for documents (private)
-- =========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents','client-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "case docs read own"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'client-documents' AND (
    has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant') OR
    EXISTS (
      SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
      WHERE cl.user_id = auth.uid() AND ca.id::text = (storage.foldername(name))[1]
    )
  )
);

CREATE POLICY "case docs upload own"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'client-documents' AND (
    has_role(auth.uid(),'admin') OR has_role(auth.uid(),'consultant') OR
    EXISTS (
      SELECT 1 FROM public.cases ca JOIN public.clients cl ON cl.id = ca.client_id
      WHERE cl.user_id = auth.uid() AND ca.id::text = (storage.foldername(name))[1]
    )
  )
);

-- =========================================================
-- Backfill: create a case for any existing client without one
-- =========================================================
INSERT INTO public.cases (client_id, company_name)
SELECT c.id, c.company_name FROM public.clients c
WHERE NOT EXISTS (SELECT 1 FROM public.cases ca WHERE ca.client_id = c.id);

-- =========================================================
-- Update handle_new_user to also create a case
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_client_id uuid;
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (NEW.id, NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
          NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'client')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.clients (user_id, company_name, stage, progress_pct)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'company_name','My Company'),'consultation', 5)
  ON CONFLICT (user_id) DO NOTHING
  RETURNING id INTO v_client_id;

  IF v_client_id IS NOT NULL THEN
    INSERT INTO public.cases (client_id, company_name)
    VALUES (v_client_id, COALESCE(NEW.raw_user_meta_data->>'company_name','My Company'));
  END IF;

  RETURN NEW;
END $$;
