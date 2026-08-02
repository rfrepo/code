import { RuleTester } from 'eslint';
import rule from '../no-courier-constants.mjs';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

ruleTester.run('no-courier-constants', rule, {
  valid: [
    {
      name: 'map read in the component own logic (not JSX)',
      code: `
        const TONE = { ok: 'green', bad: 'red' }
        const Page = ({ status }) => {
          const tone = TONE[status]
          return <Chip tone={tone} />
        }
      `,
    },
    {
      name: 'map feeding two different children',
      code: `
        const TONE = { ok: 'green', bad: 'red' }
        const Page = ({ status }) => (
          <>
            <Header tone={TONE[status]} />
            <Footer tone={TONE[status]} />
          </>
        )
      `,
    },
    {
      name: 'map feeding a host element attribute is usage',
      code: `
        const CLASS = { ok: 'a', bad: 'b' }
        const Badge = ({ status }) => <span className={CLASS[status]} />
      `,
    },
    {
      name: 'single-entry object is not a map',
      code: `
        const ONLY = { ok: 'green' }
        const Page = ({ status }) => <Chip tone={ONLY[status]} />
      `,
    },
    {
      name: 'map colocated with its consumer (already correct)',
      code: `
        const TONE = { ok: 'green', bad: 'red' }
        const LABEL = { ok: 'OK', bad: 'Bad' }
        const PublicationStatusChip = ({ status }) => (
          <StatusChip tone={TONE[status]}>{LABEL[status]}</StatusChip>
        )
      `,
    },
    {
      name: 'suppressed with hoisted comment',
      code: `
        // hoisted: shared across sibling tables
        const TONE = { ok: 'green', bad: 'red' }
        const Page = ({ status }) => <StatusChip tone={TONE[status]} />
      `,
    },
    {
      name: 'whole-object pass is out of scope (courier-hooks territory, not a lookup)',
      code: `
        const CONFIG = { a: 1, b: 2 }
        const Page = () => <Child config={CONFIG} />
      `,
    },
  ],
  invalid: [
    {
      name: 'two maps feeding one child, one via attribute + one via children (AdvertisementPage shape)',
      code: `
        const PUBLICATION_TONE = { published: 'ok', stale: 'warn' }
        const PUBLICATION_LABEL = { published: 'Published', stale: 'Stale' }
        const AdvertisementPage = ({ status }) => (
          <AdvertisementHeader
            status={
              <StatusChip tone={PUBLICATION_TONE[status]}>
                {PUBLICATION_LABEL[status]}
              </StatusChip>
            }
          />
        )
      `,
      errors: [{ messageId: 'courier' }, { messageId: 'courier' }],
    },
    {
      name: 'single lookup map feeding one child attribute',
      code: `
        const RELAY_TONE = { online: 'ok', offline: 'bad' }
        const RelaysTable = ({ rows }) => (
          <Table>
            {rows.map((row) => (
              <StatusChip key={row.id} tone={RELAY_TONE[row.status]}>{row.status}</StatusChip>
            ))}
          </Table>
        )
      `,
      errors: [{ messageId: 'courier' }],
    },
  ],
});

console.log('no-courier-constants: all tests passed');
