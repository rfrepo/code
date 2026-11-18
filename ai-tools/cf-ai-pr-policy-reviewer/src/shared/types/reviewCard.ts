import { z } from "zod";

/** The message part type that carries a finished review for the chat to draw as a card. */
export const REVIEW_PART = "data-review";

/** A finished review as data. The reviews feature writes it, and the chat feature draws it. */
export const reviewCardSchema = z.object({
  reviewId: z.number(),
  pr: z.string(),
  title: z.string(),
  findings: z.array(
    z.object({
      ruleId: z.number(),
      rule: z.string(),
      verdict: z.enum(["pass", "fail", "unclear"]),
      file: z.string().optional(),
      reason: z.string(),
      source: z.enum(["checked", "judged"]).optional()
    })
  ),
  notes: z.array(z.string())
});

export type ReviewCard = z.infer<typeof reviewCardSchema>;
