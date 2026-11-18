import {
  getToolName,
  isToolUIPart,
  type DynamicToolUIPart,
  type ToolUIPart,
  type UIMessage
} from "ai";
import {
  REVIEW_PART,
  reviewCardSchema,
  type ReviewCard
} from "shared/types/reviewCard";

export type ToolStatus = "waiting" | "running" | "done" | "failed" | "denied";

export type ToolCall = {
  name: string;
  status: ToolStatus;
  /** Set while the call waits for the user to approve or deny it. */
  approvalId?: string;
  input?: string;
  output?: string;
  error?: string;
};

/** What the chat shows for one message part, as plain data for the components. */
export type ChatPart =
  | { kind: "userText"; text: string }
  | { kind: "assistantText"; text: string }
  | { kind: "tool"; tool: ToolCall }
  | { kind: "review"; review: ReviewCard };

type ToolPart = ToolUIPart | DynamicToolUIPart;
type MessagePart = UIMessage["parts"][number];

const STATUS_BY_STATE: Partial<Record<ToolPart["state"], ToolStatus>> = {
  "input-streaming": "running",
  "input-available": "running",
  "approval-requested": "waiting",
  "approval-responded": "running",
  "output-available": "done",
  "output-error": "failed",
  "output-denied": "denied"
};

const JSON_INDENT = 2;

function formatValue(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, JSON_INDENT);
}

function toToolPart(part: ToolPart): ChatPart | undefined {
  const status = STATUS_BY_STATE[part.state];
  if (!status) return undefined;
  return {
    kind: "tool",
    tool: {
      name: getToolName(part),
      status,
      approvalId: status === "waiting" ? part.approval?.id : undefined,
      input: formatValue(part.input),
      output: formatValue(part.output),
      error: part.errorText
    }
  };
}

function toChatPart(
  role: UIMessage["role"],
  part: MessagePart
): ChatPart | undefined {
  if (isToolUIPart(part)) return toToolPart(part);
  if (part.type !== "text" || !part.text) return undefined;
  return role === "user"
    ? { kind: "userText", text: part.text }
    : { kind: "assistantText", text: part.text };
}

function reviewOf(message: UIMessage): ReviewCard | undefined {
  const part = message.parts.find((p) => p.type === REVIEW_PART);
  if (!part || !("data" in part)) return undefined;
  const parsed = reviewCardSchema.safeParse(part.data);
  return parsed.success ? parsed.data : undefined;
}

/**
 * The parts of a message the chat shows, in order. Reasoning, files and steps are left out.
 * A posted review shows as one card; its text stays in the message for the model only.
 */
export function toChatParts(message: UIMessage): ChatPart[] {
  const review = reviewOf(message);
  if (review) return [{ kind: "review", review }];
  return message.parts.flatMap((part) => toChatPart(message.role, part) ?? []);
}
