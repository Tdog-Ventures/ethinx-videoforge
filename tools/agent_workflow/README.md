# Adaptive agent workflows

Reusable coordinator → investigator → builder → verifier → operator workflow. Requires Linux/macOS with Python 3.12+, FFmpeg and ffprobe. No Python dependencies. OpenCode is optional: each role is a locally configured argv command, never a shell string.

## Implemented versus live

This is a development/recovery workflow, not a replacement video renderer. The repository contains frontend apps and Supabase proxies; its production FFmpeg backend is external. These changes do not fix the upstream mux failure, deploy to Hetzner, enable scheduled delivery, or claim a customer generation flow passed. The built-in gate proves a supplied MP4 can be downloaded and decoded. Extend its verifier command to first run the real customer submission, polling and preview checks; then verify the returned MP4. Never treat a synthetic MP4 as production evidence.

The templates use example acceptance criteria and known host names; confirm these against each job. FacelessForge duration is configurable, not fixed to 60 seconds. If the artifact is on a CDN, explicitly allow that exact hostname instead. Cross-host redirects fail closed. The default operator deliberately blocks deployment until a real release-and-health command is configured.

## Run

From the repository root, copy the selected template to `.agent-workflow/config.json` and set its argv commands to your installed tools. Set `ETHINX_MP4_URL` to the controlled job's download URL and optionally `ETHINX_AGENT_MODEL` to your configured OpenCode provider/model. Keep credentials in the environment. Templates are snapshotted per task: later edits only affect new tasks.

```sh
mkdir -p .agent-workflow
cp tools/agent_workflow/templates/facelessforge.json .agent-workflow/config.json
python3 tools/agent_workflow/runner.py create --product facelessforge \
  --brief-file .agent-workflow/brief.txt --config .agent-workflow/config.json --workspace .
python3 tools/agent_workflow/runner.py run TASK_ID
python3 tools/agent_workflow/runner.py status TASK_ID
python3 tools/agent_workflow/runner.py lessons facelessforge
```

The brief must state the desired customer result and acceptance criteria. For the current recovery: identify the failing mux job, preserve port 8000, repair only the responsible renderer, and provide a controlled downloadable MP4. Acceptance parameters belong in the verifier argv, not only the prose brief.

The OpenCode adapter attaches each role's scoped context as a private temporary file to `opencode run`; investigator uses `plan`, builder uses `build`. This avoids OS argument-size limits on accumulated evidence. These are command adapters, not five simultaneously running agents. OpenCode is not installed in this development workspace, so its real model execution remains unverified. Check your installed CLI version and provider settings. Reference: https://opencode.ai/docs/cli/

## Failure handling and evidence

- Only exit 75 requests a transient retry, maximum three total attempts. Two identical errors block earlier. There is no retry delay; adapters should honor provider retry-after instructions before returning 75.
- Verifier failure returns evidence to builder for at most two repairs. Other permanent errors block immediately.
- Commands have a configured timeout; the runner kills their process group on timeout/interruption.
- SQLite stores configuration, stage, role output and events. Completed workflows contribute evidence to product-specific reusable lessons; this is retrieval, not automatic model training.
- A database-wide OS lock serializes runs, so the same workspace cannot be edited by concurrent roles through that database. Use one database per shared workspace. Separate databases/workspaces can run independently.
- A crash leaves a role marked `running`. The next run blocks it. Inspect the side effect before creating a replacement task; non-idempotent deployment is never replayed automatically.
- Media evidence includes downloaded bytes, SHA256, HTTP status, ffprobe metadata and complete decoder stderr. It checks every audio/video stream's duration and decodes all streams with `-xerror -map 0`.
- No port 8000 download is allowed. Role prompts also preserve that constraint. Trusted command adapters can execute arbitrary code; prompts are not an OS sandbox. Run agents as a restricted user with suitable OpenCode permissions and isolated workspaces.
- Common environment credential values and bearer tokens are redacted from role output. SQLite and evidence still contain project data; keep their directories private. Redaction is best effort, not a guarantee for arbitrary encoded secrets.

To deploy, replace the operator argv with an existing trusted script that returns zero only after deployment and health checks pass. The workflow will invoke it only after verification succeeds. To accept a verified artifact without deployment, use a separate explicit archive/acceptance command as operator and describe that behavior in the task brief.

## Standalone MP4 gate

```sh
python3 tools/agent_workflow/media_gate.py --host facelessforge.ethinx.solutions \
  --width 1080 --height 1920 --duration 60 --output-dir .agent-workflow/evidence
npm run test:agent-workflow
```

The URL comes from `ETHINX_MP4_URL` or `--url`. HTTP 200, audio/video, MP4 container, dimensions, container/stream durations within 0.5 seconds and all-stream decode are mandatory. Downloads have a 500 MB limit, 30-second socket timeout and 120-second deadline; probe and decode each have a 120-second timeout. Evidence is written for media/probe/decode failures too. A successful file gate does not prove script quality, captions, visuals or that the frontend played the video.
