import {
  diffLines,
  parseDiffPath
} from "features/reviews/services/diff-path/diffPath";

export type AddedLine = { path: string; line: number; text: string };

const FILE_START = "diff --git ";
const HUNK_HEADER = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/;
const NEW_PATH = "+++ ";

type ParseState = {
  path: string | null;
  inHunk: boolean;
  next: number;
  added: AddedLine[];
};

function readHeaderLine(state: ParseState, raw: string) {
  if (raw.startsWith(NEW_PATH))
    state.path = parseDiffPath(raw.slice(NEW_PATH.length));
}

// Inside a hunk: "+" is added, " " is context, "-" and "\" do not move the new-file line number.
function readHunkLine(state: ParseState, raw: string) {
  if (raw.startsWith("+") && state.path)
    state.added.push({
      path: state.path,
      line: state.next,
      text: raw.slice(1)
    });
  if (raw.startsWith("+") || raw.startsWith(" ")) state.next += 1;
}

function readLine(state: ParseState, raw: string) {
  if (raw.startsWith(FILE_START)) {
    Object.assign(state, { path: null, inHunk: false });
    return;
  }
  const hunk = HUNK_HEADER.exec(raw);
  if (hunk) {
    Object.assign(state, { inHunk: true, next: Number(hunk[1]) });
    return;
  }
  if (state.inHunk) readHunkLine(state, raw);
  else readHeaderLine(state, raw);
}

/** Every line a unified diff adds, with its path and line number in the new file. Deleted files add none. */
export function addedLines(diff: string): AddedLine[] {
  const state: ParseState = { path: null, inHunk: false, next: 0, added: [] };
  for (const raw of diffLines(diff)) readLine(state, raw);
  return state.added;
}
