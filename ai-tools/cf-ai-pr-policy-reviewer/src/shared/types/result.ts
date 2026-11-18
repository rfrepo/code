/** The outcome of a check: the value fields on success, or a reason the user can read. */
export type Result<T extends object> =
  | ({ ok: true } & T)
  | { ok: false; reason: string };
