import { describe, expect, it } from "vitest";
import type { UIMessage } from "ai";
import { toChatParts } from "features/chat/services/chat-parts/chatParts";

const message = (
  role: UIMessage["role"],
  parts: UIMessage["parts"]
): UIMessage => ({ id: "m1", role, parts });

describe("toChatParts", () => {
  it("should map user and assistant text to their own bubbles", () => {
    expect(
      toChatParts(message("user", [{ type: "text", text: "Hi" }]))
    ).toEqual([{ kind: "userText", text: "Hi" }]);
    expect(
      toChatParts(message("assistant", [{ type: "text", text: "Hello" }]))
    ).toEqual([{ kind: "assistantText", text: "Hello" }]);
  });

  it("should drop empty text and parts the chat does not show", () => {
    expect(
      toChatParts(
        message("assistant", [
          { type: "text", text: "" },
          { type: "step-start" },
          { type: "reasoning", text: "thinking" }
        ])
      )
    ).toEqual([]);
  });

  it("should show a finished tool call with its input and output", () => {
    const parts = toChatParts(
      message("assistant", [
        {
          type: "tool-addRule",
          toolCallId: "t1",
          state: "output-available",
          input: { text: "No console.log in src/" },
          output: "Added rule 1."
        }
      ])
    );
    expect(parts).toEqual([
      {
        kind: "tool",
        tool: {
          name: "addRule",
          status: "done",
          input: '{\n  "text": "No console.log in src/"\n}',
          output: "Added rule 1.",
          error: undefined
        }
      }
    ]);
  });

  it("should show a running tool call and a failed one", () => {
    const parts = toChatParts(
      message("assistant", [
        {
          type: "tool-listRules",
          toolCallId: "t1",
          state: "input-available",
          input: {}
        },
        {
          type: "tool-reviewPullRequest",
          toolCallId: "t2",
          state: "output-error",
          input: undefined,
          errorText: "GitHub said 404"
        }
      ])
    );
    expect(parts).toEqual([
      {
        kind: "tool",
        tool: {
          name: "listRules",
          status: "running",
          input: "{}",
          output: undefined,
          error: undefined
        }
      },
      {
        kind: "tool",
        tool: {
          name: "reviewPullRequest",
          status: "failed",
          input: undefined,
          output: undefined,
          error: "GitHub said 404"
        }
      }
    ]);
  });

  it("should show a posted review as a card and drop its text", () => {
    const review = {
      reviewId: 7,
      pr: "a/b#1",
      title: "Add refunds",
      findings: [],
      notes: []
    };
    expect(
      toChatParts(
        message("assistant", [
          { type: "text", text: "**Review of a/b#1**" },
          { type: "data-review", data: review }
        ])
      )
    ).toEqual([{ kind: "review", review }]);
  });

  it("should keep the text when the review data cannot be read", () => {
    expect(
      toChatParts(
        message("assistant", [
          { type: "text", text: "**Review of a/b#1**" },
          { type: "data-review", data: { reviewId: "seven" } }
        ])
      )
    ).toEqual([{ kind: "assistantText", text: "**Review of a/b#1**" }]);
  });

  it("should show a call that waits for the user with its approval id", () => {
    expect(
      toChatParts(
        message("assistant", [
          {
            type: "tool-removeRule",
            toolCallId: "t1",
            state: "approval-requested",
            input: { id: 1 },
            approval: { id: "ap-1" }
          }
        ])
      )
    ).toEqual([
      {
        kind: "tool",
        tool: {
          name: "removeRule",
          status: "waiting",
          approvalId: "ap-1",
          input: '{\n  "id": 1\n}',
          output: undefined,
          error: undefined
        }
      }
    ]);
  });

  it("should show a call the user denied", () => {
    expect(
      toChatParts(
        message("assistant", [
          {
            type: "tool-removeRule",
            toolCallId: "t1",
            state: "output-denied",
            input: { id: 1 },
            approval: { id: "ap-1", approved: false }
          }
        ])
      )
    ).toEqual([
      {
        kind: "tool",
        tool: {
          name: "removeRule",
          status: "denied",
          input: '{\n  "id": 1\n}',
          output: undefined,
          error: undefined
        }
      }
    ]);
  });
});
