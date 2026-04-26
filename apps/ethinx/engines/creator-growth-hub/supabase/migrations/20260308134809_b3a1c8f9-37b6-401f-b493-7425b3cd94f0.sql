
-- Create curriculum_weeks table
CREATE TABLE public.curriculum_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  description text,
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_locked boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.curriculum_weeks ENABLE ROW LEVEL SECURITY;

-- Authenticated users can SELECT only
CREATE POLICY "Authenticated users can read curriculum"
  ON public.curriculum_weeks
  FOR SELECT
  TO authenticated
  USING (true);

-- Seed with hardcoded week data (content as JSON array of lessons)
INSERT INTO public.curriculum_weeks (week_number, title, description, content, is_locked) VALUES
(1, 'Foundation', '3 lessons · Welcome, Profile Setup, Niche Selection',
 '[{"title":"Welcome & Course Overview","type":"Video","duration":"12 min"},{"title":"Setting Up Your Creator Profile","type":"Video","duration":"18 min"},{"title":"Niche Selection Worksheet","type":"Worksheet"}]'::jsonb,
 false),
(2, 'Content Strategy', '3 lessons · Strategy Fundamentals, Audience Analysis, Q&A',
 '[{"title":"Content Strategy Fundamentals","type":"Video","duration":"15 min"},{"title":"Audience Analysis Template","type":"Worksheet"},{"title":"Q&A Live Call Recording","type":"Video","duration":"45 min"}]'::jsonb,
 false),
(3, 'Audience Growth', '3 lessons · Organic Growth, Hashtags, Collaboration',
 '[{"title":"Organic Growth Playbook","type":"Video","duration":"20 min"},{"title":"Hashtag Research Guide","type":"Worksheet"},{"title":"Collaboration Framework","type":"Video","duration":"14 min"}]'::jsonb,
 true),
(4, 'Monetization', '3 lessons · Revenue Streams, Pricing, First Product',
 '[{"title":"Revenue Streams Overview","type":"Video","duration":"22 min"},{"title":"Pricing Calculator","type":"Worksheet"},{"title":"First Product Blueprint","type":"Video","duration":"18 min"}]'::jsonb,
 true),
(5, 'Ads & Funnels', '3 lessons · Ad Creative, Funnel Mapping, Retargeting',
 '[{"title":"Ad Creative Basics","type":"Video","duration":"16 min"},{"title":"Funnel Mapping Template","type":"Worksheet"},{"title":"Retargeting Strategy","type":"Video","duration":"20 min"}]'::jsonb,
 true),
(6, 'Email Marketing', '3 lessons · List Building, Welcome Sequence, Segmentation',
 '[{"title":"List Building Fundamentals","type":"Video","duration":"17 min"},{"title":"Welcome Sequence Setup","type":"Worksheet"},{"title":"Segmentation Masterclass","type":"Video","duration":"21 min"}]'::jsonb,
 true),
(7, 'Scaling', '3 lessons · Hiring, SOPs, Automation',
 '[{"title":"Hiring Your First VA","type":"Video","duration":"14 min"},{"title":"SOPs & Systems Template","type":"Worksheet"},{"title":"Automation Workflows","type":"Video","duration":"19 min"}]'::jsonb,
 true),
(8, 'Launch & Beyond', '3 lessons · Launch Checklist, 90-Day Plan, Final Q&A',
 '[{"title":"Launch Checklist Walkthrough","type":"Video","duration":"25 min"},{"title":"90-Day Growth Plan","type":"Worksheet"},{"title":"Final Q&A & Next Steps","type":"Video","duration":"30 min"}]'::jsonb,
 true);
