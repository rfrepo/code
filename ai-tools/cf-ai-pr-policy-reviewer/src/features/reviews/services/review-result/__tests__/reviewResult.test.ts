import { describe, expect, it } from "vitest";
import {
  describeFailedReview,
  describeFinishedReview,
  reviewCardOf
} from "features/reviews/services/review-result/reviewResult";

const FINISHED = {
  reviewId: 7,
  pr: "a/b#1",
  title: "Add refunds",
  summary: "1 fail, 0 pass, 0 unclear",
  report: "**Review of a/b#1**",
  findings: [
    {
      ruleId: 1,
      rule: "No console.log in src/",
      verdict: "fail",
      file: "src/a.ts:1",
      reason: "console.log(1);",
      source: "checked"
    }
  ],
  notes: ["Skipped generated files: dist/a.js"]
};

describe("describeFinishedReview", () => {
  it("should show the report and the saved review id", () => {
    expect(
      describeFinishedReview({ reviewId: 7, report: "**Review of a/b#1**" })
    ).toBe("**Review of a/b#1**\n\nSaved as review 7.");
  });

  it("should say so when the result has the wrong shape", () => {
    expect(describeFinishedReview({ id: 7 })).toBe(
      "The review finished, but I could not read its result."
    );
  });
});

describe("reviewCardOf", () => {
  it("should keep the data the chat needs to draw the review", () => {
    expect(reviewCardOf(FINISHED)).toEqual({
      reviewId: 7,
      pr: "a/b#1",
      title: "Add refunds",
      findings: FINISHED.findings,
      notes: ["Skipped generated files: dist/a.js"]
    });
  });

  it("should give no card when the result has no findings", () => {
    expect(
      reviewCardOf({ reviewId: 7, report: "**Review of a/b#1**" })
    ).toBeUndefined();
  });
});

describe("describeFailedReview", () => {
  it("should name the error and say nothing was saved", () => {
    expect(
      describeFailedReview("GitHub returned 404 for /repos/a/b/pulls/1")
    ).toBe(
      "The review failed: GitHub returned 404 for /repos/a/b/pulls/1. No review was saved."
    );
  });

  it("should say the review was saved when the failure came after the save", () => {
    expect(describeFailedReview("Lost the connection", 7)).toBe(
      "The review failed: Lost the connection. It was saved as review 7 before the failure."
    );
  });
});
