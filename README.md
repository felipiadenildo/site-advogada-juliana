# Juliana Rangel Advocacia — Landing Page

> ⚠️ **Pre-documentation notice**: this README reflects the team's current understanding of the project as of 2026-08-29. It is not final — sections marked with ⚠️ describe planned/target state that has not been implemented yet, or facts that could not be verified from the repository alone. It will be revised and completed at the end of the project.

## 1. Project Overview

A high-conversion, single-page landing site for **Juliana Rangel Advocacia**, a Brazilian law firm specialized in social security law (_Direito Previdenciário_ / INSS — retirement benefits, disability benefits, BPC/LOAS, survivor's pension).

**Core objective:** convert cold paid traffic (Google Ads / Meta Ads) into qualified leads on **WhatsApp**, with per-section (and, going forward, per-service) attribution so the firm can optimize ad spend.

The project operates under two binding constraints that shape both copy and implementation:

- **OAB Provimento 205/2021** — Brazilian Bar Association advertising rules for lawyers: informative, sober tone; no price display, no aggressive commercial hooks.
- **LGPD** (Brazil's data protection law) — no behavioral tracking before explicit cookie consent.

Full business context and the canonical project dashboard live in Notion: _Project Overview & Strategic Objectives_ (linked from the team's workspace). This README is the developer-facing companion to that document, not a replacement for it.

## 2. Tech Stack

- **Framework:** Next.js 16.3.3 (App Router), React Compiler enabled (`next.config.ts`)
- **Runtime:** React 19.2.8
- **Language:** TypeScript 5 (`strict: true`, no `any`)
- **Styling:** Tailwind CSS v4 (`@import 'tailwindcss'` + `@theme` design tokens in `globals.css` — see the note in [ADR-0006](docs/adr/0006-brand-identity-assets.md) about a pre-existing bug where the old v3 `@tailwind` directive syntax silently broke most of the utility catalog)
- **Fonts:** `next/font/google` — Cinzel (headings), Montserrat (body), per the client's real brand guidelines
- **Analytics/Tag management:** `@next/third-parties` (`GoogleTagManager`)
- **Quality tooling:** ESLint 9 (flat config, `eslint-config-next` + `eslint-config-prettier`), Prettier, Husky + lint-staged (pre-commit)
- **Hosting/CI:** Vercel ⚠️ _(stated in the project's Notion dashboard as "Active"; no `vercel.json` or CI workflow files exist in this repository, so the deployment pipeline is presumably configured entirely through Vercel's dashboard Git integration — not independently verified from the codebase)_

> ⚠️ Next.js 16 introduces breaking changes relative to earlier major versions. Before implementing any App Router feature, consult `node_modules/next/dist/docs/` in this repository rather than relying on prior training knowledge of Next.js.

## 3. Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint     # ESLint
```

Git hooks (via Husky) run `eslint --fix` and `prettier --write` on staged files before each commit — no separate manual step required.

There is currently no automated test suite (`npm test` is not defined). ⚠️ Not addressed by the current roadmap; flagged as a known gap in [Section 9](#9-roadmap--known-gaps).

## 4. Project Structure

```
landing-page-juridica/
├── .husky/                    # Git hooks (pre-commit lint-staged)
├── docs/
│   ├── adr/                   # Architecture Decision Records
│   └── clients/                # Raw client intake material, per client (ADR-0003)
│       └── juliana-rangel-advocacia/
│           ├── briefing.md    # The client's actual intake form
│           └── brand/
│               ├── BRAND_IDENTITY_GUIDELINES.md  # Real palette/typography/logo usage spec
│               └── assets/    # 17 raw logo SVGs (Figma exports, not production-clean — see ADR-0006)
├── public/
│   └── images/
│       └── juliana-rangel.jpg # Real attorney photo, used in About.tsx
├── src/
│   ├── app/
│   │   ├── politica-de-privacidade/
│   │   │   └── page.tsx       # Privacy policy route (⚠️ placeholder legal text)
│   │   ├── icon.svg           # Favicon — cleaned brand monogram (ADR-0006)
│   │   ├── favicon.ico        # Generated multi-res fallback from the same monogram
│   │   ├── globals.css        # Tailwind v4 import + brand design tokens (@theme)
│   │   ├── layout.tsx         # Root layout: TopBar/Header/Footer chrome, Metadata API, GTM gate
│   │   └── page.tsx           # Landing page composition
│   ├── content/                # Business data & copy, decoupled from components (ADR-0001)
│   │   ├── site.json          # Firm name, contact/WhatsApp numbers, social links, nav, GTM id
│   │   ├── hero.json          # Hero headline/subtext/CTA message
│   │   ├── services.json      # Practice areas grid data
│   │   ├── differentials.json # "Diferenciais" band (client's own stated differentiators)
│   │   ├── faq.json           # FAQ entries
│   │   ├── about.json         # Attorney bio & credentials
│   │   └── team.json          # Team roster — built but not rendered yet (see ADR-0005)
│   └── components/
│       ├── About.tsx          # Institutional trust section (attorney bio + real photo)
│       ├── CookieBanner.tsx   # LGPD consent banner (localStorage-backed)
│       ├── Differentials.tsx  # Icon + label band, client's real differentiators
│       ├── Faq.tsx            # Interactive accordion (Client Component) + closing WhatsApp CTA
│       ├── FloatingWhatsApp.tsx # Persistent fixed WhatsApp button, visible while scrolling
│       ├── Footer.tsx         # Logo, useful links, contact (both WhatsApp numbers)
│       ├── GoogleRating.tsx   # Aggregate Google rating (ADR-0004) — built, not yet rendered
│       ├── GtmConsentGate.tsx # Mounts GTM only after cookie consent (ADR-0002)
│       ├── Header.tsx         # Sticky nav: real logo, anchor links, CTA, mobile hamburger menu
│       ├── Hero.tsx           # Above-the-fold value proposition + primary CTA
│       ├── Services.tsx       # Practice areas grid
│       ├── Team.tsx           # Team roster section — built, not yet rendered (see ADR-0005)
│       ├── TopBar.tsx         # Contact number + social links strip
│       └── WhatsAppButton.tsx # Reusable WhatsApp deep-link CTA
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 5. Content & Configuration

Business content (contact info, services, FAQ, attorney bio, differentiators) lives in `src/content/` as JSON, imported directly by components (see [ADR-0001](docs/adr/0001-content-architecture.md) for why JSON/MDX was chosen over a TypeScript config object or an immediate CMS integration, and [ADR-0003](docs/adr/0003-template-architecture.md) for how this generalizes into a reusable multi-client template).

Most of `src/content/` now holds **real data**, sourced from the client's actual intake form (`docs/clients/juliana-rangel-advocacia/briefing.md`) rather than placeholders — see [ADR-0005](docs/adr/0005-briefing-integration-decisions.md) for the judgment calls made integrating it (CTA wording, which WhatsApp number is primary, why `Team`/`GoogleRating` aren't rendered yet).

The client's real brand identity kit (logos, official color palette, typography, professional photo) was also found, organized, and fully applied to the site — see [ADR-0006](docs/adr/0006-brand-identity-assets.md), which also documents a pre-existing Tailwind CSS bug found and fixed while verifying it visually.

Still outstanding: a physical address (the client doesn't have one — practice is remote/presencial across states) and the final legal text for the privacy policy.

## 6. Compliance Notes (OAB & LGPD)

- **OAB Provimento 205/2021:** current copy avoids pricing, sensationalism, and aggressive commercial hooks, favoring an informative/educational tone. The "Análise Gratuita" CTA language comes directly from the client's own briefing, used repeatedly and unprompted — treated as her own professional judgment call on what's permissible, not invented by this project (see [ADR-0005](docs/adr/0005-briefing-integration-decisions.md)). Client testimonials / Google review quotes were deliberately **not** implemented — research indicates individual testimonials are treated as forbidden under the Provimento, both for implying guaranteed results and for professional-secrecy reasons — only an aggregate Google rating is planned instead ([ADR-0004](docs/adr/0004-social-proof-google-rating.md)). None of this has been reviewed by qualified legal counsel — flagged as a gap under [Section 9](#9-roadmap--known-gaps).
- **LGPD — cookie consent:** `CookieBanner.tsx` persists user consent in `localStorage` (`lgpd_cookie_consent`) and is implemented and functional.
- **LGPD — tag gating:** implemented. `GtmConsentGate.tsx` only mounts `<GoogleTagManager>` after `CookieBanner` records acceptance ("Basic Mode" / block-until-consent, per [ADR-0002](docs/adr/0002-gtm-consent-gating.md)).
- The GTM container ID (`src/content/site.json` → `gtmId`) is still a placeholder (`GTM-XXXXXXX`); no live tag configuration or ad campaign exists yet.
- **LGPD — privacy policy:** a `/politica-de-privacidade` route exists with a placeholder structure, clearly marked as pending legal review — the actual legal text still needs to come from the client/counsel.

## 7. Conversion Tracking

Every conversion touchpoint is designed to route through `WhatsAppButton.tsx`, a component that builds a `wa.me` deep link with a URI-encoded, pre-filled message. Because the message text differs per touchpoint, the destination WhatsApp conversation reveals which section (and, in the target design, which specific service) the lead came from — this is the project's attribution mechanism in lieu of full analytics tracking.

**Current state:** every touchpoint converts. `Hero`, `Header` (desktop + mobile menu), each `Services` card (per-service message, e.g. _"Gostaria de saber mais sobre o BPC/LOAS"_ — attribution at the individual-service level, not just section level), `About`, `Faq`, and a persistent `FloatingWhatsApp` button (fixed bottom-right, visible while scrolling) all route through `WhatsAppButton` to the client's primary (Ceará) number, each with a touchpoint-specific message.

**Two WhatsApp numbers:** the client operates from Ceará and Brasília. The Ceará number is used as the primary CTA target (inferred from her `OAB/CE` registration, not explicitly stated as primary in the briefing — worth confirming with her); both numbers are listed by region in the Footer.

## 8. Deployment

> ⚠️ **Provisional — could not be fully verified from the repository.**

- **Hosting:** Vercel, per the project's Notion dashboard (status: "Active"). No `vercel.json` is present, which is normal for a standard Next.js app on Vercel's zero-config deployment.
- **CI/CD:** no GitHub Actions or other CI config files exist in this repository. If checks run on pull requests, they are configured entirely on Vercel's side (Vercel's own preview-deployment-per-PR flow) — this could not be confirmed from the codebase and should be verified directly in the Vercel project dashboard.
- **Environment variables:** none are currently defined or required by the codebase (no `.env.example` exists). The GTM container ID and business phone number are hardcoded, not environment-driven, as of this writing.
- **Domain:** `julianarangel.adv.br` is already registered at Registro.br (confirmed by the project owner, 2026-08-29). DNS pointing to production and the final go-live deploy are still pending (Notion "Phase 7: Launch").
- **Email:** the client will need a business email provider (e.g. `contato@julianarangel.adv.br`) — not yet chosen. Tracked as a future decision in [Section 9](#9-roadmap--known-gaps); factors to weigh when the time comes include her use of Meta Ads (and possibly Google Ads later), so a provider that plays well with whichever ad/analytics stack ends up in use is relevant, alongside cost and mailbox management.

## 9. Roadmap & Known Gaps

Mirrors the phased roadmap tracked in the project's Notion dashboard, adjusted to reflect the actual current state of the code and the gaps identified during this review.

### Done (this development pass)

- [x] Gate `GoogleTagManager` behind cookie consent ([ADR-0002](docs/adr/0002-gtm-consent-gating.md)) — closed an active LGPD compliance gap
- [x] Introduce `src/content/` (JSON) as the source of truth for site copy and business data ([ADR-0001](docs/adr/0001-content-architecture.md))
- [x] Add `TopBar` (contact + social), sticky `Header` (anchor nav, CTA, mobile hamburger menu) and full `Footer` (useful links, both contact numbers) — previously the page had no persistent chrome despite `Services`/`About`/`Faq` already carrying unused anchor IDs
- [x] Add `/politica-de-privacidade` route (placeholder legal text, pending client/counsel review)
- [x] Define the multi-client template architecture ([ADR-0003](docs/adr/0003-template-architecture.md)) and a `docs/clients/<slug>/` convention for client intake material
- [x] Add `Differentials` band (icon + label) using the client's own stated differentiators
- [x] Replace all placeholder content with the client's real briefing data (services, FAQ, bio, contact, social links, hero copy) — see [ADR-0005](docs/adr/0005-briefing-integration-decisions.md)
- [x] Build `Team` and `GoogleRating` components (kept in the codebase, not currently rendered — see ADR-0005 §3)
- [x] Wire `WhatsAppButton` into `Services` (per-service message), `About`, `Faq`, plus `FloatingWhatsApp` — every touchpoint now converts
- [x] Find, organize, and fully integrate the client's real brand identity kit — colors, typography, logo, favicon, and photo all now match the real brand guidelines ([ADR-0006](docs/adr/0006-brand-identity-assets.md))
- [x] Expand social links to Instagram, TikTok, Kwai, and Facebook
- [x] Found and fixed a pre-existing bug (present since the original scaffold) where `globals.css` used Tailwind v3's `@tailwind` directive syntax instead of v4's `@import 'tailwindcss'`, silently dropping most default colors and all responsive/hover variants — see [ADR-0006](docs/adr/0006-brand-identity-assets.md)

### In progress / next up

- [ ] Do a manual visual pass on `Footer` in a real browser — its rendering wasn't captured cleanly by automated screenshot tooling during this session (see ADR-0006 follow-up note), though its markup/classes are verified by other means
- [ ] Accessibility pass: semantic landmarks, skip-link, contrast, focus states — prioritized because the client's actual audience skews elderly/disabled (BPC/LOAS claimants)
- [ ] Refine micro-interactions, verify cross-breakpoint responsiveness (icon library already integrated)
- [ ] Custom `not-found.tsx` (branded 404 page)
- [ ] Remove stale, fully-merged feature branches (`feature/design-tokens`, `feature/faq-section`, `feature/hero-section`, `feature/lgpd-cookie-banner`, `feature/responsive-styling`, `feature/seo-analytics`, `feature/services-about-section`, `feature/whatsapp-dynamic-links`) — pending explicit confirmation before deletion
- [ ] Confirm with the client: Ceará number as primary WhatsApp CTA (currently inferred, not stated), whether "Análise Gratuita" was a deliberate compliance call on her part, and whether her Facebook handle should also be unified to `julianarangel.adv` (currently kept as the distinct real URL from her briefing — see note below)
- [ ] Choose a business email provider for `@julianarangel.adv.br` once the client is ready — Claude will help weigh options at that point (candidates to revisit: Google Workspace, given her Meta Ads usage today and possible future Google Ads/GA4/Search Console under one account; Zoho Mail as a cheaper alternative; Microsoft 365 if she prefers Outlook)

### Blocked on client input

- A physical address, if the practice ever gets one (currently remote/presencial, no office address given)
- Real GTM container ID and any Google Ads/Meta Ads campaign configuration
- Real Google Business Profile rating/review count, to enable `GoogleRating` ([ADR-0004](docs/adr/0004-social-proof-google-rating.md))
- Team roster beyond Dra. Juliana herself, if the practice ever adds collaborating attorneys, to enable `Team`
- Confirmed TikTok/Kwai handles (currently assumed to match her Instagram handle `julianarangel.adv`, per explicit instruction — worth a quick real confirmation since neither was in the original briefing)
- Final legal text for `/politica-de-privacidade` (the briefing indicates this may arrive via the client's Drive folder) and Section 5 of the briefing ("Observações e Restrições OAB") was left blank — worth asking directly
- Business email provider selection (see above)
- Final Lighthouse/SEO audit, `robots.txt`, `sitemap.xml`, `LegalService` JSON-LD structured data, and DNS pointing for the now-registered domain (Notion "Phase 7: Launch")

### Deferred by deliberate decision (not forgotten — revisit when the trigger condition is met)

- **Google Consent Mode v2** — revisit once a real GTM container and an actual ad campaign exist; requires input from whoever owns the client's ad accounts and, ideally, legal sign-off, since it involves sending anonymized signals to Google before consent ([ADR-0002](docs/adr/0002-gtm-consent-gating.md))
- **Lightweight fallback contact form** alongside WhatsApp, for visitors who prefer not to use WhatsApp or want a written record — logged as future scope, not yet scheduled
- **Headless/visual CMS** (e.g., TinaCMS) on top of `src/content/`, once the client asks for self-service content editing
- **Blog**, once there is an actual decision to publish ongoing content — the content architecture in ADR-0001 is deliberately chosen so this doesn't require re-modeling data later
- **Branch-per-client / package-based template (ADR-0003 Levels B/C)** — revisit once a second real client is confirmed
- **Automated tests** — no test framework is currently configured; not addressed by the current plan

## 10. Contributing / Dev Workflow

- **Commits:** follow the existing conventional-ish style visible in `git log` (`feat:`, `fix:`, `chore:`, `style:` prefixes with a short imperative description).
- **Branches:** `feature/<short-description>` naming has been used historically. Branches are expected to be deleted once merged (see the cleanup item in [Section 9](#9-roadmap--known-gaps)).
- **Linting/formatting:** enforced automatically on commit via Husky + lint-staged; run `npm run lint` manually if needed.
- **Language convention:** documentation (this README, ADRs) is written in English. In-code comments follow the existing codebase convention of Brazilian Portuguese (see `CookieBanner.tsx`, `layout.tsx`) — kept consistent rather than mixed. All user-facing site copy (visible to the client's end users) is Brazilian Portuguese.
- **Verify styling changes visually, not just by content.** A real bug (see [ADR-0006](docs/adr/0006-brand-identity-assets.md)) went undetected across several earlier development passes because verification relied on `curl` + text-content checks rather than an actual rendered screenshot. Any change touching CSS/Tailwind should be confirmed with a real screenshot, not just "the HTML contains the right text."
