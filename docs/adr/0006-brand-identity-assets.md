# ADR-0006: Real Brand Identity Assets — Integrated Partially, Full Rebrand Pending

**Status:** Partially implemented
**Date:** 2026-08-29

## Context

A `temp/` folder appeared in the repository root containing the client's actual, designer-produced brand identity kit (`docs/clients/juliana-rangel-advocacia/brand/BRAND_IDENTITY_GUIDELINES.md`): an official color palette, typography, and 17 exported logo SVGs plus a professional attorney photo. This is real, confirmed brand identity — not a placeholder or an assumption.

**What it specifies, and how it differs from what's currently built:**

|                   | Guideline (real)                         | Current site                     |
| ----------------- | ---------------------------------------- | -------------------------------- |
| Primary color     | Vinho Institucional `#590F12` (burgundy) | Tailwind `blue-900`              |
| Secondary         | Grafite Escuro `#1E1E1E`                 | Tailwind `slate-900`             |
| Accent (CTA only) | Verde Conversão `#25D366`                | Tailwind `green-600` (`#16a34a`) |
| Heading font      | `Cinzel` (serif)                         | `Playfair Display`               |
| Body font         | `Montserrat` (sans)                      | `Inter`                          |
| Logo              | Real vector wordmark + monogram          | None (text-only firm name)       |
| Photo             | Real professional headshot               | Placeholder gray box             |

The Notion project dashboard (read during initial discovery) had specified Playfair Display / Inter and a blue/green palette — that information is now superseded by this real, designer-delivered kit.

The raw SVG exports are Figma artboard exports, not production-ready assets as-is: each carries a baked-in background rectangle sized to a fixed canvas (e.g. `320×96`), and the monogram files include a visible gray guide-border (`stroke="#D1D5DB"`) that is a Figma presentation artifact, not meant to render in production. Using them directly as `<img>`/`<Image>` sources would show visible box edges/borders rather than a clean transparent logo.

## Decisions made now (low-risk, don't depend on a full rebrand)

1. **Favicon:** cropped the monogram path to its true bounding box, rebuilt as a clean transparent SVG (`src/app/icon.svg`), and generated a proper multi-resolution `favicon.ico` (16/32/48/64px) from it via ImageMagick — replacing the default Next.js placeholder icon. A favicon is independent of the rest of the page's color scheme, so this was safe to ship without a broader rebrand decision.
2. **Attorney photo:** wired the real photo (`public/images/juliana-rangel.jpg`) into `About.tsx` via `next/image` (responsive `fill` + `sizes`), replacing the gray placeholder box. A real photo is strictly better than a placeholder regardless of the surrounding page's color scheme.
3. **Archival organization:** the full brand kit (guideline doc + all 17 raw SVGs) lives in `docs/clients/juliana-rangel-advocacia/brand/`, following the same convention as the client briefing (ADR-0003) — available for future needs the guideline itself calls out (email signature, social templates, print) without cluttering `public/`.
4. **Dead boilerplate removed:** the default `create-next-app` SVGs in `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) were unused in the codebase and removed.

## Deferred: the full color/typography/logo rebrand

Not done in this pass: swapping every component's Tailwind colors (blue→burgundy/graphite), the Google Fonts pair (Playfair+Inter → Cinzel+Montserrat), and dropping the cleaned wordmark logo into `Header`/`Footer` in place of the plain-text firm name.

**Why deferred rather than done immediately:** this touches every component file in the codebase — a large, high-visibility diff — and per this project's standing rule, changes of that size get confirmed before executing, not applied silently. It's tracked as the clear next major task in the README roadmap.

## Consequences

- **Positive:** the site no longer contradicts the client's own confirmed brand in its two lowest-risk, highest-visibility spots (browser tab icon, attorney photo).
- **Neutral:** until the full rebrand lands, the site currently mixes the old placeholder palette/fonts with the real photo and favicon — an intentional, temporary, and visible inconsistency, not an oversight.
- **Follow-up:** confirm scope and sequencing of the full rebrand with the project owner before starting it.
