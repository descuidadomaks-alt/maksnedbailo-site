import { getCity, getAllCities } from "@/lib/cities";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteFooter from "../../SiteFooter";

type Props = { params: { city: string }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};

  const meta = city.metaEn ?? city.meta;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://maksnedbailo.site/en/${city.slug}`,
      languages: {
        en: `https://maksnedbailo.site/en/${city.slug}`,
        es: `https://maksnedbailo.site/es/${city.slug}`,
        "x-default": `https://maksnedbailo.site/en/${city.slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://maksnedbailo.site/en/${city.slug}`,
      siteName: "Care Less AI Automation",
      locale: "en_US",
      type: "website",
      images: [{ url: "/maks-stage2.jpg", width: 1400, height: 450, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/maks-stage2.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export default function CityEnLayout({ params, children }: Props) {
  const city = getCity(params.city);
  if (!city) notFound();

  return (
    <>
      <LocalBusinessSchema city={city} />
      {children}
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
