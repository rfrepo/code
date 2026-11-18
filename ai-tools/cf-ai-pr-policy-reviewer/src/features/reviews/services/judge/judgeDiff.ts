import {
  parseFindings,
  type ParsedFindings
} from "features/reviews/services/findings/parseFindings";
import {
  buildRepairPrompt,
  buildReviewPrompt
} from "features/reviews/services/review-prompt/reviewPrompt";
import type { CompleteText } from "shared/services/workers-ai/llama";
import type { Rule } from "shared/types/rule";

export type JudgeInput = { title: string; diff: string; rules: Rule[] };

/**
 * Asks the model for one verdict per rule. A reply that is not valid JSON, or answers no rule,
 * gets one reshape-only repair call; whatever is still missing is "unclear" (spec V6).
 * The repair pass follows parseOrRepair in agent-harness (src/agents/reviewers/review-output.ts).
 */
export async function judgeDiff(
  input: JudgeInput,
  complete: CompleteText
): Promise<ParsedFindings> {
  if (input.rules.length === 0) return { parsed: true, findings: [] };
  const reply = await complete(buildReviewPrompt(input));
  const first = parseFindings(reply, input.rules);
  if (first.parsed) return first;
  const repaired = await complete(buildRepairPrompt(reply, input.rules));
  return parseFindings(repaired, input.rules);
}
