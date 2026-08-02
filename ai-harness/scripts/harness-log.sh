#!/usr/bin/env bash
# harness-log.sh — append one JSONL event line (stdin) to the day's event log.
# Usage: echo '{"ts":…}' | harness-log.sh <config-dir>
# Observability only: must NEVER fail the caller. Always exits 0.
set -u

DIR="${1:-.}"
LINE="$(cat)"
[ -z "$LINE" ] && exit 0

DAY_DIR="$DIR/.harness/runs/$(date +%F)"
mkdir -p "$DAY_DIR" 2>/dev/null || exit 0
# Single printf to an O_APPEND fd: lines under PIPE_BUF never interleave.
printf '%s\n' "$LINE" >> "$DAY_DIR/events.jsonl" 2>/dev/null
exit 0
