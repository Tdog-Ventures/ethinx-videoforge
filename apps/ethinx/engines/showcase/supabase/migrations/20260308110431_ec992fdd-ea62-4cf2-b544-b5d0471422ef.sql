
-- Create site_stats table
CREATE TABLE public.site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text UNIQUE NOT NULL,
  stat_value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access"
  ON public.site_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed data
INSERT INTO public.site_stats (stat_key, stat_value) VALUES
  ('videos_generated', '1200'),
  ('businesses_served', '340'),
  ('average_roas', '4.2'),
  ('revenue_generated', '2100000');
