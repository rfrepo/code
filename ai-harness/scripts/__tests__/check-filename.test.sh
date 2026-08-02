#!/usr/bin/env bash
# check-filename: rename suggestions must be real conversions on BSD and GNU
# sed alike (regression: GNU-only \U/\L emitted literal 'L'/'U' on macOS,
# e.g. "LBad_Name.ts").
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="$ROOT/check-filename.sh"

expect_fail_with() {
  local path="$1" want="$2" out code
  set +e
  out=$(bash "$CHECK" "$path" 2>&1)
  code=$?
  set -e
  [ "$code" -eq 2 ] || { echo "FAIL: $path should exit 2, got $code"; echo "$out"; exit 1; }
  echo "$out" | grep -qF "$want" \
    || { echo "FAIL: $path — expected suggestion '$want' in:"; echo "$out"; exit 1; }
}

expect_pass() {
  bash "$CHECK" "$1" >/dev/null 2>&1 \
    || { echo "FAIL: $1 should pass"; exit 1; }
}

expect_fail_with "src/Bad_Name.ts" "camelCase: badName.ts"
expect_fail_with "src/some-file.ts" "camelCase: someFile.ts"
expect_fail_with "src/bad_component.tsx" "PascalCase: BadComponent.tsx"
expect_fail_with "src/MyDir/thing.ts" "kebab-case: my-dir"
expect_fail_with "src/my_dir/thing.ts" "kebab-case: my-dir"

expect_pass "src/MyComp.tsx"
expect_pass "src/useCheckout.ts"
expect_pass "src/goodName.ts"
expect_pass "e2e/checkout-with-valid-cart.e2e.ts"

echo "PASS check-filename"
