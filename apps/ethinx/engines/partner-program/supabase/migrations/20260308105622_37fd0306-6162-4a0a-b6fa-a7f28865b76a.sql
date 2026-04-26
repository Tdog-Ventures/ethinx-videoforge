-- Create partner_applications table
CREATE TABLE public.partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  website text NOT NULL,
  current_clients text NOT NULL,
  monthly_budget text NOT NULL,
  why_partner text NOT NULL,
  preferred_tier text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only
CREATE POLICY "Allow anonymous inserts" ON public.partner_applications
  FOR INSERT
  WITH CHECK (true);