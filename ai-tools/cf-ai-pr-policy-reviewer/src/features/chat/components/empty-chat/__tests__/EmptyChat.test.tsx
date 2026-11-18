import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmptyChat } from "features/chat/components/empty-chat/EmptyChat";

afterEach(cleanup);

describe("EmptyChat", () => {
  it("should send the example prompt that is clicked", async () => {
    const onPick = vi.fn();
    render(<EmptyChat disabled={false} onPick={onPick} />);
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "List my rules" }));
    expect(onPick).toHaveBeenCalledWith("List my rules");
  });

  it("should disable the example prompts while the agent replies", () => {
    render(<EmptyChat disabled onPick={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "List my rules" })
    ).toHaveProperty("disabled", true);
  });
});
