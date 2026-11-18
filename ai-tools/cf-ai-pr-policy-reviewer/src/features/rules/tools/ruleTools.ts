import { tool } from "ai";
import { z } from "zod";
import { MAX_RULE_LENGTH } from "features/rules/services/rule-check/ruleCheck";
import type { RuleActions } from "features/rules/tools/ruleActions";

// The model often sends the rule number as "1". That is clear, so it is read as 1.
const ruleIdInput = z.object({
  id: z
    .union([z.number().int(), z.string().regex(/^\d+$/).transform(Number)])
    .describe("The rule number")
});

/** A tool that takes one rule number and delegates to an action. */
const ruleIdTool = (description: string, run: (id: number) => string) =>
  tool({
    description,
    inputSchema: ruleIdInput,
    execute: async ({ id }) => run(id)
  });

// The model sometimes calls tools nobody asked for, so changes that are hard to undo wait for the user.
const ASK_USER = { needsApproval: true } as const;

/** The rule tools the chat model can call. Each one delegates to a tested action. */
export const createRuleTools = (actions: RuleActions) => ({
  addRule: tool({
    description:
      "Add an engineering rule that pull requests are checked against.",
    inputSchema: z.object({
      text: z.string().max(MAX_RULE_LENGTH).describe("The rule, in one line")
    }),
    execute: ({ text }) => actions.addRule(text)
  }),
  removeRule: {
    ...ruleIdTool("Remove a rule by its number.", actions.removeRule),
    ...ASK_USER
  },
  approveCheck: {
    ...ruleIdTool(
      "Approve the proposed static check for a rule, so reviews run it instead of asking the model.",
      actions.approveCheck
    ),
    ...ASK_USER
  },
  dropCheck: {
    ...ruleIdTool(
      "Drop the static check for a rule, so the model judges the rule again.",
      actions.dropCheck
    ),
    ...ASK_USER
  },
  listRules: tool({
    description: "List the current rules with their numbers.",
    inputSchema: z.object({}),
    execute: async () => actions.listRules()
  })
});
