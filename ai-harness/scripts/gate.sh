#!/usr/bin/env bash
# gate.sh — THE quality gate. One script, three entry points:
#   Claude hooks (pre-commit + Stop) · lefthook git pre-commit · CI.
#
# Usage:
#   gate.sh --staged           # staged files (git pre-commit, Claude commit hook)
#   gate.sh --changed <base>   # diff vs base ref (Stop hook, CI on PRs)
#   gate.sh --all [--e2e]      # full sweep (CI main, on demand)
#
# Severity per check comes from harness.config.json → checks:
#   block | block-new | report | off
# Exit 2 on any blocking failure, with actionable stderr.
set -uo pipefail

MODE="${1:---staged}"
BASE="${2:-}"
START_CWD="$(pwd)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

find_harness_config() {
  local start="$1" dir
  if [ -f "$start" ]; then dir="$(cd "$(dirname "$start")" && pwd)"
  elif [ -d "$start" ]; then dir="$(cd "$start" && pwd)"
  else dir="$(cd "$(dirname "$start")" 2>/dev/null && pwd || echo "$START_CWD")"
  fi
  while [ -n "$dir" ] && [ "$dir" != "/" ]; do
    if [ -f "$dir/harness.config.json" ]; then
      echo "$dir/harness.config.json"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

run_with_timeout() {
  if command -v timeout >/dev/null 2>&1; then
    timeout 300 "$@"
  else
    "$@"
  fi
}

case "$MODE" in
  --staged)  FILES=$(git diff --cached --name-only --diff-filter=ACMR) ;;
  --changed) FILES=$(git diff --name-only --diff-filter=ACMR "${BASE:-origin/main}"...HEAD 2>/dev/null; git diff --name-only --diff-filter=ACMR; git diff --cached --name-only --diff-filter=ACMR) ;;
  --all)     FILES=$(git ls-files) ;;
  *) echo "usage: gate.sh --staged | --changed <base> | --all [--e2e]" >&2; exit 1 ;;
esac
FILES=$(echo "$FILES" | sort -u | grep -Ev '^$' || true)
CODE_FILES=$(echo "$FILES" | grep -E '\.(ts|tsx|js|jsx|mjs)$' | grep -v node_modules || true)
SRC_FILES=$(echo "$CODE_FILES" | grep -Ev '\.(test|spec|e2e)\.' | grep -Ev '(^|/)(e2e|__mocks__|__fixtures__)/' || true)
TEST_FILES=$(echo "$CODE_FILES" | grep -E '(\.(test|spec|e2e)\.|(^|/)e2e/)' || true)

[ -z "$CODE_FILES" ] && { echo "gate: no code files in scope — pass."; exit 0; }

SEED_FILE=$(echo "$CODE_FILES" | head -1)
if [ -n "$SEED_FILE" ] && [ -e "$SEED_FILE" ]; then
  CONFIG_PATH="$(find_harness_config "$SEED_FILE")" || true
else
  CONFIG_PATH="$(find_harness_config "$START_CWD")" || true
fi
if [ -z "${CONFIG_PATH:-}" ]; then
  echo "gate: no harness.config.json found walking up from changed files — fail closed." >&2
  exit 2
fi
CONFIG_DIR="$(dirname "$CONFIG_PATH")"
CONFIG="$CONFIG_PATH"
GIT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

rebase_paths() {
  local out="" f abs
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if [ -e "$f" ]; then abs="$(cd "$(dirname "$f")" && pwd)/$(basename "$f")"
    else abs="$GIT_ROOT/$f"
    fi
    out+="${abs#"$CONFIG_DIR"/}"$'\n'
  done <<< "$1"
  echo "$out" | grep -Ev '^$' || true
}

CODE_FILES=$(rebase_paths "$CODE_FILES")
SRC_FILES=$(rebase_paths "$SRC_FILES")
TEST_FILES=$(rebase_paths "$TEST_FILES")
cd "$CONFIG_DIR"

# Read config ONCE (one node startup instead of one per check — node startup
# dominates: ~17 spawns ≈ 1s+ of pure overhead otherwise). Tab-separated
# key/value table; unparseable config → empty table → every check 'off',
# matching the previous per-call catch{} behavior.
CFG_TABLE="$(node -e '
const c = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
for (const [k, v] of Object.entries(c.checks || {})) console.log("check:" + k + "\t" + v);
console.log("testCommand\t" + (c.testCommand || ""));
console.log("e2eCommand\t" + (c.e2eCommand || ""));
console.log("loggingEnabled\t" + ((c.logging && c.logging.enabled) === false ? "false" : "true"));
console.log("retainDays\t" + ((c.logging && c.logging.retainDays) || 30));
' "$CONFIG" 2>/dev/null || true)"
cfg() { printf '%s\n' "$CFG_TABLE" | awk -F'\t' -v k="$1" '$1==k{print $2; exit}'; }
severity() { local v; v="$(cfg "check:$1")"; echo "${v:-off}"; }
config_value() { cfg "$1"; }
logging_enabled() { [ "$(cfg loggingEnabled)" != "false" ] && echo true || echo false; }

# Run logging (observability only — every step swallows errors, never alters
# the gate's exit code or stderr).
ENTRY="${HARNESS_ENTRY:-manual}"
RUN_DIR=""
CHECK_LOG=()
if [ "$(logging_enabled)" = "true" ]; then
  RUN_DIR="$CONFIG_DIR/.harness/runs/$(date +%Y%m%d-%H%M%S)-$$-$ENTRY"
  mkdir -p "$RUN_DIR/checks" 2>/dev/null || RUN_DIR=""
fi

finish_run_log() {
  local BLOCKED="$1"
  [ -n "$RUN_DIR" ] || return 0
  {
    local CHECKS_JSON="" BRIEF_FAIL="" BRIEF_REPORT="" pair name status
    for pair in ${CHECK_LOG[@]+"${CHECK_LOG[@]}"}; do
      name="${pair%%=*}"; status="${pair#*=}"
      CHECKS_JSON+="\"$name\":\"$status\","
      [ "$status" = "fail" ] && BRIEF_FAIL+="- $name → checks/$name.txt"$'\n'
      [ "$status" = "report" ] && BRIEF_REPORT+="- $name → checks/$name.txt"$'\n'
    done
    CHECKS_JSON="{${CHECKS_JSON%,}}"
    local FILE_COUNT TS RESULT
    FILE_COUNT=$(echo "$CODE_FILES" | grep -c . || true)
    TS="$(date +%Y-%m-%dT%H:%M:%S)"
    RESULT=$(printf '{"ts":"%s","type":"gate","entry":"%s","mode":"%s","blocked":%s,"files":%s,"duration_s":%s,"checks":%s,"transcript":"%s"}' \
      "$TS" "$ENTRY" "$MODE" "$BLOCKED" "${FILE_COUNT:-0}" "$SECONDS" "$CHECKS_JSON" "${HARNESS_TRANSCRIPT:-}")
    printf '%s\n' "$RESULT" > "$RUN_DIR/result.json"
    {
      if [ "$BLOCKED" = "true" ]; then echo "# gate run — BLOCKED"; else echo "# gate run — passed"; fi
      echo
      echo "- when: $TS · entry: $ENTRY · mode: $MODE · files: ${FILE_COUNT:-0} · ${SECONDS}s"
      [ -n "${HARNESS_TRANSCRIPT:-}" ] && echo "- session transcript: ${HARNESS_TRANSCRIPT}"
      if [ -n "$BRIEF_FAIL" ]; then echo; echo "## failed"; printf '%s' "$BRIEF_FAIL"; fi
      if [ -n "$BRIEF_REPORT" ]; then echo; echo "## advisory"; printf '%s' "$BRIEF_REPORT"; fi
    } > "$RUN_DIR/brief.md"
    printf '%s' "$RESULT" | bash "$SCRIPT_DIR/harness-log.sh" "$CONFIG_DIR"
    local RETAIN
    RETAIN="$(cfg retainDays)"; RETAIN="${RETAIN:-30}"
    find "$CONFIG_DIR/.harness/runs" -mindepth 1 -maxdepth 1 -mtime +"$RETAIN" -exec rm -rf {} + 2>/dev/null
  } 2>/dev/null || true
  return 0
}

FAILURES=()
REPORTS=()

run_check() {
  local NAME="$1"; shift
  local LEVEL; LEVEL="$(severity "$NAME")"
  [ "$LEVEL" = "off" ] && return 0
  local OUTPUT
  if OUTPUT=$(run_with_timeout "$@" 2>&1); then
    CHECK_LOG+=("$NAME=pass")
    return 0
  fi
  if [ "$LEVEL" = "report" ]; then
    CHECK_LOG+=("$NAME=report")
    REPORTS+=("[$NAME]"$'\n'"$OUTPUT")
  else
    CHECK_LOG+=("$NAME=fail")
    FAILURES+=("[$NAME]"$'\n'"$OUTPUT")
  fi
  [ -n "$RUN_DIR" ] && printf '%s\n' "$OUTPUT" > "$RUN_DIR/checks/$NAME.txt" 2>/dev/null
  return 0
}

check_filenames() {
  local BAD=0 OUT=""
  while IFS= read -r FILE; do
    [ -z "$FILE" ] && continue
    if ! MSG=$(bash "$SCRIPT_DIR/check-filename.sh" "$FILE" 2>&1); then OUT+="$MSG"$'\n'; BAD=1; fi
  done <<< "$CODE_FILES"
  [ $BAD -eq 0 ] || { echo "$OUT"; return 1; }
}

check_eslint() {
  mkdir -p node_modules/.cache 2>/dev/null || true
  # shellcheck disable=SC2086
  npx --no-install eslint --cache --cache-location node_modules/.cache/harness-eslint $CODE_FILES --no-error-on-unmatched-pattern || {
    echo "→ Fix the lint errors above; rules trace to docs/clean-code.md."; return 1; }
}

check_dispatch_grep() {
  local HITS
  # shellcheck disable=SC2086
  HITS=$(grep -Hn "Dispatch<SetStateAction" $SRC_FILES 2>/dev/null || true)
  [ -z "$HITS" ] || { echo "$HITS"; echo "→ Setter type crossing a boundary — expose onChange/onCommit instead (docs/clean-code.md §2)."; return 1; }
}

check_tests_accompany() {
  [ "${SKIP_TESTS_CHECK:-0}" = "1" ] && return 0
  [ -z "$SRC_FILES" ] && return 0
  [ -n "$TEST_FILES" ] || {
    echo "Source files changed with no test changes:"; echo "$SRC_FILES" | sed 's/^/  /'
    echo "→ Tests accompany code (docs/clean-code.md §8). Add/adjust tests, or SKIP_TESTS_CHECK=1 for genuine no-behavior changes (renames, comments)."; return 1; }
}

check_related_tests() {
  local CMD; CMD="$(config_value testCommand)"
  [ -z "$CMD" ] || [ -z "$SRC_FILES" ] && return 0
  # shellcheck disable=SC2086
  $CMD $SRC_FILES || { echo "→ Related tests failing — fix before proceeding."; return 1; }
}

check_duplication() {
  if npx --no-install fallow --version >/dev/null 2>&1; then
    npx --no-install fallow audit --format json || { echo "→ New duplication vs baseline. Extract (rule of three) or justify + refresh baseline: npx fallow dupes --save-baseline"; return 1; }
  elif npx --no-install jscpd --version >/dev/null 2>&1; then
    npx --no-install jscpd src --min-tokens 50 --exitCode 1 --silent || { echo "→ Duplication detected (jscpd). Extract or justify (docs/clean-code.md §4)."; return 1; }
  else
    echo "duplication: fallow/jscpd not installed — skipped." >&2
  fi
}

check_shapes() { node "$SCRIPT_DIR/jsx-shape-dupes.mjs" --fail src app 2>/dev/null; }
check_knip() {
  npx --no-install knip --version >/dev/null 2>&1 || { echo "knip not installed — skipped." >&2; return 0; }
  npx --no-install knip
}
check_gitleaks() {
  command -v gitleaks >/dev/null 2>&1 || { echo "gitleaks not installed — skipped." >&2; return 0; }
  if [ "$MODE" = "--staged" ]; then gitleaks protect --staged --no-banner; else gitleaks detect --no-banner; fi
}
check_semgrep() {
  command -v semgrep >/dev/null 2>&1 || { echo "semgrep not installed — skipped." >&2; return 0; }
  # Prefer a committed ruleset (fast, deterministic, offline) over registry 'auto'.
  local SG_CONFIG="auto"
  [ -f .semgrep.yml ] && SG_CONFIG=".semgrep.yml"
  # shellcheck disable=SC2086
  semgrep scan --config "$SG_CONFIG" --error --quiet $CODE_FILES
}
check_ratchet() { node "$SCRIPT_DIR/ratchet.mjs" check; }

check_boundaries() {
  if node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts['lint:boundaries']?0:1)" 2>/dev/null; then
    npm run -s lint:boundaries || { echo "→ Boundary lint failed."; return 1; }
  else
    echo "boundaries: lint:boundaries script missing — skipped." >&2
  fi
}

check_compiler() {
  if node -e "const p=require('./package.json'); process.exit(p.scripts&&p.scripts['lint:compiler']?0:1)" 2>/dev/null; then
    npm run -s lint:compiler || { echo "→ Compiler lint failed."; return 1; }
  else
    echo "compiler: lint:compiler script missing — skipped." >&2
  fi
}

run_check filename check_filenames
run_check eslint check_eslint
run_check dispatchPropGrep check_dispatch_grep
run_check testsAccompanyCode check_tests_accompany
run_check relatedTests check_related_tests
run_check duplication check_duplication
run_check jsxShapes check_shapes
run_check knip check_knip
run_check gitleaks check_gitleaks
run_check semgrep check_semgrep
run_check ratchet check_ratchet
run_check boundaries check_boundaries
run_check compiler check_compiler

if [[ "${*}" == *"--e2e"* ]]; then
  E2E_CMD="$(config_value e2eCommand)"
  [ -n "$E2E_CMD" ] && run_check e2e $E2E_CMD
fi

if [ ${#REPORTS[@]} -gt 0 ]; then
  echo "" >&2; echo "── gate: advisory findings (non-blocking) ──" >&2
  printf '%s\n\n' "${REPORTS[@]}" >&2
fi

if [ ${#FAILURES[@]} -gt 0 ]; then
  echo "" >&2; echo "── gate: BLOCKED — fix the following ──" >&2
  printf '%s\n\n' "${FAILURES[@]}" >&2
  finish_run_log true
  exit 2
fi

finish_run_log false
echo "gate: all checks passed."
