import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToolCallCard } from "features/chat/components/tool-call-card/ToolCallCard";

afterEach(cleanup);

describe("ToolCallCard", () => {
  it("should show a finished call as Done with its output", () => {
    render(
      <ToolCallCard
        onAnswer={vi.fn()}
        tool={{ name: "addRule", status: "done", output: "Added rule 1." }}
      />
    );
    expect(screen.getByText("Done")).toBeTruthy();
    expect(screen.getByText("Added rule 1.")).toBeTruthy();
  });

  it("should show a failed call as Error with its message", () => {
    render(
      <ToolCallCard
        onAnswer={vi.fn()}
        tool={{
          name: "reviewPullRequest",
          status: "failed",
          error: "GitHub said 404"
        }}
      />
    );
    expect(screen.getAllByText("Error")).toHaveLength(2);
    expect(screen.getByText("GitHub said 404")).toBeTruthy();
  });

  it("should ask the user to approve or deny a waiting call", async () => {
    const onAnswer = vi.fn();
    render(
      <ToolCallCard
        onAnswer={onAnswer}
        tool={{
          name: "removeRule",
          status: "waiting",
          approvalId: "ap-1",
          input: "{ id: 1 }"
        }}
      />
    );
    expect(screen.getByText("Needs your OK")).toBeTruthy();
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Approve" }));
    await user.click(screen.getByRole("button", { name: "Deny" }));
    expect(onAnswer).toHaveBeenNthCalledWith(1, "ap-1", true);
    expect(onAnswer).toHaveBeenNthCalledWith(2, "ap-1", false);
  });

  it("should show no buttons on a call that does not wait", () => {
    render(
      <ToolCallCard
        onAnswer={vi.fn()}
        tool={{ name: "addRule", status: "done" }}
      />
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("should show a denied call as Denied", () => {
    render(
      <ToolCallCard
        onAnswer={vi.fn()}
        tool={{ name: "removeRule", status: "denied" }}
      />
    );
    expect(screen.getByText("Denied")).toBeTruthy();
  });
});
