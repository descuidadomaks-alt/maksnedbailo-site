# Care Less — UK Locksmith Missed-Calls: Meta Ads Manager Setup Checklist

Budget: **£12.70/day** (£385/mo). 1 campaign, 1 ad set — no exceptions, this budget can't support more.

## Campaign

- **Objective:** Leads
- **Conversion location:** Instant Form (not a landing page — this budget can't exit learning phase on landing-page conversions)
- **Budget:** £12.70/day, campaign budget optimisation off (single ad set, doesn't matter either way)

## Ad set

- **Audience:** Advantage+ / broad UK (include Northern Ireland — only exclude later if data shows it's dead weight), seeded with these interests/behaviours as signals, not hard restrictions:
  - Screwfix
  - Toolstation
  - Checkatrade
  - MyBuilder
  - Small business owner (behaviour)
  - Self-employed
- **Placements:** Automatic (Advantage+ placements)
- **Optimisation event:** Instant Form completion (lead)

## Creative rollout

- **Week 1:** Both statics live (Static 1 "Missed a call today?", Static 2 "Stop paying for leads"). Hold both videos back — voiceover turnaround takes a few days.
- **Week 2:** Both videos live (Video 1 "The call you didn't hear", Video 2 "Your diary, filling itself"). Kill any Week 1 creative that already hit the kill threshold.

Full scripts and specs: `creative-package.md` in this folder.

## Kill / scale rules

- **Kill a creative** once it has spent **£45 with 0 leads**.
- **Target CPL: ≤£25.** Back-solved from £167/mo pilot price, assumed 6-month average retention (**FLAG — unvalidated assumption**) → LTV ≈ £1,002, and an assumed 15% lead→close rate (**FLAG — unvalidated assumption**) → value per lead ≈ £150. A £25 CPL keeps CAC (£167 per close) at roughly 6:1 LTV:CAC and should yield ~15 leads/month on the full budget.
- **Do not add a second ad set** at this budget — it splits already-thin delivery and neither ad set reliably exits learning phase.
- Scale only the single surviving creative if others get killed; don't add new ad sets to compensate.

## Week 1–4 checklist (mornings only)

- **Week 1:** Build the Instant Form; get both statics live. Hold the videos until Week 2 (voiceover turnaround). Check spend/leads once each morning — no need to touch anything mid-day.
- **Week 2:** Launch both videos. Kill any Week 1 creative that already hit £45 spend / 0 leads. Call every lead the same morning it lands (see `follow-up-scripts.md`).
- **Week 3:** Cut anything running above the £25 target CPL. Reallocate budget to the single best-performing creative — do not open a new ad set.
- **Week 4:** Pull full-month numbers: spend, CPL, total leads, calls made, pilots signed. Decide: renew at £385/mo as-is, or pause and rework the hook/form if CPL missed target by more than 50%.
