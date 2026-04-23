# Changes — /automations/hcmedspa demo page

## Files created

### Routing
- `app/automations/[slug]/page.tsx` — page shell, generateMetadata, generateStaticParams (73 lines)

### Data layer
- `app/automations/[slug]/data/index.ts` — ProspectData type + slug → data registry
- `app/automations/[slug]/data/hcmedspa.ts` — HC MedSpa prospect data

### Section components
- `app/automations/[slug]/components/SectionHero.tsx` — H1, sub, CTAs, widget auto-open (4s/8s)
- `app/automations/[slug]/components/ConnectoWidget.tsx` — widget container, script injection, IntersectionObserver for widget_visible event
- `app/automations/[slug]/components/SectionObservation.tsx` — italic observation paragraph
- `app/automations/[slug]/components/SectionMath.tsx` — math paragraph with £ amounts bolded via regex
- `app/automations/[slug]/components/SectionProof.tsx` — 3-col screenshot grid with next/image
- `app/automations/[slug]/components/SectionHowBuilt.tsx` — monospace badge timeline
- `app/automations/[slug]/components/SectionOffer.tsx` — Hormozi 2×2 offer cards
- `app/automations/[slug]/components/SectionSlot.tsx` — honest scarcity / case study flip
- `app/automations/[slug]/components/SectionCTA.tsx` — final dual CTA buttons
- `app/automations/[slug]/components/DemoTracker.tsx` — Plausible events (demo_loaded, scroll_75, time_30s/60s/120s)

### Public assets
- `public/automations/hcmedspa/` — empty folder; drop proof-1.png, proof-2.png, proof-3.png, og.png here

## Files modified
None — no existing file was touched.

## Notes
- **Plausible**: script.tagged-events.js is injected directly in page.tsx (strategy="afterInteractive").
  No new env var needed. Domain is maksnedbailo.site (already set up).
- **Connecto widget**: set `connectoWidgetScript` in `data/hcmedspa.ts` once the widget is live —
  the page will inject it automatically and attempt auto-open after 4s (desktop) / 8s (mobile).
- **Post-expiry**: flip `slotExpired: true` in hcmedspa.ts and redeploy. Widget hides, Hero CTA
  swaps, Slot text changes. Everything else stays as permanent case study.
- **Next prospect**: copy hcmedspa.ts → newclient.ts, fill in ProspectData fields, add the slug
  to the REGISTRY in data/index.ts. No other changes needed.
- **Route**: /automations/hcmedspa — pre-rendered as SSG at build time.
