# Project Architecture — master index

**Purpose:** a single place to see every project Maks has built or is building — this personal site, client/product builds, and separate entities — what stage each is at, where its code actually lives, and where it deploys. Read this before starting work on anything unfamiliar; update it whenever a project's status, repo location, or deploy target changes.

**Maintenance rule:** when you (human or agent) finish meaningful work on any project listed here, update its entry — status, "last touched" date, and anything a future agent would need to not re-derive from scratch. If you build something new that isn't listed here yet, add it. Keep entries terse; link out to a project's own README/docs for depth instead of duplicating it here.

**Scope note:** this file lives in `maksnedbailo-site` because that's the hub repo where most builds started, but it indexes projects that live in *other* repos too (see "Repo" column). It is not itself a dependency of any of them.

---

## Index

| Project | Type | Status | Repo / path | Deploy | Domain |
|---|---|---|---|---|---|
| [Maks Nedbailo site](#maks-nedbailo-site-hub) | Personal consulting site | **Live** | `maksnedbailo-site` (this repo) | Vercel | maksnedbailo.site |
| [Overtime OS](#overtime-os) | SaaS landing + lead funnel | **Live** (mid-migration) | `overtimeos` (standalone) | Netlify (new) | overtimeos.com (pending DNS) |
| [Nailsoftheday reorder tool](#nailsoftheday-reorder-tool) | Internal tool (client) | **Demo / not extracted** | `maksnedbailo-site/app/projects/notd` | Vercel (via hub) | none — shared as a link |
| [Roman Shiglo real estate site](#roman-shiglo-real-estate-site) | Client landing site | **Live** (standalone) | `roman-shiglo-site` (standalone) | Vercel | roman.maksnedbailo.com |
| [Para Ti massage salon demo](#para-ti-massage-salon-demo) | Client demo | **Demo, unclear if sold** | `maksnedbailo-site/app/projects/parati` | Vercel (via hub) | none |
| [Eufloria floral assistant demo](#eufloria-floral-assistant-demo) | Client AI demo | **Live** | `maksnedbailo-site/app/projects/eufloria` | Vercel (via hub) | maksnedbailo.site/projects/eufloria |
| [Automations prospect demos](#automations-prospect-demos) | Sales demo pages | **Live** (per-prospect) | `maksnedbailo-site/app/automations/[slug]` | Vercel (via hub) | maksnedbailo.site/automations/* |
| [Partner channel pages](#partner-channel-pages) | Referral funnel | **Live** | `maksnedbailo-site/app/partners/[slug]` | Vercel (via hub) | maksnedbailo.site/partners/* |
| [Care Less — UK locksmith offer](#care-less--uk-locksmith-offer) | Sub-offer / campaign | **Planned/early** | `maksnedbailo-site` (docs + API route only) | Vercel (via hub) | TBD |
| [Modulia / CocinaRapida kitchens](#modulia--cocinarapida-kitchens-shopify) | Shopify store | **Live, ongoing UX work** | Shopify admin only — no local repo | Shopify | cocinarapida-espana |
| [Overtime Hunch / OS demo chain (oh2–oh6)](#overtime-hunch--os-demo-chain-oh2oh6) | Superseded demo variants | **Archived (read-only)** | `maksnedbailo-site/app/projects/{overtimehunch,oh2,oh3,oh4,oh5,oh6}` | Vercel (via hub) | maksnedbailo.site/projects/* |
| Kitchens asset dump | Unbuilt / staging | **Assets only, no build** | `maksnedbailo-site/public/kitchen-uploads/` | — | — |
| Furniture asset dump | Unbuilt / staging | **Assets only, no build** | `maksnedbailo-site/public/furniture-uploads/` | — | — |
| **Eldar / Nailsoftheday — anything beyond the reorder tool** | ? | **Needs info** | ? | ? | ? |

---

## Maks Nedbailo site (hub)

Personal consulting site for Maks Nedbailo — "Care Less AI Automation." Dark luxury editorial aesthetic (`#060608` bg, `#F0ECE6` text, `#D4FF2B` accent), Playfair Display + Sora, EN/ES toggle. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion, deployed on Vercel.

This is also the **hub repo** — most of the projects below either live inside it (as `/projects/[slug]` or `/automations/[slug]` routes) or started inside it before being extracted to their own repo (Overtime OS, Roman Shiglo).

- Lead capture: `app/api/lead/route.ts` (shared by the Overtime Hunch/OS demo chain), `app/api/missed-calls-lead/route.ts` (Care Less UK locksmith), `app/api/geo/route.ts` (Vercel edge geo headers).
- SEO/GEO schema work: see `docs`/memory `project_geo_schema.md` — homepage structured data, open follow-up to add an Upwork `sameAs` for testimonial trust.

## Overtime OS

Done-for-you AI front-office platform for home-service businesses, $499/mo. "The AI operating system that runs your entire business." Multi-step quiz funnel → scored lead (HOT/WARM/COLD) → Sheet/Telegram/email (+ GoHighLevel, optional) fan-out.

**Currently mid-migration.** Built and iterated as `maksnedbailo-site/app/projects/oos` through several rounds (trades marquee bar, one-viewport hero, real Calendly link, price repositioning). On **2026-07-14** extracted into a standalone repo at `D:\Claude Code\overtimeos` because Vercel's free Hobby tier prohibits commercial use and a Pro subscription wasn't worth it yet — moving to Netlify instead.

- **Standalone repo (source of truth going forward):** `D:\Claude Code\overtimeos` — see its own `README.md` for stack, env vars, and deploy steps. Verified building clean (`npm run build`) and smoke-tested (`npm run start`) before handoff.
- **Fallback copy (stays live, not maintained further):** `maksnedbailo-site/app/projects/oos` — kept as-is so the old link doesn't break while the new repo gets connected to Netlify + the domain.
- Next steps: push `overtimeos` to a new GitHub repo → connect to Netlify → set env vars (Meta Pixel, GA4, Sheet/Telegram/Resend/HighLevel webhooks all currently unset placeholders) → point `overtimeos.com` DNS at Netlify → confirm `overtimeos` repo's `CANONICAL_URL`/`metadataBase` domain is final.
- Evolution history (all still living, read-only, inside the hub repo — see [below](#overtime-hunch--os-demo-chain-oh2oh6)): `overtimehunch` → `oh2` → `oh3` → `oh4` → `oh5` → `oh6` → `oos`.

## Nailsoftheday reorder tool

Inventory reorder forecast tool built for **Eldar**, a partner at Nailsoftheday (nail-supply e-commerce, Ukrainian-market). Lets Eldar test the tool against real KeyCRM exports via a shared link.

100% client-side — `.xlsx` parsing (SheetJS) and all forecasting math run in the browser, nothing uploaded to a server. Ported 1:1 from a verified local Python MVP. Editorial/cinematic aesthetic on Nailsoftheday's nude/rose palette; Oswald (not Anton) for Cyrillic support — the page is Ukrainian.

- Lives at `maksnedbailo-site/app/projects/notd/` — **not yet extracted** to its own repo (unlike Overtime OS/Roman Shiglo). No production domain; shared as a direct link into the hub site.
- **Open question for the user:** is there more to the Eldar/Nailsoftheday relationship beyond this one tool? Flagged in the index above as needing info — this doc only knows what exists in this repo.

## Roman Shiglo real estate site

Editorial luxury landing page for Roman Shiglo, independent real estate investment advisor (Phuket & Dubai). RU/EN.

- **Standalone repo (live):** `D:\Claude Code\roman-shiglo-site` — Astro 5 + TypeScript + Tailwind v4, Plausible analytics, deployed on Vercel at **roman.maksnedbailo.com** (CNAME → `cname.vercel-dns.com`). See its own `README.md`.
- **Earlier prototype (archived, read-only):** `maksnedbailo-site/app/projects/roman/` — an earlier Next.js/embla-carousel version of the same site, superseded by the standalone Astro build. Same extraction pattern as Overtime OS, done earlier.

## Para Ti massage salon demo

Cream massage-salon demo landing page. Cormorant Garamond + Jost, cream/gold/charcoal/sage palette. Lives at `maksnedbailo-site/app/projects/parati/`. Status unclear — built as a demo; no record here of whether it converted to a paying client or a standalone deploy. Confirm with the user before assuming it's dormant.

## Eufloria floral assistant demo

Live, noindex client demonstration of Eufloria Santander's GoHighLevel Conversation AI agent. The route lives at `app/projects/eufloria/`, embeds the dedicated Floral Live Chat widget, and is intentionally isolated from SMS, WhatsApp, Instagram, and Facebook. Last touched: 2026-08-08.

## Automations prospect demos

Per-prospect sales demo pages with a live AI chat widget, used to show a specific business what an automation would look like for them before they buy. Pattern: `app/automations/[slug]/`, data per prospect in `data/[slug].ts`, registry in `data/index.ts`.

Active/known slugs: `hcmedspa`, `cosmeticsuite`, `drpaul`, `bfd`. Each demo tracks its own funnel events (Plausible: `demo_loaded`, `scroll_75`, `time_30s/60s/120s`) and has a "post-expiry" flip (`slotExpired: true`) that converts it from an active pitch into a permanent case study.

## Partner channel pages

Referral-partner landing pages — built for a named partner to send to their own audience. Pattern: `app/partners/[slug]/`, content in `content/partners/[name].ts`. Active: `vlad` (Ukrainian entrepreneur audience, zcal event `vlad-strategic-ai-map`).

## Care Less — UK locksmith offer

Sub-offer under the Care Less brand: AI missed-call system for UK locksmiths, £167/mo. Documented in `docs/care-less-uk-locksmith/` (campaign setup, creative package, follow-up scripts) with its own lead-capture API route (`app/api/missed-calls-lead/route.ts`) and Google Sheet (separate from the main one). No dedicated landing page route found in this repo as of this doc's writing — confirm current build status before assuming it's live.

## Modulia / CocinaRapida kitchens (Shopify)

Shopify store, handle **cocinarapida-espana**, high-end kitchen retailer. Active theme **Dawn** (ID `198874857820`); an unpublished **Horizon** theme also exists. No local repo — all work happens directly against the Shopify admin (theme editor / Shopify's API with a CSRF-token write pattern). Custom design system lives in `assets/custom-premium.css` (Cormorant Garamond + Jost, cream/green/gold palette). Last major UX pass: 2026-06-05 (global type scale, icon cleanup, FAQ expansion, reduced-motion support).

**Likely connected to** `maksnedbailo-site/public/kitchen-uploads/` (see below) — that folder's kitchen product photography is plausibly staging area for this store, not a separate project. Not independently confirmed; check with the user before treating them as the same thing in future work.

## Overtime Hunch / OS demo chain (oh2–oh6)

Sequential positioning/design iterations that led to Overtime OS (above). All still present and working inside the hub repo as separate routes — kept for reference/comparison, **not actively maintained**:

`overtimehunch` (original) → `oh2` (parallel variant, $499/mo AI-front-desk offer) → `oh3` (video+form restructure) → `oh4` (Carter ad campaign re-gate, quiz funnel) → `oh5` ("Overtime OS" rebrand, AI-operating-system positioning) → `oh6` (fork of oh5, further positioning refinement) → **`oos`** (launch route, now the fallback copy of the standalone `overtimeos` repo — see above).

Don't build on any of `oh2`–`oh6` going forward; if a change belongs to the live product, it belongs in the standalone `overtimeos` repo.

## Unbuilt / needs info

- **`public/kitchen-uploads/`** — large raw dump of kitchen product photography (sofas, cabinetry, beds — actually mixed with `furniture-uploads/`, worth double-checking which folder is which). No app route consumes it. Probably feeds Modulia/CocinaRapida (above) but not confirmed.
- **`public/furniture-uploads/`** — same situation, different product line (Ukrainian furniture: "Диван Scandik", "Ліжко April", "Корпусні меблі"). No app route consumes it, no known destination project.
- **Eldar / Nailsoftheday, beyond the reorder tool** — the user has referenced this relationship as an example of a "separate entity" project; only the reorder tool (above) is visible in this repo. If there's more (a storefront, a brand site, other tooling), it needs to be added here — ask the user or point an agent at the right repo.
