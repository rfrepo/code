import { describe, expect, it } from "vitest";
import { prepareDiff } from "features/reviews/services/diff/prepareDiff";

const fileDiff = (path: string, body: string) =>
  `diff --git a/${path} b/${path}\n--- a/${path}\n+++ b/${path}\n@@ -1 +1 @@\n${body}\n`;

describe("prepareDiff", () => {
  it("should keep a small diff unchanged", () => {
    const diff = fileDiff("src/a.ts", "+const a = 1;");
    expect(prepareDiff(diff, 1000)).toEqual({
      text: diff,
      dropped: [],
      truncated: false
    });
  });

  it("should drop lockfiles and generated files", () => {
    const diff =
      fileDiff("package-lock.json", "+lock") +
      fileDiff("src/a.ts", "+const a = 1;") +
      fileDiff("dist/index.js", "+built") +
      fileDiff("pnpm-lock.yaml", "+lock");
    const result = prepareDiff(diff, 1000);
    expect(result.text).toBe(fileDiff("src/a.ts", "+const a = 1;"));
    expect(result.dropped).toEqual([
      "package-lock.json",
      "dist/index.js",
      "pnpm-lock.yaml"
    ]);
    expect(result.truncated).toBe(false);
  });

  it("should cut a diff over the budget at a line end and mark it truncated", () => {
    const diff = fileDiff("src/a.ts", "+line one\n+line two\n+line three");
    const result = prepareDiff(diff, 90);
    expect(result.truncated).toBe(true);
    expect(result.text.length).toBeLessThanOrEqual(90);
    expect(result.text.endsWith("\n")).toBe(true);
  });

  it("should judge a renamed file by its new path", () => {
    const moved =
      "diff --git a/src/a.ts b/dist/a.ts\nrename from src/a.ts\nrename to dist/a.ts\n--- a/src/a.ts\n+++ b/dist/a.ts\n@@ -1 +1 @@\n+x\n";
    expect(prepareDiff(moved, 1000).dropped).toEqual(["dist/a.ts"]);
  });

  it("should keep a build folder inside src", () => {
    const diff = fileDiff("src/build/index.ts", "+console.log(1);");
    expect(prepareDiff(diff, 1000)).toEqual({
      text: diff,
      dropped: [],
      truncated: false
    });
  });

  it("should keep a source file named like a map", () => {
    expect(prepareDiff(fileDiff("src/theme.map", "+x"), 1000).dropped).toEqual(
      []
    );
  });

  it("should drop a source map and build output in a package", () => {
    const diff =
      fileDiff("dist/app.js.map", "+map") +
      fileDiff("packages/ui/dist/index.js", "+built");
    expect(prepareDiff(diff, 1000).dropped).toEqual([
      "dist/app.js.map",
      "packages/ui/dist/index.js"
    ]);
  });

  it("should shorten a very long line so the model still sees the file", () => {
    const diff = fileDiff("src/bundle.ts", `+${"a".repeat(5000)}`);
    const result = prepareDiff(diff, 3000);
    expect(result.text).toContain("+++ b/src/bundle.ts");
    expect(result.text).toContain("[line shortened]");
    expect(result.truncated).toBe(false);
  });
});
