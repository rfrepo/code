import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import assert from 'node:assert';

const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, '..', 'jsx-shape-dupes.mjs');
const fixtures = join(here, '..', '__fixtures__', 'shape-dupes');

const output = execFileSync('node', [script, fixtures], { encoding: 'utf8' });

assert.match(output, /Repeated layout/, 'expected a repeated-layout finding');
assert.match(output, /PageOne\.tsx/, 'expected PageOne in findings');
assert.match(output, /PageTwo\.tsx/, 'expected PageTwo in findings');
assert.match(output, /PageThree\.tsx/, 'expected PageThree in findings');
assert.doesNotMatch(output, /Unrelated\.tsx/, 'Unrelated must not be flagged');
assert.match(output, /\*/, 'expected one-wildcard signature (varying middle element)');

// --fail exits 1 on findings
let failed = false;
try {
  execFileSync('node', [script, '--fail', fixtures], { encoding: 'utf8' });
} catch {
  failed = true;
}
assert.ok(failed, '--fail should exit non-zero on findings');

console.log('jsx-shape-dupes: all fixture tests passed');
