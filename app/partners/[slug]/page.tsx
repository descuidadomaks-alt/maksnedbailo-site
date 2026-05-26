import { notFound } from "next/navigation";
import type { Metadata } from "next";
import vlad from "@/content/partners/vlad";
import type { PartnerData } from "@/content/partners/index";
import PartnerMarquee from "./components/PartnerMarquee";
import SectionHero from "./components/SectionHero";
import SectionValueStack from "./components/SectionValueStack";
import SectionPillars from "./components/SectionPillars";
import InlineCTA from "./components/InlineCTA";
import SectionCost from "./components/SectionCost";
import SectionFit from "./components/SectionFit";
import SectionGuarantee from "./components/SectionGuarantee";
import SectionProcess from "./components/SectionProcess";
import SectionAbout from "./components/SectionAbout";
import SectionBorrowedProof from "./components/SectionBorrowedProof";
import SectionFAQ from "./components/SectionFAQ";
import SectionFinalCTA from "./components/SectionFinalCTA";

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
    <main className="min-h-screen">
      {/* 1. Stats marquee (custom per partner) */}
      <PartnerMarquee data={data} />

      {/* 2. Hero */}
      <SectionHero data={data} />

      {/* 3. The Gift — value stack */}
      <SectionValueStack data={data} />

      {/* Inline CTA repeat #1 */}
      <InlineCTA data={data} location="after_value_stack" />

      {/* 4. Three pillars */}
      <SectionPillars />

      {/* 5. Cost of staying put */}
      <SectionCost />

      {/* 6. Who it's for */}
      <SectionFit />

      {/* Inline CTA repeat #2 */}
      <InlineCTA data={data} location="after_fit" />

      {/* 7. Guarantee */}
      <SectionGuarantee />

      {/* 8. Process */}
      <SectionProcess data={data} />

      {/* 9. About Maks */}
      <SectionAbout data={data} />

      {/* 10. Borrowed proof */}
      <SectionBorrowedProof />

      {/* Inline CTA repeat #3 */}
      <InlineCTA data={data} location="after_proof" />

      {/* 11. FAQ */}
      <SectionFAQ data={data} />

      {/* 12. Final CTA */}
      <SectionFinalCTA data={data} />
    </main>
  );
}
