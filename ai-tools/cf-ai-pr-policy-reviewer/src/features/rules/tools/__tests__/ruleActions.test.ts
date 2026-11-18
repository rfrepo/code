import { describe, expect, it, vi } from "vitest";
import { createTestSql } from "shared/testing/sqliteSql";
import { createRuleStore } from "features/rules/services/rule-store/ruleStore";
import {
  createRuleActions,
  type ProposeCheck
} from "features/rules/tools/ruleActions";

const CHECK = { paths: "src/**", pattern: "console\\.log\\(" };
const noCheck: ProposeCheck = async () => null;

const setupActions = (propose: ProposeCheck = noCheck) =>
  createRuleActions(createRuleStore(createTestSql()), propose);

describe("createRuleActions", () => {
  it("should confirm a new rule and list the current rules", async () => {
    const actions = setupActions();
    expect(await actions.addRule("No console.log in src/")).toBe(
      "Added rule 1.\nCurrent rules:\n1. No console.log in src/ [judged by the model]"
    );
  });

  it("should say why a duplicate rule was not added", async () => {
    const actions = setupActions();
    await actions.addRule("No console.log in src/");
    expect(await actions.addRule("NO console.log in src/")).toBe(
      "Not added. That rule already exists as rule 1."
    );
  });

  it("should propose a check for a new rule and wait for approval", async () => {
    const actions = setupActions(async () => CHECK);
    expect(await actions.addRule("No console.log in src/")).toBe(
      [
        "Added rule 1.",
        'I can check this rule without the model: it fails on added lines in `src/**` that match `console\\.log\\(`. Say "approve the check for rule 1" to use it, or "drop the check for rule 1". Until then, the model judges it.',
        "Current rules:",
        "1. No console.log in src/ [check proposed]"
      ].join("\n")
    );
  });

  it("should keep the rule when the proposal fails", async () => {
    const actions = setupActions(vi.fn().mockRejectedValue(new Error("down")));
    expect(await actions.addRule("A")).toBe(
      "Added rule 1.\nCurrent rules:\n1. A [judged by the model]"
    );
  });

  it("should approve and drop a proposed check", async () => {
    const actions = setupActions(async () => CHECK);
    await actions.addRule("No console.log in src/");
    expect(actions.approveCheck(1)).toBe(
      "Rule 1 is now checked without the model.\nCurrent rules:\n1. No console.log in src/ [checked]"
    );
    expect(actions.dropCheck(1)).toBe(
      "Dropped the check. The model now judges rule 1.\nCurrent rules:\n1. No console.log in src/ [judged by the model]"
    );
    expect(actions.approveCheck(1)).toBe("Rule 1 has no proposed check.");
    expect(actions.dropCheck(1)).toBe("Rule 1 has no check.");
  });

  it("should remove a rule and list the rules left", async () => {
    const actions = setupActions();
    await actions.addRule("A");
    await actions.addRule("B");
    expect(actions.removeRule(1)).toBe(
      "Removed rule 1.\nCurrent rules:\n2. B [judged by the model]"
    );
  });

  it("should say when the rule to remove does not exist", () => {
    expect(setupActions().removeRule(4)).toBe("There is no rule 4.");
  });

  it("should say when there are no rules", () => {
    expect(setupActions().listRules()).toBe("There are no rules yet.");
  });

  it("should say when a rule to approve or drop does not exist", () => {
    const actions = setupActions();
    expect(actions.approveCheck(9)).toBe("There is no rule 9.");
    expect(actions.dropCheck(9)).toBe("There is no rule 9.");
  });
});
