import { describe, expect, it } from "vitest";
import {
  formatPullRequestRef,
  parsePullRequestUrl
} from "features/reviews/services/pull-request-url/pullRequestUrl";

describe("parsePullRequestUrl", () => {
  it("should read owner, repo and number from a PR URL", () => {
    expect(
      parsePullRequestUrl("https://github.com/cloudflare/agents/pull/123")
    ).toEqual({
      owner: "cloudflare",
      repo: "agents",
      number: 123
    });
  });

  it("should accept a PR URL that points at the files tab", () => {
    expect(parsePullRequestUrl("https://github.com/a/b/pull/7/files")).toEqual({
      owner: "a",
      repo: "b",
      number: 7
    });
  });

  it("should reject an owner or repo made only of dots", () => {
    expect(parsePullRequestUrl("https://github.com/a/.../pull/7")).toBeNull();
    expect(parsePullRequestUrl("https://github.com/.../b/pull/7")).toBeNull();
  });

  it("should reject an issue URL", () => {
    expect(parsePullRequestUrl("https://github.com/a/b/issues/7")).toBeNull();
  });

  it("should reject a URL on another host", () => {
    expect(parsePullRequestUrl("https://gitlab.com/a/b/pull/7")).toBeNull();
  });

  it("should reject text that is not a URL", () => {
    expect(parsePullRequestUrl("review my PR please")).toBeNull();
  });
});

describe("formatPullRequestRef", () => {
  it("should format a ref as owner/repo#number", () => {
    expect(formatPullRequestRef({ owner: "a", repo: "b", number: 7 })).toBe(
      "a/b#7"
    );
  });

  it("should accept a link on www.github.com", () => {
    expect(parsePullRequestUrl("https://www.github.com/a/b/pull/7")).toEqual({
      owner: "a",
      repo: "b",
      number: 7
    });
  });

  it("should reject a pull request number with more than 9 digits", () => {
    expect(
      parsePullRequestUrl("https://github.com/a/b/pull/12345678901")
    ).toBeNull();
  });
});
