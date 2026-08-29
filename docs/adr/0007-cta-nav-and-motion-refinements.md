# ADR-0007: CTA Copy/Icons, Nav Reordering, TopBar/Footer Content Split, Scroll Reveal

**Status:** Implemented
**Date:** 2026-08-29

## Context

Follow-up polish requested by the project owner after the brand rebrand: improve the WhatsApp CTA buttons (icon + more varied, contextual copy instead of "Análise Gratuita" everywhere), enlarge the logo in the header and footer, evaluate whether to add scroll/click animations, review the order of items in the top bar and main navigation against best practice, move both WhatsApp numbers into the top bar (previously only one showed), and move social links + business hours into the footer (previously social links were in the top bar, and business hours weren't shown anywhere).

## Decisions

### 1. WhatsApp icon on every CTA, more contextual copy

Extracted the WhatsApp glyph (previously duplicated inline in `FloatingWhatsApp.tsx`) into `src/components/icons/WhatsAppIcon.tsx`, now used in every `WhatsAppButton` instance (`Header`, `Hero`, `About`, `Faq`, `Services`, `FloatingWhatsApp`) for a consistent, recognizable CTA pattern.

Copy was varied by context instead of repeating "Análise Gratuita" everywhere it doesn't fit naturally:

- **Header / Hero:** kept "Análise Gratuita" — this is the site's primary, most-repeated CTA, and it's the client's own wording (ADR-0005), so it stays as the anchor phrase.
- **About:** changed to "Fale com um Especialista" — fits a section about the attorney better than repeating the generic offer.
- **Faq:** changed to "Tire sua Dúvida Agora" — directly answers the section's own lead-in text ("Ainda com dúvidas?").
- **Services:** kept "Saber mais" (per-service, from ADR-0005), dropped the trailing "→" now that the WhatsApp icon itself signals the action.

### 2. Bigger logo

`Header`: `h-9` → `h-11`. `Footer`: `h-8` → `h-11`. Header's vertical padding was trimmed slightly (`py-3` → `py-2.5`) to keep the bar from growing too tall with the larger mark.

### 3. Scroll-reveal animation on section entry

Added `src/components/ScrollReveal.tsx` — a small Client Component using `IntersectionObserver` to fade/slide a section in (`opacity-0 translate-y-6` → `opacity-100 translate-y-0`, 700ms) the first time it enters the viewport. Wrapped around `Differentials`, `Services`, `About`, and `Faq` in `page.tsx` (not `Hero`, which is already visible on load — animating it would just delay the first thing visitors see). Respects `prefers-reduced-motion` via Tailwind's `motion-reduce:` variant (content stays fully visible, no transition, for users who've asked for reduced motion) — a small proactive accessibility win ahead of the dedicated a11y pass already on the roadmap.

No animation library was added — a single `IntersectionObserver` + CSS transition covers this without new dependencies. Smooth anchor scrolling (clicking a nav link) was already enabled via `scroll-smooth` on `<html>` from the original scaffold.

### 4. Nav order fixed to match actual page order

The main nav listed **Serviços** before **Diferenciais**, but the page itself renders `Differentials` before `Services` (right under the Hero, then the services grid). Clicking "Serviços" then "Diferenciais" in the old order would scroll down and then back up — against the general UX principle that anchor-nav order should mirror the page's actual visual order, so scrolling is always predictable and one-directional. Fixed in `site.json`'s `nav` array: **Diferenciais, Serviços, Sobre, Dúvidas** — now matches `Differentials → Services → About → Faq`.

### 5. Top bar: both phone numbers, no social icons

`TopBar` now lists both WhatsApp numbers (Ceará and Brasília) side by side with region labels (hidden on the smallest screens to save space, numbers alone still fit), instead of showing only the primary one. Social icons were removed from `TopBar` — see below.

### 6. Footer: social icons + business hours added, using a shared component

The social icon map/rendering logic was extracted from `TopBar` into `src/components/icons/SocialLinks.tsx` (a plain, presentational component driven by `site.json`'s `social` array) so it could be reused in `Footer` without duplicating the four platform SVGs. `Footer` now shows the social row under the firm identity block, and a `businessHours` line (added to `site.json`: "Segunda a Sexta, 9h às 18h") in the contact column.

**⚠️ `businessHours` is a placeholder**, not something confirmed in the client's briefing (which didn't specify operating hours) — added on the project owner's explicit instruction to include "normal commercial hours," but should be confirmed with the client before launch, consistent with how other assumed values in this project are tracked.

### Why the top bar / footer split (not just "add more to the top bar")

Top bars are conventionally reserved for the highest-priority, most-actionable information (contact numbers people might tap immediately) — cramming social links and hours in there too would make an already-thin bar noisy on mobile. Footers are the conventional home for secondary reference information (social presence, hours, legal links) that visitors check when they want it, not on every page load. This matches common practice on service-business sites and is why the split was two-way (top bar keeps only phones; footer gains social + hours) rather than just appending more to the top bar.

## Consequences

- **Positive:** CTAs are more visually consistent (icon) and contextually varied (copy), likely improving both recognizability and click-through relevance.
- **Positive:** nav order now matches page order — no more back-and-forth scrolling from clicking through the menu in order.
- **Positive:** both regional numbers are now equally reachable from the top of every page, not just the primary one.
- **Neutral:** `businessHours` is unverified placeholder content — flagged in the roadmap for client confirmation.
- **Follow-up:** `Footer`'s exact rendering (with the new social row + hours line) wasn't captured in a clean automated screenshot in this session either — same headless-browser/anchor-scroll limitation noted in ADR-0006. Verified via shared-component reasoning (identical `SocialLinks`/logo/color patterns already confirmed rendering correctly elsewhere) and DOM content checks instead. Still worth a quick manual look in a real browser before launch.
