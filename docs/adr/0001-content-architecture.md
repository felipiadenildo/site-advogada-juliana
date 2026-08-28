# ADR-0001: Content Architecture — MDX/JSON in `/content`

**Status:** Implemented
**Date:** 2026-08-28

## Context

Site copy and business data (services, FAQ, attorney bio, phone number, OAB registration number, brand tokens, GTM container ID) are currently hardcoded as literals inside individual component files (`Hero.tsx`, `Services.tsx`, `About.tsx`, `Faq.tsx`, `layout.tsx`). Every content change — including the client's own onboarding data, once available — requires editing multiple `.tsx` files.

The project owner has expressed that the client may, in the future, want to edit content directly and/or add a blog. No CMS budget, timeline, or concrete request exists yet — this is a forward-looking consideration, not a current requirement.

Three options were considered:

1. **A single TypeScript config object** (e.g. `src/content/site.ts`) holding all business data as typed exports.
2. **MDX/JSON files under `/content`**, imported by components at build time.
3. **A headless/visual CMS now** (e.g., TinaCMS, Sanity, Storyblok).

Research into 2026 practice for small-business Next.js sites confirms: a static config file is adequate when content changes rarely, but a git-based content format (Markdown/MDX/JSON) is what tools built for non-technical, in-repo editing (notably TinaCMS) expect to sit on top of — they render a visual editor over existing MDX/JSON files rather than requiring a separate data migration.

Option 3 was rejected for now: it adds an external account/dependency before there is real content, a confirmed client request, or budget for it.

## Decision

Adopt **Option 2**: business content moves into a `/content` directory as MDX (for longer-form text, e.g. attorney bio) and JSON (for structured lists, e.g. services, FAQ) files. Components read from this directory instead of containing inline literals.

This is strictly more setup than a TypeScript object for the current, single-page use case — that cost is accepted deliberately.

## Consequences

- **Positive:** editing copy no longer requires touching component code or understanding React/JSX. Files are plain text, diffable, and could be edited via GitHub's web UI in a pinch.
- **Positive:** if the client later wants self-service editing or a blog, a visual editor (e.g., TinaCMS) or MDX-based blog collection can be layered on top of this same `/content` directory without re-modeling the underlying data.
- **Negative:** more moving parts than a plain `.ts` object (file parsing/loading, typing the shape of frontmatter/JSON).
- **Follow-up:** this ADR does not commit the project to any specific CMS or blog implementation — those remain open, deferred decisions (see README, Section 9).

## Implementation notes (deviations from the original decision above)

- **Location is `src/content/`, not a top-level `/content`.** `tsconfig.json` maps the `@/*` import alias to `./src/*`; keeping content under `src/` lets components import it as `@/content/site.json` instead of a separate relative-path scheme.
- **The attorney bio is a plain string field in `about.json`, not a compiled `.mdx` file.** Real MDX compilation requires installing `@next/mdx` + `@mdx-js/*` and changing `next.config.ts` (`pageExtensions`, `withMDX`) — none of which are installed today. For a single paragraph with no embedded interactive components, that toolchain has no payoff yet. The content still lives as portable, git-based plain text — the property this ADR actually cares about — so the core decision is intact; only the specific file format for long-form text was simplified. Revisit real `.mdx` compilation when content actually needs embedded components (e.g., a blog post with a custom callout).
