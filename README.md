# Juliana Rangel Advocacia — Landing Page

> ⚠️ **Pre-documentation notice**: this README reflects the team's current understanding of the project as of 2026-08-28. It is not final — sections marked with ⚠️ describe planned/target state that has not been implemented yet, or facts that could not be verified from the repository alone. It will be revised and completed at the end of the project.

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
- **Styling:** Tailwind CSS v4
- **Fonts:** `next/font/google` — Playfair Display (headings), Inter (body)
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
│   └── adr/                   # Architecture Decision Records
├── public/                    # Static assets — currently only default Next.js boilerplate SVGs
├── src/
│   ├── app/
│   │   ├── politica-de-privacidade/
│   │   │   └── page.tsx       # Privacy policy route (⚠️ placeholder legal text)
│   │   ├── globals.css        # Tailwind directives + brand design tokens
│   │   ├── layout.tsx         # Root layout: Header/Footer chrome, Metadata API, GTM gate
│   │   └── page.tsx           # Landing page composition (Hero, Services, About, Faq)
│   ├── content/                # Business data & copy, decoupled from components (ADR-0001)
│   │   ├── site.json          # Firm name, contact info, nav links, GTM id
│   │   ├── services.json      # Practice areas grid data
│   │   ├── faq.json           # FAQ entries
│   │   └── about.json         # Attorney bio & credentials
│   └── components/
│       ├── About.tsx          # Institutional trust section (attorney bio)
│       ├── CookieBanner.tsx   # LGPD consent banner (localStorage-backed)
│       ├── Faq.tsx            # Interactive accordion (Client Component)
│       ├── Footer.tsx         # Firm identification, contact, privacy policy link
│       ├── GtmConsentGate.tsx # Mounts GTM only after cookie consent (ADR-0002)
│       ├── Header.tsx         # Logo + anchor navigation
│       ├── Hero.tsx           # Above-the-fold value proposition + primary CTA
│       ├── Services.tsx       # Practice areas grid
│       └── WhatsAppButton.tsx # Reusable WhatsApp deep-link CTA
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 5. Content & Configuration

Business content (contact info, services, FAQ, attorney bio) lives in `src/content/` as JSON, imported directly by components (see [ADR-0001](docs/adr/0001-content-architecture.md) for why JSON/MDX was chosen over a TypeScript config object or an immediate CMS integration, and for two small implementation-time deviations from the original decision).

All values in `src/content/` are still **placeholder data** (fake phone number, `XXXXX` OAB registration number, bio with `[Bio]`/`X anos` placeholders) pending the client's onboarding materials — but editing them is now a matter of changing one JSON file, not hunting through component code.

## 6. Compliance Notes (OAB & LGPD)

- **OAB Provimento 205/2021:** current copy avoids pricing, sensationalism, and aggressive commercial hooks, favoring an informative/educational tone (e.g., the FAQ section explains contingency-fee ("ao êxito") arrangements and legal timelines rather than making promotional claims). This has not been reviewed by qualified legal counsel — flagged as a gap under [Section 9](#9-roadmap--known-gaps).
- **LGPD — cookie consent:** `CookieBanner.tsx` persists user consent in `localStorage` (`lgpd_cookie_consent`) and is implemented and functional.
- **LGPD — tag gating:** implemented. `GtmConsentGate.tsx` only mounts `<GoogleTagManager>` after `CookieBanner` records acceptance ("Basic Mode" / block-until-consent, per [ADR-0002](docs/adr/0002-gtm-consent-gating.md)).
- The GTM container ID (`src/content/site.json` → `gtmId`) is still a placeholder (`GTM-XXXXXXX`); no live tag configuration or ad campaign exists yet.
- **LGPD — privacy policy:** a `/politica-de-privacidade` route exists with a placeholder structure, clearly marked as pending legal review — the actual legal text still needs to come from the client/counsel.

## 7. Conversion Tracking

Every conversion touchpoint is designed to route through `WhatsAppButton.tsx`, a component that builds a `wa.me` deep link with a URI-encoded, pre-filled message. Because the message text differs per touchpoint, the destination WhatsApp conversation reveals which section (and, in the target design, which specific service) the lead came from — this is the project's attribution mechanism in lieu of full analytics tracking.

**Current state:** only `Hero.tsx` uses `WhatsAppButton`. The "Saber mais →" buttons in `Services.tsx` are still inert (no `href`/`onClick`), and `About.tsx`/`Faq.tsx` have no CTA at all — the content layer (Section 5) now exists, unblocking this, but the wiring itself is not done yet.

**Planned:** wire `WhatsAppButton` into `Services` (with a per-service contextual message — e.g., _"Quero saber mais sobre BPC/LOAS"_), `About`, and `Faq`, plus a persistent floating WhatsApp button. Tracked in the roadmap below.

## 8. Deployment

> ⚠️ **Provisional — could not be fully verified from the repository.**

- **Hosting:** Vercel, per the project's Notion dashboard (status: "Active"). No `vercel.json` is present, which is normal for a standard Next.js app on Vercel's zero-config deployment.
- **CI/CD:** no GitHub Actions or other CI config files exist in this repository. If checks run on pull requests, they are configured entirely on Vercel's side (Vercel's own preview-deployment-per-PR flow) — this could not be confirmed from the codebase and should be verified directly in the Vercel project dashboard.
- **Environment variables:** none are currently defined or required by the codebase (no `.env.example` exists). The GTM container ID and business phone number are hardcoded, not environment-driven, as of this writing.
- **Domain:** production domain (`julianarangel.adv.br`) DNS pointing is pending per Notion (Phase 7, not started).

## 9. Roadmap & Known Gaps

Mirrors the phased roadmap tracked in the project's Notion dashboard, adjusted to reflect the actual current state of the code and the gaps identified during this review.

### Done (this development pass)

- [x] Gate `GoogleTagManager` behind cookie consent ([ADR-0002](docs/adr/0002-gtm-consent-gating.md)) — closed an active LGPD compliance gap
- [x] Introduce `src/content/` (JSON) as the source of truth for site copy and business data ([ADR-0001](docs/adr/0001-content-architecture.md))
- [x] Add `Header` (logo + anchor nav) and `Footer` (firm identification, contact, privacy policy link) — previously the page had no persistent chrome despite `Services`/`About`/`Faq` already carrying unused anchor IDs
- [x] Add `/politica-de-privacidade` route (placeholder legal text, pending client/counsel review)

### In progress / next up

- [ ] Wire `WhatsAppButton` into `Services` (per-service message), `About`, and `Faq`, plus a persistent floating WhatsApp button
- [ ] Accessibility pass: semantic landmarks, skip-link, contrast, focus states — prioritized because the client's actual audience skews elderly/disabled (BPC/LOAS claimants)
- [ ] Visual polish: integrate `lucide-react`, refine micro-interactions, verify cross-breakpoint responsiveness
- [ ] Custom `not-found.tsx` (branded 404 page)
- [ ] Remove stale, fully-merged feature branches (`feature/design-tokens`, `feature/faq-section`, `feature/hero-section`, `feature/lgpd-cookie-banner`, `feature/responsive-styling`, `feature/seo-analytics`, `feature/services-about-section`, `feature/whatsapp-dynamic-links`) — pending explicit confirmation before deletion

### Blocked on client input

- Real business data: office phone/WhatsApp number, attorney bio, OAB registration number, professional photo, brand assets
- Real GTM container ID and any Google Ads/Meta Ads campaign configuration
- Final Lighthouse/SEO audit, `robots.txt`, `sitemap.xml`, `LegalService` JSON-LD structured data, and DNS/domain pointing (Notion "Phase 7: Launch")

### Deferred by deliberate decision (not forgotten — revisit when the trigger condition is met)

- **Google Consent Mode v2** — revisit once a real GTM container and an actual ad campaign exist; requires input from whoever owns the client's ad accounts and, ideally, legal sign-off, since it involves sending anonymized signals to Google before consent ([ADR-0002](docs/adr/0002-gtm-consent-gating.md))
- **Lightweight fallback contact form** alongside WhatsApp, for visitors who prefer not to use WhatsApp or want a written record — logged as future scope, not yet scheduled
- **Headless/visual CMS** (e.g., TinaCMS) on top of `/content`, once the client asks for self-service content editing
- **Blog** (`/content/blog` + routes), once there is an actual decision to publish ongoing content — the content architecture in ADR-0001 is deliberately chosen so this doesn't require re-modeling data later
- **Automated tests** — no test framework is currently configured; not addressed by the current plan

## 10. Contributing / Dev Workflow

- **Commits:** follow the existing conventional-ish style visible in `git log` (`feat:`, `fix:`, `chore:`, `style:` prefixes with a short imperative description).
- **Branches:** `feature/<short-description>` naming has been used historically. Branches are expected to be deleted once merged (see the cleanup item in [Section 9](#9-roadmap--known-gaps)).
- **Linting/formatting:** enforced automatically on commit via Husky + lint-staged; run `npm run lint` manually if needed.
- **Language convention:** documentation (this README, ADRs) is written in English. In-code comments follow the existing codebase convention of Brazilian Portuguese (see `CookieBanner.tsx`, `layout.tsx`) — kept consistent rather than mixed. All user-facing site copy (visible to the client's end users) is Brazilian Portuguese.
