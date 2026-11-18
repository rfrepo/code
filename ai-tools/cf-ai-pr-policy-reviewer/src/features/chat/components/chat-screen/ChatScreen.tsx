import { PoweredByCloudflare } from "@cloudflare/kumo";
import { ChatError } from "features/chat/components/chat-error/ChatError";
import { ChatHeader } from "features/chat/components/chat-header/ChatHeader";
import { Composer } from "features/chat/components/composer/Composer";
import { MessageList } from "features/chat/components/message-list/MessageList";
import { useChatSession } from "features/chat/hooks/use-chat-session/useChatSession";

export function ChatScreen() {
  // hoisted: the header, message list and composer share one agent connection.
  const chat = useChatSession();
  return (
    <div className="flex flex-col h-screen bg-kumo-elevated">
      <ChatHeader connected={chat.connected} onClear={chat.clear} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-6">
          <MessageList
            messages={chat.messages}
            busy={chat.busy}
            onPick={chat.send}
            onAnswer={chat.answerApproval}
          />
        </div>
      </main>
      <footer className="border-t border-kumo-line bg-kumo-base">
        <ChatError
          message={chat.error}
          onRetry={chat.retry}
          onDismiss={chat.dismissError}
        />
        <Composer
          connected={chat.connected}
          busy={chat.busy}
          onSend={chat.send}
          onStop={chat.stop}
        />
        <div className="flex justify-center pb-3">
          <PoweredByCloudflare href="https://developers.cloudflare.com/agents/" />
        </div>
      </footer>
    </div>
  );
}
