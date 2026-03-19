CREATE TABLE public.sent_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  message text NOT NULL,
  recipient_emails jsonb NOT NULL DEFAULT '[]'::jsonb,
  recipient_count integer NOT NULL DEFAULT 0,
  sent_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.sent_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read sent messages"
  ON public.sent_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert sent messages"
  ON public.sent_messages FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert sent messages"
  ON public.sent_messages FOR INSERT TO service_role
  WITH CHECK (true);