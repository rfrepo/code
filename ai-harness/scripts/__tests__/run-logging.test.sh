#!/usr/bin/env bash
# Step 0 run logging: a gate run persists an artifact bundle (result.json,
# brief.md, checks/*.txt) and an events.jsonl line — without changing the
# gate's exit codes. logging.enabled=false produces no .harness/ at all.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GATE="$ROOT/gate.sh"

make_repo() {
  local dir="$1" logging="$2"
  git -C "$dir" init -q
  git -C "$dir" config user.email "test@example.com"
  git -C "$dir" config user.name "test"
  mkdir -p "$dir/src" "$dir/scripts"
  cp "$ROOT/check-filename.sh" "$ROOT/harness-log.sh" "$dir/scripts/"
  cat > "$dir/harness.config.json" <<EOF
{
  "logging": $logging,
  "checks": {
    "filename": "block",
    "eslint": "off", "dispatchPropGrep": "off", "testsAccompanyCode": "off",
    "relatedTests": "off", "duplication": "off", "jsxShapes": "off",
    "knip": "off", "gitleaks": "off", "semgrep": "off", "ratchet": "off",
    "boundaries": "off", "compiler": "off", "e2e": "off"
  }
}
EOF
}

# ---- 1. Blocked run writes a bundle, exit code stays 2 -----------------------
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT
make_repo "$TMP" '{"enabled": true, "retainDays": 30}'
echo 'export const x = 1' > "$TMP/src/Bad_Name.ts"
git -C "$TMP" add src/Bad_Name.ts

set +e
OUT=$(cd "$TMP" && HARNESS_ENTRY=test-entry bash "$GATE" --staged 2>&1)
CODE=$?
set -e

[ "$CODE" -eq 2 ] || { echo "FAIL: expected exit 2, got $CODE"; echo "$OUT"; exit 1; }

BUNDLE=$(find "$TMP/.harness/runs" -maxdepth 1 -type d -name '*-test-entry' | head -1)
[ -n "$BUNDLE" ] || { echo "FAIL: no run bundle created"; ls -R "$TMP/.harness" 2>&1; exit 1; }
[ -f "$BUNDLE/result.json" ] || { echo "FAIL: result.json missing"; exit 1; }
[ -f "$BUNDLE/brief.md" ] || { echo "FAIL: brief.md missing"; exit 1; }
[ -s "$BUNDLE/checks/filename.txt" ] || { echo "FAIL: checks/filename.txt missing or empty"; exit 1; }

node -e "
  const r = JSON.parse(require('fs').readFileSync('$BUNDLE/result.json', 'utf8'));
  if (r.blocked !== true) throw new Error('blocked should be true');
  if (r.entry !== 'test-entry') throw new Error('entry wrong: ' + r.entry);
  if (r.checks.filename !== 'fail') throw new Error('filename status wrong');
" || { echo "FAIL: result.json content wrong"; cat "$BUNDLE/result.json"; exit 1; }

grep -q '"type":"gate"' "$TMP/.harness/runs/$(date +%F)/events.jsonl" \
  || { echo "FAIL: no gate event line in events.jsonl"; exit 1; }
grep -q 'BLOCKED' "$BUNDLE/brief.md" || { echo "FAIL: brief.md missing BLOCKED"; exit 1; }

# ---- 2. Passing run writes a bundle with blocked:false -----------------------
git -C "$TMP" rm -q --cached src/Bad_Name.ts
echo 'export const y = 1' > "$TMP/src/goodName.ts"
git -C "$TMP" add src/goodName.ts

set +e
OUT=$(cd "$TMP" && bash "$GATE" --staged 2>&1)
CODE=$?
set -e
[ "$CODE" -eq 0 ] || { echo "FAIL: expected exit 0, got $CODE"; echo "$OUT"; exit 1; }

PASS_BUNDLE=$(find "$TMP/.harness/runs" -maxdepth 1 -type d -name '*-manual' | head -1)
[ -n "$PASS_BUNDLE" ] || { echo "FAIL: no bundle for passing manual run"; exit 1; }
grep -q '"blocked":false' "$PASS_BUNDLE/result.json" || { echo "FAIL: pass bundle should say blocked:false"; exit 1; }

# ---- 3. logging.enabled=false → no .harness, gate behavior unchanged ---------
TMP2=$(mktemp -d)
trap 'rm -rf "$TMP" "$TMP2"' EXIT
make_repo "$TMP2" '{"enabled": false}'
echo 'export const x = 1' > "$TMP2/src/Bad_Name.ts"
git -C "$TMP2" add src/Bad_Name.ts

set +e
OUT=$(cd "$TMP2" && bash "$GATE" --staged 2>&1)
CODE=$?
set -e
[ "$CODE" -eq 2 ] || { echo "FAIL: disabled-logging gate should still exit 2, got $CODE"; exit 1; }
[ ! -d "$TMP2/.harness" ] || { echo "FAIL: .harness created despite logging.enabled=false"; exit 1; }

# ---- 4. tool-activity-log hook appends an event and never blocks -------------
HOOK="$ROOT/../hooks/tool-activity-log.sh"
set +e
printf '%s' "{\"cwd\":\"$TMP\",\"hook_event_name\":\"PostToolUse\",\"session_id\":\"s1\",\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"$TMP/src/goodName.ts\"},\"transcript_path\":\"/tmp/t.jsonl\"}" \
  | bash "$HOOK"
CODE=$?
set -e
[ "$CODE" -eq 0 ] || { echo "FAIL: activity hook exited $CODE"; exit 1; }
grep -q '"tool":"Edit"' "$TMP/.harness/runs/$(date +%F)/events.jsonl" \
  || { echo "FAIL: tool event not logged"; exit 1; }

set +e
echo 'not json' | bash "$HOOK"
CODE=$?
set -e
[ "$CODE" -eq 0 ] || { echo "FAIL: activity hook must exit 0 on garbage input, got $CODE"; exit 1; }

echo "PASS run-logging"
