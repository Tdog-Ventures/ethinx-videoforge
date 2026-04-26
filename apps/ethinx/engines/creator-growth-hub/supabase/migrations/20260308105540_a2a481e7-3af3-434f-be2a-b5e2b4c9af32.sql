
CREATE TABLE public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  tier text NOT NULL DEFAULT 'creator_system',
  source_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON public.enrollments
  FOR INSERT
  WITH CHECK (true);
