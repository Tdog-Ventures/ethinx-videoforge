
CREATE TABLE public.audit_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  niche text,
  current_followers text,
  content_frequency text,
  revenue_level text,
  primary_goal text,
  biggest_challenge text,
  platforms text[],
  audit_score integer,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.audit_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
