"use client";

import Script from "next/script";
import { PIXEL_ID } from "../lib/config";

/**
 * Meta Pixel — Carter's ad account needs this to optimize. PIXEL_ID stays
 * "PIXEL_ID_PENDING" until Carter supplies the real ID; every export here
 * no-ops cleanly while it's the placeholder, so nothing loads or fires
 * before it's swapped in (one-line change in lib/config.ts).
 */
export const PIXEL_ENABLED = PIXEL_ID !== "PIXEL_ID_PENDING";

type FbqFn = (...args: unknown[]) => void;

export function trackPixelEvent(event: string) {
  if (!PIXEL_ENABLED || typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
  fbq?.("track", event);
}

/** Custom (non-standard) event, e.g. QuizOpen/QuizStep for the step-drop funnel. */
export function trackCustomPixelEvent(event: string, params?: Record<string, unknown>) {
  if (!PIXEL_ENABLED || typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: FbqFn }).fbq;
  fbq?.("trackCustom", event, params);
}

/** Base snippet — fires the standard PageView on load. Mounted once in layout.tsx. */
export function MetaPixel() {
  if (!PIXEL_ENABLED) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
