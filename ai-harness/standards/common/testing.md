# Testing

## Behavior and quality

- `TEST-001 D` — Test names use the project behavior form, currently
  `it("should …")`.
- `TEST-002 M` — Assert observable behavior through public interfaces.
- `TEST-003 D` — Ordinary test bodies remain branch-free; use separate tests
  or parameterization.
- `TEST-004 P` — Tests read straight Arrange → Act → Assert.
- `TEST-005 D` — UI tests prefer semantic queries; test IDs need a documented
  absence of an accessible alternative.
- `TEST-006 M` — Expected values use independent literals/spec examples, not
  implementation-equivalent recomputation.
- `TEST-007 M` — Restore overridden globals/timers; prevent leaked state.
- `TEST-008 M` — Bug fixes include a regression test failing for the original reason.
- `TEST-009 M` — Changed behavior and tests ship in the same change set.
- `TEST-010 C` — Page tests cover composition/states; feature tests cover
  detailed behavior.

## Reuse

- `TEST-REUSE-001 M` — Search render wrappers, fixtures, factories, mocks, and
  helpers before creating setup.
- `TEST-REUSE-002 M` — Parameterize tests differing only by inputs and expected values.
- `TEST-REUSE-003 C` — Extract stable repeated test infrastructure at nearest
  scope: local → feature → shared test support.
- `TEST-REUSE-004 M` — Keep SUT/scenario-specific setup local unless the same
  concept repeats.
- `TEST-REUSE-005 M` — Do not create one-use helpers.
- `TEST-REUSE-006 P` — Helpers use parameter objects and purpose-revealing names.
- `TEST-REUSE-007 M` — Helpers must not hide scenario intent behind generic flow.
- `TEST-REUSE-008 C` — Mock factories branch only when simpler parameterized
  fixtures cannot represent the scenario clearly.

## Placement and E2E

- `TEST-PLACE-001 D` — Test placement follows the project profile.
- `TEST-E2E-001 M` — E2E covers critical journeys, not behavior cheaper below UI.
- `TEST-E2E-002 D` — No fixed sleeps; use web-first assertions.
- `TEST-E2E-003 C` — Start a critical new flow with one tracer-bullet E2E when
  required by profile.

Mocks load before the SUT. SUT import remains last where the project test runner
depends on module-hoisting order. Move extracted-child behavior assertions to
the child interface; keep parent tests for composition and cross-child behavior.
