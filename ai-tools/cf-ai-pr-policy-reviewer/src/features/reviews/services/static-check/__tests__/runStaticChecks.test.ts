import { describe, expect, it } from "vitest";
import { runStaticChecks } from "features/reviews/services/static-check/runStaticChecks";

const DIFF = [
  "diff --git a/src/a.ts b/src/a.ts",
  "--- a/src/a.ts",
  "+++ b/src/a.ts",
  "@@ -1,1 +1,3 @@",
  " const a = 1;",
  "+console.log(a);",
  "+console.log(a, a);",
  "diff --git a/docs/b.ts b/docs/b.ts",
  "--- a/docs/b.ts",
  "+++ b/docs/b.ts",
  "@@ -0,0 +1 @@",
  "+console.log(b);",
  "diff --git a/dist/c.js b/dist/c.js",
  "--- a/dist/c.js",
  "+++ b/dist/c.js",
  "@@ -0,0 +1 @@",
  "+debugger;"
].join("\n");

const consoleRule = {
  id: 1,
  text: "No console.log in src/",
  check: { paths: "src/**", pattern: "console\\.log\\(", approved: true }
};

describe("runStaticChecks", () => {
  it("should fail with the first match and the match count", () => {
    expect(runStaticChecks(DIFF, [consoleRule])).toEqual([
      {
        ruleId: 1,
        rule: "No console.log in src/",
        verdict: "fail",
        file: "src/a.ts:2",
        reason: "Matches `console\\.log\\(` on 2 added lines.",
        source: "checked"
      }
    ]);
  });

  it("should pass when no added line in a generated file or other path matches", () => {
    const rule = {
      id: 2,
      text: "No debugger in docs/",
      check: { paths: "docs/*", pattern: "debugger", approved: true }
    };
    expect(runStaticChecks(DIFF, [rule])).toEqual([
      {
        ruleId: 2,
        rule: "No debugger in docs/",
        verdict: "pass",
        reason: "No added line matches the check.",
        source: "checked"
      }
    ]);
  });

  it("should skip rules whose check is not approved or missing", () => {
    const proposed = {
      ...consoleRule,
      check: { ...consoleRule.check, approved: false }
    };
    expect(
      runStaticChecks(DIFF, [proposed, { id: 3, text: "Judged" }])
    ).toEqual([]);
  });

  it("should give unclear for a stored check that is not valid", () => {
    const broken = {
      ...consoleRule,
      check: { paths: "src/**", pattern: "(", approved: true }
    };
    expect(runStaticChecks(DIFF, [broken])[0].verdict).toBe("unclear");
  });

  it("should check a file Git quoted for a space in its path", () => {
    const diff = [
      'diff --git "a/src/foo bar.ts" "b/src/foo bar.ts"',
      '+++ "b/src/foo bar.ts"',
      "@@ -0,0 +1 @@",
      "+console.log(1);"
    ].join("\n");
    expect(runStaticChecks(diff, [consoleRule])[0]).toMatchObject({
      verdict: "fail",
      file: "src/foo bar.ts:1"
    });
  });

  it("should check a build folder inside src", () => {
    const diff = [
      "diff --git a/src/build/x.ts b/src/build/x.ts",
      "+++ b/src/build/x.ts",
      "@@ -0,0 +1 @@",
      "+console.log(1);"
    ].join("\n");
    expect(runStaticChecks(diff, [consoleRule])[0]).toMatchObject({
      verdict: "fail",
      file: "src/build/x.ts:1"
    });
  });
});
