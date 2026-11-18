import {
  addedLines,
  type AddedLine
} from "features/reviews/services/added-lines/addedLines";
import { isGeneratedPath } from "features/reviews/services/diff/prepareDiff";
import {
  ruleFinding,
  type Finding
} from "features/reviews/services/findings/parseFindings";
import { plural } from "features/reviews/services/plural/plural";
import { compileCheck } from "shared/services/static-check/compileCheck";
import type { Rule, StoredCheck } from "shared/types/rule";

type CheckedRule = Rule & { check: StoredCheck };

/** Only an approved check replaces the model's judgement (spec R5, R6). */
export const hasApprovedCheck = (rule: Rule): rule is CheckedRule =>
  rule.check?.approved === true;

const PASS_REASON = "No added line matches the check.";

const failReason = (count: number, pattern: string) =>
  `Matches \`${pattern}\` on ${plural(count, "added line")}.`;

function checkRule(rule: CheckedRule, lines: AddedLine[]): Finding {
  const base = { ...ruleFinding(rule), source: "checked" as const };
  const result = compileCheck(rule.check);
  if (!result.ok)
    return {
      ...base,
      verdict: "unclear",
      reason: `The check is not valid. ${result.reason}`
    };
  const { path, line } = result.compiled;
  const hits = lines.filter((l) => path.test(l.path) && line.test(l.text));
  if (hits.length === 0)
    return { ...base, verdict: "pass", reason: PASS_REASON };
  const [first] = hits;
  return {
    ...base,
    verdict: "fail",
    file: `${first.path}:${first.line}`,
    reason: failReason(hits.length, rule.check.pattern)
  };
}

/**
 * Runs each approved check on every added line of the whole diff, with no model (spec V8).
 * Generated files are skipped, as they are for the model.
 */
export function runStaticChecks(diff: string, rules: Rule[]): Finding[] {
  const lines = addedLines(diff).filter((l) => !isGeneratedPath(l.path));
  return rules.filter(hasApprovedCheck).map((rule) => checkRule(rule, lines));
}
