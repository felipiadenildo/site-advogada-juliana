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
│   │   ├── globals.css        # Tailwind directives + brand design tokens
│   │   ├── layout.tsx         # Root layout, Metadata API (SEO/OpenGraph), GTM injection
│   │   └── page.tsx           # Landing page composition (Hero, Services, About, Faq)
│   └── components/
│       ├── About.tsx          # Institutional trust section (attorney bio)
│       ├── CookieBanner.tsx   # LGPD consent banner (localStorage-backed)
│       ├── Faq.tsx            # Interactive accordion (Client Component)
│       ├── Hero.tsx           # Above-the-fold value proposition + primary CTA
│       ├── Services.tsx       # Practice areas grid
│       └── WhatsAppButton.tsx # Reusable WhatsApp deep-link CTA
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

⚠️ **Planned addition, not yet implemented:** a `/content` directory holding site copy and business data (services, FAQ, attorney bio, phone numbers, brand tokens) as MDX/JSON files, decoupled from component code. See [ADR-0001](docs/adr/0001-content-architecture.md) and [Section 5](#5-content--configuration) below.

## 5. Content & Configuration

> ⚠️ **Provisional section — describes target design, not current state.** As of this writing, all site copy and business data (phone number, attorney bio, OAB registration number, service descriptions, FAQ entries, GTM container ID) is hardcoded directly inside component files, and is entirely placeholder content pending the client's onboarding materials.

**Target design (see [ADR-0001](docs/adr/0001-content-architecture.md)):** business content will move into a `/content` directory as MDX/JSON files, consumed by components instead of inline literals. This is deliberately _not_ a TypeScript config object — plain MDX/JSON was chosen because it can be edited directly (even via GitHub's web UI) without a dev environment, and it is the native format expected by git-based visual content editors (e.g., TinaCMS), so a future move to client self-editing or a blog would not require re-modeling the data.

This is infrastructure work, not yet built. Until it lands, editing site copy still requires changing the relevant component in `src/components/`.

## 6. Compliance Notes (OAB & LGPD)

- **OAB Provimento 205/2021:** current copy avoids pricing, sensationalism, and aggressive commercial hooks, favoring an informative/educational tone (e.g., the FAQ section explains contingency-fee ("ao êxito") arrangements and legal timelines rather than making promotional claims). This has not been reviewed by qualified legal counsel — flagged as a gap under [Section 9](#9-roadmap--known-gaps).
- **LGPD — cookie consent:** `CookieBanner.tsx` persists user consent in `localStorage` (`lgpd_cookie_consent`) and is implemented and functional.
- **LGPD — tag gating:** ⚠️ **Known gap, fix planned but not yet implemented.** `layout.tsx` currently renders `<GoogleTagManager>` unconditionally, regardless of cookie consent state — this contradicts the project's stated compliance posture. The approved fix ([ADR-0002](docs/adr/0002-gtm-consent-gating.md)) is to only mount the GTM script after consent is accepted ("Basic Mode" / block-until-consent), tracked as a priority item in the roadmap.
- The GTM container ID currently in code (`GTM-XXXXXXX`) is a placeholder; no live tag configuration or ad campaign exists yet, so this gap currently has no real-world tracking impact — but it is being fixed proactively before any real container/campaign goes live.

## 7. Conversion Tracking

Every conversion touchpoint is designed to route through `WhatsAppButton.tsx`, a component that builds a `wa.me` deep link with a URI-encoded, pre-filled message. Because the message text differs per touchpoint, the destination WhatsApp conversation reveals which section (and, in the target design, which specific service) the lead came from — this is the project's attribution mechanism in lieu of full analytics tracking.

**Current state:** only `Hero.tsx` uses `WhatsAppButton`. The "Saber mais →" buttons in `Services.tsx` are inert (no `href`/`onClick`), and `About.tsx`/`Faq.tsx` have no CTA at all.

**Planned:** wire `WhatsAppButton` into `Services` (with a per-service contextual message — e.g., _"Quero saber mais sobre BPC/LOAS"_), `About`, and `Faq`, once the content layer (Section 5) lands. Tracked in the roadmap below.

## 8. Deployment

> ⚠️ **Provisional — could not be fully verified from the repository.**

- **Hosting:** Vercel, per the project's Notion dashboard (status: "Active"). No `vercel.json` is present, which is normal for a standard Next.js app on Vercel's zero-config deployment.
- **CI/CD:** no GitHub Actions or other CI config files exist in this repository. If checks run on pull requests, they are configured entirely on Vercel's side (Vercel's own preview-deployment-per-PR flow) — this could not be confirmed from the codebase and should be verified directly in the Vercel project dashboard.
- **Environment variables:** none are currently defined or required by the codebase (no `.env.example` exists). The GTM container ID and business phone number are hardcoded, not environment-driven, as of this writing.
- **Domain:** production domain (`julianarangel.adv.br`) DNS pointing is pending per Notion (Phase 7, not started).

## 9. Roadmap & Known Gaps

Mirrors the phased roadmap tracked in the project's Notion dashboard, adjusted to reflect the actual current state of the code and the gaps identified during this review.

### In progress / next up

- [ ] Gate `GoogleTagManager` behind cookie consent ([ADR-0002](docs/adr/0002-gtm-consent-gating.md)) — closes an active LGPD compliance gap
- [ ] Introduce `/content` (MDX/JSON) as the source of truth for site copy and business data ([ADR-0001](docs/adr/0001-content-architecture.md))
- [ ] Wire `WhatsAppButton` into `Services` (per-service message), `About`, and `Faq`
- [ ] Visual polish: integrate `lucide-react`, refine micro-interactions, verify cross-breakpoint responsiveness
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
- **Language convention:** code, comments, and documentation are written in English; all user-facing site copy (visible to the client's end users) remains in Brazilian Portuguese.
