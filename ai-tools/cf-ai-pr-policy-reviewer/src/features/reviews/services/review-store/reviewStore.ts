import type { Sql } from "shared/types/sql";

export type CompletedReview = {
  pr: string;
  title: string;
  summary: string;
  report: string;
};
export type SavedReview = CompletedReview & { id: number; createdAt: string };

export type ReviewStore = {
  save: (review: CompletedReview, workflowId: string) => number;
  recent: (limit: number) => SavedReview[];
  forPullRequest: (pr: string) => SavedReview[];
  forWorkflow: (workflowId: string) => number | undefined;
};

/** Every finished review, so the agent can answer "what did you find?" without GitHub (spec V7). */
export function createReviewStore(sql: Sql): ReviewStore {
  sql`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workflow_id TEXT NOT NULL UNIQUE,
    pr TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    report TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`;

  // A workflow step can run again after a lost reply, so one workflow saves one row.
  const save = (
    { pr, title, summary, report }: CompletedReview,
    workflowId: string
  ) =>
    sql<{
      id: number;
    }>`INSERT INTO reviews (workflow_id, pr, title, summary, report)
      VALUES (${workflowId}, ${pr}, ${title}, ${summary}, ${report})
      ON CONFLICT (workflow_id) DO UPDATE SET workflow_id = excluded.workflow_id
      RETURNING id`[0].id;

  const recent = (limit: number) =>
    sql<SavedReview>`SELECT id, pr, title, summary, report, created_at AS createdAt
      FROM reviews ORDER BY id DESC LIMIT ${limit}`;

  const forPullRequest = (pr: string) =>
    sql<SavedReview>`SELECT id, pr, title, summary, report, created_at AS createdAt
      FROM reviews WHERE lower(pr) = lower(${pr}) ORDER BY id DESC`;

  const forWorkflow = (workflowId: string) =>
    sql<{
      id: number;
    }>`SELECT id FROM reviews WHERE workflow_id = ${workflowId}`[0]?.id;

  return { save, recent, forPullRequest, forWorkflow };
}
