#!/usr/bin/env bash
# PreToolUse (Bash): when the command is a git commit, run the full staged gate.
# Blocks via JSON permissionDecision (docs-recommended over exit 2 for PreToolUse).
set -uo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
echo "$COMMAND" | grep -qE '(^|[;&|]\s*)git\s+commit' || exit 0

HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
GATE="$HOOK_DIR/../scripts/gate.sh"

export HARNESS_ENTRY="pre-commit-hook"
HARNESS_TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // empty')
export HARNESS_TRANSCRIPT

if ! GATE_OUT=$(bash "$GATE" --staged 2>&1); then
  jq -n --arg r "$GATE_OUT

Commit blocked by quality gate — resolve the findings above, restage, and retry." \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
fi
exit 0
