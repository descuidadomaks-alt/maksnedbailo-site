# Adding a New Prospect Demo Page

Three steps. No code changes outside the data file.

---

## Step 1 — Create the data file

Copy `[slug]/data/hcmedspa.ts` and rename it to `[slug]/data/yourslug.ts`.

Fill in every field:

```ts
const yourprospect: ProspectData = {
  slug: "yourslug",          // must match the filename and the URL
  createdAt: "2026-06-01",   // YYYY-MM-DD — expiresAt auto = createdAt + 14 days
  slotExpired: false,

  ownerFirstName: "Jane",
  businessName: "Lumiere Aesthetics",
  businessDomain: "lumiereuk.com",

  agentName: "Sophia",       // agent's first name shown throughout the page

  metrics: {
    responseTimeUs: "9 seconds",
    responseTimeThem: "19+ hours",
    monthlyLeak: "£1,800",
    yearlyLeak: "£72,000",
    locationCount: 2,
    avgTreatmentValue: "£200",
    afterHoursGap: "25%",
    benchmarkSource: "UK Aesthetics Clinic benchmark report 2025",
    // benchmarkUrl: "https://...",   // add URL if you have a citable source
  },

  proofScreenshots: [
    { src: null, caption: "Botox aftercare question — calm, clinical answer." },
    { src: null, caption: "Booking enquiry at 11pm — instant reply." },
    { src: null, caption: "Competitor comparison — honest, confident response." },
  ],
  // ↑ src: null renders a placeholder. Replace with "/automations/yourslug/proof-N.png"
  //   once you have real screenshots (375×600 px recommended).

  offerSetupPrice: "£1,497",
  offerMonthlyPrice: "£397/mo",

  ctaCalendarUrl: "https://zcal.co/carelessmaks/free-audit",
  ctaWhatsappUrl: "https://wa.me/34641935207",
  formWebhookUrl: "https://hook.eu1.make.com/...",  // your n8n/make.com URL

  connectoWidget: {
    src: "https://app.theconnecto.ai/widget.js",
    widgetKey: "YOUR_WIDGET_KEY_HERE",             // from Connecto dashboard
    apiUrl: "https://www.maksnedbailo.site/api/connecto",
    title: "Sophia — Lumiere Aesthetics",
    subtitle: "Trained on your clinic. Replies in 9s.",
    colour: "#1a1a2e",                             // brand colour for widget header
    position: "right",
    language: "en",
  },
};

export default yourprospect;
```

---

## Step 2 — Register it in the index

Open `[slug]/data/index.ts` and add two lines:

```ts
import yourprospect from "./yourslug";   // ← add

const REGISTRY: Record<string, ProspectData> = {
  hcmedspa,
  yourslug: yourprospect,               // ← add
};
```

---

## Step 3 — Add screenshots (optional but recommended)

Place 3 PNG files in `/public/automations/yourslug/`:

| File | Dimensions | Purpose |
|---|---|---|
| `proof-1.png` | 375 × 600 px | Conversation screenshot #1 |
| `proof-2.png` | 375 × 600 px | Conversation screenshot #2 |
| `proof-3.png` | 375 × 600 px | Conversation screenshot #3 |
| `og.png` | 1200 × 630 px | Open Graph / social share image |

Until screenshots are ready, the page shows elegant placeholder frames automatically.

---

## Notes

- **Expiry**: The demo page shows a countdown based on `createdAt + 14 days`. Set `slotExpired: true` to freeze it as a public case study.
- **Webhook**: `formWebhookUrl` receives a POST with all form fields + `slug` + `source: "demo-page"`. Leave empty string `""` during development — the form still redirects to `ctaCalendarUrl`.
- **Widget colour**: Use the prospect's brand colour (dark variant works best on the dark bg).
- **URL**: The page lives at `https://maksnedbailo.site/automations/yourslug`.

---

## Placeholder images needed per prospect

```
/public/automations/[slug]/proof-1.png   375 × 600 px
/public/automations/[slug]/proof-2.png   375 × 600 px
/public/automations/[slug]/proof-3.png   375 × 600 px
/public/automations/[slug]/og.png       1200 × 630 px
```
