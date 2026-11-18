import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { ChatBubble } from "features/chat/components/chat-bubble/ChatBubble";

type Props = { text: string; animating: boolean };

const PLUGINS = { code };

export function AssistantBubble({ text, animating }: Props) {
  return (
    <ChatBubble side="assistant">
      <Streamdown
        className="sd-theme rounded-2xl rounded-bl-md p-3"
        plugins={PLUGINS}
        controls={false}
        isAnimating={animating}
      >
        {text}
      </Streamdown>
    </ChatBubble>
  );
}
