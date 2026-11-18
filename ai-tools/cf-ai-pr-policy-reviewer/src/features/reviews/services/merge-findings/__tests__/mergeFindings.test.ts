import { describe, expect, it } from "vitest";
import { mergeFindings } from "features/reviews/services/merge-findings/mergeFindings";

describe("mergeFindings", () => {
  it("should sort by rule and tag model findings as judged", () => {
    const checked = [
      {
        ruleId: 2,
        rule: "B",
        verdict: "pass" as const,
        reason: "r",
        source: "checked" as const
      }
    ];
    const judged = [
      { ruleId: 3, rule: "C", verdict: "fail" as const, reason: "r" },
      { ruleId: 1, rule: "A", verdict: "unclear" as const, reason: "r" }
    ];
    expect(
      mergeFindings(checked, judged).map((f) => [f.ruleId, f.source])
    ).toEqual([
      [1, "judged"],
      [2, "checked"],
      [3, "judged"]
    ]);
  });
});
