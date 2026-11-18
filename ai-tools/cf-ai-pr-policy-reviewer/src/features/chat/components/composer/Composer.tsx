import { Button, InputArea } from "@cloudflare/kumo";
import { PaperPlaneRightIcon, StopIcon } from "@phosphor-icons/react";
import { useComposer } from "features/chat/hooks/use-composer/useComposer";

type Props = {
  connected: boolean;
  busy: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
};

type ActionProps = { busy: boolean; canSend: boolean; onStop: () => void };

const ICON_SIZE = 18;

function growToFit(event: React.FormEvent<HTMLTextAreaElement>) {
  const box = event.currentTarget;
  box.style.height = "auto";
  box.style.height = `${box.scrollHeight}px`;
}

const ACTION_VIEW = {
  stop: {
    type: "button",
    variant: "secondary",
    label: "Stop generation",
    icon: <StopIcon size={ICON_SIZE} />
  },
  send: {
    type: "submit",
    variant: "primary",
    label: "Send message",
    icon: <PaperPlaneRightIcon size={ICON_SIZE} />
  }
} as const;

/** One button whose look comes from ACTION_VIEW: Stop while the agent replies, else Send. */
function ComposerAction({ busy, canSend, onStop }: ActionProps) {
  const view = ACTION_VIEW[busy ? "stop" : "send"];
  const onClick = busy ? onStop : undefined;
  const disabled = !busy && !canSend;
  return (
    <Button
      type={view.type}
      variant={view.variant}
      shape="square"
      aria-label={view.label}
      icon={view.icon}
      onClick={onClick}
      disabled={disabled}
      className="mb-0.5"
    />
  );
}

/** The message box. The input logic is in useComposer. */
export function Composer({ connected, busy, onSend, onStop }: Props) {
  const { input, boxRef, changeInput, submit, sendOnEnter, canSend, canType } =
    useComposer({ connected, busy, onSend });
  return (
    <form onSubmit={submit} className="max-w-3xl mx-auto px-5 py-4">
      <div className="flex items-end gap-3 rounded-xl border border-kumo-line bg-kumo-base p-3 shadow-sm focus-within:ring-2 focus-within:ring-kumo-ring focus-within:border-transparent transition-shadow">
        <InputArea
          ref={boxRef}
          value={input}
          onValueChange={changeInput}
          onKeyDown={sendOnEnter}
          onInput={growToFit}
          placeholder="Add a rule, or paste a pull request link..."
          disabled={!canType}
          rows={1}
          aria-label="Message"
          className="flex-1 ring-0! focus:ring-0! shadow-none! bg-transparent! outline-none! resize-none max-h-40"
        />
        <ComposerAction busy={busy} canSend={canSend} onStop={onStop} />
      </div>
    </form>
  );
}
