import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "features/chat/components/theme-toggle/ThemeToggle";

afterEach(cleanup);

describe("ThemeToggle", () => {
  it("should switch between light and dark and remember the choice", async () => {
    document.documentElement.setAttribute("data-mode", "light");
    render(<ThemeToggle />);
    const toggle = screen.getByRole("button", { name: "Toggle theme" });
    const user = userEvent.setup();
    await user.click(toggle);
    expect(document.documentElement.getAttribute("data-mode")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    await user.click(toggle);
    expect(document.documentElement.getAttribute("data-mode")).toBe("light");
  });
});
