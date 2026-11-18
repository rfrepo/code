import { Button, Text } from "@cloudflare/kumo";
import { CircleIcon, TrashIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "features/chat/components/theme-toggle/ThemeToggle";

type Props = { connected: boolean; onClear: () => void };

const DOT_SIZE = 8;
const ICON_SIZE = 16;
const CONNECTED = { label: "Connected", className: "text-kumo-success" };
const DISCONNECTED = { label: "Disconnected", className: "text-kumo-danger" };

function ConnectionStatus({ connected }: Pick<Props, "connected">) {
  const connection = connected ? CONNECTED : DISCONNECTED;
  return (
    <div className="flex items-center gap-1.5">
      <CircleIcon
        size={DOT_SIZE}
        weight="fill"
        className={connection.className}
      />
      <Text size="xs" variant="secondary">
        {connection.label}
      </Text>
    </div>
  );
}

export function ChatHeader({ connected, onClear }: Props) {
  return (
    <header className="px-5 py-4 bg-kumo-base border-b border-kumo-line">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-semibold text-kumo-default">
          PR Policy Reviewer
        </h1>
        <div className="flex items-center gap-3">
          <ConnectionStatus connected={connected} />
          <ThemeToggle />
          <Button
            variant="secondary"
            icon={<TrashIcon size={ICON_SIZE} />}
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
      </div>
    </header>
  );
}
