/**
 * Care Less — UK locksmith missed-call offer. Constants only; all values
 * are the locked decisions from the offer doc
 * (docs/care-less-uk-locksmith/ — see the offer build memory), not
 * placeholders.
 */

export const BRAND = "Care Less";

export const PRICE_PILOT = "£167/mo";
export const PRICE_STANDARD = "£197/mo";
export const SETUP = "£0 setup during the 30-day pilot";
export const TERMS = "Month-to-month after the pilot · cancel with 7 days’ notice";

// Booking calendar — the CTA on this page routes here, not to an on-page form.
export const BOOKING_LINK = "https://zcal.co/carelessmaks/ai-map";

export const EXCLUSIVITY =
  "One locksmith per postcode district (e.g. “BN”, “RG”) or 15-mile radius — whichever is smaller.";

export const GUARANTEE_HEADLINE =
  "Every missed call answered in under 60 seconds and booked into your diary — or that month’s free.";

export const GUARANTEE_EXCLUSIONS = [
  "Spam or robocalls flagged by our filter",
  "Call-forwarding misconfigured or switched off on your end",
  "Documented carrier/telecom outages outside our control",
  "Calls received outside your configured operating hours",
  "Test calls used to check the system",
];

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Forward",
    body: "Point your existing business number at us — keep the same number, nothing to reprint.",
  },
  {
    step: "2",
    title: "AI answers",
    body: "Every missed call gets answered in under 60 seconds, day or night, even mid-job.",
  },
  {
    step: "3",
    title: "Qualifies",
    body: "4–6 quick questions — what's happened, where, how urgent — so you're not chasing tyre-kickers.",
  },
  {
    step: "4",
    title: "Books & texts you",
    body: "The job lands straight in your diary and you get an instant text with the details.",
  },
];

export const BONUSES: { name: string; value: number; note: string }[] = [
  {
    name: "Missed-Call Audit",
    value: 197,
    note: "A report of exactly when and how many calls you missed in month one — the revenue you were leaving on the table.",
  },
  {
    name: "Review-Reply Engine",
    value: 147,
    note: "AI drafts your Google / Checkatrade review responses within 24 hours.",
  },
  {
    name: "Emergency SMS Template Pack",
    value: 97,
    note: "Pre-approved copy for lockout, break-in and lock-change jobs — instant, consistent first replies.",
  },
  {
    name: "Live Response-Time Dashboard",
    value: 97,
    note: "See your sub-60-second answer rate in real time — useful for you, and provable to customers.",
  },
];

export const BONUS_TOTAL = BONUSES.reduce((sum, b) => sum + b.value, 0);

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What if the AI gets it wrong?",
    a: "Any call it can't confidently handle — an unclear job, a customer who wants to speak to a human — gets escalated straight away: transferred live if you're free, texted to you as urgent if you're not, and always marked so nothing slips through.",
  },
  {
    q: "Do I keep my existing phone number?",
    a: "Yes. You forward your current number to us; customers never see a different number and nothing needs to be reprinted on your van or website.",
  },
  {
    q: "What happens during the 30-day pilot?",
    a: `${PRICE_PILOT}, no setup fee. You get everything in the offer — answered calls, qualification, booking, alerts — and we agree your pre-pilot missed-call estimate upfront so there's a clear before/after.`,
  },
  {
    q: "Is this really exclusive to me in my area?",
    a: EXCLUSIVITY + " We simply don't sell a second slot in an area that's already taken — no countdown timer, no fake scarcity.",
  },
  {
    q: "What does it cost after the pilot?",
    a: `${PRICE_STANDARD}, still no setup fee, still month-to-month with 7 days’ notice to cancel. No long contract, ever.`,
  },
];
