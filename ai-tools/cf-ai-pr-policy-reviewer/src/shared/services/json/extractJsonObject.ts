/** JSON.parse that gives undefined, not an error, for text that is not JSON. */
function tryParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

type ScanState = { depth: number; inString: boolean; escaped: boolean };

// Moves the scan on by one character. Returns true when the object closes.
function scanChar(state: ScanState, char: string) {
  if (state.inString) {
    if (state.escaped) state.escaped = false;
    else if (char === "\\") state.escaped = true;
    else if (char === '"') state.inString = false;
    return false;
  }
  if (char === '"') state.inString = true;
  if (char === "{") state.depth += 1;
  if (char === "}") state.depth -= 1;
  return char === "}" && state.depth === 0;
}

/** The index of the "}" that closes the "{" at `start`, skipping braces inside strings. -1 if none. */
function closingBrace(text: string, start: number) {
  const state: ScanState = { depth: 0, inString: false, escaped: false };
  for (let i = start; i < text.length; i += 1)
    if (scanChar(state, text[i])) return i;
  return -1;
}

/**
 * Parses JSON, or the first balanced `{…}` inside prose or a code fence that is valid JSON.
 * Adapted from extractJsonObject in agent-harness (src/agents/reviewers/review-output.ts).
 */
export function extractJsonObject(raw: string): unknown {
  const trimmed = raw.trim();
  const whole = tryParse(trimmed);
  if (whole !== undefined) return whole;
  for (
    let start = trimmed.indexOf("{");
    start >= 0;
    start = trimmed.indexOf("{", start + 1)
  ) {
    const end = closingBrace(trimmed, start);
    const value = end < 0 ? undefined : tryParse(trimmed.slice(start, end + 1));
    if (value !== undefined) return value;
  }
  return null;
}
