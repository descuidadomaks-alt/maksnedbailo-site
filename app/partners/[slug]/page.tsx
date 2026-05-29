import { notFound } from "next/navigation";
import type { Metadata } from "next";
import vlad from "@/content/partners/vlad";
import type { PartnerData } from "@/content/partners/index";
import PartnerMarquee from "./components/PartnerMarquee";
import SectionHero from "./components/SectionHero";
import SectionValueStack from "./components/SectionValueStack";
import AiMapMockup from "./components/AiMapMockup";
import SectionPillars from "./components/SectionPillars";
import SectionIndustryExamples from "./components/SectionIndustryExamples";
import InlineCTA from "./components/InlineCTA";
import SectionCost from "./components/SectionCost";
import SectionFit from "./components/SectionFit";
import SectionComparison from "./components/SectionComparison";
import SectionGuarantee from "./components/SectionGuarantee";
import SectionProcess from "./components/SectionProcess";
import SectionAbout from "./components/SectionAbout";
import SectionBorrowedProof from "./components/SectionBorrowedProof";
import SectionFAQ from "./components/SectionFAQ";
import SectionFinalCTA from "./components/SectionFinalCTA";
import SectionLeadMagnet from "./components/SectionLeadMagnet";
import PartnerAnalytics from "./components/PartnerAnalytics";
import StickyMobileCTA from "./components/StickyMobileCTA";

// ─── Registry — add new partners here ─────────────────────────────────────────
const PARTNERS: Record<string, PartnerData> = {
  vlad,
};

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(PARTNERS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = PARTNERS[params.slug];
  if (!d) return {};
  const og = `/partners/${d.slug}/og.png`; // TODO:OG_IMAGE
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: `https://maksnedbailo.site/partners/${d.slug}` },
    robots: d.meta.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `https://maksnedbailo.site/partners/${d.slug}`,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: d.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: [og],
    },
  };
}

export default function PartnerPage({ params }: Props) {
  const data = PARTNERS[params.slug];
  if (!data) notFound();

  return (
    <>
      {/* Analytics — scroll depth + time on page (client only) */}
      <PartnerAnalytics slug={data.slug} />

      {/* Sticky mobile CTA — bottom-fixed, appears after hero, dismissible */}
      <StickyMobileCTA data={data} />

      <main className="min-h-screen">
        {/* 1. Stats marquee */}
        <PartnerMarquee data={data} />

        {/* 2. Hero */}
        <SectionHero data={data} />

        {/* 3. The Gift — value stack */}
        <SectionValueStack data={data} />

        {/* 3b. AI Map separator + deliverable mockup */}
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-2">
          <p className="font-sora text-fg/30" style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
            Deliverable
          </p>
          <h2
            className="font-playfair font-normal text-fg mt-3"
            style={{ fontSize: "clamp(24px, 3.4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.022em" }}
          >
            What the Map Looks Like
          </h2>
        </div>
        <AiMapMockup />

        {/* Inline CTA #1 */}
        <InlineCTA data={data} location="after_value_stack" />

        {/* 4. Three pillars */}
        <SectionPillars />

        {/* 4b. Industry examples — see yourself on the page */}
        <SectionIndustryExamples />

        {/* 5. Cost of staying put */}
        <SectionCost />

        {/* 6. Who it's for */}
        <SectionFit />

        {/* 6b. What you're NOT getting */}
        <SectionComparison />

        {/* Inline CTA #2 */}
        <InlineCTA data={data} location="after_fit" />

        {/* 7. Guarantee */}
        <SectionGuarantee />

        {/* 8. Process */}
        <SectionProcess data={data} />

        {/* 9. About Maks */}
        <SectionAbout data={data} />

        {/* 10. Borrowed proof */}
        <SectionBorrowedProof />

        {/* Inline CTA #3 */}
        <InlineCTA data={data} location="after_proof" />

        {/* 11. FAQ */}
        <SectionFAQ data={data} />

        {/* 12. Final CTA */}
        <SectionFinalCTA data={data} />

        {/* 13. Lead magnet fallback */}
        <SectionLeadMagnet data={data} />
      </main>
    </>
  );
}
