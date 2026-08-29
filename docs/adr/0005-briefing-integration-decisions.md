# ADR-0005: Decisions Made Integrating the Real Client Briefing

**Status:** Implemented
**Date:** 2026-08-28

## Context

`docs/clients/juliana-rangel-advocacia/briefing.md` — the client's actual intake form — was found in the repository root (untracked) partway through development, after most of the site had been built against placeholder content and against a different reference site described verbally by the project owner. Reconciling the two required several judgment calls, recorded here per this project's standing rule of documenting rather than silently discarding a prior decision.

## Decisions

### 1. CTA language: "Análise Gratuita" (reversing part of ADR-0002's spirit)

The site's hero/nav CTA had been deliberately softened to "Fale Conosco" out of concern that "Consulta Gratuita" reads as the kind of aggressive commercial hook OAB Provimento 205/2021 restricts. The briefing shows the client — a licensed attorney — independently and repeatedly using "análise gratuita" / "consulta gratuita" language herself (hero copy, FAQ, differentiators list), unprompted by any reference site. Treated as strong signal she has already made this call for her own practice. **Decision:** use her language (`ctaLabel: "Análise Gratuita"` in `site.json`). This does not override her judgment with ours in either direction — it defers to hers, since it's her professional risk to own.

### 2. Two WhatsApp numbers (Ceará and Brasília)

The briefing lists two regional numbers with no explicit ranking. `site.json`'s `whatsapp.numbers` is now an array; the Ceará number is treated as primary (used in Hero/Header CTAs) because the attorney's OAB registration is in Ceará (`OAB/CE 55.328`), making it the more defensible default. This is an inference, not something the briefing states outright — worth confirming with the client. Both numbers are listed, labeled by region, in the Footer.

### 3. "Nossa Equipe" and Google rating sections built but not rendered

Both `Team.tsx` and `GoogleRating.tsx` were built earlier in this session based on the verbally-described reference site, before the briefing was found. The briefing describes a solo practice (no collaborating attorneys mentioned) and does not mention Google reviews at all; the live `googleRating` values are placeholder zeros. Rendering either would mean showing content not grounded in anything the client actually provided — a fabricated team roster of one, or an empty/fake rating.

**Decision:** keep both components and their content schemas in the codebase (useful for a future multi-attorney client, or once this client has real Google reviews), but remove them from `src/app/page.tsx` for this client's active page. Re-enable per-client by adding them back to the page composition once real data exists.

### 4. Visual density vs. the client's own stated preference

Section 2 of the briefing states the client's own design preference: "básico, objetivo, não poluído" (basic, to the point, uncluttered) — somewhat in tension with the richer feature set (top bar, sticky header, differentials band) built from the other reference site. Rather than stripping sections built with real justification (TopBar surfaces real contact/social info; the differentials band now shows the client's own stated "diferencial plus" list, not invented stats), the resolution was decision #3 above — dropping the two sections that had no grounding in the client's actual content — plus keeping each remaining section visually light (icon + short label, generous spacing), consistent with her "quadradinhos" (card-based) framing of the one reference she cited.

## Consequences

- **Positive:** the live site now reflects what the client actually asked for, not an assumption stacked on a different reference site.
- **Positive:** `Team`/`GoogleRating` remain available with zero rebuild cost once there's real data or a multi-attorney client.
- **Follow-up:** confirm with the client (not assumed) — Ceará-as-primary-number, and whether "Análise Gratuita" framing was a deliberate compliance decision on her part or just draft language.
