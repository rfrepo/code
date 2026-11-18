import { plural } from "features/reviews/services/plural/plural";
import type { PullRequestRef } from "features/reviews/services/pull-request-url/pullRequestUrl";

export type PullRequest = { title: string; diff: string };

const GITHUB_API = "https://api.github.com";
// GitHub rejects API calls that send no User-Agent.
const USER_AGENT = "cf-ai-pr-policy-reviewer";
const JSON_MEDIA = "application/vnd.github+json";
const DIFF_MEDIA = "application/vnd.github.diff";
// A missing, private, too large or rate-limited pull request will not change within the retry window.
const PERMANENT_STATUSES = new Set([
  400, 401, 403, 404, 406, 409, 410, 422, 429
]);
// GitHub signals a rate limit with 403 or 429, plus x-ratelimit-remaining: 0 or retry-after.
const RATE_LIMIT_STATUSES = new Set([403, 429]);
const MS_PER_SECOND = 1000;
// "YYYY-MM-DDTHH:MM" from an ISO timestamp.
const ISO_MINUTE_LENGTH = 16;
const STATUS_MESSAGE: Record<number, (path: string) => string> = {
  404: (path) =>
    `GitHub has no pull request at ${path}, or the repository is private`,
  // GitHub answers 406 when a diff has too many files or lines to return.
  406: () =>
    "The pull request is too large for GitHub's API to return as a diff"
};

export class GitHubError extends Error {
  constructor(
    readonly status: number,
    path: string,
    readonly rateLimited = false,
    message = STATUS_MESSAGE[status]?.(path) ??
      `GitHub returned ${status} for ${path}`
  ) {
    super(message);
  }

  get permanent() {
    return this.rateLimited || PERMANENT_STATUSES.has(this.status);
  }
}

const isRateLimited = ({ status, headers }: Response) =>
  RATE_LIMIT_STATUSES.has(status) &&
  (headers.get("x-ratelimit-remaining") === "0" || headers.has("retry-after"));

// retry-after is a wait in seconds. x-ratelimit-reset is the reset time in epoch seconds.
function rateLimitMessage({ headers }: Response) {
  const retryAfter = Number(headers.get("retry-after"));
  if (retryAfter)
    return `GitHub asked for a pause, try again in ${plural(retryAfter, "second")}`;
  const reset = Number(headers.get("x-ratelimit-reset"));
  if (!reset) return "GitHub's API rate limit is used up, try again in an hour";
  const minute = new Date(reset * MS_PER_SECOND)
    .toISOString()
    .slice(0, ISO_MINUTE_LENGTH)
    .replace("T", " ");
  return `GitHub's API rate limit is used up, try again after ${minute} UTC`;
}

function toError(response: Response, path: string) {
  if (!isRateLimited(response)) return new GitHubError(response.status, path);
  return new GitHubError(
    response.status,
    path,
    true,
    rateLimitMessage(response)
  );
}

async function get(path: string, accept: string, fetcher: typeof fetch) {
  const response = await fetcher(`${GITHUB_API}${path}`, {
    headers: { accept, "user-agent": USER_AGENT }
  });
  if (!response.ok) throw toError(response, path);
  return response;
}

/** Reads a public pull request's title and unified diff. Throws GitHubError on any non-2xx reply. */
export async function fetchPullRequest(
  { owner, repo, number }: PullRequestRef,
  fetcher: typeof fetch = fetch
): Promise<PullRequest> {
  const path = `/repos/${owner}/${repo}/pulls/${number}`;
  const meta = (await (await get(path, JSON_MEDIA, fetcher)).json()) as {
    title: string;
  };
  const diff = await (await get(path, DIFF_MEDIA, fetcher)).text();
  return { title: meta.title, diff };
}
