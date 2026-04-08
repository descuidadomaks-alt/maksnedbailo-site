import { getCity, getAllCities } from "@/lib/cities";
import { notFound } from "next/navigation";
import CityPageClient from "@/components/CityPageClient";

export function generateStaticParams() {
  return getAllCities().map((c) => ({ city: c.slug }));
}

export default function CityEnPage({ params }: { params: { city: string } }) {
  const city = getCity(params.city);
  if (!city) notFound();
  return <CityPageClient city={city} lang="en" />;
}
