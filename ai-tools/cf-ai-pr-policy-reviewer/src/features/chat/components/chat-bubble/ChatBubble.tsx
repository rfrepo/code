import type { ReactNode } from "react";

type Side = "user" | "assistant";
type Props = { side: Side; children: ReactNode };

const BUBBLE = "max-w-[85%] rounded-2xl leading-relaxed";
const SIDE_VIEW: Record<Side, { row: string; bubble: string }> = {
  user: {
    row: "flex justify-end",
    bubble: `${BUBBLE} px-4 py-2.5 rounded-br-md bg-kumo-contrast text-kumo-inverse whitespace-pre-wrap`
  },
  assistant: {
    row: "flex justify-start",
    bubble: `${BUBBLE} rounded-bl-md bg-kumo-base text-kumo-default`
  }
};

/** The shared chat bubble. The side sets the alignment, corner and colours. */
export function ChatBubble({ side, children }: Props) {
  const view = SIDE_VIEW[side];
  return (
    <div className={view.row}>
      <div className={view.bubble}>{children}</div>
    </div>
  );
}
