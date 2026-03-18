
-- Custom questions for the application form
CREATE TABLE public.custom_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text text NOT NULL,
  question_type text NOT NULL DEFAULT 'text' CHECK (question_type IN ('text', 'textarea')),
  is_required boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.custom_questions ENABLE ROW LEVEL SECURITY;

-- Anyone can read questions (needed for the public form)
CREATE POLICY "Anyone can read custom questions" ON public.custom_questions
  FOR SELECT TO public USING (true);

-- Only admins can manage questions
CREATE POLICY "Admins can insert custom questions" ON public.custom_questions
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update custom questions" ON public.custom_questions
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete custom questions" ON public.custom_questions
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Anyone can view images
CREATE POLICY "Anyone can view site images" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'site-images');

-- Only admins can upload/update/delete images
CREATE POLICY "Admins can upload site images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update site images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'::app_role));
