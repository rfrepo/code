# React Components and State

- `REACT-001 M` — Components describe UI; cohesive stateful/business
  orchestration lives in the correct hook or service boundary.
- `REACT-002 M` — State and hooks live in the lowest component consuming them.
- `REACT-003 M` — If a parent only forwards one hook result to one child, the
  child calls the hook.
- `REACT-004 M` — Legitimate hoists: parent consumption, multiple consumers,
  cross-field live validation, atomic actions/workflows, or documented
  request-waterfall prevention.
- `REACT-005 M` — Never pass setters, dispatch, or whole hook-return objects.
  Pass narrow values/default values and semantic `onX` callbacks.
- `REACT-006 D` — Hooks run unconditionally at top level; render stays pure;
  configured React Compiler lint passes.
- `REACT-007 P` — Keep JSX template-like using named derived values and handlers.
- `REACT-008 P` — Memoize only with cost or stability evidence.
- `REACT-011 P` — Two or more sibling JSX regions with disjoint reactive-state
  and handler clusters trigger an observation, not automatic extraction.
- `REACT-012 M` — A meaningful child owns state used only by its subtree.
  Shared validation, atomic save/reset/undo/submit, and coordinated workflows
  stay at the nearest common owner.
- `REACT-013 D` — Component definitions have stable module-scope identity.
- `REACT-014 M` — Extracted regions use domain names and expose a smaller
  interface than the behavior hidden.
- `REACT-015 C` — Move behavior tests to an extracted child's interface; keep
  parent coverage for composition and cross-child behavior.
- `REACT-016 M` — A feature component calls the domain hook it directly consumes.
- `REACT-017 C` — Multiple children may call narrow hooks backed by the same
  query cache/store only when multi-subscriber behavior is safe, requests
  deduplicate, and duplicate imperative effects cannot occur.
- `REACT-018 M` — Repeated local-state-hook calls create independent state.
  Shared local state stays at the nearest common component/orchestration hook.
- `REACT-019 M` — Do not add custom React Context solely for local page,
  feature, form, or workflow state. Infrastructure providers remain allowed.
- `REACT-020 M` — Generic shared presentation remains prop-driven. A
  feature-connected component may adapt domain-hook output to that interface.

Raw hook count and raw child count never prove a violation.
