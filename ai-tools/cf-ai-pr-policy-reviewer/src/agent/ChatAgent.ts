import { AIChatAgent, type OnChatMessageOptions } from "@cloudflare/ai-chat";
import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { SYSTEM_PROMPT } from "agent/systemPrompt";
import { replyAfterTool } from "agent/replyAfterTool";
import { isPosted, workflowMessage } from "agent/workflowMessage";
import {
  describeFailedReview,
  describeFinishedReview,
  reviewCardOf
} from "features/reviews/services/review-result/reviewResult";
import {
  createReviewStore,
  type CompletedReview,
  type ReviewStore
} from "features/reviews/services/review-store/reviewStore";
import { createReviewActions } from "features/reviews/tools/reviewActions";
import { createReviewTools } from "features/reviews/tools/reviewTools";
import type { ReviewParams } from "features/reviews/workflow/ReviewWorkflow";
import {
  createRuleStore,
  type RuleStore
} from "features/rules/services/rule-store/ruleStore";
import { proposeCheck } from "features/rules/services/check-proposal/proposeCheck";
import { createRuleActions } from "features/rules/tools/ruleActions";
import { createRuleTools } from "features/rules/tools/ruleTools";
import {
  createCompleteText,
  createLlama
} from "shared/services/workers-ai/llama";
import type { ReviewCard } from "shared/types/reviewCard";

const REVIEW_WORKFLOW = "REVIEW_WORKFLOW";
// One step for tool calls, which can be several at once, and one for the reply (replyAfterTool).
const MAX_TOOL_STEPS = 2;
const CHAT_MAX_OUTPUT_TOKENS = 1024;
// Llama 3.3 has a 24k-token context. The chat keeps 100 messages, but a turn needs only the recent ones.
const CONTEXT_MESSAGES = 20;

/**
 * The chat. It joins the rules and reviews features, which never import each other,
 * starts review workflows, and posts each workflow's result into the conversation.
 */
export class ChatAgent extends AIChatAgent<Env> {
  maxPersistedMessages = 100;

  // Created on first use: the Agent's SQLite is ready by then, and the tables are made once.
  private ruleStore?: RuleStore;
  private reviewStore?: ReviewStore;

  private get rules() {
    return (this.ruleStore ??= createRuleStore(this.sql.bind(this)));
  }

  private get reviews() {
    return (this.reviewStore ??= createReviewStore(this.sql.bind(this)));
  }

  private tools() {
    const rules = this.rules;
    const reviewActions = createReviewActions({
      listRules: rules.list,
      reviews: this.reviews,
      startReview: async (pr, ruleList) => {
        await this.runWorkflow<ReviewParams>(REVIEW_WORKFLOW, {
          pr,
          rules: ruleList
        });
      }
    });
    return {
      ...createRuleTools(createRuleActions(rules, this.proposeCheck)),
      ...createReviewTools(reviewActions)
    };
  }

  private proposeCheck = (ruleText: string) =>
    proposeCheck(ruleText, createCompleteText(this.env.AI));

  async onChatMessage(_onFinish: unknown, options?: OnChatMessageOptions) {
    const result = streamText({
      model: createLlama(this.env.AI),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(
        this.messages.slice(-CONTEXT_MESSAGES)
      ),
      tools: this.tools(),
      prepareStep: replyAfterTool,
      stopWhen: stepCountIs(MAX_TOOL_STEPS),
      maxOutputTokens: CHAT_MAX_OUTPUT_TOKENS,
      abortSignal: options?.abortSignal
    });
    return result.toUIMessageStreamResponse();
  }

  /** Called by ReviewWorkflow's save step over RPC. */
  saveReview(review: CompletedReview, workflowId: string): number {
    return this.reviews.save(review, workflowId);
  }

  async onWorkflowComplete(
    _name: string,
    workflowId: string,
    result?: unknown
  ) {
    await this.post(
      workflowId,
      describeFinishedReview(result),
      reviewCardOf(result)
    );
  }

  async onWorkflowError(_name: string, workflowId: string, error: string) {
    const savedReviewId = this.reviews.forWorkflow(workflowId);
    await this.post(workflowId, describeFailedReview(error, savedReviewId));
  }

  /** Adds an assistant message without starting a model turn, once per workflow. */
  private async post(workflowId: string, text: string, card?: ReviewCard) {
    const message = workflowMessage(workflowId, text, card);
    if (isPosted(this.messages, message.id)) return;
    await this.persistMessages([...this.messages, message]);
  }
}
