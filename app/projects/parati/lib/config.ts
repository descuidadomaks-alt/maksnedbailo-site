/**
 * Business-critical constants. Each lives in exactly ONE place here —
 * every WhatsApp link, the JSON-LD schema, and every on-page rating/review
 * count reads from this file. To update the phone number or the Google
 * stats, edit here and nowhere else.
 */

/** wa.me format: country code + number, no plus sign, no spaces. */
export const WHATSAPP_NUMBER = "34642263063";

/** Human-readable phone, for JSON-LD `telephone` and any visible text. */
export const PHONE_DISPLAY = "+34 642 263 063";

/** Spanish-locale display rating (comma decimal), shown on-page. */
export const RATING = "5,0";

/** Real review count on the Google Business listing. */
export const REVIEW_COUNT = 37;
