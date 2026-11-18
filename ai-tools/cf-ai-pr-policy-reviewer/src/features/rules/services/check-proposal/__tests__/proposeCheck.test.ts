import { describe, expect, it, vi } from "vitest";
import { proposeCheck } from "features/rules/services/check-proposal/proposeCheck";

const replying = (reply: string) => vi.fn().mockResolvedValue(reply);

describe("proposeCheck", () => {
  it("should return the check the model proposes", async () => {
    const complete = replying(
      '{"check":{"paths":"src/**","pattern":"console\\\\.log\\\\("}}'
    );
    expect(await proposeCheck("No console.log in src/", complete)).toEqual({
      paths: "src/**",
      pattern: "console\\.log\\("
    });
    expect(complete.mock.calls[0][0].user).toBe("Rule: No console.log in src/");
  });

  it("should return null when the rule needs judgement", async () => {
    expect(
      await proposeCheck("Errors are clear", replying('{"check":null}'))
    ).toBeNull();
  });

  it("should return null for a reply that is not JSON or a check that is unsafe", async () => {
    expect(await proposeCheck("x", replying("I am not sure"))).toBeNull();
    expect(
      await proposeCheck(
        "x",
        replying('{"check":{"paths":"src/**","pattern":".*"}}')
      )
    ).toBeNull();
  });
});
