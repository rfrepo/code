#!/usr/bin/env bash
# PostToolUse (Write|Edit): format + lint the touched file. Zero tokens.
# Exit 2 feeds remaining lint errors back to Claude as actionable stderr.
set -uo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ] && exit 0
case "$FILE_PATH" in *.ts|*.tsx|*.js|*.jsx|*.mjs) ;; *) exit 0 ;; esac

REPO_ROOT=$(git -C "$(dirname "$FILE_PATH")" rev-parse --show-toplevel 2>/dev/null || pwd)
cd "$REPO_ROOT"

# Formatter: biome if configured, else prettier (harness.config.json formatter=auto).
if [ -f biome.json ] || [ -f biome.jsonc ]; then
  npx --no-install @biomejs/biome format --write "$FILE_PATH" >/dev/null 2>&1 || true
else
  npx --no-install prettier --write "$FILE_PATH" >/dev/null 2>&1 || true
fi

# mktemp: parallel sessions/subagents must not clobber each other's output.
LINT_OUT=$(mktemp)
trap 'rm -f "$LINT_OUT"' EXIT
mkdir -p node_modules/.cache 2>/dev/null || true
if ! npx --no-install eslint --fix --cache --cache-location node_modules/.cache/harness-eslint "$FILE_PATH" >"$LINT_OUT" 2>&1; then
  echo "Lint errors remain in $FILE_PATH — fix them now (rules trace to docs/clean-code.md):" >&2
  head -40 "$LINT_OUT" >&2
  exit 2
fi
exit 0
