# /new4

Isolated, buildless browser experience. `/new`, `/new2`, `/new3` and their assets stay unchanged. Next only serves the raw HTML route and the offer intake endpoint.

Edit these readable scripts, then run `node scripts/build-new4.cjs` from the repository root. The build writes minified vanilla JavaScript to `public/careless/new4/` and enforces a 40,000-byte total. CSS and HTML live in that public directory.

- `core.js`: offer form, WhatsApp, typing, existing Clarity events, empty client logo and testimonial collections. Populate collections only with supplied content. Contact fields are masked; event payloads contain no contact information.
- `film.js`: poster first, 12-second buffered readiness target, requestAnimationFrame scrub in either direction. Mobile/slow/save-data source is 540; desktop is 720. Both are all-intra copies, retaining original dimensions, timing and imagery.
- `arrival.js`: maximum eight-second gate; scroll-position scoped Scout encounter and launcher. Decline preference persists for the tab. No phone orientation permission or listener.
- `chapters.js`: snap targets, wheel gesture grouping, horizontal swipes, capsule work maps.
- `plate.js`: eased pointer tilt, touch drag and idle sway; reduced motion is static.
- `closing.js`: reversible dissolve, empty video slot. Add both video and poster URLs to the HTML data attributes only when supplied.
- `scout.js`: existing MCB public widget protocol. `SCOUT_ENABLED` in `core.js` remains false; the existing assistant was paused at verification. This pass does not activate it or start voice calls.

Offer intake: `app/api/new4-offer/route.ts` forwards validated contact, offer and note through the existing MCB public widget connection. It does not use GHL. It reports success only after an upstream acknowledgement, rejects provider failures, and never pretends an unconfigured integration succeeded. WhatsApp remains available. Fixture tests exercise acceptance, failure and retry behavior. A single clearly marked QA enquiry using `https://example.invalid` was accepted by the live endpoint and read back in MCB assistant 21406, chat 1245103. No real person was contacted and no voice call was requested. The one-hour reply text is the owner's supplied promise; actual human response time was not measured.

The main booking button and final “or book a call” link are the only calendar links. All offer links open the intake panel. The final input opens Scout when enabled or WhatsApp otherwise. Keep noindex until the owner explicitly requests removal.

All-intra encoding (same source imagery; no shared file is replaced):

```sh
ffmpeg -i public/careless/video/film-v4/film-720.mp4 -c:v libx264 -preset slow -crf 24 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -an -movflags +faststart public/careless/new4/media/film-720-intra.mp4
ffmpeg -i public/careless/video/film-v4/film-540.mp4 -c:v libx264 -preset slow -crf 25 -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -an -movflags +faststart public/careless/new4/media/film-540-intra.mp4
```

Every frame was verified as a keyframe in both files. The cost is larger media: approximately 38.5 MB desktop / 22.7 MB mobile. Gate timeout never waits indefinitely for a full download.
