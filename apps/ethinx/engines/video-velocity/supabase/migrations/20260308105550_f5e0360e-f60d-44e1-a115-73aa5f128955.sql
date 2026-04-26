
CREATE TABLE public.dfy_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  business_name text,
  business_type text,
  payment_plan text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.dfy_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.dfy_orders
  FOR INSERT
  WITH CHECK (true);
