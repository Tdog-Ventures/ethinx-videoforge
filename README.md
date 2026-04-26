# ethinx-videoforge

Monorepo combining the Lovable ETHINX control layer with the Emergent/FacelessForge render engine.

## Apps

- `apps/ethinx` - combined ETHINX control layer with public, dashboard, admin, and render-flow routes.
- `apps/ethinx/engines/*` - preserved Lovable source projects as separate engine modules.
- `apps/facelessforge` - FacelessForge/Emergent render engine app and Supabase render proxy functions.

## ETHINX Lovable projects

| Project | Module |
| --- | --- |
| ETHINX Admin Command | `apps/ethinx/engines/admin-command` |
| ETHINX Launchpad | `apps/ethinx/engines/launchpad` |
| Creator Blueprint | `apps/ethinx/engines/creator-blueprint` |
| Video Velocity | `apps/ethinx/engines/video-velocity` |
| ETHINX Showcase | `apps/ethinx/engines/showcase` |
| Creator OS Launchpad | `apps/ethinx/engines/creator-os-launchpad` |
| Neon Studio | `apps/ethinx/engines/neon-studio` |
| ETHINX Partner Program | `apps/ethinx/engines/partner-program` |
| Creator Growth Hub | `apps/ethinx/engines/creator-growth-hub` |

The combined ETHINX app also exposes the corresponding dashboard/public routes under `apps/ethinx/src/App.tsx`, including `/admin`, `/engines/creator-blueprint`, `/engines/creator-launchpad`, `/engines/neon-studio`, `/engines/video-velocity`, `/engines/partner-program`, `/engines/growth-hub`, `/engines/showcase`, `/video-velocity`, `/showcase`, and `/partners`.

## FacelessForge render flow

Render proxy functions are under `apps/facelessforge/supabase/functions`:

- `render-video` - starts a FacelessForge render and stores the returned job id.
- `render-video-status` - polls status and persists the completed MP4 URL.
- `render-video-cancel` - cancels an in-flight render job and stores terminal status.

The ETHINX UI flow is implemented in `apps/ethinx/src/pages/dashboard/GeneratedVideos.tsx` with render state helpers in `apps/ethinx/src/lib/render-state.ts`.

## Commands

```sh
npm install
npm run build
npm run test:ethinx-render
```
