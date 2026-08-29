# ADR-0008: UX Psychology Pass, Contact Section, Icons per Benefit

**Status:** Implemented
**Date:** 2026-08-29

## Context

Follow-up requests from the project owner: double the horizontal logo in the header/footer, add an email icon alongside the social icons, restore the social/email icons to `TopBar` (they'd been moved to `Footer`-only last round) while also keeping them in `Footer`, add a new "Contato" section after the FAQ with buttons for phone/WhatsApp/email, rename "Serviços" to something that includes "Benefícios," remove "(sede)" from the Ceará label, and — the open-ended part — apply UX psychology and persuasion research to the site given who the attorney's actual clients are, and reassess the Differentials band's dark background.

## Who the audience actually is (basis for the UX decisions below)

The services offered (BPC/LOAS, disability/accident benefits, retirement) mean a meaningful share of visitors are elderly, dealing with a disability, or both — anxious, often unfamiliar with legal process, frequently arriving after a stressful denial or bureaucratic dead-end (the briefing's own "Dores do Cliente" section describes exactly this). Design decisions here were evaluated against that audience, not a generic "landing page best practices" checklist.

## Decisions

### 1. Icons per benefit card (client's own original request, never implemented until now)

The client's briefing (Section 2) explicitly asked for "cada benefício com um símbolo" (a symbol for each benefit) — this was never built. Added a `icon` field to each entry in `services.json` and render it in `Services.tsx` via lucide-react (`Baby`, `Stethoscope`, `Bandage`, `HandHeart`, `Calendar`, `Accessibility`, `Lock`, `Users`, `FileSearch` — one per benefit, chosen for direct visual association rather than decoration). This is a real, evidence-backed UX improvement for this audience specifically: icons let a visitor scan and self-identify "which card is mine" in under a second, without reading nine paragraphs — valuable for anyone in a hurry, distressed, or less comfortable with dense text.

### 2. Differentials band: dark → light background

Correctly flagged by the project owner: `Hero` (dark) immediately followed by `Differentials` (also dark, in the previous pass) read as one heavy, monotone block at the very top of the page. Changed `Differentials` to a light background (`bg-neutral-50`) with solid burgundy icon badges (full-strength `bg-brand-primary`, safe now that it's icon-on-light rather than text-on-dark) and dark text. This also improves the page's rhythm: **dark (Hero) → light (Differentials) → white (Services) → light (About) → white (Faq) → dark (Contact + Footer)** — alternating bands read as organized, intentional sections rather than a wall of one tone, which also aids scanability for the same audience reasons as the icons above.

### 3. New "Contato" section

Added `src/components/Contact.tsx`, placed after `Faq`, before `Footer`. Four large, individually-tappable cards — WhatsApp, "Ligar — Ceará", "Ligar — Brasília", E-mail — each pairing an icon with the actual destination value, on a dark background matching `Footer` (they read as one closing "let's talk" block). This directly serves the audience profile above: **choice reduces anxiety for someone unsure which channel to use**, and offering phone/email as real alternatives (not just WhatsApp everywhere) respects that not everyone — especially older visitors — defaults to WhatsApp. `Contato` was added to the nav (`site.json`), positioned last, matching the section's position on the page.

### 4. Reassurance microcopy under the primary CTA

Added a small line under the Hero button: "Atendimento humanizado · Sem compromisso · Resposta rápida." This is a standard, well-evidenced conversion pattern — brief reassurance next to the highest-stakes button on the page measurably reduces click hesitation by pre-answering the unspoken objection ("what am I committing to?"). Kept deliberately understated (small, muted text, factual claims only) to stay inside OAB's sobriety requirement — this is reassurance, not a sales pitch.

### 5. "Serviços" → "Benefícios e Serviços que Oferecemos"

The nine offerings are INSS _benefícios_, and that's almost certainly the term visitors actually search/think in ("benefício do INSS," not "serviço de advocacia"). Nav label changed to "Benefícios"; the section's own heading changed to "Benefícios e Serviços que Oferecemos" — aligns the site's language with how the audience actually frames what they're looking for, which is both a clarity and (modest, organic) SEO-relevant improvement.

### 6. Logo doubled, email icon added, TopBar/Footer both keep social + email

`Header`/`Footer` logo: `h-11` → `h-[88px]` (literal double). A `Mail` icon (mailto: link) was added next to `SocialLinks` in both `TopBar` and `Footer` — reversing last round's move-to-footer-only, per explicit instruction this round: both surfaces now show social + email, `TopBar` also keeps both phone numbers as before. `"Ceará (sede)"` → `"Ceará"` in `site.json`.

**⚠️ Email address changed:** `site.json`'s `email` field was updated from the real, working Gmail address to `contato@julianarangel.adv.br`, per explicit instruction. This professional-domain address is **not provisioned yet** — no mailbox exists until the client picks an email provider (still an open roadmap item). Until then, messages sent to it will not be received. Flagged here and in the roadmap; the working Gmail address should probably stay as a functional fallback until the new address is live — worth confirming with the client before this goes to production.

### Responsive bug found and fixed while verifying this round

Restoring social+email icons to `TopBar` alongside both phone numbers overflowed on real mobile widths (390px): the flex layout compressed the phone-number links until their `whitespace-nowrap` text visually overlapped the first social icon. Fixed by stacking `TopBar` into two centered rows on narrow screens (`flex-col` below `sm:`, `flex-row` at `sm:` and up) — phones on top, icons below — instead of trying to force everything into one line. Caught by an actual mobile-width screenshot, not assumed.

## Verification

Desktop and mobile screenshots confirmed: TopBar (both phones + all icons, no overlap after the fix), Header (doubled logo, reordered nav with "Benefícios" and "Contato"), Hero (reassurance microcopy), Differentials (light background, per-benefit icons on Services cards), About, and Faq. `Contact` and `Footer` were confirmed present via server-rendered HTML content checks (exact heading/label/email text found) rather than a clean full-page screenshot — the same headless-browser limitation noted in ADR-0006/0007 was hit again, compounded this time by `Hero`'s `80vh` sizing behaving inconsistently across different oversized test-window heights in headless mode (not something that affects real users at realistic viewport sizes, based on the desktop/mobile screenshots that did work). Recommend a quick real-browser look at `Contact`/`Footer` before launch.

## Consequences

- **Positive:** the benefit icons directly fulfill a request from the client's own briefing that had been missed.
- **Positive:** page rhythm (alternating light/dark) and the new Contact section both make the page easier to scan and reduce choice-anxiety for a genuinely vulnerable audience.
- **Negative:** `email` now points to an unprovisioned address — a real functional risk if launched before the mailbox exists.
- **Follow-up:** decide with the client whether to keep the working Gmail address live as a fallback until `contato@julianarangel.adv.br` is provisioned.
