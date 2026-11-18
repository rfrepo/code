import { ChatBubble } from "features/chat/components/chat-bubble/ChatBubble";

type Props = { text: string };

export function UserBubble({ text }: Props) {
  return <ChatBubble side="user">{text}</ChatBubble>;
}
