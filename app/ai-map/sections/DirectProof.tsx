import Link from "next/link";
import type { DirectPageDict } from "../lib/directi18n";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

export default function DirectProof({ d }: { d: DirectPageDict }) {
  return (
    <section className="section-divider py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-6">

        <p data-reveal className="font-label text-fg/28 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          {d.proof.label}
        </p>
        <h2 data-reveal className="font-playfair font-normal text-fg mb-4" style={{ fontSize: "clamp(24px, 3.2vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}>
          {d.proof.headline}
        </h2>
        <p data-reveal className="font-sora font-light text-fg/35 mb-12" style={{ fontSize: "14px" }}>
          {d.proof.sub}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch mb-8">
          {d.proof.cases.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-reveal={`d${i}`}
              className="group h-full rounded-2xl border border-white/[0.05] bg-white/[0.012] p-6 flex flex-col gap-3 hover:border-white/[0.1] hover:bg-white/[0.022] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-playfair font-normal text-fg/75" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.3 }}>
                  {c.name}
                </h3>
                <div className="shrink-0 flex items-center gap-2 mt-0.5">
                  <div className="live-badge-pulse flex items-center gap-1" style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "999px", padding: "2px 7px" }}>
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "rgb(74,222,128)" }} />
                    <span className="font-sora font-semibold" style={{ fontSize: "8px", letterSpacing: "1.5px", color: "rgba(74,222,128,0.75)" }}>{d.proof.liveBadge}</span>
                  </div>
                  <span className="text-fg/20 group-hover:text-fg/40 transition-colors duration-200"><ArrowIcon /></span>
                </div>
              </div>
              <p className="font-sora font-light text-fg/38 leading-[1.65]" style={{ fontSize: "13px" }}>{c.desc}</p>
              <span className="font-sora text-fg/20 mt-auto" style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>{c.tag}</span>
            </Link>
          ))}
        </div>

        {/* Testimonial slots — clearly marked as coming */}
        <div
          data-reveal
          className="rounded-2xl border border-dashed border-white/[0.08] p-6 text-center"
          style={{ background: "rgba(255,255,255,0.008)" }}
        >
          <p className="font-label text-fg/20 uppercase" style={{ fontSize: "9px", letterSpacing: "2.5px" }}>
            {d.proof.slotLabel}
          </p>
        </div>

      </div>
    </section>
  );
}
