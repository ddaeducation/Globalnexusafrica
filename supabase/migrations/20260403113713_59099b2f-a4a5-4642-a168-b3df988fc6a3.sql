
CREATE TABLE public.certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  certificate_id text NOT NULL UNIQUE,
  student_name text NOT NULL,
  program_title text NOT NULL,
  issue_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Anyone can look up a certificate by ID (public verification)
CREATE POLICY "Anyone can verify certificates"
  ON public.certificates FOR SELECT
  TO public
  USING (true);

-- Only admins can manage certificates
CREATE POLICY "Admins can insert certificates"
  ON public.certificates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update certificates"
  ON public.certificates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete certificates"
  ON public.certificates FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
