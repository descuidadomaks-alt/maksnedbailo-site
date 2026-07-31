/**
 * Minimal analytics helper — replicates the guarded pattern found in
 * overtimeos.com's own compiled JS (window.gtag / window.clarity /
 * window.fbq, each wrapped so a blocked or absent script never throws).
 * This site already loads Microsoft Clarity globally (see app/layout.tsx),
 * so `track()` calls genuinely land there tagged by event name; gtag/fbq
 * are safe no-ops here since neither is loaded on this page.
 */

type Fn = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { gtag?: Fn; clarity?: Fn; fbq?: Fn };
    w.gtag?.("event", event, params);
    w.clarity?.("event", event);
    Object.entries(params).forEach(([k, v]) => {
      w.clarity?.("set", k, String(v));
    });
    w.fbq?.("trackCustom", event, params);
  } catch {
    // A blocked/absent script should never break the page.
  }
}
