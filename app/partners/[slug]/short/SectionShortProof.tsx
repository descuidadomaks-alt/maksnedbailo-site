import Link from "next/link";
import type { ShortPartnerConfig } from "@/content/partners/index";
import type { ShortPageDict } from "../lib/i18n";

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

export default function SectionShortProof({
  config,
  d,
}: {
  config: ShortPartnerConfig;
  d: ShortPageDict;
}) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.proof.label}
        </p>
        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-10"
          style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          {d.proof.headline}
        </h2>

        {/* 2-column live build cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {d.proof.cases.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal={`d${i}`}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.016] p-7 flex flex-col gap-4 hover:border-white/[0.12] hover:bg-white/[0.028] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              {/* Title row + badge */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-playfair font-normal text-fg" style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.25 }}>
                  {c.name}
                </h3>
                <div className="shrink-0 flex items-center gap-2 mt-0.5">
                  <div
                    className="live-badge-pulse flex items-center gap-1.5"
                    style={{
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      borderRadius: "999px",
                      padding: "3px 8px",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgb(74,222,128)" }} />
                    <span className="font-sora font-semibold" style={{ fontSize: "9px", letterSpacing: "1.5px", color: "rgba(74,222,128,0.82)" }}>
                      {d.proof.liveBadge}
                    </span>
                  </div>
                  <span className="text-fg/22 group-hover:text-fg/48 transition-colors duration-200">
                    <ArrowIcon />
                  </span>
                </div>
              </div>
              <p className="font-sora font-light text-fg/48 leading-[1.7]" style={{ fontSize: "14px" }}>
                {c.desc}
              </p>
              <span className="font-sora text-fg/22" style={{ fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase" }}>
                {c.tag}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
