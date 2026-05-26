import type { PartnerData } from "@/content/partners/index";

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function SectionAbout({ data }: { data: PartnerData }) {
  return (
    <section className="section-divider py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-6">

        <p data-reveal className="font-sora text-fg/30 mb-5" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
          Who
        </p>

        <h2
          data-reveal
          className="font-playfair font-normal text-fg mb-10"
          style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
        >
          The Person Behind This
        </h2>

        <div
          data-reveal
          className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-8 md:p-10"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.25)" }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-7">

            {/* Avatar placeholder */}
            <div
              className="shrink-0 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center"
              style={{ background: "rgba(212,255,43,0.04)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,230,0.2)" strokeWidth="1.5" aria-hidden>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-sora font-light text-fg/60 leading-[1.85] mb-4" style={{ fontSize: "15px" }}>
                I&apos;m Maks. Ukrainian entrepreneur, based in Santander, Spain. I run a small AI automation studio with a Ukrainian developer network — 8 builders across Kyiv, Lviv, and Dnipro who ship the unsexy systems that let business owners stop being the bottleneck.
              </p>
              <p className="font-sora font-light text-fg/60 leading-[1.85] mb-4" style={{ fontSize: "15px" }}>
                Before this, I built a 10,000-person network marketing organisation across 10 countries, and ran DCOAST as a design agency serving international clients. I built and delivered a 14-week AI training curriculum for Risk.inc&apos;s 80-person design team in 2025. I speak Ukrainian, Russian, English, and enough Spanish to get by.
              </p>
              <p className="font-sora font-light text-fg/60 leading-[1.85]" style={{ fontSize: "15px" }}>
                I&apos;ve been {data.partner.name}&apos;s friend long before I built him anything useful. He&apos;s giving you this session because the system already works on people he trusts. Now it&apos;s your turn.
              </p>

              <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-4 flex-wrap">
                <p className="font-sora text-fg/50" style={{ fontSize: "12px", letterSpacing: "1px" }}>
                  <span className="text-fg/80">Maks Nedbailo</span>
                  <span className="text-fg/25 mx-2">·</span>
                  AI Automation Studio
                  <span className="text-fg/25 mx-2">·</span>
                  Santander, Spain
                </p>
                <a
                  href="https://www.linkedin.com/in/maks-nedbailo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg/30 hover:text-fg/60 transition-colors duration-200"
                  style={{ fontSize: "11px", letterSpacing: "1px" }}
                  aria-label="Maks Nedbailo on LinkedIn"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
