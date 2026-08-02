#!/usr/bin/env bash
# advisories.sh rolls up "## advisory" sections from every run's brief.md into
# one newest-first .harness/advisories.md, rewrites checks/ references to the
# owning run folder, and degrades gracefully when there are no advisories.
set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ADV="$ROOT/advisories.sh"
FAIL=0
check() { if [ "$2" = "$3" ]; then echo "  ok: $1"; else echo "  FAIL: $1 — expected [$2] got [$3]"; FAIL=1; fi; }
contains() { if printf '%s' "$2" | grep -qF "$3"; then echo "  ok: $1"; else echo "  FAIL: $1 — missing [$3]"; FAIL=1; fi; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

make_run() {
  local ts="$1" advisory="$2"
  local dir="$TMP/.harness/runs/$ts"
  mkdir -p "$dir/checks"
  {
    echo "# gate run — passed"
    echo
    echo "- when: $ts · entry: manual"
    if [ -n "$advisory" ]; then
      echo
      echo "## advisory"
      echo "$advisory"
    fi
  } > "$dir/brief.md"
}

echo "test: two runs with advisories + one without"
make_run "20260101-000000-1-manual" "- jsxShapes → checks/jsxShapes.txt"
make_run "20260102-000000-2-manual" "- courierConstants → checks/courierConstants.txt"
make_run "20260103-000000-3-manual" ""   # no advisory section
# force distinct mtimes for deterministic ordering (newest = run 2's file touched last)
touch -t 202601010000 "$TMP/.harness/runs/20260101-000000-1-manual/brief.md"
touch -t 202601020000 "$TMP/.harness/runs/20260102-000000-2-manual/brief.md"
touch -t 202601030000 "$TMP/.harness/runs/20260103-000000-3-manual/brief.md"

OUT_MSG="$(bash "$ADV" "$TMP")"
contains "reports written path" "$OUT_MSG" "advisories.md"
BODY="$(cat "$TMP/.harness/advisories.md")"
contains "includes run 1 advisory" "$BODY" "jsxShapes"
contains "includes run 2 advisory" "$BODY" "courierConstants"
contains "rewrites checks/ path to run folder" "$BODY" "/.harness/runs/20260102-000000-2-manual/checks/courierConstants.txt"
# newest-first: run 3 (newest mtime) has no advisory, so run 2 heads the list before run 1
POS2="$(printf '%s' "$BODY" | grep -n "20260102-000000-2-manual" | head -1 | cut -d: -f1)"
POS1="$(printf '%s' "$BODY" | grep -n "20260101-000000-1-manual" | head -1 | cut -d: -f1)"
if [ "$POS2" -lt "$POS1" ]; then echo "  ok: newest advisory listed first"; else echo "  FAIL: ordering (pos2=$POS2 pos1=$POS1)"; FAIL=1; fi

echo "test: empty runs dir → graceful"
EMPTY="$(mktemp -d)"; mkdir -p "$EMPTY/.harness/runs"
bash "$ADV" "$EMPTY" >/dev/null
contains "empty → placeholder line" "$(cat "$EMPTY/.harness/advisories.md")" "No advisories recorded"
rm -rf "$EMPTY"

echo "test: no .harness at all → exits clean, no crash"
NORUN="$(mktemp -d)"
MSG="$(bash "$ADV" "$NORUN")"; RC=$?
check "exit 0 when no runs" "0" "$RC"
contains "says no runs" "$MSG" "no runs"
rm -rf "$NORUN"

if [ "$FAIL" = 0 ]; then echo "advisories.sh: all tests passed"; else echo "advisories.sh: FAILURES"; exit 1; fi
