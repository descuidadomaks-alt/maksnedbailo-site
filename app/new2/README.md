# Care Less /new2

Isolated Next.js route. `/` and `/new` retain their existing implementations and media manifest. The three shared wrappers only add a `/new2` exclusion for legacy schema, analytics and smooth scrolling.

The approved film is split at its existing shot boundaries by `scripts/prepare-new2.mjs`. Nine H.264 segments total 7,822,256 bytes; the first is 757,942 bytes. None loads until the visitor starts the intro. Only the current segment and, in its final two seconds, the next segment load. The source film, original clips and `/new` are untouched.

`Experience.tsx` owns the native scroll transformation, five reversible SVG chapters and accessible Scout dialog. `openScout(topic)` is the integration seam for a future approved live widget. Scout remains OFF; no assistant, CRM, contact or analytics request is sent. Keep the existing privacy/activation gates before connecting live chat. Booking and WhatsApp use the previously verified destinations.

The founder portrait is real; the founder film is explicitly a placeholder. The selectable content preview uses existing sunset footage as an illustrative concept.

`/new2/overview` is the public JSON service/action overview. Visible copy, semantic headings, links and service JSON-LD also work without JavaScript. Reduced motion and save-data/2G default to a static vertical story. There is also a manual motion preference.

Local browser diagnostics `data-lcp-ms` and `data-cls` stay in DOM memory; they are observations for that navigation, not field Core Web Vitals. No INP score or physical mobile certification is claimed. Native iOS/Android and a real founder film remain follow-up validation/content work.
