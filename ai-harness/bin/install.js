#!/usr/bin/env node
// npx entrypoint — thin shim over install.sh. Target defaults to the
// directory npx was invoked from, so `npx quality-enforcement-harness` from a
// project root needs no arguments.
const { spawnSync } = require('child_process');
const path = require('path');

if (process.platform === 'win32') {
  console.error('quality-harness: the installer is bash-only — run it from WSL or Git Bash.');
  process.exit(1);
}

const installSh = path.join(__dirname, '..', 'install.sh');
const args = process.argv.slice(2);
if (args.length === 0) args.push(process.cwd());

const result = spawnSync('bash', [installSh, ...args], { stdio: 'inherit' });
process.exit(result.status ?? 1);
