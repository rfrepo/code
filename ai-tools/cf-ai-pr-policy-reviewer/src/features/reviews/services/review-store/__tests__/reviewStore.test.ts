import { describe, expect, it } from "vitest";
import { createTestSql } from "shared/testing/sqliteSql";
import { createReviewStore } from "features/reviews/services/review-store/reviewStore";

const review = (pr: string, summary: string) => ({
  pr,
  title: "Add refunds",
  summary,
  report: `report for ${pr}`
});

describe("createReviewStore", () => {
  it("should save a review and return its id", () => {
    const store = createReviewStore(createTestSql());
    expect(store.save(review("acme/pay#4", "1 fail"), "wf-1")).toBe(1);
    expect(store.save(review("acme/pay#5", "0 fail"), "wf-2")).toBe(2);
  });

  it("should list recent reviews newest first, up to the limit", () => {
    const store = createReviewStore(createTestSql());
    store.save(review("acme/pay#4", "first"), "wf-3");
    store.save(review("acme/pay#5", "second"), "wf-4");
    store.save(review("acme/pay#6", "third"), "wf-5");
    expect(store.recent(2).map((r) => r.summary)).toEqual(["third", "second"]);
  });

  it("should save one row per workflow when the save step runs twice", () => {
    const store = createReviewStore(createTestSql());
    expect(store.save(review("acme/pay#4", "first"), "wf-1")).toBe(1);
    expect(store.save(review("acme/pay#4", "first"), "wf-1")).toBe(1);
    expect(store.recent(5)).toHaveLength(1);
  });

  it("should find reviews of one pull request, ignoring case", () => {
    const store = createReviewStore(createTestSql());
    store.save(review("acme/pay#4", "first"), "wf-6");
    store.save(review("acme/pay#5", "other"), "wf-7");
    store.save(review("acme/pay#4", "second"), "wf-8");
    expect(store.forPullRequest("ACME/pay#4").map((r) => r.summary)).toEqual([
      "second",
      "first"
    ]);
  });

  it("should find the review a workflow saved", () => {
    const store = createReviewStore(createTestSql());
    store.save(review("acme/pay#4", "1 fail"), "wf-1");
    expect(store.forWorkflow("wf-1")).toBe(1);
    expect(store.forWorkflow("wf-2")).toBeUndefined();
  });
});
