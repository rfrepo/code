import { tool } from "ai";
import { z } from "zod";
import type { ReviewActions } from "features/reviews/tools/reviewActions";

/** The review tools the chat model can call. Each one delegates to a tested action. */
export const createReviewTools = (actions: ReviewActions) => ({
  reviewPullRequest: tool({
    description:
      "Start a review of a public GitHub pull request against the current rules.",
    inputSchema: z.object({
      url: z
        .string()
        .describe("The pull request URL, exactly as the user gave it")
    }),
    // The model once started a review of a link it made up, so the user confirms each one.
    needsApproval: true,
    execute: async ({ url }) => actions.reviewPullRequest(url)
  }),
  findReview: tool({
    description:
      "Show the latest saved review of one pull request, without calling GitHub.",
    inputSchema: z.object({
      pr: z.string().describe("The pull request as owner/repo#number")
    }),
    execute: async ({ pr }) => actions.findReview(pr)
  }),
  listReviews: tool({
    description: "List the most recent saved reviews.",
    inputSchema: z.object({}),
    execute: async () => actions.listReviews()
  })
});
