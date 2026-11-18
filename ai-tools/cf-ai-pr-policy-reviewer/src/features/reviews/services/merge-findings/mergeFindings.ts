import type { Finding } from "features/reviews/services/findings/parseFindings";

/** One list in rule order: checked findings as they are, model findings tagged "judged". */
export const mergeFindings = (
  checked: Finding[],
  judged: Finding[]
): Finding[] =>
  [
    ...checked,
    ...judged.map((f): Finding => ({ ...f, source: "judged" }))
  ].sort((a, b) => a.ruleId - b.ruleId);
