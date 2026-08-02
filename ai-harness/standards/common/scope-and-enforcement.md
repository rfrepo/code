# Scope and Enforcement

## Mandatory scope

- `SCOPE-001 M` — Every changed line traces to requested work.
- `SCOPE-002 M` — Do not refactor or reformat unrelated code.
- `SCOPE-003 M` — Remove only orphaned code created by the change unless asked.
- `SCOPE-004 D` — Never execute configured destructive or forbidden operations.
- `SCOPE-005 A` — Commit, push, publish, dependency additions, and public API
  breaks require authority unless the workflow explicitly grants it.
- `VERIFY-001 D` — Never complete with a failed, unavailable, or misconfigured
  mandatory gate.
- `VERIFY-002 M` — Correctness claims cite command, test, or browser evidence.

## Finding routes

- Exact mechanical violation → `block`.
- Safe bounded correction → `repair`, once.
- Contextual choice → `decision-required`.
- Useful concern or opportunity → non-blocking `observation`.

Observations never autofix. One finding fingerprint receives at most one
automatic repair. A repeated fingerprint becomes a decision or observation,
never another automatic refactor. A valid `keep-local` decision passes.
Deterministic gates cannot be waived by a contextual decision.

## Human approval

Request approval for materially ambiguous acceptance criteria, missing
architecture decisions, public API/cross-feature ownership changes, dependency
changes, design-system deviations, security-sensitive changes, specification
changes, and external writes not already authorized.
