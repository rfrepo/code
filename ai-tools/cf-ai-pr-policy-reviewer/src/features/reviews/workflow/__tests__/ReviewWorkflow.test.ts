import { beforeEach, describe, expect, it, vi } from "vitest";

const github = vi.hoisted(() => ({ fetchPullRequest: vi.fn() }));
const model = vi.hoisted(() => ({ complete: vi.fn() }));

vi.mock("cloudflare:workflows", () => ({
  NonRetryableError: class NonRetryableError extends Error {}
}));
vi.mock("agents/workflows", () => ({ AgentWorkflow: class AgentWorkflow {} }));
vi.mock("shared/services/workers-ai/llama", () => ({
  createCompleteText: () => model.complete
}));
vi.mock("features/reviews/services/github/githubClient", async (original) => ({
  ...(await original<object>()),
  fetchPullRequest: github.fetchPullRequest
}));

import { NonRetryableError } from "cloudflare:workflows";
import { GitHubError } from "features/reviews/services/github/githubClient";
import { ReviewWorkflow } from "features/reviews/workflow/ReviewWorkflow";

const PR = { owner: "acme", repo: "pay", number: 4 };
const DIFF = [
  "diff --git a/src/a.ts b/src/a.ts",
  "--- a/src/a.ts",
  "+++ b/src/a.ts",
  "@@ -0,0 +1 @@",
  "+console.log(1);",
  ""
].join("\n");
const CHECKED_RULE = {
  id: 1,
  text: "No console.log in src/",
  check: { paths: "src/**", pattern: "console\\.log\\(", approved: true }
};
const JUDGED_RULE = { id: 2, text: "Every API route has a test" };
const JUDGE_REPLY =
  '{"findings":[{"ruleId":2,"verdict":"pass","reason":"No route changed."}]}';

const runSteps = {
  do: vi.fn(async (_name: string, configOrRun: unknown, run?: () => unknown) =>
    typeof configOrRun === "function" ? configOrRun() : run?.()
  ),
  reportComplete: vi.fn()
};

const setupWorkflow = () => {
  const saveReview = vi.fn().mockReturnValue(7);
  const workflow = Object.assign(new ReviewWorkflow({} as never, {} as never), {
    env: { AI: {} },
    agent: { saveReview }
  });
  const run = (rules: object[]) =>
    workflow.run(
      { payload: { pr: PR, rules }, instanceId: "wf-1" } as never,
      runSteps as never
    );
  return { run, saveReview };
};

describe("ReviewWorkflow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    github.fetchPullRequest.mockResolvedValue({
      title: "Add refunds",
      diff: DIFF
    });
    model.complete.mockResolvedValue(JUDGE_REPLY);
  });

  it("should make no model call when every rule has an approved check", async () => {
    const { run, saveReview } = setupWorkflow();
    await run([CHECKED_RULE]);
    expect(model.complete).not.toHaveBeenCalled();
    expect(saveReview).toHaveBeenCalledWith(
      expect.objectContaining({
        pr: "acme/pay#4",
        summary: "1 fail, 0 pass, 0 unclear"
      }),
      "wf-1"
    );
  });

  it("should judge only the unchecked rules and merge both results", async () => {
    const { run, saveReview } = setupWorkflow();
    await run([CHECKED_RULE, JUDGED_RULE]);
    expect(model.complete).toHaveBeenCalledTimes(1);
    expect(model.complete.mock.calls[0][0].user).toContain(
      "Every API route has a test"
    );
    expect(model.complete.mock.calls[0][0].user).not.toContain(
      "No console.log in src/"
    );
    expect(saveReview.mock.calls[0][0].summary).toBe(
      "1 fail, 1 pass, 0 unclear"
    );
  });

  it("should report the saved review id when it finishes", async () => {
    const { run } = setupWorkflow();
    await run([CHECKED_RULE]);
    expect(runSteps.reportComplete).toHaveBeenCalledWith(
      expect.objectContaining({
        pr: "acme/pay#4",
        reviewId: 7,
        notes: [],
        findings: [
          expect.objectContaining({
            ruleId: 1,
            verdict: "fail",
            source: "checked"
          })
        ]
      })
    );
  });

  it("should stop retrying on a permanent GitHub error", async () => {
    github.fetchPullRequest.mockRejectedValue(
      new GitHubError(404, "/repos/acme/pay/pulls/4")
    );
    const { run, saveReview } = setupWorkflow();
    await expect(run([CHECKED_RULE])).rejects.toBeInstanceOf(NonRetryableError);
    expect(saveReview).not.toHaveBeenCalled();
  });

  it("should let a server error from GitHub be retried", async () => {
    github.fetchPullRequest.mockRejectedValue(
      new GitHubError(502, "/repos/acme/pay/pulls/4")
    );
    const { run } = setupWorkflow();
    await expect(run([CHECKED_RULE])).rejects.toBeInstanceOf(GitHubError);
  });
});
