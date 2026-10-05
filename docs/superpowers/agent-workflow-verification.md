# Workflow verification — 2026-10-05

Implemented the user's approved coordinator/investigator/builder/verifier/operator workflow in `tools/agent_workflow`. One SQLite database serializes a shared workspace, preserves task snapshots and role history, and blocks uncertain replay after interruption. Product templates and lesson histories are separate.

## Evidence

- `npm run test:agent-workflow`: 28 tests pass, including real HTTP downloads and FFmpeg probe/decode of synthetic media.
- CLI `create`, `run`, `status`, `lessons`: passed across separate processes using synthetic adapters; complete status and lesson persisted.
- `git diff --check`: passed.
- Independent code review found SIGTERM cleanup, MP4/MOV identification, slow-drip deadline and OpenCode argument-size issues. Each reproduced in a failing regression and passed after correction. Malformed configuration also now returns a useful error.
- Media coverage: HTTP 200, all-stream decoding, SHA256, dimensions, duration, audio, corruption, MOV rejection, cross-host redirect rejection and slow-drip deadline.

## Limits

No live model calls: OpenCode is not installed here. Adapter invocation and large-context attachments were checked with a fake executable. No production generation, preview or downloadable production MP4 was verified. No server credentials or deployment adapter were available; the default operator blocks release. The separate service on port 8000 and scheduled delivery were not changed.

The upstream mux failure and pending render-payload PR remain separate work. The coordinator cannot make an external renderer reliable merely by recording stages. Real acceptance requires a configured customer-flow verifier followed by the media gate and a tested deployment/health adapter.
