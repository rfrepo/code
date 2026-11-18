/** A check that needs no model: a pattern tested on each added line of files whose path matches a glob. */
export type StaticCheck = { paths: string; pattern: string };

/** A rule's check is used in reviews only once the user approves it. */
export type StoredCheck = StaticCheck & { approved: boolean };

export type Rule = { id: number; text: string; check?: StoredCheck };
