import { z } from "zod";
import { type ReviewCard, reviewCardSchema } from "shared/types/reviewCard";

const finishedReview = z.object({
  reviewId: z.number(),
  report: z.string()
});

/** The chat message for a workflow that finished. An unreadable result is said plainly, not hidden. */
export function describeFinishedReview(result: unknown): string {
  const parsed = finishedReview.safeParse(result);
  if (!parsed.success)
    return "The review finished, but I could not read its result.";
  return `${parsed.data.report}\n\nSaved as review ${parsed.data.reviewId}.`;
}

/** The finished review as data for the chat card, or nothing when the result does not have it. */
export function reviewCardOf(result: unknown): ReviewCard | undefined {
  const parsed = reviewCardSchema.safeParse(result);
  return parsed.success ? parsed.data : undefined;
}

/** The chat message for a workflow that failed after its retries (spec V5). */
export const describeFailedReview = (error: string, savedReviewId?: number) =>
  savedReviewId === undefined
    ? `The review failed: ${error}. No review was saved.`
    : `The review failed: ${error}. It was saved as review ${savedReviewId} before the failure.`;
