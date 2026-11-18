import { Button, Text } from "@cloudflare/kumo";
import { WarningCircleIcon } from "@phosphor-icons/react";

type Props = {
  message?: string;
  onRetry: () => void;
  onDismiss: () => void;
};

const ICON_SIZE = 18;

/** Says that the agent could not reply, with Retry and Dismiss. Shows nothing when there is no error. */
export function ChatError({ message, onRetry, onDismiss }: Props) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="max-w-3xl mx-auto mt-4 mx-5 flex items-center gap-3 rounded-xl border border-kumo-danger bg-kumo-base px-4 py-3"
    >
      <WarningCircleIcon
        size={ICON_SIZE}
        className="text-kumo-danger shrink-0"
      />
      <Text size="sm">The agent could not reply: {message}</Text>
      <div className="ml-auto flex gap-2">
        <Button variant="secondary" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
        <Button variant="primary" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </div>
    </div>
  );
}
