export type PullRequestRef = { owner: string; repo: string; number: number };

const DOT_SEGMENT = /^\.+$/;
const GITHUB_HOSTS = new Set(["github.com", "www.github.com"]);
// Up to 9 digits: well past any real pull request number, and exact as a JavaScript number.
const PULL_REQUEST_PATH = /^\/([\w.-]+)\/([\w.-]+)\/pull\/(\d{1,9})(?:\/.*)?$/;

export function parsePullRequestUrl(input: string): PullRequestRef | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (!GITHUB_HOSTS.has(url.hostname)) return null;
  const match = PULL_REQUEST_PATH.exec(url.pathname);
  if (!match) return null;
  if (DOT_SEGMENT.test(match[1]) || DOT_SEGMENT.test(match[2])) return null;
  return { owner: match[1], repo: match[2], number: Number(match[3]) };
}

export const formatPullRequestRef = ({ owner, repo, number }: PullRequestRef) =>
  `${owner}/${repo}#${number}`;
