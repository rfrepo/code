#!/usr/bin/env bash
# PostToolUse (matcher *, async): append one JSONL line per tool call to
# .harness/runs/<date>/events.jsonl — the live "what is the agent up to" feed.
# Registered async in settings.json so it never blocks a tool call.
# Observability only: must NEVER block. Always exits 0.
set -u

INPUT=$(cat) || exit 0
command -v jq >/dev/null 2>&1 || exit 0

find_harness_config() {
  local dir="$1"
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    [ -f "$dir/harness.config.json" ] && { echo "$dir/harness.config.json"; return 0; }
    dir="$(dirname "$dir")"
  done
  return 1
}

CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty' 2>/dev/null) || CWD=""
[ -d "${CWD:-}" ] || CWD="$(pwd)"
CONFIG_PATH="$(find_harness_config "$CWD")" || exit 0
CONFIG_DIR="$(dirname "$CONFIG_PATH")"

# One jq pass does the logging-enabled check AND builds the line: emits
# nothing when logging.enabled=false (or the config is unparseable).
LINE=$(printf '%s' "$INPUT" | jq -c --slurpfile cfg "$CONFIG_PATH" '
  if ($cfg[0].logging.enabled // true) == false then empty else {
    ts: (now | strflocaltime("%Y-%m-%dT%H:%M:%S")),
    type: "tool",
    event: .hook_event_name,
    session: .session_id,
    tool: .tool_name,
    target: ((.tool_input.file_path // .tool_input.command // .tool_input.subagent_type // .tool_input.pattern // .tool_input.url // "") | tostring | .[0:120]),
    ok: (if .hook_event_name == "PostToolUse" then ((.tool_response.success // true) == true) else null end),
    transcript: (.transcript_path // null)
  } end' 2>/dev/null) || exit 0
[ -n "$LINE" ] || exit 0

DAY_DIR="$CONFIG_DIR/.harness/runs/$(date +%F)"
mkdir -p "$DAY_DIR" 2>/dev/null || exit 0
printf '%s\n' "$LINE" >> "$DAY_DIR/events.jsonl" 2>/dev/null
exit 0
