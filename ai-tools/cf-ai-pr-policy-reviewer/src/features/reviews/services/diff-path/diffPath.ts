const DELETED = "/dev/null";
const SIDE_PREFIX = /^[ab]\//;
const QUOTED = /^"(.*)"$/s;
// Git adds a tab after a path that has a space in it.
const TRAILER = /\t.*$/s;
const FILE_HEADER = "diff --git ";
const HUNK_START = "@@";
// Git C-quotes unusual paths: octal bytes of UTF-8, or a backslash before one character.
const QUOTED_TOKEN = /\\([0-7]{3})|\\(.)|([^\\]+)/gs;
const OCTAL = 8;
const ESCAPED: Record<string, string> = {
  a: "\x07",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
  v: "\v"
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const tokenBytes = ([, octal, escaped, plain]: RegExpExecArray) => {
  if (octal) return [Number.parseInt(octal, OCTAL)];
  return [...encoder.encode(escaped ? (ESCAPED[escaped] ?? escaped) : plain)];
};

const unquote = (body: string) =>
  decoder.decode(
    Uint8Array.from([...body.matchAll(QUOTED_TOKEN)].flatMap(tokenBytes))
  );

/** A path as Git writes it, unquoted and with its trailing tab removed. */
function diffName(field: string): string {
  const name = field.replace(TRAILER, "");
  const quoted = QUOTED.exec(name);
  return quoted ? unquote(quoted[1]) : name;
}

/** The path in a `---` or `+++` line, without its a/ or b/ prefix. Null for /dev/null. */
export function parseDiffPath(field: string): string | null {
  const name = diffName(field);
  return name === DELETED ? null : name.replace(SIDE_PREFIX, "");
}

// The new path when the file has one, else the old path. "rename to" has no prefix.
const HEADER_FIELDS: [string, (field: string) => string | null][] = [
  ["+++ ", parseDiffPath],
  ["--- ", parseDiffPath],
  ["rename to ", diffName]
];

// Only a header-only chunk (a binary file or a mode change) gets here. Its two names match.
function headerPath(header: string) {
  const names = header.slice(FILE_HEADER.length);
  const quotedStart = names.lastIndexOf(' "b/');
  const start = quotedStart >= 0 ? quotedStart : names.lastIndexOf(" b/");
  return parseDiffPath(names.slice(start + 1)) ?? "";
}

/** The path one file's chunk of a unified diff is about: the new path, or the old one for a deleted file. */
export function diffFilePath(lines: string[]): string {
  const hunkStart = lines.findIndex((line) => line.startsWith(HUNK_START));
  const header = hunkStart >= 0 ? lines.slice(0, hunkStart) : lines;
  for (const [marker, read] of HEADER_FIELDS) {
    const line = header.find((l) => l.startsWith(marker));
    const path = line && read(line.slice(marker.length));
    if (path) return path;
  }
  return headerPath(lines[0] ?? "");
}

/** Splits a diff into lines, with or without CRLF line ends. */
export const diffLines = (diff: string) => diff.split(/\r?\n/);
