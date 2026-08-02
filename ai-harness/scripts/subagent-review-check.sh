#!/usr/bin/env bash
# subagent-review-check.sh — proof that the engineer ran the reviewer subagent
# after its last edit. Reads the Step-0 activity log (events.jsonl), which
# records every tool call including subagent spawns (tool=Task, target=agent).
# No log yet (logging off, or no tool calls) → cannot verify → does not block.
#
# Usage: subagent-review-check.sh <config-dir> [session-id]
# Exit 0 = reviewed or check not applicable; exit 2 = review missing or stale.
set -uo pipefail

CONFIG_DIR="${1:-.}"
SESSION="${2:-}"
CONFIG="$CONFIG_DIR/harness.config.json"
[ -f "$CONFIG" ] || exit 0

# One node spawn for all three config fields (runs inside the Stop hook).
US=$'\x1f'
CFG="$(node -e '
const c = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
console.log([
  String(c.subagentReview?.enabled ?? false),
  c.subagentReview?.agent ?? "code-reviewer",
  c.models?.reviewer ?? "inherit",
].join("\x1f"));
' "$CONFIG" 2>/dev/null)" || exit 0
IFS="$US" read -r ENABLED AGENT MODEL <<< "$CFG"
[ "$ENABLED" = "true" ] || exit 0

# Only the 2 most recent day logs: covers a midnight-spanning session without
# re-parsing the whole retention window (30 days of every tool call) each Stop.
shopt -s nullglob
ALL_FILES=("$CONFIG_DIR"/.harness/runs/*/events.jsonl)
[ ${#ALL_FILES[@]} -eq 0 ] && exit 0
FILES=()
while IFS= read -r F; do FILES+=("$F"); done < <(printf '%s\n' "${ALL_FILES[@]}" | sort | tail -2)

RESULT=$(node -e '
const fs = require("fs");
const agent = process.argv[1];
const session = process.argv[2];
const files = process.argv.slice(3);
let lastEdit = null, lastReview = null;
const isReviewer = (t) => t === agent || (typeof t === "string" && t.endsWith(":" + agent));
for (const f of files) {
  for (const line of fs.readFileSync(f, "utf8").split("\n")) {
    if (!line.trim()) continue;
    let e; try { e = JSON.parse(line); } catch { continue; }
    if (e.type !== "tool" || e.event !== "PostToolUse") continue;
    if (session && e.session && e.session !== session) continue;
    if (["Write", "Edit", "MultiEdit", "NotebookEdit"].includes(e.tool)) lastEdit = e.ts;
    if ((e.tool === "Task" || e.tool === "Agent") && isReviewer(e.target) && e.ok !== false) lastReview = e.ts;
  }
}
if (!lastEdit) { console.log("ok"); process.exit(0); }
console.log(lastReview && lastReview >= lastEdit ? "ok" : "missing");
' "$AGENT" "$SESSION" "${FILES[@]}" 2>/dev/null) || exit 0

[ "$RESULT" = "ok" ] && exit 0
echo "Peer review required before finishing: run the '$AGENT' subagent (model: $MODEL) on the current diff, apply its findings, then finish again. The harness checks the activity log for a '$AGENT' run newer than your last edit." >&2
exit 2
