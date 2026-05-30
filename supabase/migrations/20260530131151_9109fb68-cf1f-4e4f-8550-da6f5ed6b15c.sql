
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_client_id uuid;
  v_role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone)
  VALUES (NEW.id, NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
          NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;

  -- Designated admin emails get admin role automatically
  IF lower(NEW.email) IN ('softbridgefzco@yahoo.com') THEN
    v_role := 'admin';
  ELSE
    v_role := 'client';
  END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, v_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  IF v_role = 'client' THEN
    INSERT INTO public.clients (user_id, company_name, stage, progress_pct)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'company_name','My Company'),'consultation', 5)
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO v_client_id;

    IF v_client_id IS NOT NULL THEN
      INSERT INTO public.cases (client_id, company_name)
      VALUES (v_client_id, COALESCE(NEW.raw_user_meta_data->>'company_name','My Company'));
    END IF;
  END IF;

  RETURN NEW;
END $function$;

-- Also grant admin to that email if the account already exists
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::public.app_role
FROM auth.users u
WHERE lower(u.email) = 'softbridgefzco@yahoo.com'
ON CONFLICT (user_id, role) DO NOTHING;
