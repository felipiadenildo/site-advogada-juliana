# ADR-0002: GTM Consent Gating — Basic Mode, Phased

**Status:** Accepted (implementation pending)
**Date:** 2026-08-28

## Context

`layout.tsx` currently renders `<GoogleTagManager gtmId="GTM-XXXXXXX" />` unconditionally on every page load, regardless of whether the user has accepted cookies via `CookieBanner.tsx`. This contradicts the project's own stated LGPD compliance posture: behavioral tracking must not run before explicit consent.

The GTM container ID in code is a placeholder; no live ad campaign or configured GTM container currently exists (confirmed against the project's Notion dashboard, where the container is listed as "Staging Mode").

Two remediation approaches were evaluated:

1. **Basic Mode (block until consent):** don't render/inject the GTM script at all until the user accepts. No requests reach Google before consent. This is the stricter, simpler-to-implement approach, and is the literal behavior the project's compliance documentation already describes.
2. **Google Consent Mode v2 (advanced mode):** load GTM/gtag for everyone; before consent, set `ad_storage`/`analytics_storage` to `denied` by default while still sending cookieless "pings" that let Google statistically model conversions it can't directly observe. This preserves more ad-attribution signal — directly relevant to the project's stated goal of optimizing Google/Meta ad spend — but is meaningfully more complex to implement correctly (requires `gtag('consent', 'default', ...)` wiring and a real, configured GTM container to validate against), and sits in a more debated legal gray area (data is sent to Google, even without a cookie, before consent is given).

There is a genuine, unresolved tension between the two goals this project holds simultaneously: strict LGPD/OAB compliance (favors Option 1) and ad-spend attribution accuracy (favors Option 2). Because there is currently no real GTM container and no live ad campaign, neither option has any real-world business impact today — the cost of choosing conservatively now is zero.

## Decision

Implement **Option 1 (Basic Mode)** now: `<GoogleTagManager>` is only mounted after `CookieBanner` records acceptance in `localStorage`.

**Explicitly defer, not dismiss:** revisit Consent Mode v2 when _all_ of the following are true — a real GTM container exists, an actual ad campaign is configured, and someone responsible for the client's ad accounts (and, ideally, legal counsel) is available to weigh in. This decision should not be made unilaterally by engineering once real business/legal stakes exist.

## Consequences

- **Positive:** closes the current compliance gap with minimal implementation cost (conditional render, no new dependencies).
- **Positive:** matches what the project's own documentation already promises to users.
- **Negative (accepted, currently cost-free):** once real ad campaigns launch, some attribution data will be unavailable for users who don't accept cookies, until/unless Consent Mode v2 is revisited.
- **Follow-up:** this decision is tracked as an open roadmap item (README, Section 9), not a closed question — it must be revisited, not silently left as permanent.
