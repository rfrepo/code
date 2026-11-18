import { DatabaseSync } from "node:sqlite";
import type { Sql, SqlValue } from "shared/types/sql";

// node:sqlite takes no booleans; SQLite stores them as 1 and 0, as the Agent's SQLite does.
const toSqliteValue = (value: SqlValue) =>
  typeof value === "boolean" ? Number(value) : value;

/** A real in-memory SQLite behind the same tagged-template shape as the Agent's `this.sql`. */
export function createTestSql(): Sql {
  const db = new DatabaseSync(":memory:");
  return <T>(strings: TemplateStringsArray, ...values: SqlValue[]) =>
    db.prepare(strings.join("?")).all(...values.map(toSqliteValue)) as T[];
}
