# Care Less V1 implementation and restart

## Scope and architecture

- Production: https://maksnedbailo.site/new. Homepage `/` and unrelated paths stay as they are.
- Existing repository: descuidadomaks-alt/maksnedbailo-site. Vercel detects the existing Next.js 14 App Router project and deploys GitHub main. Branch preview on care-less-v1; existing Vercel authentication protection remains unchanged.
- Original baseline: 653f2c321cd82e2ac2af27b6494cb975d0b44d2c. Original /new redirect was a route-local `permanentRedirect('/')` in app/new/page.tsx, not DNS or a Vercel redirect rule. A cached historical 308 in a visitor browser may need a refresh/new browser session.
- Route implementation: app/new/page.tsx -> app/new/_cinematic/CareLess.tsx, CSS module and config.ts. No additional runtime dependencies.
- All original homepage `_v2`, shared components/lib/sections, app/page.tsx, global CSS, next.config.js and original media remain intact. Root wrappers preserve existing analytics/schema/Lenis behavior on all paths except `/new`. `/new` uses native scroll, suppresses existing remote analytics, and supplies a simple WebPage schema without legacy pricing.
- Native passive scroll listener -> one scheduled animation frame per scroll event -> opacity/transform layers and headquarters CSS variable. No perpetual new-route animation loop, body lock or wheel hijacking. Visible scene state changes only at boundaries (optional sequences have a 30-step progress limit). Reduced-motion/save-data use static posters and a shorter chapter gallery; chapter controls still work.
- JS failure: all main content is server-rendered, skip remains a native anchor, noscript exposes all category content and direct human links. Missing runtime manifest retains server manifest. Missing image falls back to the local SVG storyboard. Missing videos are never requested.

## Media

public/careless/media.json is the centralized manifest, imported for SSR and fetched at runtime. public/careless/images has founder-approved WebP derivatives and emergency storyboard fallbacks. public/careless/video is the founder clip handoff folder. See CARELESS-MEDIA-HANDOFF.md for mapping, focal points and sequence conversion. Final videos have not been provided or tested. The supplied HQ image still has baked labels; a clean replacement remains a known item.

## Scout and conversion state

Scout 21406, existing widget careless-scout-staging, pipeline 5623 and Task Manager 13673 are existing resources. Live read-only verification on 20 October: assistant status 0; widget is_on false. No assistant, channel or CRM copy was created. No services were activated.

All Talk to Scout buttons open an accessible paused-state dialog. Booking: https://zcal.co/carelessmaks/ai-map (existing 90-minute Strategic AI Map, Google Meet). WhatsApp: https://wa.me/34641935207. Links open the actual providers; a click does not mean booked/sent. Native live chat/session/CRM/human takeover remains pending public privacy/activation approval and a new approved staging installation test. Prior synthetic transport tests are recorded in Notion, not counted as tests of this new page. Existing actual embed is in the pre-existing local artifacts and authoritative Notion website integration page. Do not wire a public chat from a query parameter, create another assistant, expose API secrets or invent voice functionality.

The heart stores only careless-appreciated-v1=yes in this browser. It shows no aggregate count, sends no CRM request and creates no sales opportunity. Storage denial falls back to visit-only acknowledgement. Privacy dialog clears the saved preference. No social URLs were supplied/verified, so none are displayed.

Analytics: local allowlisted careless:event CustomEvents cover journey start/skip, category, Scout paused open, booking/WhatsApp click and appreciation. There is no remote transport or contact/free-text payload. A consented adapter remains future work. Existing homepage analytics keep their original behavior. Direct navigation is tested; an already-running third-party analytics script from another route cannot be erased by unrendering it, so retain full document navigation into the new experience until cross-route consent is addressed.

## QA and release

Run `node scripts/check-careless-v1.mjs` for route-preservation and asset checks; `npx tsc --noEmit`; `npm run build`; then `npm run start -- --hostname 127.0.0.1 --port 3090`. Do not run dev and build in the same `.next` simultaneously. QA details are in CARELESS-QA.md. Browser screenshots and build evidence are kept in the parent workspace artifacts/careless-v1-qa and artifacts/careless-build-*.log, outside public delivery.

Code is saved on care-less-v1 with pull request https://github.com/descuidadomaks-alt/maksnedbailo-site/pull/1. A successful Vercel preview check is required before release. Merge only the reviewed branch/head; main auto-deploys. Verify `/new` 200 with no redirect, production media, unchanged normalized homepage text/schema, unrelated route smoke tests, paused Scout, and console. No DNS, paid services or audience settings are needed.

Rollback: revert this feature's commits on main and let Vercel redeploy (returns /new to its prior redirect and restores scoped wrappers); do not revert unrelated commits or change domain settings. Media rollback alone is a manifest edit. Keep source originals and previous sequence folders.

## Remaining decisions

Public Scout privacy/controller/contact/retention rules and activation sign-off; approved widget installation test on staging; final video crops/sequence performance; genuinely text-free HQ source; physical iOS/Android/QR test; optional consented remote analytics/aggregate appreciation backend. Existing pinned Next 14.2.5 dependency was preserved, not upgraded as part of this isolated route; its installation reports a security advisory and needs a separately tested maintenance update.

## Restart

Read existing Notion Website integration and Care Less initiative first. Reuse this repository and manifest, this PR/branch and the existing paused Scout. Read current release status in CARELESS-QA.md and Notion rather than assuming a draft/preview is live. Do not duplicate the roadmap or infer a QR target from the homepage. Continue with final media/Scout gates while preserving the rest of the site.

Final external link audit: zcal and WhatsApp returned HTTP 200; WhatsApp resolved to the correct +34641935207 destination, with no message sent. The historically recorded roman.maksnedbailo.com no longer resolves. The third portfolio card now links to the preserved /projects/roman route and explicitly says Archived website prototype. No unrelated domain/DNS changes.
