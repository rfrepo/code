#!/usr/bin/env bash
# Nested package owns harness.config.json; git root does not.
# Staging a bad filename under the nested package must exit 2 — proving the
# gate walked up to the nested config instead of silent-passing with all-off.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GATE="$ROOT/gate.sh"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

git -C "$TMP" init -q
git -C "$TMP" config user.email "test@example.com"
git -C "$TMP" config user.name "test"
mkdir -p "$TMP/apps/nested/src" "$TMP/apps/nested/scripts"
cp "$ROOT/check-filename.sh" "$TMP/apps/nested/scripts/check-filename.sh"
cat > "$TMP/apps/nested/harness.config.json" <<'EOF'
{
  "checks": {
    "filename": "block",
    "eslint": "off",
    "dispatchPropGrep": "off",
    "testsAccompanyCode": "off",
    "relatedTests": "off",
    "duplication": "off",
    "jsxShapes": "off",
    "knip": "off",
    "gitleaks": "off",
    "semgrep": "off",
    "ratchet": "off",
    "boundaries": "off",
    "compiler": "off",
    "e2e": "off"
  }
}
EOF
echo 'export const x = 1' > "$TMP/apps/nested/src/Bad_Name.ts"
git -C "$TMP" add apps/nested/src/Bad_Name.ts

set +e
OUT=$(cd "$TMP" && bash "$GATE" --staged 2>&1)
CODE=$?
set -e

if [ "$CODE" -ne 2 ]; then
  echo "FAIL nested-config: expected exit 2 from nested filename rule, got $CODE" >&2
  echo "$OUT" >&2
  exit 1
fi

# No config anywhere → exit 2 (fail closed)
TMP2=$(mktemp -d)
trap 'rm -rf "$TMP" "$TMP2"' EXIT
git -C "$TMP2" init -q
git -C "$TMP2" config user.email "test@example.com"
git -C "$TMP2" config user.name "test"
mkdir -p "$TMP2/src"
echo 'export const y = 1' > "$TMP2/src/ok.ts"
git -C "$TMP2" add src/ok.ts
set +e
OUT2=$(cd "$TMP2" && bash "$GATE" --staged 2>&1)
CODE2=$?
set -e
if [ "$CODE2" -ne 2 ]; then
  echo "FAIL no-config: expected exit 2, got $CODE2" >&2
  echo "$OUT2" >&2
  exit 1
fi

echo "ok nested-config: nested rules apply; missing config fails closed"
exit 0
