import type { UIMessage } from "ai";
import { REVIEW_PART, type ReviewCard } from "shared/types/reviewCard";

/**
 * The chat message for one workflow's result. Its id comes from the workflow id,
 * so a callback that runs twice posts once (the SDK dedupes its own notifications the same way).
 */
export const workflowMessage = (
  workflowId: string,
  text: string,
  card?: ReviewCard
): UIMessage => ({
  id: `workflow-${workflowId}`,
  role: "assistant",
  parts: [
    { type: "text", text },
    ...(card ? [{ type: REVIEW_PART, data: card } as const] : [])
  ]
});

export const isPosted = (messages: UIMessage[], id: string) =>
  messages.some((message) => message.id === id);
