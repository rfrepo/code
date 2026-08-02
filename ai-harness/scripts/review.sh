#!/usr/bin/env bash
# review.sh — pluggable multi-model review. Runs every enabled CLI reviewer in
# harness.config.json over the diff vs <base>, printing PER-REVIEWER sections
# that are never merged (one reviewer must not mask another).
#
# Usage: review.sh [base-ref]   (default: merge-base with origin/main)
set -uo pipefail

BASE="${1:-$(git merge-base HEAD origin/main 2>/dev/null || echo HEAD~1)}"
git rev-parse --verify "$BASE" >/dev/null 2>&1 || { echo "review: bad base ref '$BASE'" >&2; exit 1; }
[ -z "$(git diff "$BASE"...HEAD 2>/dev/null; git diff; git diff --cached)" ] && { echo "review: empty diff vs $BASE — nothing to review."; exit 0; }

CONFIG="harness.config.json"
[ -f "$CONFIG" ] || { echo "review: no $CONFIG in $(pwd)" >&2; exit 1; }

# Read config ONCE (one node startup instead of ~5 per reviewer).
# \x1f-separated rows: META<us>loggingEnabled, then one R row per reviewer.
US=$'\x1f'
CFG_ROWS="$(node -e '
const c = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
const US = "\x1f";
console.log(["META", (c.logging && c.logging.enabled) === false ? "false" : "true"].join(US));
for (const r of c.reviewers || []) {
  console.log(["R", r.name ?? "", r.type ?? "", String(r.enabled ?? true), String(r.blocking ?? false), r.agent ?? "", r.command ?? ""].join(US));
}
' "$CONFIG" 2>/dev/null)" || { echo "review: cannot parse $CONFIG" >&2; exit 1; }

IFS="$US" read -r _ LOGGING_ENABLED <<< "$(printf '%s\n' "$CFG_ROWS" | head -1)"
BLOCKED=0

# Run logging (observability only — never alters exit codes or output).
RUN_DIR=""
if [ "$LOGGING_ENABLED" = "true" ]; then
  RUN_DIR=".harness/runs/$(date +%Y%m%d-%H%M%S)-$$-review"
  mkdir -p "$RUN_DIR/reviewers" 2>/dev/null || RUN_DIR=""
fi

while IFS="$US" read -r TAG NAME TYPE ENABLED BLOCKING AGENT CMD; do
  [ "$TAG" = "R" ] || continue
  [ "$ENABLED" != "true" ] && continue

  echo ""
  echo "════════ Reviewer: $NAME ════════"

  case "$TYPE" in
    subagent)
      echo "(runs inside Claude Code — invoke the '$AGENT' subagent; skipped in shell context)"
      ;;
    cli)
      CMD="${CMD//\{base\}/$BASE}"
      FIRST_WORD="${CMD%% *}"
      if ! command -v "$FIRST_WORD" >/dev/null 2>&1; then
        echo "($FIRST_WORD not installed — skipped)"
        continue
      fi
      if [ -n "$RUN_DIR" ]; then
        bash -c "$CMD" 2>&1 | tee "$RUN_DIR/reviewers/$NAME.md"
        STATUS=${PIPESTATUS[0]}
      else
        bash -c "$CMD"; STATUS=$?
      fi
      if [ "$STATUS" -ne 0 ]; then
        [ "$BLOCKING" = "true" ] && BLOCKED=1
        echo "($NAME reported findings$([ "$BLOCKING" = "true" ] && echo ' — BLOCKING' || echo ' — advisory'))"
      fi
      ;;
    external)
      echo "(external PR reviewer — runs via its GitHub App on pull requests; nothing to do locally)"
      ;;
  esac
done <<< "$CFG_ROWS"

if [ -n "$RUN_DIR" ]; then
  SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
  printf '{"ts":"%s","type":"review","base":"%s","blocked":%s}' \
    "$(date +%Y-%m-%dT%H:%M:%S)" "$BASE" "$([ $BLOCKED -eq 1 ] && echo true || echo false)" \
    | bash "$SCRIPT_DIR/harness-log.sh" "$(pwd)" 2>/dev/null || true
fi

echo ""
[ $BLOCKED -eq 1 ] && { echo "review: a blocking reviewer failed." >&2; exit 2; }
echo "review: complete (advisory reviewers never block)."
