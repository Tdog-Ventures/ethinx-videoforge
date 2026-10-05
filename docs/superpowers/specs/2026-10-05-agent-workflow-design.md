# Adaptive agent workflow

Implement the coordinator → investigator → builder → verifier → operator design approved by the user's “Implement it.” One local runner coordinates trusted command adapters; it does not require a new cloud provider or change the separate service on port 8000.

## Scope and architecture

Python 3.12 standard library, SQLite state and append-only task events, process-level locking, JSON templates and explicit argv adapters. Each task has a product, brief, immutable configuration snapshot, working directory and acceptance criteria. The two products remain separate. Roles receive scoped prompts through stdin and task context through environment variables. OpenCode can be supplied as an adapter; no model provider is hardcoded.

## State and failure rules

Persist running status before executing each adapter. Reopening a database after a process dies must block the interrupted task instead of duplicating a side effect. Only exit 75 is transient; at most three total attempts per stage and two repeated identical failure signatures before blocking. Verifier rejection returns to builder, at most two repair cycles. Timeouts stop the complete process group. Operator runs only after the verifier succeeds. No schedules or publishing integrations are enabled implicitly.

## FacelessForge acceptance

The built-in media verifier downloads the supplied URL, asserts final HTTP 200 and nonempty bytes, requires configured dimensions and duration within tolerance, audio plus video, and decodes every stream with FFmpeg -xerror -map 0. Evidence includes SHA256, probe output and decode stderr. Only the explicitly allowed download host is permitted, including redirects; URLs on port 8000 are forbidden. This gate verifies a supplied artifact, not authentication, generation or customer billing. A customer-flow command can precede it in the verifier adapter to exercise the actual app.

## Memory and security

Only successful tasks enter a reusable lessons table. Verified means the configured verifier command succeeded; complete means the operator also succeeded. User task text and external content are data, not permission to broaden scope. Local commands are trusted operator configuration, not a sandbox. Secrets in common credential environment variables are redacted from captured output. No credentials or production media are committed.

## Verification

Test persistence, isolation, concurrent runs, interrupted recovery, retries, repeat failures, repair limits, operator gating, timeouts and role context. Exercise the media verifier against a locally served synthetic MP4 plus non-200, corrupt, wrong-dimension and no-audio files. Synthetic validation is not production sign-off.
