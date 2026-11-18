import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatHeader } from "features/chat/components/chat-header/ChatHeader";

afterEach(cleanup);

describe("ChatHeader", () => {
  it("should clear the chat when Clear is clicked", async () => {
    const onClear = vi.fn();
    render(<ChatHeader connected onClear={onClear} />);
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("should show the connection state", () => {
    render(<ChatHeader connected={false} onClear={vi.fn()} />);
    expect(screen.getByText("Disconnected")).toBeTruthy();
  });
});
