import { describe, expect, it } from "vitest";
import { compileCheck } from "shared/services/static-check/compileCheck";

const compiled = (paths: string, pattern = "console\\.log\\(") => {
  const result = compileCheck({ paths, pattern });
  if (!result.ok) throw new Error(result.reason);
  return result.compiled;
};

describe("compileCheck", () => {
  it("should match paths with ** across folders and * within one folder", () => {
    const { path } = compiled("src/**/*.ts");
    expect(path.test("src/a.ts")).toBe(true);
    expect(path.test("src/api/routes/b.ts")).toBe(true);
    expect(path.test("lib/a.ts")).toBe(false);
    expect(path.test("src/a.tsx")).toBe(false);
  });

  it("should treat a dot in the glob as a dot, not any character", () => {
    expect(compiled("*.ts").path.test("axts")).toBe(false);
    expect(compiled("*.ts").path.test("a.ts")).toBe(true);
  });

  it("should compile the pattern for added lines", () => {
    expect(compiled("src/**").line.test("  console.log(x);")).toBe(true);
  });

  it("should reject a pattern that is invalid, matches empty lines or nests repeats", () => {
    expect(compileCheck({ paths: "src/**", pattern: "(" })).toEqual({
      ok: false,
      reason: "The pattern is not a valid regular expression."
    });
    expect(compileCheck({ paths: "src/**", pattern: "x*" })).toEqual({
      ok: false,
      reason: "The pattern matches an empty line, so it would flag every line."
    });
    expect(compileCheck({ paths: "src/**", pattern: "(a+)+b" })).toEqual({
      ok: false,
      reason: "The pattern repeats a repeated group, which can be very slow."
    });
  });

  it("should reject a glob with characters it does not support", () => {
    expect(compileCheck({ paths: "src/{a,b}/**", pattern: "x" }).ok).toBe(
      false
    );
    expect(compileCheck({ paths: "", pattern: "x" }).ok).toBe(false);
  });

  it.each(["((a)+)+", "(?:a+)+", "(a{2,})*", "(a?)+", "((ab)*c)+", "((a+))+"])(
    "should reject the nested repeat %s",
    (pattern) => {
      expect(compileCheck({ paths: "src/**", pattern })).toEqual({
        ok: false,
        reason: "The pattern repeats a repeated group, which can be very slow."
      });
    }
  );

  it.each(["(?:ab)+", "(a|b)+", "(\\d+)x", "[(]a+[)]+", "\\(a+\\)+"])(
    "should accept the safe pattern %s",
    (pattern) => {
      expect(compileCheck({ paths: "src/**", pattern }).ok).toBe(true);
    }
  );

  it("should accept a scoped package path", () => {
    expect(compiled("packages/@app/**").path.test("packages/@app/a.ts")).toBe(
      true
    );
  });
});
