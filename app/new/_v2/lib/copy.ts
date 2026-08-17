/**
 * /new V2 — experimental homepage copy. EN + ES, operator voice.
 *
 * Positioning: Care Less sits above individual verticals. Not "the founder
 * is the bottleneck" — the common problem is businesses still spending
 * human time on repetitive sales/service/ops work that AI can now handle.
 * No fabricated stats, no invented clients, no price/deadline framing on
 * the free AI Map (see docs/NEW-HOMEPAGE-V2-BRIEF.md for the full brief).
 */

import type { NewLocale } from "../../lib/locale";

export interface V2Copy {
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryCta: string;
    primaryMicrocopy: string;
    secondaryCta: string;
  };
  problem: {
    label: string;
    headline: string;
    items: string[];
  };
  fix: {
    label: string;
    headline: string;
    sub: string;
    cards: { title: string; body: string }[];
  };
  proof: {
    label: string;
    headline: string;
    sub: string;
    ctaLabel: string;
  };
  voice: {
    eyebrow: string;
    headline: string;
    sub: string;
    cta: string;
  };
  humanAi: {
    label: string;
    headline: string;
    body: string;
  };
  start: {
    label: string;
    headline: string;
    body: string;
    steps: string[];
    trustLine: string;
    cta: string;
  };
  finalCta: {
    headline: string;
    sub: string;
    primaryCta: string;
    whatsapp: string;
  };
  footer: {
    tagline: string;
    navHome: string;
    navAiMap: string;
    navBlog: string;
    waLabel: string;
  };
}

const en: V2Copy = {
  hero: {
    eyebrow: "Sales. Service. Operations.",
    headline: "Find the work your business shouldn't be doing manually.",
    sub: "We find the expensive gaps in sales and operations, then build AI systems to remove them — without replacing the humans who actually matter.",
    primaryCta: "Get your free AI Map",
    primaryMicrocopy: "90 minutes · free, permanently",
    secondaryCta: "See what we've built",
  },

  problem: {
    label: "The Problem",
    headline: "The expensive work is usually hiding in plain sight.",
    items: [
      "A lead comes in Friday night. Nobody replies until Monday — if at all.",
      "The phone rings while you're with a customer. It goes to voicemail. So does the sale.",
      "A quote goes out, then disappears into a spreadsheet nobody reopens.",
      "The same three questions, answered by hand, fifty times a week.",
    ],
  },

  fix: {
    label: "What We Fix",
    headline: "We sell outcomes, not technology categories.",
    sub: "Every business we work with fits one of three buckets.",
    cards: [
      { title: "Sell", body: "Capture enquiries. Qualify. Follow up. Quote. Book. Reactivate." },
      { title: "Serve", body: "Answer calls and messages. Handle common questions. Route exceptions to people." },
      { title: "Operate", body: "Remove repetitive admin. Give teams instant access to business knowledge. Connect workflows." },
    ],
  },

  proof: {
    label: "Working Systems",
    headline: "Real systems, live now.",
    sub: "Software in production, handling real conversations every day.",
    ctaLabel: "See if the same pattern fits your business",
  },

  voice: {
    eyebrow: "Coming soon",
    headline: "Don't take our word for it. Talk to one.",
    sub: "A live voice agent visitors can call, right from this page.",
    cta: "Call our AI agent",
  },

  humanAi: {
    label: "Human + AI",
    headline: "AI should remove work, not humanity.",
    body: "We automate the repetitive part. People stay where judgment, trust, creativity and relationships matter — AI takes the busywork off their plate, not their job.",
  },

  start: {
    label: "How We Start",
    headline: "Don't know what to automate? Good.",
    body: "We spend about 90 minutes understanding how your business actually works. Then we tell you what's wasting time, what's leaking revenue, and what's actually worth fixing first.",
    steps: ["Understand", "Find", "Rank", "Build"],
    trustLine: "If there's nothing worth building, we'll tell you. The map is yours either way.",
    cta: "Get your free AI Map",
  },

  finalCta: {
    headline: "Bring me one annoying process.",
    sub: "Tell me what's eating your week. We'll look at it together — no pitch, no obligation.",
    primaryCta: "Get your free AI Map",
    whatsapp: "Message on WhatsApp first",
  },

  footer: {
    tagline: "We find the expensive manual work inside a business and build the AI system that removes it.",
    navHome: "Home",
    navAiMap: "Free AI Map",
    navBlog: "Blog",
    waLabel: "WhatsApp",
  },
};

const es: V2Copy = {
  hero: {
    eyebrow: "Ventas. Atención. Operaciones.",
    headline: "Encuentra el trabajo que tu negocio no debería hacer a mano.",
    sub: "Encontramos las fugas caras en ventas y operaciones, y construimos sistemas de IA que las eliminan — sin sustituir a las personas que de verdad importan.",
    primaryCta: "Consigue tu AI Map gratis",
    primaryMicrocopy: "90 minutos · gratis, sin fecha límite",
    secondaryCta: "Mira lo que hemos construido",
  },

  problem: {
    label: "El Problema",
    headline: "El trabajo caro suele estar a la vista de todos.",
    items: [
      "Llega un lead un viernes por la noche. Nadie responde hasta el lunes — si es que responde.",
      "Suena el teléfono mientras atiendes a un cliente. Va al buzón de voz. Y la venta, con él.",
      "Un presupuesto sale por la puerta y desaparece en una hoja de cálculo que nadie vuelve a abrir.",
      "Las mismas tres preguntas, respondidas a mano, cincuenta veces a la semana.",
    ],
  },

  fix: {
    label: "Lo Que Arreglamos",
    headline: "Vendemos resultados, no categorías de tecnología.",
    sub: "Todos los negocios con los que trabajamos entran en uno de estos tres grupos.",
    cards: [
      { title: "Vender", body: "Captura enquiries. Cualifica. Haz seguimiento. Presupuesta. Reserva. Reactiva." },
      { title: "Atender", body: "Responde llamadas y mensajes. Resuelve las preguntas habituales. Deriva las excepciones a personas." },
      { title: "Operar", body: "Elimina el admin repetitivo. Da a tu equipo acceso instantáneo al conocimiento del negocio. Conecta procesos." },
    ],
  },

  proof: {
    label: "Sistemas En Marcha",
    headline: "Sistemas reales, funcionando ahora.",
    sub: "Software en producción, gestionando conversaciones reales cada día.",
    ctaLabel: "Descubre si el mismo patrón encaja en tu negocio",
  },

  voice: {
    eyebrow: "Próximamente",
    headline: "No te fíes de nuestra palabra. Habla con uno.",
    sub: "Un agente de voz en directo con el que podrás hablar desde esta misma página.",
    cta: "Llama a nuestro agente de IA",
  },

  humanAi: {
    label: "Humanos + IA",
    headline: "La IA debería quitar trabajo, no humanidad.",
    body: "Automatizamos la parte repetitiva. Las personas se quedan donde importan el criterio, la confianza, la creatividad y las relaciones — la IA les quita de encima el trabajo pesado, no el puesto.",
  },

  start: {
    label: "Cómo Empezamos",
    headline: "¿No sabes qué automatizar? Mejor.",
    body: "Pasamos unos 90 minutos entendiendo cómo funciona realmente tu negocio. Luego te decimos qué está perdiendo tiempo, qué te está costando ingresos, y qué merece la pena arreglar primero.",
    steps: ["Entender", "Encontrar", "Priorizar", "Construir"],
    trustLine: "Si no hay nada que merezca la pena construir, te lo decimos. El mapa es tuyo de todas formas.",
    cta: "Consigue tu AI Map gratis",
  },

  finalCta: {
    headline: "Tráeme un proceso que te esté molestando.",
    sub: "Cuéntame qué te está comiendo la semana. Lo miramos juntos — sin venta, sin compromiso.",
    primaryCta: "Consigue tu AI Map gratis",
    whatsapp: "Escríbeme primero por WhatsApp",
  },

  footer: {
    tagline: "Encontramos el trabajo manual caro dentro de un negocio y construimos el sistema de IA que lo elimina.",
    navHome: "Inicio",
    navAiMap: "AI Map gratis",
    navBlog: "Blog",
    waLabel: "WhatsApp",
  },
};

export function getV2Copy(locale: NewLocale): V2Copy {
  return locale === "es" ? es : en;
}
