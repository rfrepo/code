import { describe, expect, it } from "vitest";
import {
  diffFilePath,
  parseDiffPath
} from "features/reviews/services/diff-path/diffPath";

describe("parseDiffPath", () => {
  it("should drop the a/ or b/ prefix", () => {
    expect(parseDiffPath("b/src/a.ts")).toBe("src/a.ts");
  });

  it("should unquote a path Git quoted for a space", () => {
    expect(parseDiffPath('"b/src/foo bar.ts"')).toBe("src/foo bar.ts");
  });

  it("should decode octal escapes as UTF-8", () => {
    expect(parseDiffPath('"b/src/caf\\303\\251.ts"')).toBe("src/café.ts");
  });

  it("should decode quote and backslash escapes", () => {
    expect(parseDiffPath('"b/src/a\\"b\\\\c.ts"')).toBe('src/a"b\\c.ts');
  });

  it("should drop the tab Git adds after a path with a space", () => {
    expect(parseDiffPath("b/src/foo bar.ts\t")).toBe("src/foo bar.ts");
  });

  it("should return null for /dev/null", () => {
    expect(parseDiffPath("/dev/null")).toBeNull();
  });
});

describe("diffFilePath", () => {
  it("should use the new path of a renamed file", () => {
    const lines = [
      "diff --git a/src/a.ts b/dist/a.ts",
      "similarity index 90%",
      "rename from src/a.ts",
      "rename to dist/a.ts",
      "--- a/src/a.ts",
      "+++ b/dist/a.ts",
      "@@ -1 +1 @@",
      "+++ b/ignored.ts"
    ];
    expect(diffFilePath(lines)).toBe("dist/a.ts");
  });

  it("should use the old path of a deleted file", () => {
    const lines = [
      "diff --git a/old.ts b/old.ts",
      "--- a/old.ts",
      "+++ /dev/null",
      "@@ -1 +0,0 @@",
      "-gone"
    ];
    expect(diffFilePath(lines)).toBe("old.ts");
  });

  it("should use rename to when a rename has no content change", () => {
    const lines = [
      "diff --git a/src/a.ts b/dist/a.ts",
      "similarity index 100%",
      "rename from src/a.ts",
      "rename to dist/a.ts"
    ];
    expect(diffFilePath(lines)).toBe("dist/a.ts");
  });

  it("should read the header of a binary file with a space in its name", () => {
    const lines = [
      "diff --git a/img/my logo.png b/img/my logo.png",
      "Binary files a/img/my logo.png and b/img/my logo.png differ"
    ];
    expect(diffFilePath(lines)).toBe("img/my logo.png");
  });
});
