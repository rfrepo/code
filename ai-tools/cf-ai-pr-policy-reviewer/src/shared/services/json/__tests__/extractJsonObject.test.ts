import { describe, expect, it } from "vitest";
import { extractJsonObject } from "shared/services/json/extractJsonObject";

describe("extractJsonObject", () => {
  it("should parse plain JSON and JSON inside prose or a code fence", () => {
    expect(extractJsonObject('{"a":1}')).toEqual({ a: 1 });
    expect(extractJsonObject('Sure:\n```json\n{"a":1}\n```')).toEqual({ a: 1 });
  });

  it("should return null when there is no JSON object", () => {
    expect(extractJsonObject("no json here")).toBeNull();
    expect(extractJsonObject("{broken")).toBeNull();
  });

  it("should find the JSON object after prose that has other braces", () => {
    const raw = 'I used {braces} here. {"findings":[]} Hope that {helps}.';
    expect(extractJsonObject(raw)).toEqual({ findings: [] });
  });

  it("should not end the object at a brace inside a string", () => {
    expect(extractJsonObject('Result: {"reason":"uses }"} done')).toEqual({
      reason: "uses }"
    });
  });
});
