import type { PartnerData } from "@/content/partners/index";

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

            <div>
              <p className="font-sora font-light text-fg/60 leading-[1.85] mb-5" style={{ fontSize: "15px" }}>
                I&apos;m Maks. I&apos;m a Ukrainian entrepreneur based in Santander, Spain. I run a small AI automation studio with a Ukrainian developer network — we build the unsexy systems that let business owners stop being the bottleneck.
              </p>
              <p className="font-sora font-light text-fg/60 leading-[1.85]" style={{ fontSize: "15px" }}>
                I&apos;ve been {data.partner.name}&apos;s friend long before I built him anything useful. He&apos;s giving you this session because we&apos;ve already proven it works on people he trusts. Now it&apos;s your turn.
              </p>
              <div className="mt-6 pt-6 border-t border-white/[0.06]">
                <p className="font-sora text-fg/50" style={{ fontSize: "12px", letterSpacing: "1px" }}>
                  <span className="text-fg/80">Maks Nedbailo</span>
                  <span className="text-fg/25 mx-2">·</span>
                  AI Automation Studio
                  <span className="text-fg/25 mx-2">·</span>
                  Santander, Spain
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
