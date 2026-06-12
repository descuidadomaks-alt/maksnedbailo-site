"use client";

/**
 * /ai-map chrome — shared NewHeader (site-wide ticker + collapsible header),
 * driven by this page's own DirectLocaleProvider (en/es; uk retained in the
 * type but no UI toggle). The header CTA points straight at the zcal booking
 * link for this offer (CHECKOUT_URL) instead of /ai-map.
 */

import { type ReactNode } from "react";
import { DirectLocaleProvider, useDirectLocale, type DirectLocale } from "./locale";
import { CHECKOUT_URL } from "./config";
import NewHeader from "@/app/new/components/NewHeader";

function DirectHeader() {
  const { locale, setLocale } = useDirectLocale();
  return (
    <NewHeader
      locale={locale === "es" ? "es" : "en"}
      setLocale={setLocale}
      ctaHref={CHECKOUT_URL}
    />
  );
}

export default function DirectLocaleWrapper({
  children,
  defaultLocale,
}: {
  children: ReactNode;
  defaultLocale: DirectLocale;
}) {
  return (
    <DirectLocaleProvider defaultLocale={defaultLocale}>
      <DirectHeader />
      {/* top padding so fixed header doesn't overlap content */}
      <div style={{ paddingTop: "76px" }}>
        {children}
      </div>
    </DirectLocaleProvider>
  );
}
