import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ReviewCard } from "features/chat/components/review-card/ReviewCard";

afterEach(cleanup);

const REVIEW = {
  reviewId: 7,
  pr: "acme/pay#4",
  title: "Add refunds",
  findings: [
    {
      ruleId: 1,
      rule: "No console.log in src/",
      verdict: "fail" as const,
      file: "src/a.ts:1",
      reason: "console.log(1);",
      source: "checked" as const
    },
    {
      ruleId: 2,
      rule: "Routes need tests",
      verdict: "pass" as const,
      reason: "No route changed.",
      source: "judged" as const
    }
  ],
  notes: ["Skipped generated files: dist/a.js"]
};

describe("ReviewCard", () => {
  it("should name the pull request and link to it", () => {
    render(<ReviewCard review={REVIEW} />);
    expect(
      screen.getByRole("link", { name: "acme/pay#4" }).getAttribute("href")
    ).toBe("https://github.com/acme/pay/pull/4");
    expect(screen.getByText("Add refunds")).toBeTruthy();
  });

  it("should show the count of each verdict", () => {
    render(<ReviewCard review={REVIEW} />);
    expect(screen.getByText("1 fail")).toBeTruthy();
    expect(screen.getByText("1 pass")).toBeTruthy();
  });

  it("should show one row per rule with its verdict, file, reason and source", () => {
    render(<ReviewCard review={REVIEW} />);
    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain("Fail");
    expect(rows[0].textContent).toContain("No console.log in src/");
    expect(rows[0].textContent).toContain("src/a.ts:1");
    expect(rows[0].textContent).toContain("console.log(1);");
    expect(rows[0].textContent).toContain("Static check");
    expect(rows[1].textContent).toContain("Pass");
    expect(rows[1].textContent).toContain("Model");
  });

  it("should show the notes and the saved review id", () => {
    render(<ReviewCard review={REVIEW} />);
    expect(screen.getByText("Skipped generated files: dist/a.js")).toBeTruthy();
    expect(screen.getByText("Saved as review 7")).toBeTruthy();
  });
});
