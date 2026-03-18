
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  gender text NOT NULL,
  date_of_birth date,
  nationality text NOT NULL DEFAULT '',
  phone_number text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  home_address text NOT NULL DEFAULT '',
  district text NOT NULL DEFAULT '',
  location_type text NOT NULL DEFAULT 'Urban',
  highest_education text NOT NULL DEFAULT '',
  program_applying_for text NOT NULL DEFAULT '',
  employment_status text NOT NULL DEFAULT '',
  monthly_income_range text NOT NULL DEFAULT '',
  has_disability boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert applications" ON public.applications
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can read applications" ON public.applications
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
