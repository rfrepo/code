import { fail } from "shared/services/result/result";
import type { Result } from "shared/types/result";
import type { Rule } from "shared/types/rule";

export const MAX_RULE_LENGTH = 300;
// Every judged rule goes into one prompt, and Llama 3.3 has a 24k-token context.
const MAX_RULES = 25;

export type RuleCheck = Result<{ text: string }>;

const normalise = (text: string) => text.trim().replace(/\s+/g, " ");
const comparable = (text: string) => normalise(text).toLowerCase();

export function checkNewRule(text: string, existing: Rule[]): RuleCheck {
  const cleaned = normalise(text);
  if (!cleaned) return fail("The rule is empty.");
  if (cleaned.length > MAX_RULE_LENGTH)
    return fail(`A rule can be at most ${MAX_RULE_LENGTH} characters.`);
  if (existing.length >= MAX_RULES)
    return fail(`You can have at most ${MAX_RULES} rules. Remove one first.`);
  const duplicate = existing.find(
    (rule) => comparable(rule.text) === comparable(cleaned)
  );
  if (duplicate)
    return fail(`That rule already exists as rule ${duplicate.id}.`);
  return { ok: true, text: cleaned };
}
