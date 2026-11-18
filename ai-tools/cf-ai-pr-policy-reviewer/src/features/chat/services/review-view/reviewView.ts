import type { ReviewCard } from "shared/types/reviewCard";

export type Verdict = ReviewCard["findings"][number]["verdict"];
export type VerdictCount = { verdict: Verdict; count: number };

export type ReviewView = ReviewCard & {
  url?: string;
  counts: VerdictCount[];
};

const VERDICT_ORDER: Verdict[] = ["fail", "unclear", "pass"];
const PULL_REQUEST_REF = /^([\w.-]+)\/([\w.-]+)#(\d+)$/;

const pullRequestUrl = (ref: string) => {
  const match = PULL_REQUEST_REF.exec(ref);
  if (!match) return undefined;
  const [, owner, repo, number] = match;
  return `https://github.com/${owner}/${repo}/pull/${number}`;
};

const countVerdicts = (findings: ReviewCard["findings"]): VerdictCount[] =>
  VERDICT_ORDER.map((verdict) => ({
    verdict,
    count: findings.filter((finding) => finding.verdict === verdict).length
  })).filter(({ count }) => count > 0);

/** What the review card shows: the review, a link to the pull request and the verdict counts. */
export const reviewView = (review: ReviewCard): ReviewView => ({
  ...review,
  url: pullRequestUrl(review.pr),
  counts: countVerdicts(review.findings)
});
