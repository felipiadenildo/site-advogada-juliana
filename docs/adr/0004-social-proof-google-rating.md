# ADR-0004: Social Proof — Aggregate Google Rating Only, No Individual Testimonials

**Status:** Accepted
**Date:** 2026-08-28

## Context

A reference site the project owner is drawing inspiration from includes a testimonials section built on Google reviews (individual client quotes). Research into OAB Provimento 205/2021 indicates this is a real compliance risk, not a stylistic preference:

- Publishing client testimonials or "success stories" is treated as forbidden under prevailing interpretation of the Provimento, because it can suggest a guarantee of results, which is explicitly barred.
- Individual testimonials referencing a client's case risk violating professional secrecy (_sigilo profissional_), since case details and client identity generally cannot be disclosed.
- The Provimento requires legal advertising to be strictly informative, sober, and must not amount to client solicitation (_captação de clientela_).

Source: [GEN Jurídico — A importância da fiscalização pela OAB da publicidade e marketing de advogados](https://blog.grupogen.com.br/juridico/postagens/advocacia/a-importancia-da-fiscalizacao-pela-oab-da-publicidade-e-marketing-de-advogados-nas-redes-sociais-a-partir-do-provimento-205-2021/)

## Decision

Do not implement individual client testimonials in any form (Google review quotes, named case outcomes, etc.).

Instead, implement a lightweight **aggregate rating display**: the firm's overall Google Business Profile star rating and review count, linking out to the real, public Google listing — no individual review text, no client names, no case references. This is a verifiable, anonymous, third-party metric rather than a client narrative, which avoids both the guaranteed-results concern and the professional-secrecy concern.

## Consequences

- **Positive:** delivers the social-proof value the reference site was going for, without the compliance exposure of individual testimonials.
- **Positive:** requires no case-by-case legal review of what a specific client said — it's a single aggregate number sourced directly from Google.
- **Negative:** less persuasive/detailed than individual testimonials would be — accepted trade-off given the legal risk.
- **Follow-up:** this is not a substitute for qualified legal review of the firm's marketing; if the client's own counsel takes a different view of what's permissible, this decision should be revisited with them, not unilaterally by engineering.
