CREATE POLICY "Admins can delete applications" ON public.applications
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));