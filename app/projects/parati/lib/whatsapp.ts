/**
 * WhatsApp link helper — the single place link-building logic lives.
 * The phone number itself lives in `config.ts`; everything here consumes it.
 */

import { WHATSAPP_NUMBER } from "./config";
import { site } from "./content";

export { WHATSAPP_NUMBER };

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

/**
 * Per-bono booking link — pre-fills the chat asking about a 5 or 10 session bundle.
 */
export function waBonoLink(sessions: 5 | 10): string {
  return waLink(site.whatsapp_messages.bono(sessions));
}
