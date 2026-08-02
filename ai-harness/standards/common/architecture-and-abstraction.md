# Architecture and Abstraction

## Placement and dependency direction

- `ARCH-001 D` — Follow configured shared ← feature ← composition/app
  dependency direction.
- `ARCH-002 M` — New domain code starts feature-local.
- `ARCH-003 C` — Move code to shared only for real cross-domain use or a proven
  stable cross-cutting seam.
- `ARCH-004 D` — App/page layer owns routing and composition, not business logic.
- `ARCH-005 M` — Each module owns one cohesive concern.
- `ARCH-006 M` — Prefer deep interfaces hiding complexity over pass-through
  modules.
- `ARCH-007 C` — Add a strategy/implementation only when a real varying seam
  exists; do not manufacture one for a single variant.
- `ARCH-008 D` — Protected paths obey configured write policy.

## Reuse and duplication

- `ABS-001 C` — Default to rule of three before shared extraction.
- `ABS-002 C` — Two occurrences may earn extraction when evidence shows the
  same domain or infrastructure concept.
- `ABS-003 M` — Duplication means “extract or justify,” never automatic extraction.
- `ABS-004 M` — Never create an abstraction only to satisfy a size/count metric.
- `ABS-005 P` — Repeated JSX layout may become a domain-named component using
  composition for varying content.
- `ABS-006 P` — Keep intentional contextual duplication local and record why
  when reported.
