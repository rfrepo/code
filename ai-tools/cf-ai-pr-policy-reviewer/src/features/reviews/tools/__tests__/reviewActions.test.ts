import { describe, expect, it, vi } from "vitest";
import { createTestSql } from "shared/testing/sqliteSql";
import { createReviewStore } from "features/reviews/services/review-store/reviewStore";
import { createReviewActions } from "features/reviews/tools/reviewActions";

const RULES = [
  { id: 1, text: "No console.log in src/" },
  { id: 2, text: "Every API route has a test" }
];
const URL = "https://github.com/acme/pay/pull/4";

const setupActions = (rules = RULES) => {
  const startReview = vi.fn().mockResolvedValue(undefined);
  const reviews = createReviewStore(createTestSql());
  const actions = createReviewActions({
    listRules: () => rules,
    startReview,
    reviews
  });
  return { actions, startReview, reviews };
};

const saved = (summary: string) => ({
  pr: "acme/pay#4",
  title: "Add refunds",
  summary,
  report: `report: ${summary}`
});

describe("createReviewActions", () => {
  it("should start a review and say it has started", async () => {
    const { actions, startReview } = setupActions();
    expect(await actions.reviewPullRequest(URL)).toBe(
      "Started a review of acme/pay#4 against 2 rules. I will post the result here when it finishes."
    );
    expect(startReview).toHaveBeenCalledWith(
      { owner: "acme", repo: "pay", number: 4 },
      RULES
    );
  });

  it("should start nothing and explain the URL shape for a bad link", async () => {
    const { actions, startReview } = setupActions();
    expect(
      await actions.reviewPullRequest("https://github.com/acme/pay/issues/4")
    ).toBe(
      "That is not a pull request link. I need a link such as https://github.com/cloudflare/agents/pull/100."
    );
    expect(startReview).not.toHaveBeenCalled();
  });

  it("should start nothing and ask for rules when there are none", async () => {
    const { actions, startReview } = setupActions([]);
    expect(await actions.reviewPullRequest(URL)).toBe(
      "There are no rules yet. Add a rule first, then ask again."
    );
    expect(startReview).not.toHaveBeenCalled();
  });

  it("should answer from the latest saved review of a pull request", () => {
    const { actions, reviews } = setupActions();
    reviews.save(saved("old"), "wf-1");
    reviews.save(saved("new"), "wf-2");
    expect(actions.findReview("acme/pay#4")).toBe("report: new");
    expect(actions.findReview("acme/pay#9")).toBe(
      "I have no saved review of acme/pay#9."
    );
  });

  it("should list recent reviews, or say there are none", () => {
    const { actions, reviews } = setupActions();
    expect(actions.listReviews()).toBe("There are no saved reviews yet.");
    reviews.save(saved("1 fail, 1 pass, 0 unclear"), "wf-1");
    expect(actions.listReviews()).toMatch(
      /^Review 1, acme\/pay#4 \(.+\): 1 fail, 1 pass, 0 unclear$/
    );
  });

  it("should find a saved review from a pasted pull request link", () => {
    const { actions, reviews } = setupActions();
    reviews.save(saved("1 fail, 1 pass, 0 unclear"), "wf-1");
    expect(actions.findReview(URL)).toBe("report: 1 fail, 1 pass, 0 unclear");
  });
});
