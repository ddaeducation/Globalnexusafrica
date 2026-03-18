
CREATE TABLE public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate',
  description TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '',
  focus TEXT NOT NULL DEFAULT '',
  tools TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  lms_url TEXT NOT NULL DEFAULT 'https://skilla.africa/',
  pay_url TEXT NOT NULL DEFAULT 'https://store.pesapal.com/globalnexusinstituteltd',
  accent TEXT NOT NULL DEFAULT 'from-red-500 to-orange-400',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admins can insert programs" ON public.programs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update programs" ON public.programs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete programs" ON public.programs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing programs
INSERT INTO public.programs (title, level, description, duration, focus, tools, price, lms_url, pay_url, accent, sort_order) VALUES
('Professional Data Analytics & GenAI', 'Intermediate', 'Master Python programming, data analysis tools, Excel, VScode, and PowerBI. Accredited by Institute of Analytics (UK).', '3 months', 'Comprehensive Data Analysis Tools', 'Python, Excel, MySQL, and PowerBI', '$120', 'https://skilla.africa/', 'https://store.pesapal.com/globalnexusinstituteltd', 'from-red-500 to-orange-400', 1),
('Professional Business Data Analytics', 'Intermediate', 'Create powerful dashboards and reports using SQL, Python, and Power BI for business insights.', '6 months', 'Visualization/Business Intelligence', 'Python, Excel, MySQL, VsCode, and PowerBI', '$600', 'https://skilla.africa/', 'https://store.pesapal.com/globalnexusinstituteltd', 'from-blue-500 to-cyan-400', 2),
('Professional Data Science & AI', 'Intermediate', 'Bridge data science and business strategy with practical applications and case studies.', '8 months', 'Data Science, AI Integration', 'Python, SQL, Excel, PowerBI, ML, and NLP', '$800', 'https://skilla.africa/', 'https://store.pesapal.com/globalnexusinstituteltd', 'from-purple-500 to-pink-400', 3),
('Data Management Professional', 'Intermediate', 'Master data management skills — collect, clean, organize, and analyze business data.', '1 month', 'Data Collection, Privacy & Storage', 'Data Cleaning and Analyzing', '$100', 'https://skilla.africa/', 'https://store.pesapal.com/globalnexusinstituteltd', 'from-green-500 to-emerald-400', 4);
