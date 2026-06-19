/**
 * WhatsApp link helper — the single place the phone number lives.
 *
 * Every booking button on the site flows through `waLink()`. To change the
 * number, edit `WHATSAPP_NUMBER` here and nowhere else.
 */

import { site } from "./content";

export const WHATSAPP_NUMBER = site.whatsapp; // e.g. "34642263063"

/**
 * Build a wa.me link with a pre-filled, URL-encoded message.
 *
 * @param message  The chat text. Defaults to the generic booking message.
 */
export function waLink(message: string = site.whatsapp_messages.generic): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Per-service booking link — pre-fills the chat with the chosen service name.
 */
export function waServiceLink(serviceName: string): string {
  return waLink(site.whatsapp_messages.service(serviceName));
}
