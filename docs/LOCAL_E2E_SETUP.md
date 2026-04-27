# Local E2E setup for EE-THINKS VideoForge

This guide documents the environment required to run a real local/live
`generate -> render -> status -> MP4 -> download` validation. Do not put real
secrets in committed files. Copy the relevant `.env.example` file to `.env` and
fill values locally or in your deployment secret store.

## 1. Environment files

Create local env files from the examples:

```sh
cp .env.example .env
cp apps/ethinx/.env.example apps/ethinx/.env
cp apps/facelessforge/.env.example apps/facelessforge/.env
```

The root example is a combined checklist. The app-specific examples document
which variables are consumed by each app.

## 2. Supabase configuration

The ETHINX browser app needs a public Supabase URL and anon key:

```sh
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<supabase-anon-key>
VITE_SUPABASE_ANON_KEY=<supabase-anon-key>
```

Notes:

- `apps/ethinx/src/integrations/supabase/client.ts` reads
  `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Preserved Lovable engine modules read `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY`.
- Use the same anon key for `VITE_SUPABASE_PUBLISHABLE_KEY` and
  `VITE_SUPABASE_ANON_KEY` unless your Supabase project exposes a separate
  publishable key.

Supabase Edge Functions need server-side secrets set with the Supabase CLI or
in the Supabase dashboard:

```sh
supabase secrets set \
  SUPABASE_URL=https://<project-ref>.supabase.co \
  SUPABASE_ANON_KEY=<supabase-anon-key> \
  SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key> \
  FACELESSFORGE_BASE_URL=https://<facelessforge-host> \
  FACELESSFORGE_API_KEY=<facelessforge-bridge-key>
```

`SUPABASE_SERVICE_ROLE_KEY` is only for server-side functions that require
privileged access. Never expose it through a `VITE_` variable.

## 3. FacelessForge render bridge

The ETHINX render proxy functions call these upstream FacelessForge endpoints:

- `POST /api/external/render-video`
- `GET /api/external/render-video-status?job_id=<job_id>`
- `POST /api/external/render-video/cancel`

Configure the bridge secrets for the Supabase functions:

```sh
FACELESSFORGE_BASE_URL=https://<facelessforge-host>
FACELESSFORGE_API_KEY=<facelessforge-bridge-key>
```

The FacelessForge deployment itself should be configured with:

```sh
EXTERNAL_RENDER_ENABLED=true
EXTERNAL_RENDER_API_KEY=<same-key-or-render-service-key>
STORAGE_MODE=s3
STORAGE_BUCKET=<bucket-name>
STORAGE_REGION=<region>
STORAGE_PUBLIC_BASE_URL=https://<cdn-or-public-bucket-host>
STORAGE_ACCESS_KEY_ID=<storage-access-key>
STORAGE_SECRET_ACCESS_KEY=<storage-secret-key>
```

Use `STORAGE_MODE=local` only for a local renderer that writes files to local
disk and serves them publicly during development. A real MP4 download test
requires the completed render response to include a non-empty public
`video_url` or `rendered_video_url`.

## 4. Authenticate locally

The `/engines/video-forge` and `/videos` pages are protected member routes.
For a real browser E2E run:

1. Start the ETHINX app with valid Supabase browser env vars.
2. Open `/signup` to create a test user or `/login` to sign in.
3. Ensure the test user has a role row that allows member access:

```sql
insert into public.user_roles (user_id, role)
values ('<auth-user-id>', 'member')
on conflict do nothing;
```

Use an `admin` role only when validating `/admin` routes.

## 5. Run the apps

Install dependencies once:

```sh
npm install
```

Start ETHINX:

```sh
npm run dev --workspace @ethinx/control-layer
```

If you run FacelessForge locally, start it separately with its local `.env`
loaded and set `FACELESSFORGE_BASE_URL` in Supabase secrets to that reachable
URL. Supabase Edge Functions must be able to reach the FacelessForge URL.

## 6. Run a real E2E video pipeline test

1. Sign in as a member.
2. Open `/engines/video-forge`.
3. Generate a test asset with:
   - Goal: `Education`
   - Topic: `Why people procrastinate`
   - Mode: `Short-form`
   - Tone: `Professional` or `Bold`
   - Length: `Short`
4. Confirm the asset is saved with `engine_key = video_forge` and appears on
   `/videos`.
5. On `/videos`, click `Render video`.
6. Confirm the `render-video` Edge Function returns:
   - `job_id`
   - `render_job_id`
   - `status = queued`
7. Confirm the asset row stores:
   - `render_job_id`
   - `render_status = queued`
8. Wait for the UI polling loop. It calls `render-video-status` every 5s while
   `render_job_id` exists and `rendered_video_url` is empty.
9. Confirm status progression reaches `completed`.
10. Confirm the asset row stores:
    - `render_status = completed`
    - `rendered_video_url = <public mp4 url>`
11. Confirm the UI displays `Download MP4` only after `rendered_video_url` is
    present.
12. Download the MP4 and verify:
    - HTTP status is 200.
    - File size is greater than 0.
    - The file opens/plays.
    - Duration is greater than 0 seconds.

## 7. Useful verification commands

Run unit/integration tests:

```sh
npm test
```

Run focused generator/render tests:

```sh
npm run test --workspace @ethinx/control-layer -- \
  src/test/video-forge.test.ts \
  src/test/generated-videos.render.test.tsx
```

Run a production build:

```sh
npm run build
```

## 8. Known failure signatures

- Redirect from `/engines/video-forge` or `/videos` to `/login`: no authenticated
  Supabase session.
- `FacelessForge is not configured`: missing `FACELESSFORGE_BASE_URL` or
  `FACELESSFORGE_API_KEY` in Supabase Edge Function secrets.
- `Unauthorized`: browser request to an Edge Function lacks a valid Supabase
  bearer token.
- No `Download MP4` button: `rendered_video_url` is empty or render has not
  completed.
