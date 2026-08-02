# React Hooks

- `HOOK-001 M` — A hook owns one cohesive flow or reason to change.
- `HOOK-002 M` — Extract a meaningful stateful/reusable seam, not a long file.
- `HOOK-003 M` — Return an object with named fields, never a tuple.
- `HOOK-004 P` — Use an options object for more than two arguments.
- `HOOK-005 M` — Keep pure helpers outside; pass dependencies explicitly.
- `HOOK-006 M` — Expose caller-needed view decisions and derived values without
  leaking unrelated collaborators.
- `HOOK-007 C` — Test a hook directly when it is an independent seam; owning-
  component coverage may suffice otherwise.
- `HOOK-008 P` — More than three non-exempt coordinating hooks trigger an
  `hook-composition-signal` observation, not mandatory extraction.
- `HOOK-009 C` — Use `use<ComponentName>` only when calls form one flow and the
  hook creates a smaller caller interface. Evidence-backed `keep-local` is valid.
- `HOOK-010 M` — Orchestration hooks return meaningful domain slices, view
  state, and actions; never raw query/mutation objects or `{ apis }`.
- `HOOK-011 M` — Nested hooks group one domain/user capability, never calls
  chosen only to reduce count.

Count domain/data hooks, `useState`, `useReducer`, and `useEffect` for the
composition signal. Exclude `useRef`, `useContext`, router/params hooks,
`useMemo`, and `useCallback`. An observation never autofixes.
