import { useEffect, useRef, useState } from "react";

type Options = {
  connected: boolean;
  busy: boolean;
  onSend: (text: string) => void;
};

const AUTO_HEIGHT = "auto";

function resetHeight(box: HTMLTextAreaElement | null) {
  if (box) box.style.height = AUTO_HEIGHT;
}

/** The composer's input state: Enter sends, Shift+Enter adds a line, and focus returns when a reply ends. */
export function useComposer({ connected, busy, onSend }: Options) {
  const [input, setInput] = useState("");
  const boxRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!busy) boxRef.current?.focus();
  }, [busy]);

  const send = () => {
    const text = input.trim();
    if (!text || busy) return;
    onSend(text);
    setInput("");
    resetHeight(boxRef.current);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    send();
  };

  const sendOnEnter = (event: React.KeyboardEvent) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    send();
  };

  return {
    input,
    boxRef,
    changeInput: setInput,
    submit,
    sendOnEnter,
    canSend: connected && input.trim().length > 0,
    canType: connected && !busy
  };
}
