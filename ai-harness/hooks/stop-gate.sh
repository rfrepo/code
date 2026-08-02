#!/usr/bin/env bash
# Stop hook: final quality sweep over uncommitted work before Claude yields.
# Round 0: gate.sh, then llm-review.sh (second pair of eyes vs clean-code.md).
# Fix rounds (stop_hook_active) re-run both so fixes are re-reviewed, capped
# at llmReview.maxRounds so two models can't argue forever.
set -uo pipefail

INPUT=$(cat)
STOP_ACTIVE="$(echo "$INPUT" | jq -r '.stop_hook_active // false')"

HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
GATE="$HOOK_DIR/../scripts/gate.sh"
LLM_REVIEW="$HOOK_DIR/../scripts/llm-review.sh"
SUBAGENT_CHECK="$HOOK_DIR/../scripts/subagent-review-check.sh"

find_harness_config() {
  local start="$1" dir="$1"
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    if [ -f "$dir/harness.config.json" ]; then
      echo "$dir/harness.config.json"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

CWD="$(pwd)"
CHANGED=$(git diff --name-only --diff-filter=ACMR; git diff --cached --name-only --diff-filter=ACMR)
CHANGED=$(echo "$CHANGED" | sort -u | grep -Ev '^$' || true)
[ -z "$CHANGED" ] && exit 0

SEED=$(echo "$CHANGED" | head -1)
CONFIG_PATH="$(find_harness_config "$(cd "$(dirname "$SEED")" 2>/dev/null && pwd || echo "$CWD")")" || {
  echo "harness: no harness.config.json for changed files — fail closed." >&2
  exit 2
}
CONFIG_DIR="$(dirname "$CONFIG_PATH")"

export HARNESS_ENTRY="stop-hook"
HARNESS_TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // empty')
export HARNESS_TRANSCRIPT
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')

MAX_ROUNDS=$(jq -r '.llmReview.maxRounds // 2' "$CONFIG_PATH" 2>/dev/null || echo 2)
# Round counter is per-session: concurrent sessions sharing this config dir
# must not consume or reset each other's fix-round cap.
SESSION_SAFE=$(printf '%s' "${SESSION_ID:-default}" | tr -c 'a-zA-Z0-9_-' '_')
ROUND_FILE="$CONFIG_DIR/.harness/stop-round-$SESSION_SAFE"
ROUND=$(cat "$ROUND_FILE" 2>/dev/null || echo 0)
# A fresh turn (not a fix round) always starts at round 0, even if a stale
# counter survived an interrupted turn.
[ "$STOP_ACTIVE" != "true" ] && ROUND=0

if [ "$STOP_ACTIVE" = "true" ] && [ "$ROUND" -ge "$MAX_ROUNDS" ]; then
  rm -f "$ROUND_FILE"
  echo "harness: fix-round cap ($MAX_ROUNDS) reached — yielding. Unresolved findings are saved under $CONFIG_DIR/.harness/runs/." >&2
  exit 0
fi

block() {
  mkdir -p "$(dirname "$ROUND_FILE")" 2>/dev/null || true
  echo $((ROUND + 1)) > "$ROUND_FILE" 2>/dev/null || true
  exit 2
}

BASE=$(git merge-base HEAD origin/main 2>/dev/null || echo HEAD)
if ! bash "$GATE" --changed "$BASE"; then
  echo "Work does not pass the quality gate yet — fix the findings above before finishing." >&2
  block
fi

if ! bash "$SUBAGENT_CHECK" "$CONFIG_DIR" "$SESSION_ID"; then
  block
fi

if ! bash "$LLM_REVIEW" "$CONFIG_DIR" "$BASE"; then
  block
fi

rm -f "$ROUND_FILE"
# Sweep counters from long-dead sessions (retention only covers .harness/runs).
find "$CONFIG_DIR/.harness" -maxdepth 1 -name 'stop-round-*' -mtime +1 -delete 2>/dev/null || true
exit 0
