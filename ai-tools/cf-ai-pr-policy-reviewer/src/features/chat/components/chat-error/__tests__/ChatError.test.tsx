import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatError } from "features/chat/components/chat-error/ChatError";

afterEach(cleanup);

describe("ChatError", () => {
  it("should show nothing when there is no error", () => {
    render(<ChatError onRetry={vi.fn()} onDismiss={vi.fn()} />);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("should show the error and offer Retry and Dismiss", async () => {
    const onRetry = vi.fn();
    const onDismiss = vi.fn();
    render(
      <ChatError
        message="Workers AI is unavailable"
        onRetry={onRetry}
        onDismiss={onDismiss}
      />
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "The agent could not reply: Workers AI is unavailable"
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Retry" }));
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onRetry).toHaveBeenCalledOnce();
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});
