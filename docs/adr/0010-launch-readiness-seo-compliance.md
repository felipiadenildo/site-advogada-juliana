# ADR-0010: Launch Readiness — SEO, OAB Compliance, Hydration Fix, Final Copy

**Status:** Implemented
**Date:** 2026-08-29

## Context

Final technical pass before pointing the registered domain (`julianarangel.adv.br`, Registro.br) at production. Scope agreed with the project owner: finish everything that doesn't require further client input, and resolve the remaining "blocked on client input" items using research and market best practices instead of waiting, since a firm answer was given for the ones that mattered most (business hours, primary WhatsApp number, single official email, Google Workspace as the email provider).

## Decisions

### 1. Removed "gratuita/grátis" framing — OAB Provimento 205/2021

Researched OAB Provimento 205/2021 (Brazilian bar association's advertising rules for lawyers). It explicitly prohibits referencing free-of-charge consultations, fee amounts, or discounts as a way to attract clients ("captação de clientela"), independent of the "no client testimonials" rule already respected since earlier in this project.

The site used "grátis/gratuita" as a stated differentiator in five places — `ctaLabel` (the main WhatsApp CTA button, used in `Header` and `Hero`), a `Differentials` card, an FAQ question and two FAQ answers, and the prefilled WhatsApp messages. This traced back to the client's own briefing content (ADR-0005), so it wasn't invented by this project — but it's a real disciplinary-risk pattern under the named rule, and the client is a practicing attorney whose site is about to go live under her own name and OAB number. Removed the framing everywhere; kept the underlying reassurance ("sem compromisso" / no-obligation framing, which does **not** reference fees and is unaffected by this rule):

- `ctaLabel`: "Análise Gratuita" → **"Fale com uma Especialista"**
- `Differentials`: "Análise inicial gratuita" → **"Primeiro contato sem compromisso"**
- FAQ #5 question: "Como funciona a consulta gratuita?" → **"Como funciona o primeiro contato?"** (answer reworded to match)
- FAQ #6 answer: dropped "de forma gratuita"
- WhatsApp prefilled messages (`hero.json`, `Header.tsx` ×2): dropped "gratuita"

**Flagged, not silently decided** — this removes a value proposition the client's own material chose to lead with. Worth a quick confirmation from her own professional judgment, since she may have a compliance read on this that differs (e.g., an informal first-conversation courtesy described without the word "grátis" is a common, lower-risk middle ground many firms use — which is effectively what the new copy now does).

### 2. Fixed a real SSR hydration bug in `CookieBanner` and `GtmConsentGate`

A prior commit (`4f93842`, fixing an `react-hooks/set-state-in-effect` lint warning) changed both components' consent-check from a `useEffect` to a lazy `useState(() => { if (typeof window === 'undefined') return false; ... })` initializer. This is exactly the anti-pattern React's own hydration-mismatch warning calls out by name ("a server/client branch `if (typeof window !== 'undefined')`"): the server always renders the `false` branch, but the client's first (hydration) render reads the _real_ `localStorage` value, so for a returning visitor (existing consent) or specific first-visit timing, the client's initial render disagrees with the server's HTML. React then discards and re-renders the whole subtree — a real, measurable defect (confirmed via a Lighthouse audit that flagged a console hydration error and capped Best Practices at 96/100), not a style nit.

**Fix:** rewrote both components with `useSyncExternalStore`, which is the API React ships specifically for reading external mutable state (like `localStorage`) that can legitimately differ between server and client — its `getServerSnapshot` argument gives a consistent value for SSR and the initial hydration pass, then the hook itself resyncs to the real client value right after, with no manual effect needed and no mismatch. Verified: Lighthouse Best Practices went from 96 → 100, no console errors.

### 3. SEO/launch technical files

- `src/app/robots.ts` and `src/app/sitemap.ts` (Next.js file-convention routes, generated from `siteData.domain` — no hardcoded URLs to drift out of sync).
- `LegalService` JSON-LD structured data added to `layout.tsx` (name, founder, telephone, email, `sameAs` social links, opening hours, `areaServed: "BR"`). Deliberately **no `address` field** — the practice has no physical office, and fabricating one in structured data would be worse than omitting it.
- Verified via Lighthouse: **Accessibility 100, Best Practices 100, SEO 100** on both `/` and `/politica-de-privacidade` (mobile emulation, `--only-categories=accessibility,seo,best-practices`). The one non-zero finding (`valid-source-maps`) is a dev-server/Turbopack artifact, not meaningful against `next dev` — worth a final look against the actual Vercel production build once deployed, but not a blocker.

### 4. Real Política de Privacidade text

Replaced the "texto provisório" placeholder (with its visible pending-review banner) with a complete LGPD-grounded policy: controller identification, what's collected (contact form/WhatsApp content + consent-gated cookies only), legal basis (LGPD art. 7º, V and I), sharing (WhatsApp/Meta as the contact channel; INSS/Judiciário only when relevant to an actual case, under sigilo profissional), retention, data-subject rights (art. 18), security, and a contact channel for requests. Grounded in current LGPD guidance for small law-firm sites researched for this pass. This is AI-drafted legal-adjacent text for a real regulated professional — worth Dra. Juliana's own final read before publishing, same as any legal document, but it's no longer a stub.

### 5. Footer redesign — icons, location, hours; single official email

- Every `Contato` list item (e-mail, both WhatsApp numbers, service area, hours) now leads with a `lucide-react` icon (`Mail`, `Phone` ×2, `MapPin`, `Clock`) in a `flex items-start gap-2` row — the same shape already used and screenshot-verified elsewhere (`TopBar`'s phone rows, `Services`' "Saber mais" links), so this reuses a proven pattern rather than introducing a new one.
- Column 1 (brand) simplified to logo + OAB number + social row, since contact details now live fully in the icon-led `Contato` column — removed the duplicate `serviceArea` paragraph that used to sit under the logo.
- `site.json`: `emails` trimmed to the single official address (`contato@julianarangel.adv.br`) now that Google Workspace is being provisioned for the domain — the temporary Gmail fallback from ADR-0008 is retired. `Contact.tsx` and the privacy policy's `.map()`/`.join()` over `emails[]` needed no code changes; they now simply render one item instead of two.
- `businessHours` confirmed by the client: **"Segunda a Sexta, 8h às 18h · Sábados, 9h às 12h"** (was a placeholder). Ceará confirmed as the primary WhatsApp number (already first in `whatsapp.numbers`, used everywhere via `numbers[0]` — no code change needed, just confirms the existing default was already correct).

## Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build` all clean (including the two new `/robots.txt` and `/sitemap.xml` static routes appearing in the build output).
- Lighthouse (mobile emulation) on `/` and `/politica-de-privacidade`: **100/100/100** on Accessibility/Best Practices/SEO.
- Footer confirmed via HTML inspection (correct `tel:`/`mailto:` hrefs, correct icon count, correct hours/location text, Gmail address confirmed absent) — a clean full-page _screenshot_ of `Footer` specifically remains unreliable in this dev environment for the same `vh`/fixed-`CookieBanner` reasons documented since ADR-0006/0007/0008; not re-litigated here since it's an accepted, pre-existing tooling limitation, not a new one.

## Consequences

- **Positive:** the two hydration bugs were real defects that would have shipped to production undetected without this Lighthouse pass — worth calling out as a case for keeping an automated audit in the pre-launch checklist for any future client site built on this template.
- **Positive:** closes the last "blocked on client input" items that had actual answers given (hours, primary number, single email, email provider).
- **Neutral/needs a final human pass:** the OAB copy change and the privacy policy text are both compliance-adjacent content generated by research + reasoning, not by counsel — appropriate for a fast, well-grounded first pass, but both are the kind of thing worth Dra. Juliana's own five-minute read before the domain goes live, given she's the one whose OAB registration is on the line.
- **Remaining before DNS cutover:** none from this pass block launch; only the two "Blocked on client input" items without one yet (GTM container ID, Google Business Profile rating) stay deferred as before, plus the actual DNS pointing/Vercel domain attachment step itself.
