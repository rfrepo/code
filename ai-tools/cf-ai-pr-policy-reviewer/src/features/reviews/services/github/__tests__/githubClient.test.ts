import { describe, expect, it } from "vitest";
import {
  fetchPullRequest,
  GitHubError
} from "features/reviews/services/github/githubClient";

const ref = { owner: "acme", repo: "pay", number: 4 };

const fakeFetch =
  (replies: Record<string, Response>): typeof fetch =>
  async (input, init) => {
    const accept = new Headers(init?.headers).get("accept") ?? "";
    return (
      replies[`${String(input)} ${accept}`] ?? new Response("", { status: 500 })
    );
  };

describe("fetchPullRequest", () => {
  it("should return the title and the diff", async () => {
    const url = "https://api.github.com/repos/acme/pay/pulls/4";
    const fetcher = fakeFetch({
      [`${url} application/vnd.github+json`]: Response.json({
        title: "Add refunds"
      }),
      [`${url} application/vnd.github.diff`]: new Response(
        "diff --git a/x b/x\n"
      )
    });
    expect(await fetchPullRequest(ref, fetcher)).toEqual({
      title: "Add refunds",
      diff: "diff --git a/x b/x\n"
    });
  });

  it("should throw a GitHubError with the status when GitHub fails", async () => {
    const fetcher: typeof fetch = async () => new Response("", { status: 404 });
    await expect(fetchPullRequest(ref, fetcher)).rejects.toEqual(
      new GitHubError(404, "/repos/acme/pay/pulls/4")
    );
  });

  it("should mark missing and forbidden pull requests as permanent, server errors as not", () => {
    expect(new GitHubError(404, "/x").permanent).toBe(true);
    expect(new GitHubError(403, "/x").permanent).toBe(true);
    expect(new GitHubError(502, "/x").permanent).toBe(false);
  });

  it("should say when GitHub's rate limit is used up, with the reset time", async () => {
    const fetcher: typeof fetch = async () =>
      new Response("", {
        status: 403,
        headers: {
          "x-ratelimit-remaining": "0",
          "x-ratelimit-reset": "1794950700"
        }
      });
    const request = fetchPullRequest(ref, fetcher);
    await expect(request).rejects.toHaveProperty(
      "message",
      "GitHub's API rate limit is used up, try again after 2026-11-17 21:25 UTC"
    );
    await expect(request).rejects.toHaveProperty("permanent", true);
  });

  it("should treat a 429 with no reset time as a used-up rate limit", async () => {
    const fetcher: typeof fetch = async () =>
      new Response("", {
        status: 429,
        headers: { "x-ratelimit-remaining": "0" }
      });
    await expect(fetchPullRequest(ref, fetcher)).rejects.toHaveProperty(
      "message",
      "GitHub's API rate limit is used up, try again in an hour"
    );
  });

  it("should say plainly when the pull request is missing or private", async () => {
    const fetcher: typeof fetch = async () => new Response("", { status: 404 });
    await expect(fetchPullRequest(ref, fetcher)).rejects.toHaveProperty(
      "message",
      "GitHub has no pull request at /repos/acme/pay/pulls/4, or the repository is private"
    );
  });

  it("should stop at once on a diff too large for GitHub to return", async () => {
    const fetcher: typeof fetch = async () => new Response("", { status: 406 });
    const request = fetchPullRequest(ref, fetcher);
    await expect(request).rejects.toHaveProperty(
      "message",
      "The pull request is too large for GitHub's API to return as a diff"
    );
    await expect(request).rejects.toHaveProperty("permanent", true);
  });

  it("should say how long to wait when GitHub asks for a pause", async () => {
    const fetcher: typeof fetch = async () =>
      new Response("", {
        status: 403,
        headers: { "retry-after": "60", "x-ratelimit-remaining": "12" }
      });
    const request = fetchPullRequest(ref, fetcher);
    await expect(request).rejects.toHaveProperty(
      "message",
      "GitHub asked for a pause, try again in 60 seconds"
    );
    await expect(request).rejects.toHaveProperty("permanent", true);
  });

  it("should treat a 429 with no rate-limit headers as permanent", () => {
    expect(new GitHubError(429, "/x").permanent).toBe(true);
  });
});
