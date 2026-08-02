# Standards Reference Package

Status: populated prototype. `harness/docs/clean-code.md` remains the live
single source during migration. These shards show the target progressive-
disclosure package and use stable rule IDs from the canonical proposal.

Load only references required by the active workflow:

| Change | Required references |
|---|---|
| Any change | `common/scope-and-enforcement.md` |
| New files/components | `common/naming-and-files.md`, `common/architecture-and-abstraction.md` |
| Tests | `common/testing.md` |
| UI behavior | `common/accessibility-and-security.md` |
| React component/refactor | `react/components-and-state.md` |
| Hook creation/extraction | `react/hooks.md` |
| Async or styled React UI | `react/styling-and-async-ui.md` |

## Precedence

1. System/client safety and permission policy.
2. Explicit user instruction for the current task.
3. Nearest project profile and approved ADR.
4. Framework reference in this directory.
5. Common reference in this directory.
6. Skill procedure and model judgment.

Same-level conflicts stop as `decision-required`. A project may narrow a
portable rule but must not silently weaken a deterministic safety gate.

## Rule ID namespace

Policy, profile, standards shards, and doc `07` use the **same** IDs.

| Policy key (YAML) | Canonical ID | Tool fact (if any) |
|---|---|---|
| hook-composition-signal | `HOOK-008` | `local/hook-composition-signal` |
| component-boundary-signal | `REACT-011` | `local/component-boundary-signal` |
| dependency-ownership-signal | `REACT-016` (+ `REACT-017`–`020`) | `local/dependency-ownership-signal` |

Policy keys and tool-rule names describe detectors. They are not rule IDs.
Do not invent parallel policy IDs.

## Migration rule

Do not hand-edit equivalent prose in both this package and `clean-code.md`.
Before promotion, create one source format and generate the aggregate legacy
document plus client adapters from it. Until then, changes land in
`clean-code.md` first and are synchronized here deliberately.
