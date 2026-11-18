import { describe, expect, it } from "vitest";
import { parseFindings } from "features/reviews/services/findings/parseFindings";

const rules = [
  { id: 1, text: "No console.log in src/" },
  { id: 2, text: "Every API route has a test" }
];

describe("parseFindings", () => {
  it("should map each model finding to its rule", () => {
    const raw = JSON.stringify({
      findings: [
        {
          ruleId: 1,
          verdict: "fail",
          file: "src/a.ts:12",
          reason: "Logs the payload."
        },
        { ruleId: 2, verdict: "pass", file: null, reason: "Route has a test." }
      ]
    });
    expect(parseFindings(raw, rules)).toEqual({
      parsed: true,
      findings: [
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
        }
      ]
    });
  });

  it("should read JSON wrapped in prose and a code fence", () => {
    const raw =
      'Here is my review:\n```json\n{"findings":[{"ruleId":1,"verdict":"pass","reason":"No logs."},{"ruleId":2,"verdict":"pass","reason":"Tested."}]}\n```';
    expect(parseFindings(raw, rules).findings.map((f) => f.verdict)).toEqual([
      "pass",
      "pass"
    ]);
  });

  it("should mark every rule unclear when the reply is not JSON", () => {
    expect(parseFindings("I think it looks fine.", rules)).toEqual({
      parsed: false,
      findings: [
        {
          ruleId: 1,
          rule: "No console.log in src/",
          verdict: "unclear",
          reason: "The model did not answer for this rule."
        },
        {
          ruleId: 2,
          rule: "Every API route has a test",
          verdict: "unclear",
          reason: "The model did not answer for this rule."
        }
      ]
    });
  });

  it("should mark a rule unclear when the model skipped it", () => {
    const raw =
      '{"findings":[{"ruleId":1,"verdict":"pass","reason":"No logs."}]}';
    expect(parseFindings(raw, rules).findings[1]).toEqual({
      ruleId: 2,
      rule: "Every API route has a test",
      verdict: "unclear",
      reason: "The model did not answer for this rule."
    });
  });

  it("should ignore findings for unknown rules and with bad verdicts", () => {
    const raw =
      '{"findings":[{"ruleId":9,"verdict":"fail","reason":"x"},{"ruleId":1,"verdict":"maybe","reason":"x"},{"ruleId":2,"verdict":"pass","reason":"Tested."}]}';
    expect(parseFindings(raw, rules).findings.map((f) => f.verdict)).toEqual([
      "unclear",
      "pass"
    ]);
  });

  it("should accept a rule id and a verdict written as strings in any case", () => {
    const raw =
      '{"findings":[{"ruleId":"1","verdict":"FAIL","reason":"Logs."}]}';
    expect(parseFindings(raw, rules).findings[0]).toEqual({
      ruleId: 1,
      rule: "No console.log in src/",
      verdict: "fail",
      reason: "Logs."
    });
  });

  it("should keep fail when the model gives a rule pass and fail", () => {
    const raw = JSON.stringify({
      findings: [
        { ruleId: 1, verdict: "pass", reason: "Fine." },
        { ruleId: 1, verdict: "fail", file: "src/a.ts:3", reason: "Logs." }
      ]
    });
    expect(parseFindings(raw, rules).findings[0]).toMatchObject({
      verdict: "fail",
      file: "src/a.ts:3",
      reason: "Logs."
    });
  });

  it("should keep unclear over pass for the same rule", () => {
    const raw = JSON.stringify({
      findings: [
        { ruleId: 2, verdict: "pass", reason: "Fine." },
        { ruleId: 2, verdict: "unclear", reason: "Cannot see the tests." }
      ]
    });
    expect(parseFindings(raw, rules).findings[1].verdict).toBe("unclear");
  });

  it("should put a reason on one line and cap its length", () => {
    const raw = JSON.stringify({
      findings: [
        { ruleId: 1, verdict: "fail", reason: `Line one.\n${"x".repeat(400)}` }
      ]
    });
    const { reason } = parseFindings(raw, rules).findings[0];
    expect(reason.startsWith("Line one. x")).toBe(true);
    expect(reason.length).toBe(300);
    expect(reason.endsWith("...")).toBe(true);
  });

  it("should read a bare array of findings", () => {
    const raw = '[{"ruleId":1,"verdict":"pass","reason":"Fine."}]';
    expect(parseFindings(raw, rules)).toMatchObject({
      parsed: true,
      findings: [
        { ruleId: 1, verdict: "pass" },
        { ruleId: 2, verdict: "unclear" }
      ]
    });
  });

  it("should count a reply that answers no rule as not parsed", () => {
    const raw = '{"findings":[{"ruleId":9,"verdict":"pass","reason":"Fine."}]}';
    expect(parseFindings(raw, rules).parsed).toBe(false);
  });
});
