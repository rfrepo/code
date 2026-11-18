import { describe, expect, it } from "vitest";
import {
  formatReport,
  summarise
} from "features/reviews/services/report/formatReport";
import type { Finding } from "features/reviews/services/findings/parseFindings";

const findings: Finding[] = [
  {
    ruleId: 1,
    rule: "No console.log in src/",
    verdict: "fail",
    file: "src/a.ts:12",
    reason: "Logs the payload."
  },
  {
    ruleId: 2,
    rule: "Every API route has a test",
    verdict: "pass",
    reason: "Route has a test."
  },
  {
    ruleId: 3,
    rule: "Money uses integer pence",
    verdict: "unclear",
    reason: "Cannot tell the unit."
  }
];

describe("summarise", () => {
  it("should count verdicts", () => {
    expect(summarise(findings, false)).toBe("1 fail, 1 pass, 1 unclear");
  });

  it("should say when the diff was truncated", () => {
    expect(summarise(findings, true)).toBe(
      "1 fail, 1 pass, 1 unclear (diff truncated)"
    );
  });
});

describe("formatReport", () => {
  it("should show one line per rule with verdict, file and reason", () => {
    const report = formatReport({
      pr: "acme/pay#4",
      title: "Add refunds",
      findings,
      truncated: false,
      dropped: []
    });
    expect(report).toBe(
      [
        "**Review of acme/pay#4**: Add refunds",
        "",
        "- **FAIL** · rule 1: No console.log in src/ · `src/a.ts:12` · Logs the payload.",
        "- **PASS** · rule 2: Every API route has a test · Route has a test.",
        "- **UNCLEAR** · rule 3: Money uses integer pence · Cannot tell the unit.",
        "",
        "1 fail, 1 pass, 1 unclear"
      ].join("\n")
    );
  });

  it("should tag each finding with what decided it", () => {
    const report = formatReport({
      pr: "acme/pay#4",
      title: "Add refunds",
      findings: [
        { ...findings[0], source: "checked" },
        { ...findings[1], source: "judged" }
      ],
      truncated: false,
      dropped: []
    });
    expect(report).toContain(
      "- **FAIL** · rule 1: No console.log in src/ · `src/a.ts:12` · Logs the payload. · _checked_"
    );
    expect(report).toContain(
      "- **PASS** · rule 2: Every API route has a test · Route has a test. · _judged by the model_"
    );
  });

  it("should name dropped files and the cut when the diff was too large", () => {
    const report = formatReport({
      pr: "acme/pay#4",
      title: "Bump deps",
      findings: findings.slice(1, 2),
      truncated: true,
      dropped: ["package-lock.json"]
    });
    expect(report).toContain("Skipped generated files: package-lock.json");
    expect(report).toContain(
      "The diff was cut to fit the model, so the model did not see later files. Static checks ran on the whole diff."
    );
    expect(report.endsWith("0 fail, 1 pass, 0 unclear (diff truncated)")).toBe(
      true
    );
  });
});
