import { z } from "zod";
import { extractJsonObject } from "shared/services/json/extractJsonObject";
import type { CompleteText } from "shared/services/workers-ai/llama";
import { compileCheck } from "shared/services/static-check/compileCheck";
import type { StaticCheck } from "shared/types/rule";

const SYSTEM = `You turn an engineering rule into a static check when you can.
A static check is a JavaScript regular expression tested on each line a pull request adds, only in files whose path matches a glob.
Use ** for any folders, * for part of one name.

Reply with JSON only, in one of these shapes:
{"check":{"paths":"src/**","pattern":"console\\\\.log\\\\("}}
{"check":null}

Give null when the rule needs judgement, needs more than one line, needs other files, or is about removed code.
Examples:
- "No console.log in src/" -> {"check":{"paths":"src/**","pattern":"console\\\\.log\\\\("}}
- "No TODO comments in TypeScript" -> {"check":{"paths":"**/*.ts","pattern":"TODO"}}
- "Error messages are clear to users" -> {"check":null}`;

const proposal = z.object({
  check: z.object({ paths: z.string(), pattern: z.string() }).nullable()
});

/**
 * Asks the model once, when a rule is added, for a check that reviews can run without it.
 * A reply that is not valid, or a check that fails compileCheck, means no check.
 */
export async function proposeCheck(
  ruleText: string,
  complete: CompleteText
): Promise<StaticCheck | null> {
  const reply = await complete({ system: SYSTEM, user: `Rule: ${ruleText}` });
  const parsed = proposal.safeParse(extractJsonObject(reply));
  if (!parsed.success || !parsed.data.check) return null;
  return compileCheck(parsed.data.check).ok ? parsed.data.check : null;
}
