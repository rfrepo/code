import { describe, expect, it } from "vitest";
import type { ModelMessage } from "ai";
import { replyAfterTool } from "agent/replyAfterTool";

const user: ModelMessage = { role: "user", content: "Add a rule" };
const toolResult: ModelMessage = {
  role: "tool",
  content: [
    {
      type: "tool-result",
      toolCallId: "t1",
      toolName: "addRule",
      output: { type: "text", value: "Added rule 1." }
    }
  ]
};

describe("replyAfterTool", () => {
  it("should offer the tools when the user spoke last", () => {
    expect(replyAfterTool({ messages: [user] })).toBeUndefined();
  });

  it("should offer no tools once a tool has answered, so the model replies in words", () => {
    expect(replyAfterTool({ messages: [user, toolResult] })).toEqual({
      activeTools: []
    });
  });
});
