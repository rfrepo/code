#!/usr/bin/env bash
# PreToolUse (Write|Edit): filename convention + protected-dirs deny. Zero tokens.
# Blocks via JSON permissionDecision (docs-recommended over exit 2 for PreToolUse).
set -uo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL=$(echo "$INPUT" | jq -r '.tool_name // empty')
[ -z "$FILE_PATH" ] && exit 0

deny() {
  jq -n --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
}

HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
HARNESS_SCRIPTS="$(cd "$HOOK_DIR/../scripts" && pwd)"

find_harness_config() {
  local start="$1" dir
  if [ -f "$start" ]; then dir="$(cd "$(dirname "$start")" 2>/dev/null && pwd || dirname "$start")"
  else
    dir="$(dirname "$start")"
    while [ ! -d "$dir" ] && [ "$dir" != "/" ]; do dir="$(dirname "$dir")"; done
    dir="$(cd "$dir" 2>/dev/null && pwd || echo "$dir")"
  fi
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    if [ -f "$dir/harness.config.json" ]; then
      echo "$dir/harness.config.json"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

CONFIG_PATH="$(find_harness_config "$FILE_PATH")" \
  || deny "harness: no harness.config.json above $FILE_PATH — fail closed."
CONFIG_DIR="$(dirname "$CONFIG_PATH")"
RELATIVE_PATH="${FILE_PATH#"$CONFIG_DIR"/}"

while IFS= read -r DIR; do
  [ -z "$DIR" ] && continue
  if [[ "$RELATIVE_PATH" == "$DIR"/* ]] && [ -f "$FILE_PATH" ]; then
    deny "'$DIR' is closed for modification — extend via a NEW file implementing the existing interface (Open-Closed, docs/clean-code.md §3)."
  fi
done < <(jq -r '.protectedDirs[]?' "$CONFIG_PATH" 2>/dev/null || true)

if [ "$TOOL" = "Write" ] && [ ! -f "$FILE_PATH" ]; then
  case "$RELATIVE_PATH" in
    *.ts|*.tsx|*.js|*.jsx)
      MSG=$(bash "$HARNESS_SCRIPTS/check-filename.sh" "$RELATIVE_PATH" 2>&1) || deny "$MSG" ;;
  esac
fi
exit 0
