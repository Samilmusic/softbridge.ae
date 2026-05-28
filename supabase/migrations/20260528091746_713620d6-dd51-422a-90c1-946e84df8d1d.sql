
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin', 'consultant', 'client');
CREATE TYPE public.setup_stage AS ENUM (
  'consultation','documentation','initial_approval','license_processing',
  'residency','emirates_id','banking_preparation','completed'
);
CREATE TYPE public.consultation_status AS ENUM ('pending','scheduled','completed','cancelled');
CREATE TYPE public.doc_request_status AS ENUM ('pending','submitted','approved','rejected');
CREATE TYPE public.meeting_method AS ENUM ('whatsapp','zoom','google_meet','in_person','phone');

-- Updated-at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles select" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- clients
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL DEFAULT 'Unnamed Company',
  stage public.setup_stage NOT NULL DEFAULT 'consultation',
  progress_pct INTEGER NOT NULL DEFAULT 0 CHECK (progress_pct BETWEEN 0 AND 100),
  assigned_consultant TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
GRANT SELECT, INSERT, UPDATE ON public.clients TO authenticated;
GRANT ALL ON public.clients TO service_role;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client own select" ON public.clients FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE POLICY "staff update" ON public.clients FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE POLICY "client own insert" ON public.clients FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- consultations (public booking)
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date TIMESTAMPTZ,
  method public.meeting_method NOT NULL DEFAULT 'whatsapp',
  message TEXT,
  status public.consultation_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultations TO anon, authenticated;
GRANT SELECT, UPDATE ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public booking" ON public.consultations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "staff read" ON public.consultations FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE POLICY "staff update consultations" ON public.consultations FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE TRIGGER trg_consultations_updated BEFORE UPDATE ON public.consultations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- document_requests
CREATE TABLE public.document_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  description TEXT,
  status public.doc_request_status NOT NULL DEFAULT 'pending',
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.document_requests TO authenticated;
GRANT ALL ON public.document_requests TO service_role;
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client read own docs" ON public.document_requests FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.clients c WHERE c.id = client_id AND c.user_id = auth.uid())
    OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE POLICY "staff manage docs" ON public.document_requests FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE TRIGGER trg_docreq_updated BEFORE UPDATE ON public.document_requests
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- status_updates
CREATE TABLE public.status_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  stage public.setup_stage NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.status_updates TO authenticated;
GRANT ALL ON public.status_updates TO service_role;
ALTER TABLE public.status_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client read own status" ON public.status_updates FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.clients c WHERE c.id = client_id AND c.user_id = auth.uid())
    OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));
CREATE POLICY "staff insert status" ON public.status_updates FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'consultant'));

-- email_log (admin/service only)
CREATE TABLE public.email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient TEXT NOT NULL,
  template TEXT NOT NULL,
  subject TEXT,
  status TEXT NOT NULL DEFAULT 'sent',
  error TEXT,
  resend_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.email_log TO authenticated;
GRANT ALL ON public.email_log TO service_role;
ALTER TABLE public.email_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin read email_log" ON public.email_log FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- auto-create profile + client + client role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_client_id UUID;
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'client')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.clients (user_id, company_name, stage, progress_pct)
  VALUES (NEW.id,
          COALESCE(NEW.raw_user_meta_data->>'company_name','My Company'),
          'consultation', 5)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
