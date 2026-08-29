# ADR-0009: Accessibility Pass, Custom 404, Branch Cleanup

**Status:** Implemented
**Date:** 2026-08-29

## Context

Next roadmap items, prioritized as planned since early in this project: an accessibility pass (called out repeatedly as high-priority given the client's actual audience skews elderly/disabled — BPC/LOAS and disability-benefit claimants), a branded 404 page, and removing the stale, fully-merged feature branches.

## Decisions

### 1. A real contrast bug found in the official brand green

While auditing text/background color pairs against WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text/UI graphics), found that **white text/icons on the brand's official WhatsApp green (`#25D366` / hover `#1DB954`) fails badly — roughly 2:1**, well under even the relaxed large-text threshold. This affected every primary CTA button site-wide (`Header`, `Hero`, `About`, `Faq`, `CookieBanner`, `FloatingWhatsApp`, `Contact`), since white was this project's own default choice for button text, not something specified in the client's brand guidelines (which only fix the green's hex value, not what text color to pair it with).

**Fix:** switched text/icon color on every green-background element from `text-white` to `text-brand-secondary` (the brand's graphite, `#1E1E1E`). Verified: ~8.4:1 contrast, comfortably exceeding AAA. The official green hex is untouched — only the text color paired with it changed.

A related, smaller version of the same problem existed in reverse: `text-brand-whatsapp-dark` (green) used as _text_ color on light backgrounds (`Services`' "Saber mais" links, `GoogleRating`'s link) computed to ~2.6:1 — also failing. Fixed by using `text-brand-primary` (burgundy, already proven AA-compliant throughout the site) for the readable label text, keeping the WhatsApp icon itself in green as a decorative, secondary cue (icon and text color decoupled via separate `className`s, since `WhatsAppIcon` inherits `currentColor`).

`Footer`'s copyright line (`text-white/40`, `text-xs`) was also under 4.5:1 (~3.8:1) — bumped to `text-white/60` (~6.8:1) to match the rest of the footer's body text.

### 2. Keyboard accessibility: skip link, focus states, ARIA

- Added a "Pular para o conteúdo principal" skip link as the first focusable element in `layout.tsx` (visually hidden until focused, per the standard `sr-only focus:not-sr-only` pattern), targeting a new `id="main-content"` + `tabIndex={-1}` on every page's `<main>` (home, privacy policy, 404) so focus actually moves there, not just the scroll position.
- `Faq`'s accordion buttons had `focus:outline-none` with no replacement — removed the default outline entirely with nothing to show a keyboard user where they are. Replaced with a visible `focus-visible` ring (inset, so it doesn't get clipped by the item's `overflow-hidden`) and added `aria-expanded` for correct accordion semantics.

### 3. Custom `not-found.tsx`

Branded 404 page (`src/app/not-found.tsx`) matching the site's visual language, offering two clear recoveries: back to home, or straight to WhatsApp — someone who hits a dead link shouldn't have to figure out navigation on their own.

### 4. Branch cleanup

Deleted the 8 stale `feature/*` branches confirmed fully merged into `main` (zero unique commits, first flagged back in the initial discovery phase). They existed only locally (never pushed to `origin`), so this was a purely local, zero-risk cleanup — nothing on the shared remote was touched.

## Verification

Confirmed visually via screenshot: green CTA buttons now show dark, clearly legible text (Header, Hero, cookie banner all checked); 404 page renders with correct HTTP 404 status and correct content. Lint/`tsc`/build all pass.

## Consequences

- **Positive:** closes a real, site-wide accessibility failure on the single most important interactive element type on the page (WhatsApp CTAs), for an audience where this matters more than most.
- **Positive:** keyboard users (and anyone relying on visible focus indicators) can now skip repeated navigation and see where focus is inside the FAQ accordion.
- **Neutral:** this was a scoped pass (contrast, focus, skip link, semantics touched in this session), not an exhaustive WCAG audit — a full automated pass (e.g. Lighthouse/axe) is still worth running before launch, kept on the roadmap.
