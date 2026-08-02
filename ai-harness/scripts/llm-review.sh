#!/usr/bin/env bash
# llm-review.sh — second pair of eyes after the engineer finishes a turn.
# Runs each enabled CLI reviewer from harness.config.json over the diff vs
# <base>, saves the full report under .harness/runs/<day>/, and — when
# llmReview.mode is "block" — exits 2 with the findings on stderr if any
# reviewer ends its report with "VERDICT: FAIL". A reviewer that crashes or
# omits a verdict never blocks (fail open: a broken reviewer is not a finding).
#
# Usage: llm-review.sh <config-dir> [base-ref]
set -uo pipefail

CONFIG_DIR="${1:-.}"
BASE="${2:-$(git merge-base HEAD origin/main 2>/dev/null || echo HEAD~1)}"
CONFIG="$CONFIG_DIR/harness.config.json"
[ -f "$CONFIG" ] || exit 0

# Read config ONCE (node startup dominates; this runs inside the Stop hook).
# \x1f-separated rows: META<us>enabled<us>mode, then one R row per reviewer.
US=$'\x1f'
CFG_ROWS="$(node -e '
const c = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
const US = "\x1f";
console.log(["META", String(c.llmReview?.enabled ?? false), c.llmReview?.mode ?? "advisory"].join(US));
for (const r of c.reviewers || []) {
  console.log(["R", r.name ?? "", r.type ?? "", String(r.enabled ?? true), r.command ?? ""].join(US));
}
' "$CONFIG" 2>/dev/null)" || exit 0

IFS="$US" read -r _ ENABLED MODE <<< "$(printf '%s\n' "$CFG_ROWS" | head -1)"
[ "$ENABLED" = "true" ] || exit 0

git rev-parse --verify "$BASE" >/dev/null 2>&1 || BASE=HEAD
[ -z "$(git diff "$BASE"...HEAD 2>/dev/null; git diff; git diff --cached)" ] && exit 0

run_with_timeout() {
  if command -v timeout >/dev/null 2>&1; then timeout 300 "$@"; else "$@"; fi
}

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DAY_DIR="$CONFIG_DIR/.harness/runs/$(date +%F)"
STAMP=$(date +%H%M%S)
FAILED=0

while IFS="$US" read -r TAG NAME TYPE R_ENABLED CMD; do
  [ "$TAG" = "R" ] || continue
  [ "$TYPE" = "cli" ] || continue
  [ "$R_ENABLED" = "true" ] || continue
  CMD="${CMD//\{base\}/$BASE}"
  command -v "${CMD%% *}" >/dev/null 2>&1 || continue

  mkdir -p "$DAY_DIR" 2>/dev/null || true
  REPORT="$DAY_DIR/llm-review-$STAMP-$NAME.md"
  # Per-reviewer cap so one hung CLI can't eat the Stop hook's whole budget.
  run_with_timeout bash -c "$CMD" >"$REPORT" 2>&1 || true

  # Verdict must be at the END of the report (the prompt demands a final
  # verdict line) — a reviewer QUOTING "VERDICT: FAIL" mid-prose must not flip it.
  VERDICT=$(tail -n 5 "$REPORT" 2>/dev/null | grep -Eo 'VERDICT: (PASS|FAIL)' | tail -1)
  echo "{\"ts\":\"$(date -u +%FT%TZ)\",\"event\":\"llm_review\",\"reviewer\":\"$NAME\",\"verdict\":\"${VERDICT:-NONE}\",\"mode\":\"$MODE\",\"report\":\"$REPORT\"}" \
    | bash "$SCRIPT_DIR/harness-log.sh" "$CONFIG_DIR"

  if [ "${VERDICT:-}" = "VERDICT: FAIL" ]; then
    FAILED=1
    {
      echo "════════ Reviewer $NAME found standards violations (saved: $REPORT) ════════"
      cat "$REPORT"
    } >&2
  fi
done <<< "$CFG_ROWS"

if [ $FAILED -eq 1 ] && [ "$MODE" = "block" ]; then
  echo "Refactor the code to fix the violations above (see docs/clean-code.md), then finish again." >&2
  exit 2
fi
exit 0
