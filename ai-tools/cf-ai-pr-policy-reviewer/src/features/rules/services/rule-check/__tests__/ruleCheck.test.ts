import { describe, expect, it } from "vitest";
import { checkNewRule } from "features/rules/services/rule-check/ruleCheck";

const existing = [{ id: 1, text: "No console.log in src/" }];

describe("checkNewRule", () => {
  it("should accept a new rule and collapse extra spaces", () => {
    expect(checkNewRule("  Every   API route has a test ", existing)).toEqual({
      ok: true,
      text: "Every API route has a test"
    });
  });

  it("should reject an empty rule", () => {
    expect(checkNewRule("   ", existing)).toEqual({
      ok: false,
      reason: "The rule is empty."
    });
  });

  it("should reject a duplicate that differs only in case and spaces", () => {
    expect(checkNewRule("no console.log  in SRC/ ", existing)).toEqual({
      ok: false,
      reason: "That rule already exists as rule 1."
    });
  });

  it("should reject a new rule when 25 rules exist", () => {
    const full = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      text: `Rule ${i + 1}`
    }));
    expect(checkNewRule("One more rule", full)).toEqual({
      ok: false,
      reason: "You can have at most 25 rules. Remove one first."
    });
  });

  it("should reject a rule longer than 300 characters", () => {
    expect(checkNewRule("a".repeat(301), [])).toEqual({
      ok: false,
      reason: "A rule can be at most 300 characters."
    });
  });
});
