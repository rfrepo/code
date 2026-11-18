import { streamText, tool } from "ai";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createLlama } from "shared/services/workers-ai/llama";

const ARGUMENT_PIECES = [
  '{"text": "',
  "no",
  " console",
  ".log",
  " in",
  " src",
  '/"}'
];

const sseChunk = (body: object) => `data: ${JSON.stringify(body)}\n\n`;

const streamedToolCall = () =>
  [
    sseChunk({
      choices: [
        {
          delta: {
            tool_calls: [
              {
                id: "call-1",
                type: "function",
                index: 0,
                function: { name: "addRule" }
              }
            ]
          }
        }
      ],
      tool_calls: [{ name: "addRule" }]
    }),
    ...ARGUMENT_PIECES.map((piece) =>
      sseChunk({
        choices: [
          {
            delta: {
              tool_calls: [{ index: 0, function: { arguments: piece } }]
            }
          }
        ],
        tool_calls: [{ arguments: piece }]
      })
    ),
    sseChunk({ choices: [{ delta: {}, finish_reason: "tool_calls" }] }),
    "data: [DONE]\n\n"
  ].join("");

const generatedToolCall = {
  choices: [
    {
      message: {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call-1",
            type: "function",
            function: {
              name: "addRule",
              arguments: '{"text": "no console.log in src/"}'
            }
          }
        ]
      },
      finish_reason: "tool_calls"
    }
  ],
  usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 }
};

const workersAi = {
  run: async (_model: string, inputs: { stream?: boolean }) =>
    inputs.stream ? new Response(streamedToolCall()).body : generatedToolCall
} as unknown as Ai;

describe("createLlama", () => {
  it("should pass a streamed chat tool call its arguments once", async () => {
    const inputs: unknown[] = [];
    const result = streamText({
      model: createLlama(workersAi),
      prompt: "Add a rule: no console.log in src/",
      tools: {
        addRule: tool({
          inputSchema: z.object({ text: z.string() }),
          execute: async (input) => {
            inputs.push(input);
            return "added";
          }
        })
      }
    });
    await result.consumeStream();

    expect(inputs).toEqual([{ text: "no console.log in src/" }]);
  });
});
