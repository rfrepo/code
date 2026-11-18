import {
  diffFilePath,
  diffLines
} from "features/reviews/services/diff-path/diffPath";

export type PreparedDiff = {
  text: string;
  dropped: string[];
  truncated: boolean;
};

// Lockfiles, minified bundles and source maps: noise for a rule check.
const LOCKFILE =
  /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?|Cargo\.lock|composer\.lock|Gemfile\.lock|poetry\.lock)$/;
const BUNDLE = /\.min\.(js|css)$|\.(js|mjs|cjs|css)\.map$/;
// dist/ and build/ are build output, except inside a src/ folder, where they are source.
const BUILD_DIR = /(^|\/)(dist|build)\//;
const SOURCE_DIR = /(^|\/)src\//;
// A minified line can be longer than the whole budget. Shortened, the model still sees its file.
const MAX_LINE_CHARS = 1000;
const LONG_LINE = new RegExp(`^(.{${MAX_LINE_CHARS}}).+$`, "gm");
const SHORTENED = "$1 [line shortened]";

function isBuildOutput(path: string) {
  const match = BUILD_DIR.exec(path);
  return match !== null && !SOURCE_DIR.test(path.slice(0, match.index + 1));
}

export const isGeneratedPath = (path: string) =>
  LOCKFILE.test(path) || BUNDLE.test(path) || isBuildOutput(path);

function splitByFile(diff: string): { path: string; text: string }[] {
  const chunks = diff.split(/(?=^diff --git )/m).filter(Boolean);
  return chunks.map((text) => ({ path: diffFilePath(diffLines(text)), text }));
}

/** Drops generated files, shortens very long lines, then cuts what is left to `budget` characters at a line end. */
export function prepareDiff(diff: string, budget: number): PreparedDiff {
  const files = splitByFile(diff);
  const dropped = files
    .filter((f) => isGeneratedPath(f.path))
    .map((f) => f.path);
  const kept = files
    .filter((f) => !isGeneratedPath(f.path))
    .map((f) => f.text)
    .join("")
    .replace(LONG_LINE, SHORTENED);
  if (kept.length <= budget) return { text: kept, dropped, truncated: false };
  const cut = kept.slice(0, budget);
  return {
    text: cut.slice(0, cut.lastIndexOf("\n") + 1),
    dropped,
    truncated: true
  };
}
