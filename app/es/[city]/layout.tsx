import { getCity, getAllCities } from "@/lib/cities";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

type Props = { params: { city: string }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = getCity(params.city);
  if (!city) return {};

  return {
    title: city.meta.title,
    description: city.meta.description,
    alternates: {
      canonical: `https://maksnedbailo.site/es/${city.slug}`,
      languages: {
        en: "https://maksnedbailo.site",
        es: `https://maksnedbailo.site/es/${city.slug}`,
        "x-default": "https://maksnedbailo.site",
      },
    },
    openGraph: {
      title: city.meta.title,
      description: city.meta.description,
      url: `https://maksnedbailo.site/es/${city.slug}`,
      siteName: "Maks Nedbailo",
      locale: "es_ES",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export default function CityLayout({ params, children }: Props) {
  const city = getCity(params.city);
  if (!city) notFound();

  return (
    <>
      <LocalBusinessSchema city={city} />
      {children}
    </>
  );
}
