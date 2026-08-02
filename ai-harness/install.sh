#!/usr/bin/env bash
# install.sh — installs the quality harness into a target project.
# MERGES into existing config; never clobbers. Backs up anything it touches.
#
# Usage: ./install.sh [/path/to/project]   (default: current directory)
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET="${1:-$(pwd)}"
TARGET="$(cd "$TARGET" && pwd)"
cd "$TARGET"

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
ask() { read -r -p "$1 [y/N] " REPLY; [[ "$REPLY" =~ ^[Yy] ]]; }
backup() { [ -f "$1" ] && cp "$1" "$1.harness-backup.$(date +%s)" && echo "  backed up $1"; }

say "Quality harness installer → $TARGET"
[ -d .git ] || { echo "Not a git repo — run from a project root."; exit 1; }
[ -f package.json ] || { echo "No package.json — frontend harness needs a node project."; exit 1; }

# ---- 1. Core files -----------------------------------------------------------
say "1/8 Core files (docs, config, scripts, eslint rules)"
mkdir -p docs scripts eslint/rules .claude/hooks .claude/agents .claude/skills
cp -n "$HARNESS_DIR/docs/clean-code.md" docs/ 2>/dev/null || echo "  docs/clean-code.md exists — left alone"
if [ -f harness.config.json ]; then
  backup harness.config.json
  # Merge NEW template keys into the existing config; user-tuned values always
  # win (only missing keys are added, recursively). Reviewers are matched by
  # name so new template reviewers appear without duplicating existing ones.
  node -e "
    const fs = require('fs');
    const existing = JSON.parse(fs.readFileSync('harness.config.json', 'utf8'));
    const template = JSON.parse(fs.readFileSync('$HARNESS_DIR/harness.config.json', 'utf8'));
    const added = [];
    const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
    const merge = (dst, src, path) => {
      for (const [key, value] of Object.entries(src)) {
        const here = path ? path + '.' + key : key;
        if (!(key in dst)) { dst[key] = value; if (!key.startsWith('\$')) added.push(here); }
        else if (isObj(dst[key]) && isObj(value)) merge(dst[key], value, here);
      }
    };
    merge(existing, template, '');
    if (Array.isArray(existing.reviewers) && Array.isArray(template.reviewers)) {
      const names = new Set(existing.reviewers.map((r) => r.name));
      for (const r of template.reviewers) {
        if (!names.has(r.name)) { existing.reviewers.push(r); added.push('reviewers[' + r.name + ']'); }
      }
    }
    fs.writeFileSync('harness.config.json', JSON.stringify(existing, null, 2) + '\n');
    console.log(added.length ? '  harness.config.json: added ' + added.join(', ') : '  harness.config.json: already up to date');
  "
else
  cp "$HARNESS_DIR/harness.config.json" .
fi
cp "$HARNESS_DIR/scripts/"*.{sh,mjs} scripts/
cp -R "$HARNESS_DIR/eslint/rules" eslint/
cp "$HARNESS_DIR/eslint/base.config.mjs" eslint/
cp "$HARNESS_DIR/eslint/boundaries.config.mjs" eslint/
cp "$HARNESS_DIR/hooks/"*.sh .claude/hooks/
chmod +x scripts/*.sh .claude/hooks/*.sh
if ! grep -qx '\.harness/' .gitignore 2>/dev/null; then
  printf '.harness/\n' >> .gitignore
  echo "  added .harness/ (run logs) to .gitignore"
fi

# ---- 2. Project-specific answers ----------------------------------------------
say "2/8 Project specifics"
read -r -p "Protected dirs (closed for modification, comma-separated, empty to skip): " PROTECTED
if [ -n "$PROTECTED" ]; then
  node -e "
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync('harness.config.json', 'utf8'));
    config.protectedDirs = '$PROTECTED'.split(',').map((dir) => dir.trim()).filter(Boolean);
    fs.writeFileSync('harness.config.json', JSON.stringify(config, null, 2) + '\n');
  "
fi

# ---- 3. CLAUDE.md ---------------------------------------------------------------
say "3/8 CLAUDE.md (append distillation, keep existing content)"
if [ -f CLAUDE.md ] && grep -q 'Code standards (distilled' CLAUDE.md; then
  echo "  distillation already present — skipped"
else
  backup CLAUDE.md || true
  cat "$HARNESS_DIR/CLAUDE.md.template" >> CLAUDE.md
  echo "  appended to CLAUDE.md"
fi

# ---- 4. Claude settings (hooks) — merge with jq --------------------------------
say "4/8 Claude hooks (.claude/settings.json — merged)"
if [ -f .claude/settings.json ]; then
  backup .claude/settings.json
  # Harness-owned entries (any hook command referencing a script shipped in
  # hooks/) are REPLACED with the current template so upgrades never duplicate
  # registrations; user-added hooks are untouched.
  node -e "
    const fs = require('fs');
    const existing = JSON.parse(fs.readFileSync('.claude/settings.json', 'utf8'));
    const harness = JSON.parse(fs.readFileSync('$HARNESS_DIR/templates/claude-settings.json', 'utf8'));
    const owned = fs.readdirSync('$HARNESS_DIR/hooks').filter((f) => f.endsWith('.sh'));
    const isOwned = (entry) => (entry.hooks || []).some((h) => owned.some((s) => (h.command || '').includes(s)));
    existing.hooks = existing.hooks || {};
    for (const [event, entries] of Object.entries(harness.hooks)) {
      existing.hooks[event] = [...(existing.hooks[event] || []).filter((e) => !isOwned(e)), ...entries];
    }
    for (const event of Object.keys(existing.hooks)) {
      if (event in harness.hooks) continue;
      existing.hooks[event] = existing.hooks[event].filter((e) => !isOwned(e));
      if (existing.hooks[event].length === 0) delete existing.hooks[event];
    }
    fs.writeFileSync('.claude/settings.json', JSON.stringify(existing, null, 2) + '\n');
  "
  echo "  merged hooks into existing settings.json (harness entries replaced, user entries kept)"
else
  node -e "
    const fs = require('fs');
    const harness = JSON.parse(fs.readFileSync('$HARNESS_DIR/templates/claude-settings.json', 'utf8'));
    delete harness['\$comment'];
    fs.writeFileSync('.claude/settings.json', JSON.stringify(harness, null, 2) + '\n');
  "
fi

# ---- 5. Agents + skills ----------------------------------------------------------
say "5/8 Reviewer agent + skills"
cp -n "$HARNESS_DIR/templates/agents/code-reviewer.md" .claude/agents/ 2>/dev/null || echo "  code-reviewer exists — left alone"
cp -Rn "$HARNESS_DIR/templates/skills/"* .claude/skills/ 2>/dev/null || true

# ---- 6. Dependencies -----------------------------------------------------------
say "6/8 Dev dependencies"
DEPS_CORE="eslint prettier @babel/parser lefthook @commitlint/cli @commitlint/config-conventional"
DEPS_PLUGINS="eslint-plugin-react eslint-plugin-jest eslint-plugin-playwright eslint-plugin-boundaries"
DEPS_QUALITY="knip type-coverage"
echo "  core:    $DEPS_CORE"
echo "  plugins: $DEPS_PLUGINS"
echo "  quality: $DEPS_QUALITY"
if ask "Install these dev dependencies now?"; then
  # shellcheck disable=SC2086
  npm install --save-dev $DEPS_CORE $DEPS_PLUGINS $DEPS_QUALITY
fi
if ask "Install fallow (duplication baseline; falls back to jscpd if unavailable)?"; then
  npm install --save-dev fallow || npm install --save-dev jscpd
  npx fallow dupes --save-baseline 2>/dev/null || true
  # fallow ships a version-matched Agent Skill
  npx fallow install-skill 2>/dev/null || cp -Rn node_modules/fallow/skills/* .claude/skills/ 2>/dev/null || true
fi
if ask "Install sonarjs (cognitive complexity)?"; then npm install --save-dev eslint-plugin-sonarjs; fi
if ask "Install Stryker (mutation testing, weekly CI)?"; then
  npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
  cp -n "$HARNESS_DIR/stryker.config.json" . 2>/dev/null || true
fi
if ask "Install TDD Guard (real-time TDD enforcement — off by default, toggle in harness.config.json)?"; then
  npm install --save-dev tdd-guard
  echo "  Enable: set tddGuard.enabled=true in harness.config.json, then add the tdd-guard hook per its README."
fi

# ---- 7. Git + CI wiring -----------------------------------------------------------
say "7/8 Git hooks + CI"
cp -n "$HARNESS_DIR/templates/lefthook.yml" lefthook.yml 2>/dev/null || echo "  lefthook.yml exists — merge scripts/gate.sh --staged manually"
cp -n "$HARNESS_DIR/commitlint.config.mjs" . 2>/dev/null || true
npx --no-install lefthook install 2>/dev/null || echo "  run 'npx lefthook install' after installing deps"
if ask "Copy GitHub Actions workflows (quality-gate, pr-review, mutation-weekly)?"; then
  mkdir -p .github/workflows
  cp -n "$HARNESS_DIR/ci/"*.yml .github/workflows/
fi

# ---- 8. ESLint wiring + baseline -------------------------------------------------
say "8/8 Final wiring"
if [ ! -f eslint.config.mjs ] && [ ! -f eslint.config.js ]; then
  if ls .eslintrc* >/dev/null 2>&1; then
    echo "  Legacy .eslintrc detected — migrate to flat config, then spread eslint/base.config.mjs in."
  else
    printf "import harness from './eslint/base.config.mjs'\n\nexport default [...harness]\n" > eslint.config.mjs
    echo "  created eslint.config.mjs"
  fi
else
  echo "  Flat config exists — add: import harness from './eslint/base.config.mjs' and spread ...harness"
fi
node scripts/ratchet.mjs update 2>/dev/null || echo "  ratchet baseline deferred (run after deps install)"

say "Done. Next steps:"
cat <<'NEXT'
  1. Wire ...harness into your eslint config if flagged above.
  2. Optional MCPs: Figma (visual-qa) + Playwright — claude mcp add.
  3. Matt Pocock process skills: npx skills add mattpocock/skills --skill=tdd --skill=code-review --skill=research --skill=codebase-design
  4. Verify gates (from a Claude session):
     - write a file named against convention  → expect PreToolUse block
     - add <NameField setValue={setName} />   → expect lint block
     - edit a protected dir                    → expect deny
     - run /hooks                              → confirm registration
  5. Report-only checks (jsxShapes, knip, semgrep) — promote to "block" in
     harness.config.json after a week of observation.
  6. Structure boundaries default to src/{shared,features/*,app} at severity
     "warn" — adjust paths in harness.config.json → boundaries (or
     enabled:false for repos not yet feature-sliced). Promote to "error"
     after a week, same as other new checks.
NEXT
