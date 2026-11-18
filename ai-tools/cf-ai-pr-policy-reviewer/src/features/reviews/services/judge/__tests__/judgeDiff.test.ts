import { describe, expect, it, vi } from "vitest";
import { judgeDiff } from "features/reviews/services/judge/judgeDiff";

const input = {
  title: "Add refunds",
  diff: "+console.log(x)\n",
  rules: [{ id: 1, text: "No console.log in src/" }]
};
const VALID =
  '{"findings":[{"ruleId":1,"verdict":"fail","file":"src/a.ts:3","reason":"Logs."}]}';

describe("judgeDiff", () => {
  it("should not call the model when no rule needs judgement", async () => {
    const complete = vi.fn();
    const result = await judgeDiff({ ...input, rules: [] }, complete);
    expect(complete).not.toHaveBeenCalled();
    expect(result).toEqual({ parsed: true, findings: [] });
  });

  it("should make one model call when the reply is valid", async () => {
    const complete = vi.fn().mockResolvedValue(VALID);
    const result = await judgeDiff(input, complete);
    expect(complete).toHaveBeenCalledTimes(1);
    expect(result.findings[0].verdict).toBe("fail");
  });

  it("should repair a reply that is not JSON with one more call", async () => {
    const complete = vi
      .fn()
      .mockResolvedValueOnce("Rule 1 fails: it logs.")
      .mockResolvedValueOnce(VALID);
    const result = await judgeDiff(input, complete);
    expect(complete).toHaveBeenCalledTimes(2);
    expect(complete.mock.calls[1][0].user).toContain("Rule 1 fails: it logs.");
    expect(result).toEqual({
      parsed: true,
      findings: [
        {
          ruleId: 1,
          rule: "No console.log in src/",
          verdict: "fail",
          file: "src/a.ts:3",
          reason: "Logs."
        }
      ]
    });
  });

  it("should mark every rule unclear when the repair also fails", async () => {
    const complete = vi.fn().mockResolvedValue("still prose");
    const result = await judgeDiff(input, complete);
    expect(complete).toHaveBeenCalledTimes(2);
    expect(result.findings.map((f) => f.verdict)).toEqual(["unclear"]);
  });

  it("should repair a reply whose findings match no rule", async () => {
    const complete = vi
      .fn()
      .mockResolvedValueOnce('{"findings":[{"rule":"one","verdict":"fail"}]}')
      .mockResolvedValueOnce(VALID);
    const result = await judgeDiff(input, complete);
    expect(complete).toHaveBeenCalledTimes(2);
    expect(result.findings[0].verdict).toBe("fail");
  });
});
