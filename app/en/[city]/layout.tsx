import { getCity, getAllCities } from "@/lib/cities";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

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
      siteName: "Maks Nedbailo",
      locale: "en_US",
      type: "website",
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
    </>
  );
}
