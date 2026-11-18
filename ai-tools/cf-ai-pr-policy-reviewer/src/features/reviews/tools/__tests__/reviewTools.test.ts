import { describe, expect, it } from "vitest";
import type { ReviewActions } from "features/reviews/tools/reviewActions";
import { createReviewTools } from "features/reviews/tools/reviewTools";

const tools = createReviewTools({} as ReviewActions);

describe("createReviewTools", () => {
  it("should ask the user before it starts a review", () => {
    expect(tools.reviewPullRequest.needsApproval).toBe(true);
  });

  it("should not ask the user to read saved reviews", () => {
    expect(tools.findReview.needsApproval).toBeUndefined();
    expect(tools.listReviews.needsApproval).toBeUndefined();
  });
});
