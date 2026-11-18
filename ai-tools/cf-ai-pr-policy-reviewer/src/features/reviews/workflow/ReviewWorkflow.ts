import type { Agent } from "agents";
import { NonRetryableError } from "cloudflare:workflows";
import {
  AgentWorkflow,
  type AgentWorkflowEvent,
  type AgentWorkflowStep
} from "agents/workflows";
import {
  prepareDiff,
  type PreparedDiff
} from "features/reviews/services/diff/prepareDiff";
import type { Finding } from "features/reviews/services/findings/parseFindings";
import {
  fetchPullRequest,
  GitHubError
} from "features/reviews/services/github/githubClient";
import { judgeDiff } from "features/reviews/services/judge/judgeDiff";
import { mergeFindings } from "features/reviews/services/merge-findings/mergeFindings";
import {
  formatPullRequestRef,
  type PullRequestRef
} from "features/reviews/services/pull-request-url/pullRequestUrl";
import {
  formatReport,
  reportNotes,
  summarise
} from "features/reviews/services/report/formatReport";
import type { CompletedReview } from "features/reviews/services/review-store/reviewStore";
import {
  hasApprovedCheck,
  runStaticChecks
} from "features/reviews/services/static-check/runStaticChecks";
import { createCompleteText } from "shared/services/workers-ai/llama";
import type { Rule } from "shared/types/rule";

export type ReviewParams = { pr: PullRequestRef; rules: Rule[] };

/** What the workflow needs from the agent that started it. */
export type ReviewHost = Agent<Env> & {
  saveReview: (review: CompletedReview, workflowId: string) => number;
};

// About 6k tokens of diff: room for the rules and the reply in Llama 3.3's context.
const DIFF_BUDGET_CHARS = 24_000;
const FETCH_RETRIES = {
  retries: { limit: 3, delay: "2 seconds", backoff: "exponential" },
  timeout: "30 seconds"
} as const;
const JUDGE_RETRIES = {
  retries: { limit: 2, delay: "5 seconds", backoff: "exponential" },
  timeout: "2 minutes"
} as const;

/**
 * Fetches, runs the static checks on the whole diff, and trims the diff for the model,
 * all in one step: a step result may not exceed 1 MiB, and a raw diff can.
 */
async function fetchAndCheckPullRequest(pr: PullRequestRef, rules: Rule[]) {
  try {
    const pull = await fetchPullRequest(pr);
    return {
      title: pull.title,
      diff: prepareDiff(pull.diff, DIFF_BUDGET_CHARS),
      checked: runStaticChecks(pull.diff, rules)
    };
  } catch (error) {
    if (error instanceof GitHubError && error.permanent)
      throw new NonRetryableError(error.message);
    throw error;
  }
}

type ReviewParts = {
  pr: PullRequestRef;
  title: string;
  diff: PreparedDiff;
  findings: Finding[];
};

/** The saved review: a one-line summary and the chat report. */
function buildReview({
  pr,
  title,
  diff,
  findings
}: ReviewParts): CompletedReview {
  const ref = formatPullRequestRef(pr);
  return {
    pr: ref,
    title,
    summary: summarise(findings, diff.truncated),
    report: formatReport({
      pr: ref,
      title,
      findings,
      truncated: diff.truncated,
      dropped: diff.dropped
    })
  };
}

/**
 * One review as durable steps: fetch and check, judge, save. Each step is retried on its
 * own and its result is stored, so a retry of a later step never refetches or re-judges.
 */
export class ReviewWorkflow extends AgentWorkflow<ReviewHost, ReviewParams> {
  async run(event: AgentWorkflowEvent<ReviewParams>, step: AgentWorkflowStep) {
    const { pr, rules } = event.payload;
    const { title, diff, checked } = await step.do(
      "fetch-pull-request",
      FETCH_RETRIES,
      () => fetchAndCheckPullRequest(pr, rules)
    );
    const judgedRules = rules.filter((rule) => !hasApprovedCheck(rule));
    const judged = await step.do("judge", JUDGE_RETRIES, () =>
      judgeDiff(
        { title, diff: diff.text, rules: judgedRules },
        createCompleteText(this.env.AI)
      )
    );
    const findings = mergeFindings(checked, judged.findings);
    const review = buildReview({ pr, title, diff, findings });
    const reviewId = await step.do("save-review", () =>
      this.agent.saveReview(review, event.instanceId)
    );
    const notes = reportNotes(diff);
    await step.reportComplete({ ...review, reviewId, findings, notes });
  }
}
