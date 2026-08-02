/**
 * Verifies boundaries.config.mjs against the fixture project in
 * eslint/__fixtures__/boundaries. Run: node eslint/__tests__/boundaries.config.test.mjs
 *
 * Expects exactly two violations:
 *   shared/leakyImport.js                 shared → feature
 *   features/checkout/checkoutSummary.js  feature → other feature
 * and zero findings for feature → shared, feature → self, app → anything.
 */
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildBoundariesConfig } from '../boundaries.config.mjs';

const require = createRequire(import.meta.url);
try {
  require('eslint-plugin-boundaries');
} catch {
  console.log('boundaries.config: SKIPPED — eslint-plugin-boundaries not installed');
  process.exit(0);
}

const { ESLint } = await import('eslint');

const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'boundaries');
const RULE = 'boundaries/element-types';

const config = buildBoundariesConfig({ severity: 'error' });
assert.ok(config.length > 0, 'config should not be a no-op when the plugin is installed');

const eslint = new ESLint({
  cwd: FIXTURES,
  overrideConfigFile: true,
  overrideConfig: [
    { files: ['**/*.js'], languageOptions: { ecmaVersion: 2022, sourceType: 'module' } },
    ...config,
  ],
});

const results = await eslint.lintFiles(['src/**/*.js']);

const violations = results
  .flatMap((result) =>
    result.messages
      .filter((message) => message.ruleId === RULE)
      .map((message) => relative(FIXTURES, result.filePath).replace(/\\/g, '/')),
  )
  .sort();

assert.deepEqual(violations, [
  'src/features/checkout/checkoutSummary.js',
  'src/shared/leakyImport.js',
]);

const disabled = buildBoundariesConfig({ enabled: false });
assert.deepEqual(disabled, [], 'enabled:false should produce a no-op config');

console.log('boundaries.config: all tests passed');
