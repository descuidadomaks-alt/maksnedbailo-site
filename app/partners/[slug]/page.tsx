import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ─── Long-form variant ─────────────────────────────────────────────────────────
import vlad from "@/content/partners/vlad";
import type { PartnerData } from "@/content/partners/index";
import LongPage from "./long/LongPage";
import PartnerAnalytics from "./components/PartnerAnalytics";
import StickyMobileCTA from "./components/StickyMobileCTA";

// ─── Short-form template ───────────────────────────────────────────────────────
import vladShort from "@/content/partners/vlad-short";
import artemShort from "@/content/partners/artem-short";
import juliaShort from "@/content/partners/julia-short";
import marinaShort from "@/content/partners/marina-short";
import type { ShortPartnerConfig } from "@/content/partners/index";
import ShortPage from "./short/ShortPage";

// ─── Registries — add new partners here ───────────────────────────────────────
const LONG: Record<string, PartnerData> = { vlad };
const SHORT: Record<string, ShortPartnerConfig> = {
  vlad: vladShort,
  artem: artemShort,
  julia: juliaShort,
  marina: marinaShort,
};

// ─── Next.js config ───────────────────────────────────────────────────────────

type Props = {
  params: { slug: string };
  searchParams?: { v?: string };
};

export function generateStaticParams() {
  return Object.keys(SHORT).map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const slug = params.slug;
  const isLong = searchParams?.v === "long";

  if (isLong) {
    const d = LONG[slug];
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

  // Short template meta — derived from config (no duplication)
  const c = SHORT[slug];
  if (!c) return {};
  const title = `Strategic AI Map — ${c.partnerName}'s circle · care less`;
  const description = `A 90-minute Strategic AI Map session gifted through ${c.partnerName}. Normally €1,500. Yours complimentary — if there's nothing worth automating, I'll say so.`;
  return {
    title,
    description,
    alternates: { canonical: `https://maksnedbailo.site/partners/${c.slug}` },
    robots: { index: false, follow: false }, // partner pages stay noindex
    openGraph: { title, description, url: `https://maksnedbailo.site/partners/${c.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ─── Page component ────────────────────────────────────────────────────────────

export default function PartnerPage({ params, searchParams }: Props) {
  const slug = params.slug;

  // ?v=long — preserved original long-form variant
  if (searchParams?.v === "long") {
    const data = LONG[slug];
    if (!data) notFound();
    return (
      <>
        <PartnerAnalytics slug={data.slug} />
        <StickyMobileCTA data={data} />
        <LongPage data={data} />
      </>
    );
  }

  // Default — short template
  const config = SHORT[slug];
  if (!config) notFound();
  return (
    <>
      <PartnerAnalytics slug={config.slug} />
      <ShortPage config={config} />
    </>
  );
}
