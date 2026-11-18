import { useEffect, useRef, type ReactNode } from "react";
import type { UIMessage } from "ai";
import { AssistantBubble } from "features/chat/components/assistant-bubble/AssistantBubble";
import { EmptyChat } from "features/chat/components/empty-chat/EmptyChat";
import { ReviewCard } from "features/chat/components/review-card/ReviewCard";
import { ToolCallCard } from "features/chat/components/tool-call-card/ToolCallCard";
import { UserBubble } from "features/chat/components/user-bubble/UserBubble";
import {
  toChatParts,
  type ChatPart
} from "features/chat/services/chat-parts/chatParts";

type AnswerApproval = (approvalId: string, approved: boolean) => void;
type Props = {
  messages: UIMessage[];
  busy: boolean;
  onPick: (prompt: string) => void;
  onAnswer: AnswerApproval;
};
type RenderContext = { animating: boolean; onAnswer: AnswerApproval };

type Renderers = {
  [K in ChatPart["kind"]]: (
    part: Extract<ChatPart, { kind: K }>,
    context: RenderContext
  ) => ReactNode;
};
type AnyRenderer = (part: ChatPart, context: RenderContext) => ReactNode;

const RENDERERS: Renderers = {
  userText: (part) => <UserBubble text={part.text} />,
  assistantText: (part, { animating }) => (
    <AssistantBubble text={part.text} animating={animating} />
  ),
  tool: (part, { onAnswer }) => (
    <ToolCallCard tool={part.tool} onAnswer={onAnswer} />
  ),
  review: (part) => <ReviewCard review={part.review} />
};

// Each renderer gets the part kind it is keyed by, so widening the lookup is safe.
const renderPart =
  (context: RenderContext) => (part: ChatPart, index: number) => (
    <div key={index}>
      {(RENDERERS[part.kind] as AnyRenderer)(part, context)}
    </div>
  );

const renderMessage =
  (lastId: string | undefined, busy: boolean, onAnswer: AnswerApproval) =>
  (message: UIMessage) => (
    <div key={message.id} className="space-y-2">
      {toChatParts(message).map(
        renderPart({ animating: busy && message.id === lastId, onAnswer })
      )}
    </div>
  );

export function MessageList({ messages, busy, onPick, onAnswer }: Props) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0)
    return <EmptyChat disabled={busy} onPick={onPick} />;

  return (
    <div className="space-y-5">
      {messages.map(renderMessage(messages.at(-1)?.id, busy, onAnswer))}
      <div ref={endRef} />
    </div>
  );
}
