#!/usr/bin/env bash
# advisories.sh — roll up non-blocking advisory findings from every per-run
# brief.md into one standing list: .harness/advisories.md.
#
# Each gate run writes .harness/runs/<ts>/brief.md with an optional "## advisory"
# section (the report-severity checks that fired without blocking). Those are
# scattered one-folder-per-run and pruned after retainDays. This gathers the
# live ones into a single newest-first file so taste findings are visible at a
# glance instead of buried per run.
#
# Read-only over runs. Safe to run anytime. Never fails the caller.
set -uo pipefail

CONFIG_DIR="${1:-$PWD}"
RUNS_DIR="$CONFIG_DIR/.harness/runs"
OUT="$CONFIG_DIR/.harness/advisories.md"

[ -d "$RUNS_DIR" ] || { echo "advisories: no runs at $RUNS_DIR"; exit 0; }

{
  echo "# Advisory findings (non-blocking)"
  echo
  echo "Rolled up from .harness/runs/*/brief.md — taste/report-level nudges that"
  echo "never blocked a run. Regenerate: scripts/advisories.sh"
  echo

  found=0
  # Newest run first (by mtime).
  while IFS= read -r brief; do
    [ -n "$brief" ] || continue
    run_dir="$(dirname "$brief")"
    # Everything under "## advisory" up to the next "## " header (or EOF).
    section="$(awk '/^## advisory/{f=1;next} /^## /{f=0} f' "$brief" 2>/dev/null)"
    [ -n "$section" ] || continue
    found=1
    echo "## $(basename "$run_dir")"
    # Point the "checks/x.txt" detail references at the actual run folder.
    printf '%s\n\n' "$section" | sed "s#checks/#$run_dir/checks/#g"
  done < <(ls -1dt "$RUNS_DIR"/*/brief.md 2>/dev/null)

  [ "$found" = 0 ] && echo "_No advisories recorded._"
} > "$OUT" 2>/dev/null || { echo "advisories: could not write $OUT"; exit 0; }

echo "advisories: wrote $OUT"
