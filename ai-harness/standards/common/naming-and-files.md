# Naming and Files

- `NAME-001 M` — Components are nouns named for domain purpose, not structure.
- `NAME-002 M` — Functions are verbs; booleans are predicates.
- `NAME-003 D` — Components use `PascalCase.tsx`; hooks use
  `useCamelCase.ts`; folders use kebab-case; other TS files use camelCase.
- `NAME-004 M` — Avoid vague structural names (`Wrapper`, `Container`,
  `Helper`, `Manager`, `Utils`, `data`, `temp`) and numeric suffixes.
- `NAME-005 D` — Callback props use `onX`; local handlers use `handleX` where
  the project profile configures that convention.
- `MODULE-001 D` — At most one exported React component or hook per file.
- `MODULE-002 P` — Helpers and constants may colocate when they serve the
  file's one cohesive concern.

Project profile owns exact placement, barrel-export, and test-colocation rules.
Never infer these from a different client project.
