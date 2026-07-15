CREATE TABLE public.broken_link_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  broken_link TEXT,
  jurisdiction TEXT,
  platform TEXT,
  reported_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.broken_link_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can report broken links"
  ON public.broken_link_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);