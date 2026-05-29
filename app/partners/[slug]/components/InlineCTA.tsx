"use client";

import type { PartnerData } from "@/content/partners/index";

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
    clarity?: (method: string, key: string, value?: string) => void;
  }
}

function track(event: string, props: Record<string, string>) {
  window.plausible?.(event, { props });
  window.clarity?.("set", event, Object.values(props).join(" | "));
}

export default function InlineCTA({ data, location }: { data: PartnerData; location: string }) {
  return (
    <div className="flex justify-center py-12 md:py-16">
      <a
        href={data.booking.schedulerUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-primary-cta
        className="group inline-flex items-center justify-center gap-2.5 bg-accent text-bg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,43,0.22)]"
        style={{ fontSize: "15px", padding: "18px 40px", minHeight: "60px", letterSpacing: "-0.01em" }}
        onClick={() =>
          track("cta_book_click", { slug: data.slug, location })
        }
      >
        {data.hero.cta}
        <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
      </a>
    </div>
  );
}
