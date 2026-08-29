# ADR-0006: Real Brand Identity Assets

**Status:** Implemented
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

## Full rebrand (completed in a follow-up pass, same day)

With explicit go-ahead from the project owner ("proceed however you think best"), the full rebrand was completed:

- **Design tokens:** `globals.css` now defines `--color-brand-primary` (`#590f12`), `--color-brand-primary-light` (`#a13a3e`, a lighter tint used only where burgundy text/icons sit on a dark background — pure burgundy text on graphite fails contrast), `--color-brand-secondary` (`#1e1e1e`), `--color-brand-whatsapp` (`#25d366`), and `--color-brand-whatsapp-dark` via Tailwind v4's `@theme`, generating real utility classes (`bg-brand-primary`, `text-brand-primary`, etc.).
- **Typography:** `layout.tsx` now loads Cinzel (headings) and Montserrat (body) via `next/font/google`, replacing Playfair Display/Inter.
- **Every component** updated from the old blue/green/slate palette to the brand tokens (`Hero`, `Header`, `TopBar`, `Footer`, `Differentials`, `Services`, `About`, `Faq`, `CookieBanner`, `FloatingWhatsApp`, and the not-yet-rendered `Team`/`GoogleRating`, kept consistent for whenever they're enabled).
- **Logo:** `Header` and `Footer` now render the real wordmark (`public/images/logo-horizontal-light.svg`) instead of the plain-text firm name — see "Cleaning the raw SVGs" below.
- **Hero highlight:** the emphasized headline text ("Benefícios do INSS") uses white text with a burgundy underline accent rather than colored text, since pure burgundy-on-graphite fails contrast — the guideline's own "linhas de destaque" (highlight lines) usage of burgundy supported this reading.

### Cleaning the raw SVGs

The raw Figma exports needed real editing before use, not just relocation:

- Removed the baked-in background `<rect>` (each file was exported against a fixed-size colored artboard, not a transparent canvas).
- The monogram's Figma guide-border (`stroke="#D1D5DB"`) was stripped — it was a presentation artifact, not meant to render.
- The horizontal logo's `<clipPath>` wrapper was removed after discovering it silently dropped the wordmark text in some renderers (see below) — the path geometry doesn't need clipping to render correctly.
- The favicon (`src/app/icon.svg`) is the monogram cropped to its actual bounding box (`viewBox="136 19 48 58"`, not the original `0 0 320 98` artboard), so it isn't a tiny mark floating in a mostly-empty box.
- `src/app/favicon.ico` (16/32/48/64px) was generated from the cleaned monogram via ImageMagick for older-browser fallback.

## An important bug found and fixed along the way: Tailwind v4 import syntax

While visually verifying the rebrand (see Verification below), most text and background colors — including plain `text-white`, `bg-white`, and every responsive (`md:`, `sm:`) and `hover:`/`focus:` variant — were silently not rendering, despite compiling without errors. Root cause: `globals.css` used the Tailwind v3 directive syntax (`@tailwind base; @tailwind components; @tailwind utilities;`), which this project's Tailwind v4.3.3 only partially honors — it generated utilities for custom `@theme` tokens but never loaded the full default utility catalog (`node_modules/tailwindcss/index.css`, which bundles Preflight, the default theme, and all utilities behind `@import "tailwindcss";`). This bug **predates this session** — it was present in the original scaffold (`6e8132f chore: setup initial next.js template`) and had been silently degrading every previous task's styling (hover states, responsive breakpoints, default colors) without being caught, because prior verification in this project relied on `curl` + text-content checks, not actual visual rendering.

**Fix:** replaced the three `@tailwind` directives with `@import 'tailwindcss';` in `globals.css`. Confirmed via the compiled CSS output: rule count went from 65 to 161, `text-white` went from 0 occurrences to present, `md:` responsive variants went from 0 to present.

**Process takeaway:** this project's testing going forward should include an actual rendered screenshot for any visual/styling change, not just HTML content checks — logged as a note for future work in this codebase.

## Consequences

- **Positive:** the live site now matches the client's real, designer-produced brand identity end-to-end (colors, typography, logo, photo, favicon).
- **Positive:** an unrelated, pre-existing, high-impact CSS bug was found and fixed as a side effect of doing real visual verification.
- **Negative:** the rebrand is a large diff touching nearly every component file — reviewed carefully, but worth a deliberate look before deploying.
- **Follow-up:** `Footer`'s exact rendering wasn't captured in a clean screenshot (a fixed-position `CookieBanner` kept coinciding with the true document bottom at the extreme test viewport heights this required) — verified instead via shared-class inspection (identical tokens confirmed elsewhere) and DOM content checks. Worth a quick manual look in a real browser before launch.
