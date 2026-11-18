import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBoundary } from "shared/components/error-boundary/ErrorBoundary";

function Broken(): never {
  throw new Error("render failed");
}

afterEach(cleanup);

describe("ErrorBoundary", () => {
  it("should show its children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>Chat</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Chat")).toBeTruthy();
  });

  it("should show a message and Reload instead of a blank page when a child throws", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const onReload = vi.fn();
    render(
      <ErrorBoundary onReload={onReload}>
        <Broken />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "Something went wrong. Your rules and reviews are saved."
    );
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Reload" }));
    expect(onReload).toHaveBeenCalledOnce();
  });
});
