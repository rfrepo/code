import { checkNewRule } from "features/rules/services/rule-check/ruleCheck";
import type { Result } from "shared/types/result";
import type { Rule, StaticCheck } from "shared/types/rule";
import type { Sql } from "shared/types/sql";

export type AddRuleResult = Result<{ rule: Rule }>;

export type RuleStore = {
  list: () => Rule[];
  add: (text: string) => AddRuleResult;
  remove: (id: number) => boolean;
  proposeCheck: (id: number, check: StaticCheck) => boolean;
  approveCheck: (id: number) => boolean;
  dropCheck: (id: number) => boolean;
};

type RuleRow = {
  id: number;
  text: string;
  paths: string | null;
  pattern: string | null;
  approved: number;
};

const toRule = ({ id, text, paths, pattern, approved }: RuleRow): Rule =>
  paths && pattern
    ? { id, text, check: { paths, pattern, approved: approved === 1 } }
    : { id, text };

// Every write ends in RETURNING id, so a row back means the rule existed and changed.
const changed = (rows: unknown[]) => rows.length > 0;

/** The team's rules and their checks, kept in the Agent's SQLite so they survive reloads (spec R2, R5, R6). */
export function createRuleStore(sql: Sql): RuleStore {
  sql`CREATE TABLE IF NOT EXISTS rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    check_paths TEXT,
    check_pattern TEXT,
    check_approved INTEGER NOT NULL DEFAULT 0
  )`;

  const list = () =>
    sql<RuleRow>`SELECT id, text, check_paths AS paths, check_pattern AS pattern,
      check_approved AS approved FROM rules ORDER BY id`.map(toRule);

  const add = (text: string): AddRuleResult => {
    const check = checkNewRule(text, list());
    if (!check.ok) return check;
    const [rule] =
      sql<Rule>`INSERT INTO rules (text) VALUES (${check.text}) RETURNING id, text`;
    return { ok: true, rule };
  };

  const remove = (id: number) =>
    changed(sql`DELETE FROM rules WHERE id = ${id} RETURNING id`);

  const proposeCheck = (id: number, { paths, pattern }: StaticCheck) =>
    changed(sql`UPDATE rules SET check_paths = ${paths}, check_pattern = ${pattern},
      check_approved = 0 WHERE id = ${id} RETURNING id`);

  const approveCheck = (id: number) =>
    changed(sql`UPDATE rules SET check_approved = 1
      WHERE id = ${id} AND check_pattern IS NOT NULL RETURNING id`);

  const dropCheck = (id: number) =>
    changed(sql`UPDATE rules SET check_paths = NULL, check_pattern = NULL, check_approved = 0
      WHERE id = ${id} AND check_pattern IS NOT NULL RETURNING id`);

  return { list, add, remove, proposeCheck, approveCheck, dropCheck };
}
