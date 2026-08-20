/**
 * /ai-map/new — free, permanent AI Map offer page. EN + ES.
 *
 * Corrects the mismatch flagged in docs/NEW-HOMEPAGE-V2-BRIEF.md: /ai-map
 * (app/ai-map/DirectPage.tsx) still carries the "Free until July 31 —
 * normally €1,470" complimentary-phase framing and the "10k Guarantee"
 * money-back device from app/ai-map/lib/config.ts + site.config.ts. Those
 * files are shared with the live "/" homepage and are NOT edited here.
 *
 * This page states plainly: the AI Map is free, permanently. No deadline,
 * no price anchor, no manufactured urgency. In place of the "10k guarantee"
 * (a device that only makes sense against a price), the honesty commitment
 * itself is the trust device: if there's nothing worth building, we say so.
 *
 * Real, non-fabricated content only. Phase 1 (the paid *implementation*
 * that follows the free Map, if the client wants to proceed) keeps its
 * real price (PHASE1_ANCHOR, €4,500 — imported read-only from
 * app/ai-map/lib/config.ts) since that's a genuine current rate, not a
 * time-limited offer on the Map itself.
 */

export interface NewOfferCopy {
  hero: {
    eyebrow: string;
    headlineStart: string;
    headlineAccent: string;
    sub: string;
    cta: string;
    trustLine: string;
  };
  problem: {
    label: string;
    headline: string;
    body: string;
  };
  process: {
    label: string;
    headline: string;
    steps: { num: string; title: string; body: string }[];
  };
  included: {
    label: string;
    headline: string;
    items: string[];
  };
  trust: {
    label: string;
    headline: string;
    body: string;
    highlight: string;
  };
  faq: {
    label: string;
    headline: string;
    items: { q: string; a: string }[];
  };
  finalCta: {
    headline: string;
    sub: string;
    cta: string;
    messengerLabel: string;
  };
}

export function getNewOfferCopy(locale: "en" | "es", phase1Anchor: string): NewOfferCopy {
  return locale === "es" ? es(phase1Anchor) : en(phase1Anchor);
}

function en(phase1Anchor: string): NewOfferCopy {
  return {
    hero: {
      eyebrow: "Free AI Map, no deadline",
      headlineStart: "See where AI actually pays off in your business, ",
      headlineAccent: "and where it doesn't.",
      sub: "90 minutes on a call. I map where you're losing time and money, and rank what's actually worth fixing first. Delivered as a one-page document within 48 hours.",
      cta: "Book your free AI Map",
      trustLine: "Free, permanently. Not a limited-time offer.",
    },

    problem: {
      label: "The Problem",
      headline: "Your operation is leaking money. You just can't see where.",
      body: "Slow response times lose leads before you even know they existed. Manual work that should be automated costs you hours every week. Decisions bottlenecked at you slow everything down. Separately, each one is annoying. Together, they compound into real money leaving your business every month. The problem isn't the leaks. It's that you don't have a map of them.",
    },

    process: {
      label: "Process",
      headline: "How it works",
      steps: [
        { num: "01", title: "Book", body: "Pick a 90-minute slot. Answer a few pre-call questions so I show up prepared, not generic." },
        { num: "02", title: "Map", body: "We go through your business across sales, service and operations. Every pain point gets scored for AI feasibility and estimated impact." },
        { num: "03", title: "Receive", body: "Your AI Map lands within 48 hours: a proper ranked document, not rough notes. Phase 1 quoted if it's worth building, an honest 'not yet' if it isn't." },
      ],
    },

    included: {
      label: "What You Get",
      headline: "What's in the 90 minutes",
      items: [
        "Your operation mapped across sales, service and operations",
        "4 to 6 use cases ranked by estimated impact",
        "Phase 1 quoted, or an honest 'not yet'",
      ],
    },

    trust: {
      label: "How We Work",
      headline: "If there's nothing worth building, we'll say so.",
      body: "We're not going to manufacture a project that isn't there. In 90 minutes I'll tell you plainly what's worth fixing. If the honest answer is 'not much yet', that's what you'll hear instead of a pitch. The 90 minutes and the map are yours either way.",
      highlight: "No pitch if there's nothing to pitch.",
    },

    faq: {
      label: "Questions",
      headline: "Before you book",
      items: [
        {
          q: "Free? What's the catch?",
          a: "No catch. It's free, permanently. Not a limited-time offer. You get the full 90 minutes and the same one-page, ranked map. If there's nothing worth automating, I'll tell you straight, and you keep the map anyway.",
        },
        {
          q: "What if I can't implement what's on the map?",
          a: `That's what Phase 1 is for: done-for-you implementation of the highest-impact use case from your map. Typically ${phase1Anchor}, 2 to 3 weeks. If you want to proceed, I'll quote it. If you don't, the map and the clarity are yours either way.`,
        },
        {
          q: "How is this different from a consultancy deck, a ChatGPT demo, or hiring a consultant?",
          a: "A consultancy takes 6 to 8 weeks and a large fee, and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. Hiring a consultant means a proposal, a retainer, and months of onboarding. This is 90 minutes and gives you a scored, ranked map of your own business, and you decide what to do with it.",
        },
        {
          q: "What if my business is too unique for AI?",
          a: "Most founders think this. After 90 minutes you'll know specifically which parts of your business AI can touch, and which it genuinely can't. Sometimes the answer is 'almost none of it yet', and that is a useful answer worth having.",
        },
        {
          q: "What does the map actually look like?",
          a: "A one-page scored document: your business broken into pain points, each scored for AI feasibility and estimated impact. You leave with 4 to 6 ranked use cases and a clear Phase 1 recommendation, or an honest 'not yet' if nothing clears the bar.",
        },
        {
          q: "Who is this for?",
          a: "For you if you're dealing with enough enquiries, calls, quotes or admin that real time and money disappear into repetitive work every week. Not for you if every decision needs six stakeholders, or you're shopping for a tool rather than a fix.",
        },
        {
          q: "What language can we run the session in?",
          a: "English or Spanish.",
        },
      ],
    },

    finalCta: {
      headline: "Get your map. Know your number.",
      sub: "Free. Permanently. 90 minutes. No pitch.",
      cta: "Book your free AI Map",
      messengerLabel: "Message on WhatsApp first",
    },
  };
}

function es(phase1Anchor: string): NewOfferCopy {
  return {
    hero: {
      eyebrow: "AI Map gratis, sin fecha límite",
      headlineStart: "Descubre dónde la IA realmente compensa en tu negocio, ",
      headlineAccent: "y dónde no.",
      sub: "90 minutos en una llamada. Localizo dónde estás perdiendo tiempo y dinero, y priorizo lo que de verdad merece la pena arreglar primero. Lo recibes como un documento de una página en menos de 48 horas.",
      cta: "Reserva tu AI Map gratis",
      trustLine: "Gratis, para siempre. No es una oferta con fecha de caducidad.",
    },

    problem: {
      label: "El Problema",
      headline: "Tu operación está perdiendo dinero. Solo que no ves por dónde.",
      body: "Las respuestas lentas pierden leads antes de que sepas que existieron. El trabajo manual que debería estar automatizado te cuesta horas cada semana. Las decisiones que dependen solo de ti ralentizan todo lo demás. Por separado, cada cosa es una molestia. Juntas, se convierten en dinero real que sale de tu negocio cada mes. El problema no son las fugas. Es que no tienes un mapa de ellas.",
    },

    process: {
      label: "Proceso",
      headline: "Cómo funciona",
      steps: [
        { num: "01", title: "Reserva", body: "Elige una franja de 90 minutos. Responde unas preguntas previas para que llegue preparado, no genérico." },
        { num: "02", title: "Mapeamos", body: "Revisamos tu negocio en ventas, atención y operaciones. Cada punto de dolor se puntúa por viabilidad de IA e impacto estimado." },
        { num: "03", title: "Lo recibes", body: "Tu AI Map llega en menos de 48 horas: un documento priorizado de verdad, no notas sueltas. Fase 1 presupuestada si merece la pena, o un honesto 'todavía no' si no." },
      ],
    },

    included: {
      label: "Qué Incluye",
      headline: "Qué obtienes en los 90 minutos",
      items: [
        "Tu operación mapeada en ventas, atención y operaciones",
        "4 a 6 casos de uso priorizados por impacto estimado",
        "Fase 1 presupuestada, o un honesto 'todavía no'",
      ],
    },

    trust: {
      label: "Cómo Trabajamos",
      headline: "Si no hay nada que merezca la pena construir, te lo decimos.",
      body: "No vamos a inventarnos un proyecto que no existe. En 90 minutos te diré claramente qué merece la pena arreglar. Y si la respuesta honesta es 'todavía casi nada', eso es lo que escucharás en vez de una venta. Los 90 minutos y el mapa son tuyos de todas formas.",
      highlight: "Sin venta si no hay nada que vender.",
    },

    faq: {
      label: "Preguntas",
      headline: "Antes de reservar",
      items: [
        {
          q: "¿Gratis? ¿Cuál es el truco?",
          a: "Ninguno. Es gratis, para siempre. No es una oferta con fecha límite. Recibes los mismos 90 minutos y el mismo mapa de una página priorizado. Si no hay nada que valga la pena automatizar, te lo digo claramente, y el mapa es tuyo igualmente.",
        },
        {
          q: "¿Y si no puedo implementar lo que sale en el mapa?",
          a: `Para eso está la Fase 1: implementación llave en mano del caso de mayor impacto de tu mapa. Normalmente ${phase1Anchor}, 2 a 3 semanas. Si quieres seguir adelante, te lo presupuesto. Si no, el mapa y la claridad son tuyos de todas formas.`,
        },
        {
          q: "¿En qué se diferencia de una consultora, una demo de ChatGPT o contratar a un consultor?",
          a: "Una consultora tarda 6 a 8 semanas, cuesta mucho y te da una presentación. Una demo de ChatGPT es gratis y te da entusiasmo vago. Contratar a un consultor implica propuesta, permanencia y meses de onboarding. Esto son 90 minutos y te da un mapa priorizado de tu propio negocio, y tú decides qué hacer con él.",
        },
        {
          q: "¿Y si mi negocio es demasiado particular para la IA?",
          a: "Casi todo el mundo piensa esto. Después de 90 minutos sabrás exactamente qué partes de tu negocio puede tocar la IA, y cuáles realmente no. A veces la respuesta es 'casi nada todavía', y esa es una respuesta útil que merece la pena tener.",
        },
        {
          q: "¿Cómo es el mapa exactamente?",
          a: "Un documento de una página, priorizado: tu negocio dividido en puntos de dolor, cada uno puntuado por viabilidad de IA e impacto estimado. Te vas con 4 a 6 casos de uso priorizados y una recomendación clara de Fase 1, o un honesto 'todavía no' si nada lo justifica.",
        },
        {
          q: "¿Para quién es esto?",
          a: "Para ti si tienes suficientes consultas, llamadas, presupuestos o admin como para que tiempo y dinero de verdad desaparezcan en trabajo repetitivo cada semana. No es para ti si cada decisión necesita seis personas, o si buscas una herramienta y no una solución.",
        },
        {
          q: "¿En qué idioma podemos hacer la sesión?",
          a: "Inglés o español.",
        },
      ],
    },

    finalCta: {
      headline: "Consigue tu mapa. Conoce tu número.",
      sub: "Gratis. Para siempre. 90 minutos. Sin venta.",
      cta: "Reserva tu AI Map gratis",
      messengerLabel: "Escríbeme primero por WhatsApp",
    },
  };
}
