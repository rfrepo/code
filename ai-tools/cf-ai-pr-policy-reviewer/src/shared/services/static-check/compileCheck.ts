import { fail } from "shared/services/result/result";
import type { Result } from "shared/types/result";
import type { StaticCheck } from "shared/types/rule";

export type CompiledCheck = { path: RegExp; line: RegExp };
export type CompileResult = Result<{ compiled: CompiledCheck }>;

const MAX_PATHS_LENGTH = 100;
const MAX_PATTERN_LENGTH = 200;
const GLOB_CHARS = /^[\w./*?@-]+$/;
// A repeat inside a repeated group, such as (a+)+ or ((a)+)+, can backtrack for minutes on one line.
const REPEAT = new Set(["+", "*", "{"]);
const INNER_REPEAT = new Set([...REPEAT, "?"]);

// An escape or a character class is one literal character for this check.
const LITERAL = /\\.|\[(?:\\.|[^\]\\])*\]/g;
// "(?:", "(?=", "(?<=" and "(?<name>" open a group. Their "?" is not a repeat.
const GROUP_PREFIX = /\(\?(?:<[=!]|<[^>]*>|[:=!])/g;

// Records that the innermost open group holds a repeat.
function markRepeat(groups: boolean[]) {
  if (groups.length > 0) groups[groups.length - 1] = true;
}

// Closes a group. Its repeat counts for the parent group too. True when the group is itself repeated.
function closeGroup(groups: boolean[], next: string | undefined) {
  const holdsRepeat = groups.pop() ?? false;
  if (holdsRepeat) markRepeat(groups);
  return holdsRepeat && next !== undefined && REPEAT.has(next);
}

function hasNestedRepeat(pattern: string) {
  const shape = pattern.replace(LITERAL, "x").replace(GROUP_PREFIX, "(");
  const groups: boolean[] = [];
  for (let i = 0; i < shape.length; i += 1) {
    const char = shape[i];
    if (char === "(") groups.push(false);
    else if (char === ")" && closeGroup(groups, shape[i + 1])) return true;
    else if (INNER_REPEAT.has(char)) markRepeat(groups);
  }
  return false;
}

// GLOB_CHARS lets through only these specials; every other allowed character is literal in a RegExp.
const GLOB_PART = /\*\*\/|\*\*|\*|\?|\./g;
const GLOB_TO_REGEX: Record<string, string> = {
  "**/": "(?:.*/)?",
  "**": ".*",
  "*": "[^/]*",
  "?": "[^/]",
  ".": "\\."
};

const globToRegExp = (glob: string) =>
  new RegExp(`^${glob.replace(GLOB_PART, (part) => GLOB_TO_REGEX[part])}$`);

function compilePattern(pattern: string): RegExp | null {
  try {
    return new RegExp(pattern);
  } catch {
    return null;
  }
}

/** Checks a proposed check is safe and useful, then compiles it. Shared by the rules and reviews features. */
export function compileCheck({ paths, pattern }: StaticCheck): CompileResult {
  if (!GLOB_CHARS.test(paths) || paths.length > MAX_PATHS_LENGTH)
    return fail(
      "The path glob may use only letters, digits, . / - _ @ * and ?."
    );
  if (!pattern || pattern.length > MAX_PATTERN_LENGTH)
    return fail(`The pattern must be 1 to ${MAX_PATTERN_LENGTH} characters.`);
  if (hasNestedRepeat(pattern))
    return fail(
      "The pattern repeats a repeated group, which can be very slow."
    );
  const line = compilePattern(pattern);
  if (!line) return fail("The pattern is not a valid regular expression.");
  if (line.test(""))
    return fail(
      "The pattern matches an empty line, so it would flag every line."
    );
  return { ok: true, compiled: { path: globToRegExp(paths), line } };
}
