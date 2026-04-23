import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { getProspect, getAllSlugs } from "./data";
import SectionHero from "./components/SectionHero";
import ConnectoWidget from "./components/ConnectoWidget";
import SectionObservation from "./components/SectionObservation";
import SectionMath from "./components/SectionMath";
import SectionProof from "./components/SectionProof";
import SectionHowBuilt from "./components/SectionHowBuilt";
import SectionOffer from "./components/SectionOffer";
import SectionSlot from "./components/SectionSlot";
import SectionCTA from "./components/SectionCTA";
import DemoTracker from "./components/DemoTracker";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getProspect(params.slug);
  if (!d) return {};
  const og = `/automations/${d.slug}/og.png`;
  return {
    title: `A live AI agent built for ${d.businessName} — Careless AI`,
    description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
    alternates: { canonical: `https://maksnedbailo.site/automations/${d.slug}` },
    robots: { index: false, follow: false },
    openGraph: {
      title: `A live AI agent built for ${d.businessName} — Careless AI`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
      url: `https://maksnedbailo.site/automations/${d.slug}`,
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: `${d.agentName} for ${d.businessName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `A live AI agent built for ${d.businessName} — Careless AI`,
      description: `48 hours. Public information only. ${d.ownerFirstName}, here's what it looks like when your website replies in 9 seconds.`,
      images: [og],
    },
  };
}

export default function DemoPage({ params }: Props) {
  const data = getProspect(params.slug);
  if (!data) notFound();

  return (
    <>
      {/* Plausible — tagged events variant */}
      <Script
        src="https://plausible.io/js/script.tagged-events.js"
        data-domain="maksnedbailo.site"
        strategy="afterInteractive"
      />
      <DemoTracker slug={data.slug} />
      <main className="min-h-screen">
        <SectionHero data={data} />
        <ConnectoWidget data={data} />
        <SectionObservation data={data} />
        <SectionMath data={data} />
        <SectionProof data={data} />
        <SectionHowBuilt data={data} />
        <SectionOffer data={data} />
        <SectionSlot data={data} />
        <SectionCTA data={data} />
      </main>
    </>
  );
}
