# React Styling and Async UI

## Async UI

- `REACT-009 M` — Model loading, error, empty, and populated states when applicable.
- `REACT-010 C` — Use optimistic updates only when reversibility, conflict risk,
  and product expectation support them.

## Styling

- `STYLE-001 M` — Project design source and system override generic design skills.
- `STYLE-002 M` — Search existing components, tokens, and utilities first.
- `STYLE-003 C` — Promote repeated style only at nearest valid shared scope.
  Tool: `scripts/check-css-dupes.mjs` / `pnpm lint:css-dupes` emits
  `local/css-apply-dupe-signal` observations. Never auto-extract; decide
  promote / keep-local / coincidental-match with evidence. Pilot threshold
  target: ≥3 identical `@apply` values after excluding known utilities.
- `STYLE-004 D` — Machine-check project-forbidden styling forms.
- `STYLE-005 M` — Visual states remain accessible and do not rely on color alone.

Projects can layer their own profile on top of these common rules. For example, a
CSS-Modules-with-Tailwind profile might add:

- `PROFILE-STYLE-001 D` — No Tailwind utility strings in TSX.
- `PROFILE-STYLE-002 D` — Styled component owns sibling CSS Module; unstyled glue
  receives no empty module.
- `PROFILE-STYLE-003 D` — Tailwind v3 modules use bare `@apply`; no v4 directives
  or `@layer` inside component modules.
- `PROFILE-STYLE-004 M` — Reuse the project's design-system tokens/components before
  hardcoded values or another UI kit.
- `PROFILE-STYLE-005 M` — Conditional styling uses module references/data
  attributes, not interpolated utility strings.
