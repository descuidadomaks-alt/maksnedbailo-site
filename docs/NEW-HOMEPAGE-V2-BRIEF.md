# BRIEF: Build the experimental homepage V2 at `/new`

**Repo:** `D:\Claude Code\maksnedbailo-site` (Next.js 14 App Router, TypeScript, Tailwind, framer-motion, Lenis)
**Live site:** https://maksnedbailo.site/
**Target route:** https://maksnedbailo.site/new
**Branch:** `main`. Do NOT commit and do NOT push — this deploys to a live site. Leave changes in the working tree.

Execute this fully. Build the page. Do not stop after analysis, do not hand back recommendations or mock copy.

---

## 0. READ THIS FIRST — the trap in this task

The naive reading of "build a new page at `/new`" is dangerous in this repo. Here is the actual structural situation, already verified:

- `app/new/page.tsx` currently contains `permanentRedirect("/")`. That is the redirect to remove.
- **BUT `app/new/` is not a dead folder.** It is the shared component + copy library that powers the LIVE homepage and several other routes. Verified importers:
  - `app/page.tsx` (the live `/` homepage) imports `app/new/NewHomeClient.tsx`, `app/new/lib/locale.tsx`, `app/new/components/NewHeader.tsx`
  - `app/(site)/SiteHeader.tsx`, `app/(site)/SiteFooter.tsx`, `app/(site)/HomePageClient.tsx`
  - `app/ai-map/DirectPage.tsx`, `app/ai-map/lib/directi18n.ts`, `app/ai-map/lib/DirectLocaleWrapper.tsx`, `app/ai-map/sections/DirectProblem.tsx`, `app/ai-map/sections/DirectFinalCTA.tsx`
  - `app/layout.tsx` (imports `UPWORK_PROFILE_URL` from `app/new/lib/config`)

  The history: the "Bottleneck Map" page was built at `/new`, then **promoted to `/`**, and `/new` was left as a 301 to `/`. So `app/new/sections/*` IS the current homepage's source.

**Therefore, the hard rules:**

1. **Do not modify any existing file inside `app/new/sections/`, `app/new/components/`, or `app/new/lib/`.** Editing `Hero.tsx`, `i18n.ts`, `config.ts`, `site.config.ts` etc. changes the live `/` homepage. Read them freely for reference; treat them as read-only.
2. **All new code goes in a private folder: `app/new/_v2/`.** The `_` prefix makes it a Next.js private folder — excluded from routing entirely, so no accidental `/new/...` routes appear. Structure:
   ```
   app/new/_v2/
     V2HomeClient.tsx        // client component, composes the sections
     lib/copy.ts             // ALL page copy, EN + ES
     lib/config.ts           // v2-only constants + feature flags
     sections/*.tsx          // the new sections
     components/*.tsx        // only if genuinely new; prefer reusing existing
   ```
3. **`app/new/page.tsx` and `app/new/layout.tsx` may be rewritten** — they are used only by the `/new` route. Nothing imports from them. Verify with grep before editing anyway.
4. `/` must be byte-identical in behavior when you finish. Verify: `git diff --stat` must show no changes to `app/page.tsx`, `app/new/NewHomeClient.tsx`, `app/new/sections/*`, `app/new/lib/*`, `app/(site)/*`, `app/ai-map/*`.

---

## 1. What changed strategically (the reason for this page)

The current `/` homepage is built on:

> "Your team isn't the bottleneck. You are."

targeting larger founder-led companies. Positioning has moved on.

Care Less now builds systems across local service businesses, manufacturers, home services, real estate, florists/decorators, clinics/salons, and operations-heavy SMEs — anyone dealing with enquiries, calls, quotes, bookings, follow-ups and repetitive admin.

The common problem is **not** "the founder is the bottleneck." It is:

> Businesses are still spending human time on repetitive work that software + AI can now handle better.

Concentrated in: sales, lead response, calls, follow-up, quoting, booking, customer service, internal operations, repetitive admin, knowledge retrieval.

Care Less sits **above** individual verticals and products. Not "AI receptionists for plumbers", not "AI agents for manufacturers" — those become separate offers/landing pages later. The company-level positioning:

> **We find expensive manual work inside a business and build practical AI systems that remove it.**

**Core objective:** a cold visitor understands within 10–20 seconds: (1) what we do, (2) why it matters to their business, (3) that we build working systems rather than sell AI consulting, (4) that there is a very low-risk way to start.

The page should scream value without screaming "AI agency."

---

## 2. Non-negotiable constraints on the page itself

**Length.** This is the single most important constraint. The current homepage is far too long and demands too much intellectual commitment from a cold visitor. `/new` must be **significantly shorter**. 6 excellent sections, not 15 mediocre ones. Desktop should feel substantial but fast. Mobile must be extremely easy to scan. A visitor should get most of the message by reading only: headline → subheadline → card headlines → CTA. Paragraphs: 1–3 sentences max.

**The AI Map is now FREE, permanently.** Strip every trace of the old offer mechanics from this page:
- no "Free until July 31" / any July deadline
- no €1,470 promotional framing or crossed-out price
- no fake urgency or scarcity around the Map
- no guarantee language (a guarantee on a free thing is nonsense)
- Do NOT import `FOUNDING_DEADLINE_EN`, `FOUNDING_RATE`, `STANDARD_RATE`, `foundingSlotsLeft`, or `slotsOpen` from `app/new/lib/site.config.ts` into V2. (And do not edit that file — `/` and `/ai-map` still use it.)

**Do not restrict the ICP publicly.** No "€3–10M revenue", "20–50 employees", "businesses over €1M". Qualification happens privately. A smaller business is an excellent customer if it has enough enquiry volume, repetitive work, operational complexity, missed revenue, admin, calls, quotes or bookings. Talk about valuable *problems*, not revenue thresholds.

**Do not fabricate anything.** No invented testimonials, client names, revenue figures, statistics, percentages, or case-study results. If a claim isn't already supported by material in this repo or on the live site, don't make it. Existing real names already used on the live site (e.g. the businesses referenced in `app/new/sections/ProofSection.tsx`) may be reused as-is; do not invent new ones and do not attach new numbers to them.

**Banned vocabulary** (site convention already, now extended): unlock AI, transform your business, leverage cutting-edge AI, revolutionize, AI-powered solutions, digital transformation, future-proof, bespoke AI solutions, streamline your workflows. Also banned site-wide per the existing positioning doc and repeated in `app/new/layout.tsx`: "500+ businesses", "34+ countries", "Free audit", "30-day guarantee", "under 60 seconds".

**Do not carry over** from the current approach: excessive founder-bottleneck messaging, walls of text, repetitive FAQ content, huge lists of AI services, arbitrary company-size qualification, scarcity urgency, expired July messaging, ROI theatre, consulting comparisons, long explanations of why AI matters, technology-before-value, repetitive CTA sections, generic "AI automation agency" language. The visitor already knows AI exists. We do not need to sell them on AI. We need to convince them Care Less can find something in *their* business worth fixing, and actually build it.

**Tone.** Intelligent, sharp, direct, confident, slightly irreverent, human, commercially minded — operator talking to another operator. No hype, no AI-bro, no corporate consulting voice. Short sentences. Whitespace. Headlines carry the message.

---

## 3. Page structure to build

Seven blocks. Refine wording if you can make it better — the ideas are what matter, the exact strings are not sacred. Ship EN **and** ES copy (see §5).

### 1. HERO
Central idea:

> **Find the work your business shouldn't be doing manually.**

Supporting line, roughly:

> We find the expensive gaps in sales and operations, then build AI systems to remove them — without replacing the humans who actually matter.

- Primary CTA: **Get your free AI Map** → `/ai-map`
- Secondary CTA: **See what we've built** → anchor to the proof section (`#systems` or similar)
- Optional compact trust line: `Sales. Service. Operations.`
- Concrete, commercially valuable, understandable to a normal business owner, confident, slightly provocative. Not an AI consultant, not startup jargon, not corporate, not hype.
- Do not dump explanation into the hero.

### 2. THE PROBLEM / VALUE
Very short. Anchor it on a statement like:

> The expensive work is usually hiding in plain sight.

Then **3–4** concise, recognizable examples — not a bullet wall. Draw from: leads arriving but nobody follows up fast enough; missed calls becoming missed revenue; quotes disappearing into spreadsheets; staff answering the same questions all day; enquiries scattered across WhatsApp, email, forms and phone; customers needing answers outside office hours. Tie each to money / time / output — never to "AI".

### 3. WHAT WE FIX — three business outcomes, not a services grid
Do **not** build the generic 9-tile "AI automation services" grid every agency has. Three outcomes:

- **SELL** — Capture enquiries. Qualify. Follow up. Quote. Book. Reactivate.
- **SERVE** — Answer calls and messages. Handle common questions. Route exceptions to people.
- **OPERATE** — Remove repetitive admin. Give teams instant access to business knowledge. Connect workflows.

Visual, extremely concise. We sell business outcomes, not technology categories.

### 4. WORKING SYSTEMS / PROOF (`id="systems"`)
This section matters most. Make it tangible. Suggested framing:

- **AI Front Office** — Answers → qualifies → books → follows up.
- **Sales Follow-up System** — Captures → tracks → follows up → reactivates.
- **Operations Agent** — Knows the business → handles repetitive requests → escalates exceptions.

Reuse real assets already in the project where they add credibility. Study `app/new/sections/ProofSection.tsx` — it has small in-card agent-UI mocks (WhatsApp chat thread, booking confirmation, voice waveform) and brand wordmarks in `app/new/components/BrandWordmarks.tsx`. You may lift/adapt those visual mock components into `app/new/_v2/` (copy them, don't edit the originals), or import `ProofSection` directly if it fits — it already takes a `ProofSectionContent` prop and is used by three pages, so passing a V2 dict shaped to that interface is legitimate reuse. Prefer whichever gives a **tighter, more tangible** result; do not let the legacy component force the old information architecture.

Also available: `/projects/*` (eufloria, notd, roman, parati, oh2–oh6, oos*, overtimehunch) and `/automations/*` are real built demos with real screenshots in `public/`. Link to them if it strengthens proof.

### 5. HUMAN + AI (very compact)
> AI should remove work, not humanity.

Then roughly: automate the repetitive part; keep people where judgment, trust, creativity and relationships matter. We are explicitly **not** "replace your employees with 50 AI workers." Pragmatic operators. Humans stay human; AI takes the drudgery people shouldn't spend their lives on. Keep it short — a headline and a line or two.

### 6. FREE AI MAP / HOW WE START
> Don't know what to automate? Good.

Explain: ~90 minutes understanding how the business actually works. Then we identify what's wasting time, what's leaking revenue, what can realistically be automated, **what shouldn't be automated**, and what we'd fix first. You get a ranked AI Map. Free — no deadline.

Optional compact process visual: **Understand → Find → Rank → Build**. Must not look like management consulting.

Include the trust line: if there's nothing worth building, we'll say so.

### 7. FINAL CTA
Human, not a procurement funnel. Direction:

> Bring me one annoying process.

or "Tell me what's annoying you." Plus a short line about looking at it together. Primary CTA: **Get your free AI Map** → `/ai-map`. Secondary contact channel only if already supported (`WA_BOTTLENECK_LINK` in `app/new/lib/config.ts` — import the constant, do not edit the file; or reuse `components/FloatingWhatsApp.tsx`). Should feel like talking to Maks.

### Voice agent — architecture now, content later
A real interactive voice agent will likely be built **today** and plugged into this page as a major proof element ("Don't take our word for it. Talk to one." / "Call our AI agent").

- **Do NOT build a fake or simulated voice demo.**
- Create `app/new/_v2/sections/VoiceProof.tsx` as a real section component with the anchor id from `VOICE_DEMO_ANCHOR` (`#voice-demo`, already exported by `app/new/lib/config.ts`).
- Gate it behind a flag in `app/new/_v2/lib/config.ts`, e.g. `export const VOICE_AGENT_ENABLED = false;` — when false the section returns `null` and renders nothing.
- Give it a clean prop/slot boundary (headline + subline from the copy dict, and an obvious place to mount the widget/embed) so wiring the real agent later is a one-line flag flip plus dropping the client in.
- Place it in the composition immediately in or after the proof section (§4), where it will land naturally.
- If a placeholder would make the page feel unfinished, ship with the flag off. Document exactly where it plugs in.

---

## 4. Reuse map (verified — use this, don't rediscover it)

**Design tokens** (`app/globals.css`, `tailwind.config.ts`):
- `--bg: #060608`, `--fg: #F0ECE6`, `--accent: #D4FF2B` → Tailwind `bg-bg`, `text-fg`, `text-accent`, `border-accent`
- Global film-grain overlay on `body::before` — already applied, don't re-add
- Glass treatment pattern: see `GLASS` / `CTA_GLASS` consts in `app/new/components/NewHeader.tsx`

**Typography.** Put `data-short-page` on the page's `<main>` (as `NewHomeClient.tsx` does). That attribute activates the 2-font system in `app/globals.css` (~line 320+): Roboto Mono for titles/labels, IBM Plex Sans for body and numerals, no serif anywhere. Also gives you the `.font-label` utility (mono, wide letter-spacing eyebrows). Reuse this — it's the mature visual identity, keep it.

**Chrome.** `app/new/layout.tsx` already wraps the `/new` route with `NewLocaleProvider` + `NewHeader` + `ScrollReveal` + 76px top padding for the fixed header. Keep that shape; only update its `metadata` block (title/description/canonical) for the new positioning. `NewHeader` gives logo, /blog, /ai-map, EN/ES toggle, primary CTA — reuse as-is.

**Motion.** `ScrollReveal` (mounted by the layout) drives `[data-reveal]` attributes — use those for entrance animations instead of hand-rolling IntersectionObserver. `framer-motion` and `lenis` are already dependencies; Lenis smooth scroll is mounted globally by the root layout. Subtle motion only — nothing that slows comprehension.

**Existing components worth reusing:** `app/new/components/GlassButton.tsx`, `MobileCtaBar.tsx` (note: it currently points at the Bottleneck Score — if you use it, pass/point it at `/ai-map`, and do it without editing the shared file; copy it into `_v2` if it needs behavior changes), `ElevatorField.tsx` (background canvas effect), `components/FloatingWhatsApp.tsx`, `app/new/sections/NewFooter.tsx` (takes a dict — reuse if the shape fits, otherwise a slimmer V2 footer is fine).

**Constants to import (read-only) from `app/new/lib/config.ts`:** `CTA_TARGET` (= `/ai-map`), `WA_NUMBER`, `WA_BOTTLENECK_LINK`, `VOICE_DEMO_ANCHOR`, `STAGE_PHOTO_SRC`, `HERO_PHOTO_SRC`. Do not import `PHASE1_ANCHOR` (price anchoring) or anything from `site.config.ts`.

**Analytics.** Cloudflare Web Analytics + Microsoft Clarity are mounted in `app/layout.tsx` — they cover `/new` automatically, nothing to add. Before finishing, grep the existing sections for any per-CTA event tracking (`clarity(`, `gtag`, `data-track`, `plausible`) and mirror the same convention on the V2 CTAs if one exists. If none exists, add none.

**Do not add dependencies.** Everything needed is installed.

---

## 5. Bilingual (EN + ES)

The shared `NewHeader` renders an EN/ES toggle and the layout mounts `NewLocaleProvider`. If V2 ships EN-only, clicking ES does nothing and the page looks broken. So:

- `app/new/_v2/lib/copy.ts` exports a typed dict with `en` and `es` variants and a `getV2Copy(locale)` accessor, mirroring the pattern in `app/new/lib/i18n.ts` (but as its own separate file — do not touch `i18n.ts`).
- Spanish must be written in the same operator voice, not machine-translated literalism. The market is Spain; write it as a Spanish-speaking operator would say it.
- Consume it in `V2HomeClient.tsx` via `useNewLocale()` + `getV2Copy(locale)`.

---

## 6. Technical checklist

1. Delete the `permanentRedirect("/")` in `app/new/page.tsx`; replace with a real page that renders `V2HomeClient` (and re-check there's no competing `/new` redirect in `next.config.js` — there isn't as of now; it only redirects `/roman` and `/parati`).
2. Keep the server/client split correct: `page.tsx` server component, `V2HomeClient.tsx` `"use client"`.
3. Update the `metadata` in `app/new/layout.tsx` to the new positioning; keep `alternates.canonical = "https://maksnedbailo.site/new"`. **Do not touch root-layout SEO, `app/sitemap.ts`, or `app/robots.ts`** — `/` keeps its exact SEO behavior. `/new` is experimental; leave it out of the sitemap.
4. Excellent responsive behavior. Mobile first-class, not an afterthought.
5. No new dependencies. No layout shift. Don't preload heavy images above the fold.
6. Run `npm run build` and `npm run lint`. Both must pass. TypeScript errors are build-blocking — fix them, don't suppress.
7. Verify in the browser preview: run `preview_start` with the `maksnedbailo-site` config from `.claude/launch.json` (never `npm run dev` via Bash). Then check **both** `http://localhost:3000/new` and `http://localhost:3000/` at desktop (1280) and mobile (375). Confirm:
   - `/new` renders the new page — no redirect
   - `/` is visually unchanged
   - header/nav renders once (no duplicate header or ticker — that's the historical bug this layout structure exists to prevent)
   - every CTA routes correctly; the primary CTA lands on `/ai-map`
   - EN/ES toggle switches all V2 copy
   - console is clean, no hydration errors
   - take screenshots of `/new` desktop + mobile
8. `git diff --stat` at the end to prove `/` and the shared library are untouched.
9. **Do not commit. Do not push.** The working tree already has unrelated modified/untracked files — leave them alone.

---

## 7. Design principles

**Prioritize:** strong typography, generous whitespace, clear visual hierarchy, concise cards, unmistakable CTAs, subtle interaction/motion, excellent mobile behavior, fast performance, premium but not flashy, no clutter.

**Avoid:** giant gradients everywhere, glowing AI effects, robot imagery, brains/chips/circuit-board clichés, stock photos of people at laptops, heavy glassmorphism, endless cards, animation that delays comprehension.

The new page should read as the **more mature, clearer version of the same company** — not an unrelated template. Keep the visual identity; simplify the information architecture hard.

---

## 8. Report back at the end (concise)

- What you changed (file list, grouped)
- Which existing pieces you reused vs. wrote fresh
- Copy decisions you made — especially anywhere you improved on the wording in this brief
- Exactly where and how the voice agent plugs in later (file, flag name, prop boundary)
- Anything needing manual review. **In particular, flag this known mismatch:** the homepage CTA now says the AI Map is free and permanent, but `/ai-map` (`app/ai-map/*`) may still carry €1,470 / July-deadline / guarantee framing inherited from `site.config.ts`. **Do not fix `/ai-map` in this task** — it's out of scope and shared with `/`. Just report precisely what's inconsistent so it can be decided separately.

The goal is not perfection. The goal is a much tighter V1 at `/new` we can look at, critique, and iterate from. Build first.
