import { describe, expect, it } from "vitest";
import type { z } from "zod";
import type { RuleActions } from "features/rules/tools/ruleActions";
import { createRuleTools } from "features/rules/tools/ruleTools";

const tools = createRuleTools({} as RuleActions);

const parseInput = (schema: unknown, input: unknown) =>
  (schema as z.ZodType).safeParse(input);

describe("createRuleTools", () => {
  it("should accept a rule number the model sends as a digit string", () => {
    expect(parseInput(tools.approveCheck.inputSchema, { id: "1" })).toEqual({
      success: true,
      data: { id: 1 }
    });
  });

  it("should reject a rule number that is not a whole number", () => {
    expect(
      parseInput(tools.removeRule.inputSchema, { id: "one" }).success
    ).toBe(false);
  });

  it("should ask the user before it changes a check or removes a rule", () => {
    expect(tools.approveCheck.needsApproval).toBe(true);
    expect(tools.dropCheck.needsApproval).toBe(true);
    expect(tools.removeRule.needsApproval).toBe(true);
  });

  it("should not ask the user to add or list rules", () => {
    expect(tools.addRule.needsApproval).toBeUndefined();
    expect(tools.listRules.needsApproval).toBeUndefined();
  });
});
