# ADR-0003: Multi-Client Template Architecture — Content/Theme Separation (Level A)

**Status:** Accepted
**Date:** 2026-08-28

## Context

The project owner wants the end result to be reusable as a template across multiple future law-firm clients, where the shared base can be updated independently of any single client's data. Only one real client (Juliana Rangel Advocacia) exists today.

Three levels of investment were evaluated:

1. **Content/theme separation, single repo (Level A):** everything client-specific (copy, contact info, service list, brand colors/fonts, images) lives in `src/content/` + theme tokens; zero client-specific values live inside component code. A new client is a fork with `src/content/` + theme + `public/` assets swapped — no component touched.
2. **Branch-per-client (Level B):** one repo, `main` as the template base, each client as a long-lived branch that only touches content/theme, periodically rebased onto `main` to receive base updates.
3. **Package/monorepo (Level C):** the template extracted as a versioned internal package; each client is a thin app that depends on it. Requires a monorepo toolchain (e.g., Turborepo/pnpm workspaces) and a package release pipeline.

Level C is the only option that fully decouples "update the base" from "touch a client's deployment," but it requires real engineering investment (workspace tooling, package versioning, a second consumer to validate the package boundary against) that has no payoff with a single client and no second client yet confirmed. Building it now would be optimizing for a hypothetical, not a real, second client.

## Decision

Adopt **Level A** now: continue and complete the separation started in [ADR-0001](0001-content-architecture.md) — extend it from copy/business-data to also cover theme tokens (colors, fonts) and asset references, so that 100% of what is "Juliana Rangel-specific" lives outside component code.

**Explicitly deferred, not dismissed:** Level B (branch-per-client) is the natural next step once a second real client exists — it requires no new tooling, just a workflow decision, and should be revisited then. Level C (package/monorepo) should only be considered once there are enough concurrent clients that manually rebasing branches becomes the bottleneck.

## Consequences

- **Positive:** low cost now; directly extends work already in progress (ADR-0001).
- **Positive:** a future client can be onboarded today by forking the repo and replacing `src/content/` + theme tokens + `public/` assets — no component code changes required.
- **Negative:** "updating the base template" for an already-forked client still means a manual merge/cherry-pick, since Level A does not track template-vs-client divergence the way Level B or C would.
- **Follow-up:** revisit this ADR when a second client is confirmed — that is the trigger condition for evaluating Level B.

## Convention: `docs/clients/<client-slug>/`

Raw client intake material (briefings, onboarding forms, anything a client hands over that isn't meant to be rendered on the site) lives in `docs/clients/<client-slug>/`, separate from `src/content/` (the structured, rendered data for whichever client is currently checked out) and from `docs/adr/` (decisions about the template itself). This keeps the audit trail of "what the client actually said" without mixing it into either the template code or the render-ready content layer, and gives every future client the same landing spot for their own intake documents.
