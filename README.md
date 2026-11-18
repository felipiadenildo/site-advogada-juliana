# Juliana Rangel Advocacia · landing page

Landing page for a Brazilian social security law firm (retirement, disability benefits, BPC/LOAS, survivor's
pension). Freelance project, built and maintained by Felipi Adenildo, live at
**[julianarangel.adv.br](https://julianarangel.adv.br)**.

The goal is to turn paid traffic (Google Ads and Meta Ads) into conversations on WhatsApp, within two constraints:
the Brazilian Bar Association's advertising rules for lawyers (OAB Provimento 205/2021: informative tone, no prices,
no testimonials) and Brazil's data protection law (LGPD: no tracking before consent).

## Highlights

- **Attribution without heavy analytics.** Every call to action goes through one `WhatsAppButton` component that opens
  WhatsApp with a pre-filled message specific to the section or service, so each conversation shows where the lead
  came from.
- **Consent first.** Google Tag Manager is only mounted after the visitor accepts cookies
  ([ADR-0002](docs/adr/0002-gtm-consent-gating.md)).
- **Content separate from code.** Firm data and copy live in JSON files under `src/content/`, so the same components
  can serve another client ([ADR-0001](docs/adr/0001-content-architecture.md),
  [ADR-0003](docs/adr/0003-template-architecture.md)).
- **Accessible and indexable.** WCAG contrast fixes, skip link and keyboard focus
  ([ADR-0009](docs/adr/0009-accessibility-pass.md)); sitemap, robots and `LegalService` structured data. Lighthouse
  scores 100 for Accessibility, Best Practices and SEO ([ADR-0010](docs/adr/0010-launch-readiness-seo-compliance.md)).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · ESLint, Prettier, Husky · Vercel.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

No environment variables are needed. A pre-commit hook runs ESLint and Prettier on staged files.

## Structure

```
src/app/          routes: landing page, privacy policy, 404, sitemap and robots
src/components/   page sections (Hero, Services, About, Faq, Contact...) and the WhatsApp, cookie and GTM components
src/content/      firm data and copy as JSON (contact, services, FAQ, bio)
src/lib/          useCookieConsent hook
docs/adr/         architecture decision records, 0001 to 0012
docs/clients/     the client's intake form and brand guidelines (personal data redacted)
```

## Decisions

Each significant choice is recorded as an ADR in [`docs/adr/`](docs/adr/): content architecture, consent gating,
multi-client template, social proof without testimonials, integration of the client's briefing, brand assets, calls to
action, contact section, accessibility, launch readiness, light theme and visual polish.

## Open items

- The domain e-mail (`@julianarangel.adv.br`) is being set up; until then the site shows the firm's Gmail.
- A real Google Tag Manager container and the Google rating component wait on the client's ad and Google Business
  accounts ([ADR-0004](docs/adr/0004-social-proof-google-rating.md)).
- There is no automated test suite.

## Rights

The code was written for the client. Brand, texts, photos and logos belong to Juliana Rangel Advocacia and are not
licensed for reuse.
