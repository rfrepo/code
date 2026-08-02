#!/usr/bin/env bash
# llm-review: block mode + VERDICT: FAIL exits 2 with findings on stderr and
# saves the report; VERDICT: PASS exits 0; advisory mode never blocks but still
# saves the report; a missing reviewer binary is skipped silently.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT="$ROOT/llm-review.sh"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

git -C "$TMP" init -q
git -C "$TMP" config user.email "test@example.com"
git -C "$TMP" config user.name "test"
mkdir -p "$TMP/bin"
echo 'export const x = 1' > "$TMP/a.ts"
git -C "$TMP" add a.ts
git -C "$TMP" commit -qm init
echo 'export const x = 2' > "$TMP/a.ts"

cat > "$TMP/bin/codex" <<'EOF'
#!/usr/bin/env bash
echo "a.ts:1 — name 'x' violates naming (clean-code.md §3)"
echo "VERDICT: ${FAKE_VERDICT:-FAIL}"
EOF
chmod +x "$TMP/bin/codex"

write_config() {
  cat > "$TMP/harness.config.json" <<EOF
{
  "llmReview": { "enabled": true, "mode": "$1", "maxRounds": 2 },
  "reviewers": [
    { "name": "codex", "type": "cli", "command": "$2", "enabled": true }
  ]
}
EOF
}

run() {
  set +e
  OUT=$(cd "$TMP" && PATH="$TMP/bin:$PATH" FAKE_VERDICT="${2:-FAIL}" bash "$SCRIPT" "$TMP" HEAD 2>&1)
  CODE=$?
  set -e
}

# 1. block + FAIL → exit 2, findings surfaced, report saved
write_config block "codex review {base}"
run block FAIL
[ "$CODE" -eq 2 ] || { echo "FAIL: block+FAIL expected exit 2, got $CODE"; echo "$OUT"; exit 1; }
echo "$OUT" | grep -q "violates naming" || { echo "FAIL: findings not on stderr"; exit 1; }
ls "$TMP"/.harness/runs/*/llm-review-*-codex.md >/dev/null 2>&1 || { echo "FAIL: report not saved"; exit 1; }
grep -q '"event":"llm_review"' "$TMP"/.harness/runs/*/events.jsonl || { echo "FAIL: no events.jsonl line"; exit 1; }

# 2. block + PASS → exit 0
run block PASS
[ "$CODE" -eq 0 ] || { echo "FAIL: block+PASS expected exit 0, got $CODE"; echo "$OUT"; exit 1; }

# 3. advisory + FAIL → exit 0, report still saved
rm -rf "$TMP/.harness"
write_config advisory "codex review {base}"
run advisory FAIL
[ "$CODE" -eq 0 ] || { echo "FAIL: advisory+FAIL expected exit 0, got $CODE"; echo "$OUT"; exit 1; }
ls "$TMP"/.harness/runs/*/llm-review-*-codex.md >/dev/null 2>&1 || { echo "FAIL: advisory report not saved"; exit 1; }

# 4. missing binary → exit 0, no report
rm -rf "$TMP/.harness"
write_config block "not-a-real-reviewer {base}"
run block FAIL
[ "$CODE" -eq 0 ] || { echo "FAIL: missing binary expected exit 0, got $CODE"; echo "$OUT"; exit 1; }
[ ! -d "$TMP/.harness" ] || { echo "FAIL: report written despite missing binary"; exit 1; }

echo "PASS llm-review"
