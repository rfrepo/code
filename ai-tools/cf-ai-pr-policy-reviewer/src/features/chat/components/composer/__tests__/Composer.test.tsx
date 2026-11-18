import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Composer } from "features/chat/components/composer/Composer";

const setup = (props: { connected?: boolean; busy?: boolean } = {}) => {
  const onSend = vi.fn();
  const onStop = vi.fn();
  render(
    <Composer
      connected={props.connected ?? true}
      busy={props.busy ?? false}
      onSend={onSend}
      onStop={onStop}
    />
  );
  return { onSend, onStop, user: userEvent.setup() };
};

afterEach(cleanup);

describe("Composer", () => {
  it("should send the trimmed text when Send is clicked, then clear the box", async () => {
    const { onSend, user } = setup();
    await user.type(screen.getByLabelText("Message"), "  List my rules  ");
    await user.click(screen.getByRole("button", { name: "Send message" }));
    expect(onSend).toHaveBeenCalledWith("List my rules");
    expect(screen.getByLabelText("Message")).toHaveProperty("value", "");
  });

  it("should send on Enter but not on Shift+Enter", async () => {
    const { onSend, user } = setup();
    await user.type(
      screen.getByLabelText("Message"),
      "A{Shift>}{Enter}{/Shift}B"
    );
    expect(onSend).not.toHaveBeenCalled();
    await user.keyboard("{Enter}");
    expect(onSend).toHaveBeenCalledWith("A\nB");
  });

  it("should disable Send while the box is empty", () => {
    setup();
    expect(screen.getByRole("button", { name: "Send message" })).toHaveProperty(
      "disabled",
      true
    );
  });

  it("should disable Send and the box when disconnected", async () => {
    const { user } = setup({ connected: false });
    await user.type(screen.getByLabelText("Message"), "Hello");
    expect(screen.getByLabelText("Message")).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Send message" })).toHaveProperty(
      "disabled",
      true
    );
  });

  it("should show Stop instead of Send while the agent replies", async () => {
    const { onStop, user } = setup({ busy: true });
    expect(screen.queryByRole("button", { name: "Send message" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Stop generation" }));
    expect(onStop).toHaveBeenCalledOnce();
  });
});
