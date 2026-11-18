import type { RuleStore } from "features/rules/services/rule-store/ruleStore";
import type { Rule, StaticCheck } from "shared/types/rule";

/** Returns a check that reviews can run without the model, or null when the rule needs judgement. */
export type ProposeCheck = (ruleText: string) => Promise<StaticCheck | null>;

const NO_RULES = "There are no rules yet.";

const describeCheck = ({ paths, pattern }: StaticCheck) =>
  `added lines in \`${paths}\` that match \`${pattern}\``;

const CHECK_LABEL = {
  approved: " [checked]",
  proposed: " [check proposed]",
  none: " [judged by the model]"
};

const checkLabel = (rule: Rule) => {
  if (!rule.check) return CHECK_LABEL.none;
  return rule.check.approved ? CHECK_LABEL.approved : CHECK_LABEL.proposed;
};

const describeRules = (rules: Rule[]) =>
  rules.length === 0
    ? NO_RULES
    : `Current rules:\n${rules.map((r) => `${r.id}. ${r.text}${checkLabel(r)}`).join("\n")}`;

const proposalNote = (id: number, check: StaticCheck) =>
  `I can check this rule without the model: it fails on ${describeCheck(check)}. Say "approve the check for rule ${id}" to use it, or "drop the check for rule ${id}". Until then, the model judges it.`;

// A failed proposal must not lose the rule: the model still judges it.
async function safelyPropose(propose: ProposeCheck, text: string) {
  try {
    return await propose(text);
  } catch {
    return null;
  }
}

/** What the agent says back for each rule tool (spec R1 to R6). Plain functions, so tests need no model. */
export function createRuleActions(store: RuleStore, propose: ProposeCheck) {
  const listRules = () => describeRules(store.list());
  const withRules = (text: string) => `${text}\n${listRules()}`;
  // Template for the id actions: on success confirm and list the rules, else say what is missing.
  const confirm = (done: boolean, doneText: string, missingText: string) =>
    done ? withRules(doneText) : missingText;
  const hasRule = (id: number) => store.list().some((rule) => rule.id === id);
  // A check action can fail because the rule is missing or because it has no check. Say which.
  const missingCheck = (id: number, noCheckText: string) =>
    hasRule(id) ? noCheckText : `There is no rule ${id}.`;

  const addRule = async (text: string) => {
    const result = store.add(text);
    if (!result.ok) return `Not added. ${result.reason}`;
    const { id } = result.rule;
    const check = await safelyPropose(propose, result.rule.text);
    if (check) store.proposeCheck(id, check);
    const note = check ? `\n${proposalNote(id, check)}` : "";
    return withRules(`Added rule ${id}.${note}`);
  };

  const removeRule = (id: number) =>
    confirm(store.remove(id), `Removed rule ${id}.`, `There is no rule ${id}.`);

  const approveCheck = (id: number) =>
    confirm(
      store.approveCheck(id),
      `Rule ${id} is now checked without the model.`,
      missingCheck(id, `Rule ${id} has no proposed check.`)
    );

  const dropCheck = (id: number) =>
    confirm(
      store.dropCheck(id),
      `Dropped the check. The model now judges rule ${id}.`,
      missingCheck(id, `Rule ${id} has no check.`)
    );

  return { addRule, removeRule, listRules, approveCheck, dropCheck };
}

export type RuleActions = ReturnType<typeof createRuleActions>;
