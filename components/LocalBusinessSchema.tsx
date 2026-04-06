import { CityData } from "@/lib/cities";
import { BOOKING_LINK, WA_LINK } from "@/lib/content";

export default function LocalBusinessSchema({ city }: { city: CityData }) {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `https://maksnedbailo.site/es/${city.slug}#business`,
    name: city.schema.name,
    description: city.schema.description,
    url: `https://maksnedbailo.site/es/${city.slug}`,
    telephone: city.schema.telephone,
    priceRange: "$$",
    currenciesAccepted: "EUR",
    inLanguage: ["es", "en"],
    areaServed: {
      "@type": "AdministrativeArea",
      name: city.schema.areaServed,
    },
    founder: {
      "@type": "Person",
      name: "Maks Nedbailo",
      "@id": "https://maksnedbailo.site/#person",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Automatización con IA",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Auditoría Gratuita de Respuesta al Cliente en ${city.name}`,
            description: `Análisis de 48h para negocios en ${city.name}: dónde pierdes leads y cuánto te cuesta.`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `Asistente IA para WhatsApp y Web — ${city.name}`,
            description: `Asistente personalizado para pymes en ${city.region} que responde en menos de 60 segundos, 24/7.`,
          },
        },
      ],
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: BOOKING_LINK,
      name: "Agendar Auditoría Gratuita",
    },
    sameAs: [`https://wa.me/${WA_LINK.replace("https://wa.me/", "")}`],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
