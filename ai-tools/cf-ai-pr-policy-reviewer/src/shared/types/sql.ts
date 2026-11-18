export type SqlValue = string | number | boolean | null;

/** The shape of the Agent's `this.sql` tagged template, so stores do not depend on the Agent class. */
export type Sql = <T = Record<string, SqlValue>>(
  strings: TemplateStringsArray,
  ...values: SqlValue[]
) => T[];
