#!/usr/bin/env bash
# subagent-review-check: edit newer than review blocks (exit 2); review newer
# than edit passes; a review from a different session doesn't count; no log or
# disabled config never blocks (cannot verify → fail open).
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/subagent-review-check.sh"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

write_config() {
  cat > "$TMP/harness.config.json" <<EOF
{
  "subagentReview": { "enabled": $1, "agent": "code-reviewer" },
  "models": { "reviewer": "opus" }
}
EOF
}

events() {
  mkdir -p "$TMP/.harness/runs/2026-08-01"
  printf '%s\n' "$@" > "$TMP/.harness/runs/2026-08-01/events.jsonl"
}

check() {
  set +e
  OUT=$(bash "$SCRIPT" "$TMP" "${2:-sess-1}" 2>&1)
  CODE=$?
  set -e
  [ "$CODE" -eq "$1" ] || { echo "FAIL: $3 — expected exit $1, got $CODE"; echo "$OUT"; exit 1; }
}

EDIT='{"ts":"2026-08-01T10:00:00","type":"tool","event":"PostToolUse","session":"sess-1","tool":"Edit","target":"src/a.ts","ok":true}'
REVIEW_BEFORE='{"ts":"2026-08-01T09:00:00","type":"tool","event":"PostToolUse","session":"sess-1","tool":"Task","target":"code-reviewer","ok":true}'
REVIEW_AFTER='{"ts":"2026-08-01T11:00:00","type":"tool","event":"PostToolUse","session":"sess-1","tool":"Task","target":"code-reviewer","ok":true}'
REVIEW_OTHER_SESSION='{"ts":"2026-08-01T11:00:00","type":"tool","event":"PostToolUse","session":"sess-2","tool":"Task","target":"code-reviewer","ok":true}'

# 1. edit with no review at all → block
write_config true
events "$EDIT"
check 2 sess-1 "edit without review"
echo "$OUT" | grep -q "code-reviewer" || { echo "FAIL: block message missing agent name"; exit 1; }

# 2. review older than the edit → still block
events "$REVIEW_BEFORE" "$EDIT"
check 2 sess-1 "stale review"

# 3. review newer than the edit → pass
events "$EDIT" "$REVIEW_AFTER"
check 0 sess-1 "fresh review"

# 4. fresh review but from another session → block
events "$EDIT" "$REVIEW_OTHER_SESSION"
check 2 sess-1 "other-session review"

# 5. no activity log at all → cannot verify → pass
rm -rf "$TMP/.harness"
check 0 sess-1 "no log"

# 6. disabled → pass even with unreviewed edit
write_config false
events "$EDIT"
check 0 sess-1 "disabled"

echo "PASS subagent-review-check"
