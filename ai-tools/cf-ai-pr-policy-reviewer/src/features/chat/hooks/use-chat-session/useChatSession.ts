import { useCallback, useState } from "react";
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";
import type { ChatStatus } from "ai";
import { loadSessionName } from "features/chat/services/session-name/sessionName";

// Matches the class name the Worker exports (wrangler.jsonc durable_objects).
const AGENT_NAME = "ChatAgent";
const BUSY_STATUSES: ReadonlySet<ChatStatus> = new Set([
  "submitted",
  "streaming"
]);

/** One connection to the chat agent: its messages, whether it is busy, and how to talk to it. */
export function useChatSession() {
  const [connected, setConnected] = useState(false);
  const [sessionName] = useState(() => loadSessionName(localStorage));
  const agent = useAgent({
    agent: AGENT_NAME,
    name: sessionName,
    onOpen: useCallback(() => setConnected(true), []),
    onClose: useCallback(() => setConnected(false), [])
  });
  const {
    messages,
    sendMessage,
    clearHistory,
    stop,
    status,
    error,
    clearError,
    regenerate,
    addToolApprovalResponse
  } = useAgentChat({ agent });

  const send = (text: string) =>
    sendMessage({ role: "user", parts: [{ type: "text", text }] });

  // Asks for the last reply again after a failed turn, such as Workers AI being down.
  const retry = () => regenerate();

  // The server runs an approved tool and continues the turn; a denied one is told to the model.
  const answerApproval = (approvalId: string, approved: boolean) =>
    addToolApprovalResponse({ id: approvalId, approved });

  return {
    connected,
    messages,
    busy: BUSY_STATUSES.has(status),
    error: error?.message,
    send,
    stop,
    retry,
    answerApproval,
    dismissError: clearError,
    clear: clearHistory
  };
}
