# BRIEF: Rebuild `/new` (V3) — visual, human, no-brainer

**Repo:** `D:\Claude Code\maksnedbailo-site` (Next.js 14 App Router, TypeScript, Tailwind)
**Target route:** `http://localhost:3000/new` → https://maksnedbailo.site/new
**Branch:** `main`. **Do NOT commit. Do NOT push.** Leave everything in the working tree.

Execute this fully. Build it. Do not stop after analysis, do not hand back recommendations or sample copy.

---

## 0. HARD RULES — read before touching anything

`app/new/` is **not** a scratch folder. `app/new/sections/`, `app/new/components/` and `app/new/lib/` are the
source of the **live `/` homepage** and are also imported by `/ai-map`, `/partners/*` and `app/(site)/*`.

1. **Read-only, never edit:** `app/page.tsx`, `app/new/NewHomeClient.tsx`, `app/new/sections/**`,
   `app/new/components/**`, `app/new/lib/**`, `app/(site)/**`, `app/ai-map/**`, `components/**`, `lib/**`.
   You may **import** from them freely. You may not change a byte in them.
2. **`app/globals.css` is read-only too.** It is shared with the live homepage. All new styling goes in
   inline `style={{}}` or Tailwind arbitrary values inside the new components. If you need a keyframe
   animation, define it in a `<style>` tag rendered inside that one client component, scoped by a unique
   class name prefixed `v3-`.
3. **All new code goes in `app/new/_v2/`** (existing private folder, already excluded from routing).
   You may freely rewrite everything already inside `_v2/`, plus `app/new/page.tsx` and
   `app/new/layout.tsx` (only the `/new` route uses those two — verified).
4. When you finish, `git diff --name-only` must list **only** paths under `app/new/_v2/`, plus
   `app/new/layout.tsx` and `docs/`. Nothing else. Verify this before reporting done.
5. `/ai-map/new` is **out of scope** this pass. Do not touch it.

---

## 1. What this page has to do

One goal: a business owner who has never heard of us reads it and either books, or says
"great catch, I already have something", or "I'll come back in a month". Never "so what do they actually do?"

The offer is a genuine no-brainer and the page currently fails to make that obvious. State it plainly, early:

> We find what your business is losing, for free. If something is worth building, we build the first piece,
> you try it on your own business before you commit, and you pay once it works.

Four things drive this build:

- **Obviousness.** A non-technical 55-year-old owner of a 14-person company must understand the value
  without knowing a single AI term.
- **Likelihood of achievement** (Hormozi's value equation — this is the weak variable, fix it): proof it
  works, a free and honest diagnosis, a fixed price, a working thing they can test before committing,
  and permission to walk away at every step.
- **Effort/sacrifice down:** "up to 90 minutes, usually less" and "we run it, you don't have to learn anything".
- **Self-generated conclusion.** Do not tell the reader that AI is now table stakes. Give them separated
  facts and let them assemble it themselves (see §3, the fact grid). Never write a sentence like
  "AI is inevitable" or "businesses that don't adopt will fall behind". The facts do that job silently.

---

## 2. Voice and character rules — enforced, not aspirational

- Short sentences. Contractions. Say the concrete noun: calls, quotes, WhatsApp, invoices, no-shows,
  Friday night, voicemail. Never "solutions", "workflows optimization", "digital transformation".
- **No em dashes (`—`) anywhere in new copy.** Use a full stop or a comma. This is the single loudest
  AI tell and the client has called it out. Also banned in copy: `–` en dash used as punctuation,
  `;` in body copy, `✓ ✗ ★ 🚀` or any emoji, `»`, `▸`, curly quotes.
- Allowed non-ASCII, and only in these places: `·` as a separator inside small uppercase labels and
  microcopy, `→` inside arrow spans that are already `aria-hidden`, `€`, `%`, `×`.
- **Banned vocabulary** (site-wide convention, keep enforcing): unlock, transform your business,
  leverage, cutting-edge, revolutionize, AI-powered solutions, digital transformation, future-proof,
  bespoke, streamline your workflows, empower, seamless, game-changer, "in today's fast-paced world".
- **Banned claims** (site-wide, never reintroduce): "500+ businesses", "34+ countries", "Free audit",
  "30-day guarantee", "under 60 seconds", any €1,470 anchor, any July deadline, any scarcity/slot count,
  any revenue or headcount ICP filter ("€3–10M", "20–50 employees").
- Paragraphs: 1 to 3 sentences. If a paragraph needs a fourth, cut it instead.

---

## 3. THE FACTS BLOCK — use these verbatim, invent nothing

Every external number on this page must be one of these seven. They are researched and verified.
Do not add a stat that is not on this list. Do not round differently. Do not drop the attribution.

| # | Fact (use this wording or tighter) | Visible attribution on page |
|---|---|---|
| F1 | Businesses that tried to contact a lead within an hour were about **7x** more likely to qualify it than those who waited one hour longer, and more than **60x** more likely than those who waited a day. Study covered 1.25 million leads across 42 companies. | `Harvard Business Review, 2011. 1.25M leads.` |
| F2 | Klarna's AI assistant handled **2.3 million conversations in its first month**, two-thirds of all customer service chats, the work of about **700 full-time agents**. Resolution time went from 11 minutes to under 2. Roughly **$40M** profit improvement in 2024. | `Klarna, February 2024.` |
| F3 | A year later Klarna's CEO said the automation had gone too far, and the company started **hiring people back** so customers could always reach a human. | `Klarna, May 2025.` |
| F4 | **88%** of organisations now report regular AI use in at least one business function, up from 78% a year earlier. | `McKinsey, State of AI 2025.` |
| F5 | **95%** of company AI projects produced **no measurable financial return**. The cause was not model quality. It was tools that never entered the workflow they were bought to change. | `MIT Project NANDA, 2025. 300 deployments.` |
| F6 | In May 2026 Anthropic, Blackstone, Hellman & Friedman and Goldman Sachs put **$1.5 billion** into a single new firm, **Ode**, whose only job is to go inside mid-size companies, find where AI belongs and build it into their core processes. Backers also include Apollo, General Atlantic, GIC, Leonard Green and Sequoia. | `Announced May 2026. Launched as "Ode" July 2026.` |
| F7 | In one study people spent **28% of the working week on email** and another **19% just looking for information**. | `McKinsey, The Social Economy.` |

Optional, use at most once, only in the Human + AI section, and only if it earns its place:

> "Most people will lose their job to somebody who uses AI."
> — Jensen Huang, Nvidia CEO, Stanford GSB, April 2026

**Illustrative numbers rule.** The three Sell/Serve/Operate diagrams (§5.3) use made-up example numbers.
That is fine and intended, but every such diagram must carry a visible micro-caption in the exact form:

> `Illustrative. A typical week for a small team.`

styled at 10px, `font-label`, `text-fg/40`. No exceptions. A prospect must never be able to accuse us of
faking a statistic, and the honesty itself is part of the trust argument.

---

## 4. New page structure

Rewrite `app/new/_v2/V2HomeClient.tsx` to compose, in order:

| # | Component (path under `app/new/_v2/`) | Notes |
|---|---|---|
| 1 | `sections/V2Hero.tsx` | rewritten: copy + the flow diagram |
| 2 | `sections/V2Problem.tsx` | rewritten: pain lines + the fact grid |
| 3 | `sections/V2Fix.tsx` | rewritten: Sell / Serve / Operate, each with its own data visual |
| 4 | `sections/V2Cases.tsx` | **new**, replaces `V2Proof.tsx`. `id="systems"` |
| 5 | `sections/V2WorldProof.tsx` | **new**, sits immediately under the cases, no divider between them |
| 6 | `sections/V2HumanAi.tsx` | rewritten: harder copy + the `/hero-image.jpg` visual |
| 7 | `sections/V2Start.tsx` | rewritten: wrapped in `ElevatorField`, uses `.map-content-panel`, carries the money terms |
| 8 | `sections/V2FAQ.tsx` | **new** |
| 9 | `sections/V2FinalCTA.tsx` | rewritten |
| 10 | `sections/V2Footer.tsx` | rewritten: giant `Care Less` wordmark |

Delete `sections/V2Proof.tsx` (superseded by `V2Cases`). Keep `sections/VoiceProof.tsx` exactly as is,
still gated off by `VOICE_AGENT_ENABLED`, still rendered between #5 and #6 so the flag still works.

**No `/score` link anywhere on this page.** The Bottleneck Score is being retired from this funnel.
Verify by grepping the finished `_v2/` tree for `SCORE_TARGET` and `/score` — zero hits.

All copy for every section lives in `app/new/_v2/lib/copy.ts`, EN and ES, same as today. No hardcoded
user-facing strings inside components. Extend the `V2Copy` interface as needed.

---

## 5. Section specs

Design system in force everywhere: `var(--bg) #060608`, `var(--fg) #F0ECE6`, `var(--accent) #D4FF2B`.
Headlines `font-playfair font-normal`, body `font-sora font-light`, small caps labels `font-label` at
10px / 3px letter-spacing / uppercase. Section wrapper `className="section-divider relative overflow-hidden py-16 md:py-24"`.
Reveals: `data-reveal`, `data-reveal="d1|d2|d3"` for an 80ms stagger. Cards: `rounded-2xl border
border-white/[0.05] bg-white/[0.012]`. Match the existing files exactly, they are the reference.

### 5.1 Hero — copy + the "what we actually do" diagram

EN copy:

- eyebrow: `SALES · SERVICE · OPERATIONS`
- headline: `Find out what your business is quietly losing. Then stop it.`
- sub: `We spend up to 90 minutes on how your business actually runs, and hand you a ranked list of what is costing you money. It is free. If something is worth building, we build it, you try it on your own business, and you pay once it works.`
- primaryCta: `Get your free AI Map`
- primaryMicrocopy: `Up to 90 minutes, usually less. Yours to keep either way.`
- secondaryCta: `See what we've built` (anchors to `#systems`)

**The diagram** — new component `components/FlowDiagram.tsx`. This is the most important new visual on
the page. It answers "what do you do" in three seconds, for someone who knows nothing.

Build it as **HTML + CSS grid with real text**, not one big `<svg>`. Rationale: text stays selectable,
readable by AI crawlers, and reflows on mobile instead of shrinking to 6px. Use SVG only for the thin
connector lines/arrows, or use simple bordered pseudo-connectors.

Structure — two lanes, same input, two endings:

```
        WHAT COMES IN                          TODAY                            WITH THE SYSTEM
   ┌──────────────────┐          ┌───────────────────────────┐      ┌───────────────────────────┐
   │ Calls            │          │ Sits in a queue           │      │ Answered in seconds       │
   │ WhatsApp         │  ──────► │ Answered when someone     │      │ Qualified and booked      │
   │ Web forms        │          │   is free                 │      │ Followed up until they    │
   │ Emails           │          │ Some are never followed   │      │   answer                  │
   │ Quote requests   │          │   up at all               │      │ Nothing goes cold         │
   └──────────────────┘          └───────────────────────────┘      └───────────────────────────┘
                                   ↓                                  ↓
                                 LOST REVENUE                        WON WORK
```

- Left column: the five inputs as small chips, muted `text-fg/62`, thin borders.
- Middle column ("Today"): border `rgba(255,255,255,0.06)`, text `text-fg/50`, terminal label
  `Lost revenue` in a desaturated warm red `rgba(248,113,113,0.7)`.
- Right column ("With the system"): accent border `rgba(212,255,43,0.22)`, faint accent wash
  `rgba(212,255,43,0.04)`, terminal label `Won work` in `var(--accent)`.
- Column headers use `font-label` uppercase 9.5px.
- Under the diagram, one sourced line, 12px, `text-fg/45`:
  `Answer a new enquiry within the hour and you're about 7x more likely to qualify it. Wait a day and it's 60x worse.`
  with the attribution `Harvard Business Review, 2011. 1.25M leads.` at 10px `text-fg/35`. (F1)
- Mobile (<640px): stack the three columns vertically, arrows rotate to point down. Keep it under
  ~560px tall on a 375px viewport. Test it.
- Hero section grows: keep `minHeight` around `92svh` on desktop, but let it be auto on mobile so the
  diagram is not crushed. The CTA must still be above the fold on a 375×812 phone. Verify by screenshot.

### 5.2 Problem — pain lines, then the fact grid

Band A, unchanged structure, tightened copy:

- label: `THE PROBLEM`
- headline: `The expensive work is hiding in plain sight.`
- items (4, keep the existing left-border list treatment):
  1. `A lead comes in on Friday night. Nobody replies until Monday, if at all.`
  2. `The phone rings while you're with a customer. It goes to voicemail. So does the sale.`
  3. `A quote goes out, then disappears into a spreadsheet nobody reopens.`
  4. `The same three questions, answered by hand, fifty times a week.`

Band B, **new**, in the same `<section>` with no divider between the bands, separated by ~72px:

A **bento stat grid**, visually modelled on the reference the client sent (big numerals, mixed tile
sizes, one accent-filled tile among dark tiles). Four tiles, no headline above them, one small label:
`WHAT'S HAPPENING EVERYWHERE ELSE`.

| Tile | Number | Line under it | Source line (10px, `text-fg/35`) |
|---|---|---|---|
| 1 (dark, wide) | `88%` | `of companies now run AI in at least one part of the business.` | `McKinsey, State of AI 2025.` |
| 2 (dark) | `95%` | `of company AI projects produce no measurable financial return. Not because the models are bad. Because the tool never reached the work it was bought to change.` | `MIT Project NANDA, 2025.` |
| 3 (accent-filled, `bg-accent text-bg`, the one bright tile) | `$1.5B` | `put by Anthropic, Blackstone, Goldman Sachs and Hellman & Friedman into one new firm. Its whole job is to go inside mid-size companies, find where AI belongs, and build it into how they run.` | `Announced May 2026.` |
| 4 (dark) | `700` | `agents' worth of customer conversations handled by one company's AI assistant in a single month. A year later they hired humans back for the conversations that needed one.` | `Klarna, 2024 and 2025.` |

Numbers: `font-playfair`, `clamp(40px, 6vw, 76px)`, `lineHeight: 0.95`, with the `%` / `$` / `B`
rendered at ~0.5em and raised, same treatment as the client's reference screenshot.

Layout: desktop `grid-cols-2` with tile 1 spanning both columns and tile 3 given more visual weight;
mobile single column. Do not add a caption interpreting these facts. **No conclusion sentence. None.**
The reader draws it. This is deliberate — if you add "so you need to act now", the section is ruined.

### 5.3 What we fix — Sell / Serve / Operate, each with a data visual

- label: `WHAT WE FIX`
- headline: `We sell outcomes, not technology.`
- sub: `Almost everything we build lands in one of three places.`

Three stacked rows (not a 3-up card grid any more). Each row: text on one side, visual on the other,
alternating sides on desktop, stacked on mobile with the visual below the text. Each row keeps the small
accent icon circle already in `V2Fix.tsx` (reuse those three SVGs, they are good).

Each visual is its own component under `_v2/components/`. All three are HTML + CSS bars/blocks, no
charting library, no external anything. All three carry the `Illustrative. A typical week for a small team.`
caption (§3).

**Row 1 — SELL.** `components/CapacityGap.tsx`

Title: `Sell` · Body: `Capture every enquiry. Qualify it. Follow up. Quote. Book. Reactivate the ones that went quiet.`

Visual: two horizontal bars, same track width.
- Bar A, label `Enquiries you could serve this week`, filled to 100%, muted white fill, value `20`.
- Bar B, label `Enquiries you actually won`, filled to 30%, accent fill, value `6`.
- The empty 70% of bar B is drawn as a hatched/striped ghost region labelled `14 you were capable of serving`.
- One line under it, 13px `text-fg/62`:
  `The gap usually isn't demand. It's how fast you answered and whether anyone followed up.`

**Row 2 — SERVE.** `components/LeakFunnel.tsx`

Title: `Serve` · Body: `Answer calls and messages. Handle the questions you've answered a thousand times. Send the exceptions to a person.`

Visual: five stacked horizontal bars, each shorter than the last, forming a funnel. Left-aligned so the
loss is visible on the right. Each step shows the count, and the drop is annotated in a desaturated red
`rgba(248,113,113,0.65)` at 11px on the right of the bar.

| Step | Count | Drop annotation |
|---|---|---|
| Enquiries received | 100 | |
| Someone answered | 68 | `32 came in after hours or while you were busy` |
| Got a second touch | 41 | `27 never followed up` |
| Got a third touch | 18 | `23 forgotten` |
| Booked | 11 | |

Line under it, 13px `text-fg/62`: `Nobody decided to lose those. They just fell through the day.`

**Row 3 — OPERATE.** `components/WeekGrid.tsx`

Title: `Operate` · Body: `Take the repetitive admin off people. Give the team instant answers from your own business knowledge. Connect the systems that don't talk.`

Visual: a 5-column × 8-row grid of small rounded blocks = one working week, 40 blocks, one per hour.
- 19 blocks filled in a muted grey-white `rgba(240,236,230,0.16)`, labelled
  `Repetitive admin, chasing, retyping, the same answers again`.
- 21 blocks filled accent `rgba(212,255,43,0.55)`, labelled `The work that actually earns`.
- Day initials M T W T F above the columns, `font-label` 9px.
- Under it, the sourced line at 13px `text-fg/62`:
  `In one study people spent 28% of the week on email and another 19% just looking for information.`
  with `McKinsey, The Social Economy.` at 10px `text-fg/35`. (F7)
- Then one line, 13px, `text-fg/62`: `Your business only really earns in the blocks that are left.`

The 19/21 split is illustrative and must carry the illustrative caption. The 28% / 19% is the sourced
fact and carries its own source line. Keep the two visually distinct so nobody can conflate them.

### 5.4 Cases — one per tier. `V2Cases.tsx`, `id="systems"`

- label: `WORKING SYSTEMS`
- headline: `Real systems, live now.`
- sub: `Software in production, handling real conversations every day.`

Three cards. Card layout: tier chip top-left (accent, uppercase, 9px, `font-label`), a `LIVE` dot chip
top-right, a small UI mock in a fixed-height slot (reuse the mock pattern from
`app/new/sections/ProofSection.tsx` — read it, port the approach, do not import and do not edit it),
then name, then one-line description, then a small arrow link.

| Tier | Name | Description (use as-is) | Link | Mock |
|---|---|---|---|---|
| `SELL` | Amira for HC MedSpa | `AI lead-response agent on WhatsApp and the website. Replies in 9 seconds, day or night, and books the consultation.` | `/automations/hcmedspa` | WhatsApp-style thread, ending in a `replied in 9s` stamp |
| `SERVE` | Elena Hotel & SPA | `Handles booking requests and guest questions 24/7 across WhatsApp and the site, in the guest's own language.` | `https://bukovel-elena.com.ua/en/` (new tab, `rel="noopener noreferrer"`) | booking-confirmation card |
| `OPERATE` | Overtime OS | `A whole front office in one system for home-services companies. Missed calls texted back, leads qualified, jobs booked on the calendar, follow-ups and review requests running on their own.` | `https://overtimeos.com/` (new tab) | small dashboard mock: three tiles reading `Calls answered`, `Jobs booked`, `Follow-ups sent`, with plausible small numbers and a live dot |

**Honesty constraint on Overtime OS:** it is our own product, not a third-party client engagement.
Do **not** invent a client name, a logo, a location or a testimonial for it. Describe it as a system,
which is exactly what the copy above does. Never write or imply "our client Overtime OS".

### 5.5 World proof — `V2WorldProof.tsx`, directly under the cases

Renders in the same visual block as the cases (no `section-divider` between them) so the page never
reads as three small projects standing alone.

- label: `THE SAME PATTERN, AT SCALE`
- Three compact rows, no cards, just a thin top border on each, name in `font-playfair` 18px,
  line in `font-sora font-light` 14px `text-fg/62`, source at 10px `text-fg/35`:

| Name | Line | Source |
|---|---|---|
| Klarna | `Their AI assistant took two-thirds of all customer chats in its first month. The work of about 700 agents. Resolution went from 11 minutes to under 2.` | `Klarna, February 2024.` |
| IKEA | `Automated the routine customer questions, then retrained call-centre staff into advisory roles.` | `Industry, in production.` |
| Octopus Energy | `AI drafts replies in the company's own voice. A human reviews and sends. Speed of automation, judgment of a person.` | `Industry, in production.` |

### 5.6 Human + AI — the harder version, with the photo

The client's note: the headline currently runs on one long desktop line and should break in two.
Fix by setting the `<h2>` `maxWidth` to `14ch` with `mx-auto` so it breaks naturally into two lines at
desktop widths. Verify visually at 1280px, do not just assume.

Two-column on desktop (image left ~44%, copy right), stacked on mobile with the image first.

- label: `HUMAN + AI`
- headline: `AI should remove work, not humanity.` (unchanged, it's good)
- body, three short paragraphs:
  1. `Nobody started a business so their people could retype addresses into a spreadsheet.`
  2. `Right now someone on your team is doing work they're bad at, that they hate, that goes wrong when they're tired. And the work only a human can do, the call that needs judgment, the customer about to leave, the thing that would actually grow this quarter, waits until Friday. Or never.`
  3. `We take the repetitive half. Most of what we build needs no training from anyone, because we run it. When something does touch your team, we sit with them until it's boring.`

**The image:** `/hero-image.jpg` (1536×2752, portrait — a person breaking out through a CRM dashboard
full of overdue tasks and missed leads). Use `next/image` with `sizes` set correctly and `quality={82}`.

⚠️ **Critical:** the dashboard in that image contains AI-garbled UI text ("Compultants", "Datairots",
"Overtlew"). It must never be legible on the page. Required treatment:
- crop tight to the figure and the torn hole via a fixed-aspect wrapper with `object-fit: cover` and
  `object-position: center 22%`,
- overlay a `linear-gradient` scrim from `rgba(6,6,8,0)` at centre to `rgba(6,6,8,0.92)` at all four
  edges, plus a `mask-image` radial fade so the surrounding UI dissolves into the page background,
- cap the rendered width so no dashboard label is ever above ~9px on screen.
Screenshot it at 1280 and 375 and confirm no garbled word is readable. If any is, crop harder.

### 5.7 How we start — parallax field, panel, and the money

The client wants the animated depth field and the framed panel from the old homepage back here.

Wrap this section in the existing shared canvas component:

```tsx
import ElevatorField from "../../components/ElevatorField";
...
<ElevatorField>
  <V2Start d={d} ctaHref={ctaHref} />
</ElevatorField>
```

Read `app/new/sections/BottleneckMap.tsx` lines ~88–140 for exactly how the panel sits inside the field:
a `min-h-100vh` flex-centred section, content wrapped in `<div data-reveal className="map-content-panel
w-full max-w-2xl mx-auto ...">`. `.map-content-panel` already exists in `app/globals.css` — use the
class, do not redefine it, do not edit that file.

Copy (drop the word "automate" entirely, the client is right that it's our word, not theirs):

- label: `HOW WE START`
- headline: `Not sure where it's actually leaking? That's the normal answer.`
- body:
  1. `Most owners can feel that something is wrong. Money goes out, the week fills up, and nobody can point at the exact place it happens.`
  2. `That part is free. We go through how the business actually runs, then you get one page. What's costing you, roughly what it's costing, and what to fix first, in order.`
- steps (keep the existing pill row): `Understand` → `Find` → `Rank` → `Build`
- trustLine: `If there's nothing worth building, we say so and you keep the page. Those calls are short, and that's fine.`
- cta: `Get your free AI Map`
- ctaMicrocopy: `Up to 90 minutes. Usually less.`

**New sub-block inside the panel — `HOW PAYING WORKS`.** Four compact steps, numbered, 13px. This is the
likelihood-of-achievement engine, it must be exact:

1. `The map is free. No card, no catch, no obligation after it.`
2. `If something's worth building, you get a fixed price before anything starts.`
3. `We build the first piece and connect it to your own business. You try it yourself before you commit.`
4. `Then a prepayment covers the build and the first month. After that it's monthly, or three to six months at a lower rate.`

Do not soften, extend or embellish these four lines. They are the actual commercial terms.

### 5.8 FAQ — `V2FAQ.tsx`, new

Accordion. Port the interaction pattern from `app/new/sections/NewFAQ.tsx` (read it, reimplement in
`_v2/`, do not import it — it is typed against the live `NewPageDict`). Single-open-at-a-time is fine,
multi-open is fine, match whichever the existing one does. No JSON-LD (the page is `noindex`).
No guarantee banner, no WhatsApp closing block — those belong to the old offer.

- label: `BEFORE YOU BOOK`
- headline: `The things people actually ask.`

Items:

1. **`What does it cost?`** → `The map is free. If we build something, you get a fixed price before we start, you see it working on your own business before you commit, and the first payment covers the build and the first month. After that it's monthly, or three to six months at a lower rate.`
2. **`What if you don't find anything worth fixing?`** → `Then we tell you, and you keep the map anyway. It happens. Those calls are shorter and nobody is upset about it.`
3. **`Is this going to replace my staff?`** → `No. We take the repetitive half off them. Klarna went all in on automation and a year later started hiring people back for the conversations that needed a human. We'd rather skip that lesson.`
4. **`We tried an AI tool already and nothing happened.`** → `That's the normal outcome. In a 2025 MIT study, 95% of company AI projects produced no measurable financial return, mostly because the tool never reached the work it was bought to change. That's why we start by finding the work, not by picking a tool.`
5. **`I'm not technical. Is that a problem?`** → `No, and you don't need to become technical. We run the thing. You'll know how to use it in about ten minutes because there's usually nothing new to learn.`
6. **`How long before something is actually live?`** → `The first piece is usually weeks, not quarters. It depends on what we're connecting to and how fast we can get access.`
7. **`What do you need from me?`** → `Ninety minutes, honest answers, and access to whatever we're connecting to when we build. That's it.`

### 5.9 Final CTA — this one has to leave a hole

Structure: a tight, centred block. Do not add graphics, this section works on silence.

- headline: `You already know which one it is.`
- sub, two short paragraphs (render as two `<p>`, the second slightly dimmer):
  1. `You thought of it somewhere in the last two minutes. The thing everybody in the business quietly works around. It costs the same every month whether you look at it or not.`
  2. `Ninety minutes, free, and you'll know the number.`
- primaryCta: `Show me what it's costing me`
- microcopy under the button: `Free. No card. You keep the map either way.`
- WhatsApp escape hatch, unchanged: `Rather message first?` using `WA_BOTTLENECK_LINK` from
  `app/new/lib/config.ts` (import only, do not edit).

One last line, centred, 13px, `text-fg/40`, ~40px below everything, on its own:

> `Or don't, and keep paying for it quietly.`

That line is the whole section. Do not delete it, do not soften it, do not add anything after it.

### 5.10 Footer — the giant wordmark

Keep the existing footer contents (logo, tagline, nav, WhatsApp, copyright) and add above them a huge
`Care Less` wordmark, in the style of the reference the client sent:

- `font-playfair`, `font-size: clamp(72px, 17vw, 240px)`, `line-height: 0.86`, `letter-spacing: -0.04em`
- colour `rgba(240,236,230,0.055)`, no gradient text tricks
- full-bleed, centred, and **clipped at the bottom** by the footer's `overflow: hidden` so roughly the
  bottom 18–22% of the letterforms is cut off, exactly like the reference
- `aria-hidden="true"` and `user-select: none` — it is decoration, the real brand name is already in the
  logo and copyright
- must not create horizontal page scroll at 375px. Test it. Use `overflow-x: hidden` on the footer.

Tagline stays: `We find the expensive manual work inside a business and build the system that removes it.`
Nav: Home · Free AI Map · Blog · WhatsApp. No `/score` link.

---

## 6. Spanish

Every string added to `copy.ts` needs its `es` counterpart. Rules:
- Write Spanish, don't translate English. "It just fell through the day" has no literal equivalent, so
  write the Spanish sentence a Spanish operator would say.
- Same brevity, same no-em-dash rule, same banned vocabulary.
- Numbers, percentages and source attributions stay identical in both locales. Use `1,25 M` style only
  if the rest of the ES copy already does; otherwise keep the EN numeral formatting for consistency.
- Keep the existing `getV2Copy(locale)` shape and the `NewLocale` type.

---

## 7. Metadata

Update `app/new/layout.tsx` `TITLE` / `DESCRIPTION` to match the new positioning:

- TITLE: `Find Out What Your Business Is Losing | Care Less`
- DESCRIPTION: `We find where your business is losing time and money, then build the system that stops it. The diagnosis is free. You pay for the build once it works.`

Keep `robots: { index: false }`. Keep the canonical. Do not add `/new` to `app/sitemap.ts`.

---

## 8. Verification — do all of it before reporting done

1. `npx tsc --noEmit` passes clean.
2. `preview_start` with the `maksnedbailo-site` config from `.claude/launch.json`. **Never `npm run dev`
   via Bash.**
3. `/new` at **1280×800**: screenshot the full page. Check the hero diagram reads in under 3 seconds,
   the fact grid tiles align, the three Sell/Serve/Operate visuals are legible, the Human+AI headline
   breaks over two lines, no garbled dashboard text is readable in the photo, the footer wordmark clips.
4. `/new` at **375×812**: screenshot the full page. Check no horizontal scroll anywhere (test by
   evaluating `document.documentElement.scrollWidth > document.documentElement.clientWidth` — must be
   `false`), the hero CTA is above the fold, the flow diagram is stacked and readable, the bento tiles
   are single-column, the week grid is not squashed.
5. `/` at 1280 and 375: **must be visually identical to before your changes.** This is the regression
   that matters most.
6. `read_console_messages` on `/new`: zero errors, zero React warnings, zero hydration mismatches.
7. `grep -rn "score\|SCORE_TARGET" app/new/_v2/` returns nothing user-facing.
8. `grep -rn "—" app/new/_v2/lib/copy.ts` returns nothing. Same for emoji.
9. `git diff --name-only` lists only `app/new/_v2/**`, `app/new/layout.tsx`, `docs/**`.
10. Do **not** commit. Do **not** push.

Report at the end: what you built, the two screenshots, and anything in this brief you could not do
and why.
