# ADR-0011: Light Theme Redesign, New Brand Assets, Client-Directed Copy Reversal

**Status:** Implemented
**Date:** 2026-08-29

## Context

The client reviewed the live-in-progress site and requested a substantial visual and copy revision, plus dropped two new brand assets in a `temp/` folder: an updated horizontal logo (`Logo_Horizontal_Dark_on_LightBG.svg`, tagline changed from "Advogada" to "Advocacia Especializada") and a hero photograph (a golden Lady Justice statue on a marble table, blurred office background). A full plan was written up and explicitly approved before implementation, including several judgment calls flagged for confirmation (Contact section theme, map icon choice, whether a payment-condition badge was needed) — all resolved by the client's follow-up message.

## Decisions

### 1. Site-wide light theme

`TopBar`, `Header`, `Footer`, and `Contact` (the last two per explicit approval — "demais elementos que achar necessários podem ser alterados") moved from the dark `bg-brand-secondary` chrome to a light palette: white/`neutral-50` backgrounds, `text-brand-secondary`/`gray-600` body text, `brand-primary` (vinho) for icon accents and hover states. `CookieBanner` was deliberately left dark — it's a modal-like consent prompt, not page chrome, and a distinct visual treatment there is expected, not inconsistent.

This required redoing the WCAG contrast pass from ADR-0009/0010, since those were computed against the old dark backgrounds. Re-verified via Lighthouse: **Accessibility 100, Best Practices 100, SEO 100**, both before and after this change — the new light palette holds up.

### 2. New logo, archived old one properly

`Logo_Horizontal_Dark_on_LightBG.svg` from `temp/` replaced `logo-horizontal-light.svg` in `Header`/`Footer`, since chrome is light now. Checked first whether this was really new: the brand assets folder already had a file with the same name from the original kit (ADR-0006) — diffed them and found real content differences (different tagline text). Archived the superseded version as `archive/Logo_Horizontal_Dark_on_LightBG_v1_Advogada.svg` rather than overwriting silently, and moved the previous `logo-horizontal-light.svg` (now unused, no chrome is dark anymore) to the archive too, consistent with the "never silently discard" pattern established earlier in this project. Fixed a stale reference to the old filename in `layout.tsx`'s `LegalService` JSON-LD that the initial pass missed.

### 3. Hero: real photo, no more CSS gradient placeholder

Replaced the dot-pattern/gradient placeholder with the client's photo via `next/image` `fill` (not a raw CSS `background-image`), so Next.js optimizes and resizes it instead of serving the original 6MB JPEG as-is. A light gradient scrim (`from-white via-white/85 to-white/40`) keeps text legible while still revealing the photo on the side with more empty space. Also removed the "Juliana Rangel Advocacia" eyebrow text above the headline (redundant now that the logo itself carries the firm name) and the underline under "Benefícios do INSS" (replaced with a `text-brand-primary` color treatment instead, so the emphasis doesn't just disappear), and removed the "Atendimento humanizado · Sem compromisso · Resposta rápida" line below the CTA per direct request.

Copy replaced with the client's own suggested text, split into `subtextBefore`/`subtextHighlight`/`subtextAfter`/`ctaLead` fields in `hero.json` so the bolded/colored "Direito Previdenciário" segment doesn't require any fragile string-splitting logic in the component.

Both the raw source photo and logo were moved into `docs/clients/juliana-rangel-advocacia/brand/assets/` (matching the established raw-asset convention) with resized/production copies in `public/images/`, and `temp/` was removed once empty.

### 4. Copy reversal: "gratuita" restored, by the client's explicit direction

ADR-0010 removed "grátis/gratuita" framing site-wide after flagging a real OAB Provimento 205/2021 risk. The client reviewed that reasoning and explicitly asked for it back, stronger than before — she's the licensed attorney and this is her call to make, not something to keep re-litigating once she's made an informed decision. Reverted across `ctaLabel` (now **"Consulta Gratuita"**, used for the Header CTA specifically per her wording), `differentials.json`, `faq.json`, and the WhatsApp prefilled messages. The contingency-fee model ("cobrança apenas em caso de êxito") was already covered accurately in FAQ #2 and wasn't duplicated elsewhere, per her confirmation that the FAQ already covers it sufficiently.

### 5. Differentials: 5th item, new icon

Relabeled item 3 back to "Análise Gratuita" and added a 5th differentiator, "Atuação em todo o Brasil", using `MapPinned` from `lucide-react` (the package has no literal Brazil-silhouette icon; a generic map-pin icon was the client-approved choice over commissioning a custom SVG). Grid widened to `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` to hold five items cleanly.

### 6. Services: client's real briefing text, closing CTA banner

Replaced the shortened benefit descriptions with the text from the client's original briefing document almost verbatim, correcting only a couple of small errors (e.g., "se família tem direito" → "se a família tem direito", a missing article). Added a closing banner below the grid ("Não encontrou o seu benefício aqui?") with its own WhatsApp CTA, rather than forcing a 10th grid tile that would break the 3×3 rhythm.

### 7. Contact: restructured cards, single email back to Gmail

- New heading/subtext ("Agende sua Consulta Gratuita" + the client's supplied paragraph).
- Restructured from one card per contact _method_ to one card per phone _number_, each showing two icon-buttons side by side — WhatsApp (green, `bg-brand-whatsapp`) and a plain call button (neutral `brand-primary/10`) — per explicit instruction that only WhatsApp-bound buttons should carry the WhatsApp green; a phone or email action is a different kind of action and shouldn't borrow that visual signal.
- `site.json`'s single `emails[]` entry reverted to the Gmail address (`julianarangeladv1@gmail.com`) instead of the unprovisioned domain mailbox from ADR-0010 — the client doesn't have `@julianarangel.adv.br` email live yet. No component changes were needed beyond the data change, since every consumer already reads through `emails[0]`/`.map()`.

### 8. Fixed the mobile floating WhatsApp button's alignment bug

Root cause: `FloatingWhatsApp` used a fixed `bottom-24 sm:bottom-6` to clear `CookieBanner` while it's visible, but that offset never adjusted back down once the banner was dismissed, leaving a permanent 96px gap that read as "not aligned with the bottom of the page" on mobile. Fixed by having `FloatingWhatsApp` read the same consent state `CookieBanner` uses (`useCookieConsent`, extracted to `src/lib/useCookieConsent.ts` so the `useSyncExternalStore` plumbing isn't duplicated a third time across `CookieBanner`, `GtmConsentGate`, and this component) and switching to a flush `bottom-6` once consent is given.

### 9. Footer tagline

Added a line under the logo beyond just the OAB number, per direct request — a short line describing the practice, pulled from the client's own words in her briefing ("compromisso, responsabilidade e atendimento humanizado"). The client trimmed the wording herself directly in the file afterward (shortened to "com compromisso e responsabilidade") — left as her edit, not reverted.

### 10. Carousel: recommended against, not built

Evaluated per the client's explicit ask to weigh a carousel of service-related images. Recommendation given and accepted implicitly (not contested): a single strong hero image plus the existing real photo of Dra. Juliana in `About` serve trust-building better for this specific audience (older/vulnerable INSS claimants, the same reasoning already established in ADR-0008) than a rotating stock-photo carousel, which adds motion/complexity without a clear payoff. Not implemented; can be revisited if the client asks again with a concrete image set in mind.

## Verification

- `npm run lint`, `npx tsc --noEmit`, `npm run build` all clean, re-run after every batch of changes (including after `Footer`/`Contact` were rewritten, which happened after the first build pass in this session).
- Lighthouse (mobile emulation): **100/100/100** Accessibility/Best Practices/SEO, confirming the from-scratch light-theme contrast pass holds.
- Hero, `TopBar`, `Header`, `Differentials`, and `Services` visually confirmed via screenshot.
- `Contact` and `Footer` specifically could **not** be cleanly screenshotted this round — the same `vh`/fixed-`CookieBanner` tooling limitation documented since ADR-0006/0007/0008/0010 recurred, and a CDP-based scroll-and-capture workaround (used successfully earlier in the project) proved unreliable in this sandboxed environment this time. Fell back to direct HTML verification instead: confirmed exact card count, correct `tel:`/`wa.me`/`mailto:` hrefs for both phone numbers and the single email, correct green-vs-neutral button coloring, and correct Footer copy/logo path — combined with the fact both sections reuse Tailwind patterns (rounded card, icon circle) already screenshot-verified elsewhere on the same page (`Services`), and the Lighthouse accessibility pass auditing the full DOM regardless of what the screenshot captured. Still worth a real-browser look before the client-facing launch.

## Consequences

- **Positive:** the site now matches the client's actual visual direction and her own risk tolerance on the "gratuita" framing, rather than a default I chose for her.
- **Positive:** a second real bug (floating WhatsApp mobile misalignment) found and fixed, plus a shared hook that removes a third copy-paste of the consent-reading logic.
- **Neutral:** the OAB Provimento 205/2021 concern from ADR-0010 hasn't gone away — it's now a documented, informed decision by the licensed attorney herself rather than an oversight, which is the appropriate place for that call to land.
- **Known gap, not new:** `Contact`/`Footer` visual screenshot QA remains the same open, low-risk item it's been since ADR-0006 — still worth a real-browser check before launch, tracked in the README.
