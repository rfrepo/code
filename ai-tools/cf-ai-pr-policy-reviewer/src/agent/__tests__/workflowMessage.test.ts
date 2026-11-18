import { describe, expect, it } from "vitest";
import { isPosted, workflowMessage } from "agent/workflowMessage";

describe("workflowMessage", () => {
  it("should build an assistant message whose id comes from the workflow", () => {
    expect(workflowMessage("wf-1", "Done.")).toEqual({
      id: "workflow-wf-1",
      role: "assistant",
      parts: [{ type: "text", text: "Done." }]
    });
  });

  it("should add the review card as a data part after the text", () => {
    const card = {
      reviewId: 7,
      pr: "a/b#1",
      title: "T",
      findings: [],
      notes: []
    };
    expect(workflowMessage("wf-1", "Done.", card).parts).toEqual([
      { type: "text", text: "Done." },
      { type: "data-review", data: card }
    ]);
  });
});

describe("isPosted", () => {
  it("should say whether a message with the id is already in the chat", () => {
    const posted = [workflowMessage("wf-1", "Done.")];
    expect(isPosted(posted, "workflow-wf-1")).toBe(true);
    expect(isPosted(posted, "workflow-wf-2")).toBe(false);
  });
});
