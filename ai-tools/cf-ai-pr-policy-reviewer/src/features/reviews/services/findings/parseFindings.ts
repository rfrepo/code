import { z } from "zod";
import { extractJsonObject } from "shared/services/json/extractJsonObject";
import type { Rule } from "shared/types/rule";

export type Verdict = "pass" | "fail" | "unclear";
/** "checked": an approved static check decided it. "judged": the model decided it. */
export type FindingSource = "checked" | "judged";
export type Finding = {
  ruleId: number;
  rule: string;
  verdict: Verdict;
  file?: string;
  reason: string;
  source?: FindingSource;
};
export type ParsedFindings = { parsed: boolean; findings: Finding[] };

/** The part of a finding that names its rule. Every finding starts from it. */
export const ruleFinding = (rule: Rule) => ({
  ruleId: rule.id,
  rule: rule.text
});

const NO_ANSWER = "The model did not answer for this rule.";
// The report gives each rule one line, so a reason is one short line.
const MAX_REASON_CHARS = 300;
const ELLIPSIS = "...";
// On a conflict for one rule, the less trusting verdict wins (fail closed).
const VERDICT_RANK: Record<Verdict, number> = { pass: 0, unclear: 1, fail: 2 };

const oneLine = (text: string) => text.replace(/\s+/g, " ").trim();
const capped = (text: string) =>
  text.length <= MAX_REASON_CHARS
    ? text
    : `${text.slice(0, MAX_REASON_CHARS - ELLIPSIS.length)}${ELLIPSIS}`;
const lowerCase = (value: unknown) =>
  typeof value === "string" ? value.toLowerCase() : value;

// Models often write the id as "1" and the verdict as "PASS". Both are clear, so both are read.
const modelFinding = z.object({
  ruleId: z.union([
    z.number().int(),
    z.string().regex(/^\d+$/).transform(Number)
  ]),
  verdict: z.preprocess(lowerCase, z.enum(["pass", "fail", "unclear"])),
  file: z.string().transform(oneLine).nullish(),
  reason: z.string().transform((text) => capped(oneLine(text)))
});
type ModelFinding = z.infer<typeof modelFinding>;

// The contract asks for { findings: [...] }. A bare array is the same answer.
const findingList = z.union([
  z.object({ findings: z.array(z.unknown()) }).transform((o) => o.findings),
  z.array(z.unknown())
]);

const outranks = (next: ModelFinding, current?: ModelFinding) =>
  !current || VERDICT_RANK[next.verdict] > VERDICT_RANK[current.verdict];

/** Valid findings by rule id. A bad item is skipped, not fatal, so one slip keeps the rest. */
function readModelFindings(raw: string): Map<number, ModelFinding> | null {
  const list = findingList.safeParse(extractJsonObject(raw));
  if (!list.success) return null;
  const byRule = new Map<number, ModelFinding>();
  for (const item of list.data) {
    const finding = modelFinding.safeParse(item);
    if (
      finding.success &&
      outranks(finding.data, byRule.get(finding.data.ruleId))
    )
      byRule.set(finding.data.ruleId, finding.data);
  }
  return byRule;
}

// A reply that answers none of the rules is a format slip worth one repair call.
const answersAny = (byRule: Map<number, ModelFinding> | null, rules: Rule[]) =>
  byRule !== null &&
  (rules.length === 0 || rules.some((rule) => byRule.has(rule.id)));

/** One finding per rule, in rule order. A rule the model did not answer is "unclear", never a pass. */
export function parseFindings(raw: string, rules: Rule[]): ParsedFindings {
  const byRule = readModelFindings(raw);
  const findings = rules.map((rule): Finding => {
    const answer = byRule?.get(rule.id);
    if (!answer)
      return { ...ruleFinding(rule), verdict: "unclear", reason: NO_ANSWER };
    const base = {
      ...ruleFinding(rule),
      verdict: answer.verdict,
      reason: answer.reason
    };
    return answer.file ? { ...base, file: answer.file } : base;
  });
  return { parsed: answersAny(byRule, rules), findings };
}
