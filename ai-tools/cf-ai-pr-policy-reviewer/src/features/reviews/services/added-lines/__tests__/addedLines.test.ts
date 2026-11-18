import { describe, expect, it } from "vitest";
import { addedLines } from "features/reviews/services/added-lines/addedLines";

const EDITED = [
  "diff --git a/src/a.ts b/src/a.ts",
  "--- a/src/a.ts",
  "+++ b/src/a.ts",
  "@@ -10,3 +10,4 @@",
  " const a = 1;",
  "-const b = 2;",
  "+console.log(a);",
  " const c = 3;",
  "+++x;"
].join("\n");

const NEW_AND_DELETED = [
  "diff --git a/new.ts b/new.ts",
  "new file mode 100644",
  "--- /dev/null",
  "+++ b/new.ts",
  "@@ -0,0 +1,2 @@",
  "+one",
  "+two",
  "diff --git a/old.ts b/old.ts",
  "deleted file mode 100644",
  "--- a/old.ts",
  "+++ /dev/null",
  "@@ -1 +0,0 @@",
  "-gone",
  ""
].join("\n");

describe("addedLines", () => {
  it("should number added lines in the new file, skipping removed lines", () => {
    expect(addedLines(EDITED)).toEqual([
      { path: "src/a.ts", line: 11, text: "console.log(a);" },
      { path: "src/a.ts", line: 13, text: "++x;" }
    ]);
  });

  it("should read new files and skip deleted files", () => {
    expect(addedLines(NEW_AND_DELETED)).toEqual([
      { path: "new.ts", line: 1, text: "one" },
      { path: "new.ts", line: 2, text: "two" }
    ]);
  });

  it("should unquote a path Git quoted for a space", () => {
    const diff = [
      'diff --git "a/src/foo bar.ts" "b/src/foo bar.ts"',
      '--- "a/src/foo bar.ts"',
      '+++ "b/src/foo bar.ts"',
      "@@ -0,0 +1 @@",
      "+console.log(1);"
    ].join("\n");
    expect(addedLines(diff)).toEqual([
      { path: "src/foo bar.ts", line: 1, text: "console.log(1);" }
    ]);
  });

  it("should read a diff with CRLF line ends", () => {
    const diff = [
      "diff --git a/src/a.ts b/src/a.ts",
      "--- a/src/a.ts",
      "+++ b/src/a.ts",
      "@@ -0,0 +1 @@",
      "+console.log(1);"
    ].join("\r\n");
    expect(addedLines(diff)).toEqual([
      { path: "src/a.ts", line: 1, text: "console.log(1);" }
    ]);
  });
});
