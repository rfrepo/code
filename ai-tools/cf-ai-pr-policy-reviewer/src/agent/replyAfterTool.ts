import type { ModelMessage } from "ai";

const NO_TOOLS = { activeTools: [] };

/**
 * A prepareStep rule: once a tool has answered, the next step offers no tools, so the model
 * replies in words. Llama otherwise kept calling tools nobody asked for, and each answer to an
 * approval started a new turn with a new step budget, so the calls did not stop.
 */
export const replyAfterTool = ({ messages }: { messages: ModelMessage[] }) =>
  messages.at(-1)?.role === "tool" ? NO_TOOLS : undefined;
