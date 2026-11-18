import {
  generateText,
  simulateStreamingMiddleware,
  wrapLanguageModel,
  type LanguageModel
} from "ai";
import { createWorkersAI } from "workers-ai-provider";
import type { ChatPrompt } from "shared/types/chatPrompt";

// The assignment's recommended model: Llama 3.3 70B on Workers AI.
const LLAMA_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
// Without a limit the model stops at 256 tokens, which cuts off a report on many rules.
const COMPLETION_MAX_OUTPUT_TOKENS = 2048;

// A Workers AI stream repeats each tool-call piece in two fields, and workers-ai-provider 4.0.1
// reads both, so every tool call gets doubled JSON. One generate call per step avoids it.
export const createLlama = (ai: Ai): LanguageModel =>
  wrapLanguageModel({
    model: createWorkersAI({ binding: ai })(LLAMA_MODEL),
    middleware: simulateStreamingMiddleware()
  });

/** One prompt in, the model's text out. */
export type CompleteText = (prompt: ChatPrompt) => Promise<string>;

export const createCompleteText =
  (ai: Ai): CompleteText =>
  async ({ system, user }) => {
    const { text } = await generateText({
      model: createLlama(ai),
      system,
      prompt: user,
      maxOutputTokens: COMPLETION_MAX_OUTPUT_TOKENS
    });
    return text;
  };
