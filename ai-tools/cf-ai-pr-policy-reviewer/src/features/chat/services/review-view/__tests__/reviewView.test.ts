import { describe, expect, it } from "vitest";
import { reviewView } from "features/chat/services/review-view/reviewView";

const finding = (ruleId: number, verdict: "pass" | "fail" | "unclear") => ({
  ruleId,
  rule: `Rule ${ruleId}`,
  verdict,
  reason: "Because."
});

describe("reviewView", () => {
  it("should link a GitHub pull request ref to its page", () => {
    expect(
      reviewView({
        reviewId: 1,
        pr: "cloudflare/agents#100",
        title: "T",
        findings: [],
        notes: []
      }).url
    ).toBe("https://github.com/cloudflare/agents/pull/100");
  });

  it("should give no link when the ref is not owner/repo#number", () => {
    expect(
      reviewView({
        reviewId: 1,
        pr: "not a ref",
        title: "T",
        findings: [],
        notes: []
      }).url
    ).toBeUndefined();
  });

  it("should count each verdict, fail first, and leave out verdicts with none", () => {
    expect(
      reviewView({
        reviewId: 1,
        pr: "a/b#1",
        title: "T",
        findings: [finding(1, "pass"), finding(2, "fail"), finding(3, "pass")],
        notes: []
      }).counts
    ).toEqual([
      { verdict: "fail", count: 1 },
      { verdict: "pass", count: 2 }
    ]);
  });
});
