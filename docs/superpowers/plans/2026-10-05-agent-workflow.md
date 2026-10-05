# Adaptive Agent Workflow Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for inline execution.

**Goal:** Run reusable role workflows with durable state and evidence before release.

**Architecture:** A SQLite-backed coordinator invokes bounded argv commands in a declared workspace. A standalone MP4 verifier supplies the FacelessForge artifact gate.

**Tech Stack:** Python 3.12 standard library, FFmpeg and ffprobe.

**Spec:** docs/superpowers/specs/2026-10-05-agent-workflow-design.md

## Global Constraints

- Do not touch the separate service on port 8000.
- Keep FacelessForge and EthinX Short Form task histories separate.
- Do not enable scheduled delivery implicitly.
- Configuration snapshots and evidence survive restart.

## Review Focus

- Concurrent invocations must not duplicate role execution.
- Interrupted side effects must block automatic replay.
- Verification failures must never execute the operator.
- Redirects and non-200 downloads must fail closed.
- Secret values must not appear in captured role output.

### Task 1: Durable coordinator and CLI

Files: tools/agent_workflow/runner.py, tools/agent_workflow/tests/test_runner.py, tools/agent_workflow/templates/*.json.

Interfaces: Store(path).create(product, brief, config, workspace) → task id; Store.status(id) → task dict; run(store, id) → task dict. CLI create/run/status/lessons.

- [x] Write tests for persistence, snapshots, stage ordering, verifier repair, repeated failures, exit-75 retries, crash recovery, process locks, timeouts, secret redaction and product isolation.
- [x] Run unittest discovery; confirm missing runner fails.
- [x] Implement coordinator, role context and CLI; do not shell-interpolate task data.
- [x] Run coordinator tests and commit.

### Task 2: Downloadable MP4 gate

Files: tools/agent_workflow/media_gate.py, tools/agent_workflow/tests/test_media_gate.py.

Interfaces: verify(url, host, output_dir, width, height, duration, tolerance) → evidence dict; CLI accepts the same options and returns nonzero on failure.

- [x] Write real HTTP + FFmpeg integration tests covering valid MP4, non-200, redirects, corrupt bytes, dimensions, duration and missing audio.
- [x] Run tests; confirm missing media gate fails.
- [x] Implement bounded download, probe and all-stream decoding; persist evidence.
- [x] Run all workflow tests and commit.

### Task 3: Integration and delivery

Files: tools/agent_workflow/README.md, package.json, .github/workflows/agent-workflow.yml.

- [x] Add npm test entry, CI and OpenCode adapter examples with explicit deployment limitations.
- [x] Run complete workflow tests, CLI smoke flow and git diff --check.
- [x] Independently review the complete diff, address important findings with failing regression tests, and publish a reviewable branch/PR.
