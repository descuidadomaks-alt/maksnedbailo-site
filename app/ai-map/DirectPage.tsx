"use client";

import { useDirectLocale } from "./lib/locale";
import { getDirectDict } from "./lib/directi18n";
import DirectHero from "./sections/DirectHero";
import DirectProblem from "./sections/DirectProblem";
import DirectOffer from "./sections/DirectOffer";
import DirectGuarantee from "./sections/DirectGuarantee";
import DirectIndustry from "./sections/DirectIndustry";
import DirectProof from "./sections/DirectProof";
import DirectClose from "./sections/DirectClose";
import DirectProcess from "./sections/DirectProcess";
import DirectFAQ from "./sections/DirectFAQ";
import DirectFinalCTA from "./sections/DirectFinalCTA";
import DirectStickyCTA from "./sections/DirectStickyCTA";

/**
 * Direct sales page — /ai-map
 *
 * Arc: Hook → Problem → Solution + Sample → Industry → Proof → Process → Guarantee → Close → FAQ → CTA
 *
 * All polished components inherited:
 *  - 2-family type system: Roboto Mono (headings/labels) + IBM Plex Sans (body/numerals)
 *  - tabular figures via font-feature-settings:"tnum" + .font-numeral class
 *  - [data-short-page] CSS scope provides font overrides automatically
 *  - Lenis smooth scroll + data-reveal stagger animations (root layout)
 *  - All tables: aligned fr-grid, mobile card reflow, no overflow
 *  - Corrected cost-of-inaction math (€4,500 vs #1 leak €2,400/mo = under 2 months)
 */
export default function DirectPage() {
  const { locale } = useDirectLocale();
  const d = getDirectDict(locale);

  return (
    <>
      <DirectStickyCTA d={d} />
      <main className="min-h-screen pb-28 md:pb-0" data-short-page>
        <DirectHero d={d} />
        <DirectProblem d={d} />
        <DirectOffer d={d} locale={locale} />
        <DirectIndustry d={d} />
        <DirectProof d={d} />
        <DirectProcess d={d} />
        <DirectGuarantee d={d} />
        <DirectClose d={d} />
        <DirectFAQ d={d} />
        <DirectFinalCTA d={d} />

        {/* Footer */}
        <footer className="border-t px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt={d.footer.credit} style={{ height: "20px", opacity: 0.35 }} />
          <p className="font-sora font-light text-fg/20" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
            {d.footer.credit} · {d.footer.location}
          </p>
        </footer>
      </main>
    </>
  );
}
