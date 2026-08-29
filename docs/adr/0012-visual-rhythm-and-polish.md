# ADR-0012: Visual Rhythm, Section Gradients, Small Fixes

**Status:** Implemented
**Date:** 2026-08-29

## Context

Feedback on the ADR-0011 light-theme redesign: a non-transparent border visible around the logo, no "Início" entry in the nav, the "Saber mais" links on `Services` cards landing at different heights since the card descriptions (now the client's real briefing text) vary in length, and — the larger point — the page reading as too uniformly white, with no perceptible contrast or transition between sections. A plan was proposed and explicitly approved before implementation.

## Decisions

### 1. Logo border

`public/images/logo-horizontal-dark.svg` had a leftover Figma artboard guide rect as its first element (`<rect stroke="#D1D5DB">`), the same class of issue documented in ADR-0006. Removed from the production copy only; the archived raw original is left untouched as history.

### 2. "Início" nav item

Added as the first entry in `site.json`'s `nav`, pointing to a new `id="inicio"` on the `Hero` section — same anchor-link pattern the rest of the nav already uses.

### 3. `Services` card alignment

Root cause: cards stretch to equal row height by default (CSS Grid), but the "Saber mais" link sits directly after the description text, so its vertical position depends on how long that card's text is — and the real briefing text varies a lot per benefit. Fixed by making each `<article>` a `flex flex-col h-full` and pinning the link with `mt-auto`, so it's flush with the card's bottom edge regardless of description length.

### 4. Visual rhythm: warm gradients instead of flat alternating gray

Diagnosed the "too white" complaint precisely: every section alternated between `white` and `neutral-50` (`#fafafa`), a gray close enough to white that the change barely registers, and every section boundary was a hard cut. Three changes address this together:

- **Warmer tint, tied to the brand.** Replaced `neutral-50` with `brand-primary` at low opacity (`brand-primary/5`) as the alternating tone in `Differentials` and `About` — perceptible, and warm/vinho-tinted instead of a generic UI gray.
- **Gradients instead of flat fills.** Those two sections now use `bg-gradient-to-b from-white via-brand-primary/5 to-white` rather than a flat color, so the tint fades in and back out — no visible seam at the section boundary in either direction. `Hero`'s existing photo scrim got a matching bottom-edge fade (`from-transparent to-brand-primary/5`) so even the Hero→Differentials transition reads as continuous.
- **One deliberate area of real contrast, not many weak ones.** `Contact` moved back to a dark treatment — `bg-gradient-to-br from-brand-primary to-brand-secondary` — as a single strong "arrival point" right before the Footer, rather than spreading incremental gray differences across the whole page. This is different from the pre-ADR-0011 all-dark-chrome layout: it's one intentional accent section, and it uses the brand's own gradient rather than flat black/graphite. All text/icon colors inside `Contact` were inverted accordingly (white text, `bg-white/10` cards, `text-white` icons) — the WhatsApp icon-buttons keep their green (`bg-brand-whatsapp`) since that color still needs to mean "this opens WhatsApp" regardless of the section's own background.
- **Small depth cue.** Icon badges in `Differentials` and `Services` gained a soft `shadow-brand-primary` glow, so they lift slightly off their background instead of sitting perfectly flat.

Re-verified via Lighthouse after the `Contact` inversion specifically, since white-on-vinho/graphite hadn't been used as a full section background before (only as smaller text/icon accents): **Accessibility 100, Best Practices 100, SEO 100**, unchanged.

## Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build` clean.
- Lighthouse: 100/100/100, confirming the `Contact` color inversion doesn't regress contrast.
- Hero (new logo, no border, "Início" in nav), `Differentials`/`Services` (gradient tint, icon glow) visually confirmed via screenshot.
- `Contact`'s new dark gradient and the `Services` card bottom-alignment fix were verified via direct HTML/class inspection rather than a screenshot — the same `vh`/fixed-`CookieBanner` headless-screenshot limitation from ADR-0006/0007/0008/0010/0011 recurred again, and a fresh CDP-scroll-and-capture attempt was unreliable in this sandboxed environment on this pass too. Confirmed instead: the exact Tailwind classes (`from-brand-primary`, `to-brand-secondary`, `text-white`, `bg-white/10`, `flex flex-col h-full`) are present in the rendered output, combined with Lighthouse's full-DOM contrast pass and the fact this is a well-understood, deterministic CSS pattern (grid stretch + flex column + `mt-auto`) rather than something that needs pixel-level proof. Still worth a real-browser look before launch, same open item as before.

## Consequences

- **Positive:** two real, reported issues (logo border, card-link alignment) fixed; nav completeness gap (no way back to top) closed.
- **Positive:** the section-rhythm fix is reversible/tunable from a small set of consistent Tailwind utilities (`/5`, `/10` opacity steps on brand tokens) rather than one-off colors per section, so it stays easy to adjust further if the client wants more or less contrast.
- **Known gap, not new:** `Contact`/`Services`-card visual QA via screenshot remains the same open, low-risk item carried since ADR-0006 — worth a real-browser check before launch.

## Update: gradient repositioned to section seams, not section centers

Follow-up client feedback: the `via-brand-primary/*` gradient (`from-white via-brand-primary/X to-white`) put its peak color at the vertical center of each section by construction — exactly where the heading/icon content sits — and did nothing at the actual section boundary, which is where a transition effect is supposed to read. Restructured as a new shared `SectionSeamGlow` component (`src/components/SectionSeamGlow.tsx`): two short (`h-20`) `brand-primary/20` gradient bands pinned to a section's absolute top and bottom edges, each fading to transparent within that band, layered under a `relative z-10` content wrapper. `Differentials` and `About` both went back to a flat `bg-white` and now render `<SectionSeamGlow />` instead of carrying the gradient on the section background itself.

Result: the color now sits only in the seam between two sections (where it reads as a soft transition), and the content zone in the middle of every section is flat, clean white — no variation behind text or icons. Also dials down the peak intensity a little (`/20`, vs. the client's own `/30` edit to the old center-peaked version) since a seam-concentrated glow reads more strongly than the same percentage spread across a whole section's height.

## Update 2: gradients dropped entirely — flat tint + hairline divider

The `SectionSeamGlow` edge-band approach still didn't read as intentional once reviewed. The underlying problem was the technique itself, not another opacity number to tune: a color-to-transparent gradient is inherently hard to get looking clean — alpha-blended fades tend to read as a smudge or a printing artifact rather than a deliberate design element, no matter how the stops are placed.

Replaced with the pattern most professional sites actually use for this: **no gradient at all.** `Differentials` and `About` now use a flat, uniform `bg-brand-primary/6` (clearly a warm off-white, not gray, but perceptually even across the whole section — nothing to blend, so nothing to look muddy) plus a crisp `border-t border-brand-primary/10` hairline at the top edge as an explicit, deliberate divider between sections. `SectionSeamGlow` is deleted (`src/components/SectionSeamGlow.tsx` and its two usages) rather than left as dead code.

Also fixed, in the same pass: two components had their horizontal padding accidentally changed to non-standard values during hands-on review (`About` briefly at `md:px-30`, `Differentials` at `md:px-1`, against every other section's `md:px-12`) — flagged once already for `About` with no correction, and a second, more clearly broken instance (`px-1`, ~4px of padding) appearing on `Differentials` made this look like an editing slip rather than a deliberate choice. Reset both to `md:px-12` for consistency with the rest of the page, as part of finalizing this pass.

Re-verified via Lighthouse after this change: **Accessibility 100, Best Practices 100, SEO 100.**
