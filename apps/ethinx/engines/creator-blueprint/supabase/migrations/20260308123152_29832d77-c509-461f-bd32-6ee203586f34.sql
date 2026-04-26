
-- Drop all existing restrictive policies on member_progress
DROP POLICY IF EXISTS "Anon insert only" ON public.member_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.member_progress;
DROP POLICY IF EXISTS "Users can read own progress" ON public.member_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.member_progress;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Users can read own progress"
  ON public.member_progress FOR SELECT
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'));

CREATE POLICY "Users can insert own progress"
  ON public.member_progress FOR INSERT
  TO authenticated
  WITH CHECK (email = (auth.jwt() ->> 'email'));

CREATE POLICY "Users can update own progress"
  ON public.member_progress FOR UPDATE
  TO authenticated
  USING (email = (auth.jwt() ->> 'email'))
  WITH CHECK (email = (auth.jwt() ->> 'email'));
