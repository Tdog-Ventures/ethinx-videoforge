
-- Create member_progress table
CREATE TABLE public.member_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  current_week integer NOT NULL DEFAULT 1,
  modules_completed text[] NOT NULL DEFAULT '{}',
  last_accessed timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.member_progress ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own row (matched by auth.jwt() email)
CREATE POLICY "Users can read own progress"
  ON public.member_progress
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Authenticated users can update their own row
CREATE POLICY "Users can update own progress"
  ON public.member_progress
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');

-- Authenticated users can insert their own row
CREATE POLICY "Users can insert own progress"
  ON public.member_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (email = auth.jwt() ->> 'email');
