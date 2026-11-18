import {
  formatPullRequestRef,
  parsePullRequestUrl,
  type PullRequestRef
} from "features/reviews/services/pull-request-url/pullRequestUrl";
import type {
  ReviewStore,
  SavedReview
} from "features/reviews/services/review-store/reviewStore";
import { plural } from "features/reviews/services/plural/plural";
import type { Rule } from "shared/types/rule";

const RECENT_REVIEWS_LIMIT = 5;

const BAD_URL =
  "That is not a pull request link. I need a link such as https://github.com/cloudflare/agents/pull/100.";
const NO_RULES = "There are no rules yet. Add a rule first, then ask again.";
const NO_REVIEWS = "There are no saved reviews yet.";

export type ReviewActionsDeps = {
  listRules: () => Rule[];
  startReview: (pr: PullRequestRef, rules: Rule[]) => Promise<void>;
  reviews: ReviewStore;
};

const reviewLine = (r: SavedReview) =>
  `Review ${r.id}, ${r.pr} (${r.createdAt}): ${r.summary}`;

/** What the agent says back for each review tool (spec V1 to V3, V7). */
export function createReviewActions(deps: ReviewActionsDeps) {
  const reviewPullRequest = async (url: string) => {
    const pr = parsePullRequestUrl(url);
    if (!pr) return BAD_URL;
    const rules = deps.listRules();
    if (rules.length === 0) return NO_RULES;
    await deps.startReview(pr, rules);
    return `Started a review of ${formatPullRequestRef(pr)} against ${plural(rules.length, "rule")}. I will post the result here when it finishes.`;
  };

  // The user may paste the link instead of owner/repo#number.
  const findReview = (pr: string) => {
    const link = parsePullRequestUrl(pr);
    const ref = link ? formatPullRequestRef(link) : pr;
    const [latest] = deps.reviews.forPullRequest(ref);
    return latest ? latest.report : `I have no saved review of ${ref}.`;
  };

  const listReviews = () => {
    const recent = deps.reviews.recent(RECENT_REVIEWS_LIMIT);
    return recent.length === 0 ? NO_REVIEWS : recent.map(reviewLine).join("\n");
  };

  return { reviewPullRequest, findReview, listReviews };
}

export type ReviewActions = ReturnType<typeof createReviewActions>;
