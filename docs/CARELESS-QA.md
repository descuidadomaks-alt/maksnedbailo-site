# Care Less V1 QA record — 20 October 2026

Release candidate. Evidence is recorded from actual runs, not inferred from a successful build.

| Gate | Evidence / result |
|---|---|
| Existing production environment | Vercel live headers, Next.js 14.2.5; GitHub main baseline 653f2c3. Existing local /new permanentRedirect located. |
| Homepage preservation | Original app/page.tsx, _v2 tree, shared components/lib/sections, globals.css and next.config.js identical to baseline. Built homepage normalized visible text and JSON-LD exactly equal saved live homepage. Text SHA256 004d8713cb8a7bfef8ace686df8245375d0dbbf6b0de3b95841e0172e384d252 in both. |
| Direct routing | Built /new HTTP 200, no Location header. /blog, /ai-map, /projects/notd and /projects/parati all HTTP 200. |
| Build / type checks | TypeScript passed. Full production builds succeeded for all 77 pages. Final chapter-rounding correction rebuild in progress. |
| Desktop browser | 1440x900: hero, full page content, accordion and fallback dialog visually inspected. No horizontal overflow. |
| Mobile browser | Actual viewport confirmed 390x844, not merely a desktop screenshot: approved responsive hero loaded, no horizontal overflow, final CTA inspected, no broken loaded images. Physical phone testing remains open. |
| Scroll / chapters | Forward and reverse chapter controls and skip tested. Mobile fractional scroll rounding exposed an off-by-one chapter; target adjusted to inside chapter rather than boundary. All-eight final retest pending. |
| Keyboard / dialog | Enter expands category modules. Escape closes native modal and returns focus to Meet Scout. Skip goes to focusable HTML content. Modal restricts background interaction. |
| Reduced motion | Attached browser reports reduced-motion preference; poster/short intro path inspected. Device preference disables full motion rather than overriding it. Full-motion visual performance on physical devices remains unverified. |
| Headquarters | Responsive softened background + emerging HTML panel implemented. Final mobile render retest pending. Supplied clean image contains labels; retained only as background, not the UI. |
| Missing poster | Local manifest intentionally pointed to nonexistent poster. Browser recovered to pool-placeholder.svg, image naturalWidth > 0, title/skip remained and Scout dialog opened. Expected injected 404, no uncaught runtime exception. Approved manifest restored. |
| Invalid manifest | Intentionally malformed JSON: approved server-rendered mobile image retained and modal still worked. Approved manifest restored. |
| Video pipeline | Separate test-pattern clip converted to 12 real WebP frames. Source hash and poster preserved. Founder videos absent, so cinematic video playback/encoding is not signed off. |
| Appreciation | Click -> local acknowledgement; reload -> pressed state retained; Privacy & choices -> reset clears it. No public number shown. No CRM calls or remote transport implemented. |
| Scout | Live read-only status: Scout 21406 status 0; careless-scout-staging is_on false. All launchers show paused state and verified human alternatives. No chat or public service activated. |
| Contact destinations | zcal.co/carelessmaks/ai-map (90-minute Strategic AI Map), wa.me/34641935207 from authoritative Notion + prior verified staging. Exact hrefs checked; no booking or WhatsApp message created. |
| Claims / selected work | Repository docs substantiate NOTD working demonstration, Para Ti website demonstration, Roman client site. No invented results, counters, testimonials or social URLs. |
| Privacy / metadata | Direct /new loaded no MyChatBot/Clarity/Cloudflare scripts. Simple rendered WebPage schema has no legacy pricing. Canonical /new; intentionally noindex while still/video and Scout release work continues. Analytics only local event hooks. |
| Console | Normal tested local flows: zero warnings/errors before deliberate missing-asset injection. Final clean-session retest pending. |
| Hosted preview | Vercel branch deployment succeeded, but existing Vercel Authentication prevents anonymous browser QA. Protection unchanged. Local production browser QA used instead. |
| Production | Main not yet changed; final QA and branch preview check precede merge. |

Limitations: no physical Safari/iOS/Android session, final MP4/sequence media or full-motion hardware performance run; no new live Scout/CRM/reservation/WhatsApp transport test, public privacy approval or remote analytics. Prior Scout staging transport evidence is preserved separately in Notion.
