/**
 * Direct sales page i18n — /ai-map
 * Locales: EN (default) · ES · УК
 *
 * PRICING STATE: complimentary — Free (was €1,470) until June 30, 2026 —
 * matches the homepage's offer. Phase 1 build pricing (PHASE1_ANCHOR) is
 * unaffected.
 */

import type { DirectLocale } from "./locale";
import type { IndustryTab } from "@/app/partners/[slug]/lib/i18n";
import { PHASE1_ANCHOR, PRICE_CURRENT, PRICE_CURRENT_ES, PRICE_CURRENT_UK, PRICE_ANCHOR, OFFER_DEADLINE } from "./config";
import { slotsOpen } from "@/app/new/lib/site.config";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DirectPageDict {
  header: { langEn: string; langEs: string; langUk: string };

  hero: {
    eyebrow: string;
    headlineStart: string;   // text before the accent span
    headlineAccent: string;  // text rendered in accent color
    subheadline: string;
    cta: string;
    /** shown in both paid and complimentary phases */
    daysLeft: (n: number) => string;
    offerCloses: string;
    /** complimentary chip copy */
    compChip: string;
    // PAID: priceChip: string;
  };

  problem: { label: string; headline: string; body: string };

  offer: {
    label: string;
    headline: string;
    subhead: string;
    body: string;
    valueLabel: string;
    del1: string;
    del2: string;
    del3: string;
    /** "Normally €1,500" anchor line */
    anchorLabel: string;
    anchorValue: string;
    /** complimentary framing */
    compPriceLabel: string;
    compPriceValue: string;
    compJustify: string;
    /** creditNote — only shown in paid phase */
    // PAID: creditNote: string;
  };

  guarantee: { label: string; headline: string; body: string; highlight: string };

  close: {
    label: string;
    headline: string;
    included1: string;
    included2: string;
    included3: string;
    /** complimentary framing line */
    compLine: string;
    guaranteeLine: string;
    deadlineChip: string;
    // PAID: creditLine: string;
  };

  process: {
    label: string;
    headline: string;
    steps: { num: string; title: string; body: string; trust?: string }[];
  };

  proof: {
    label: string;
    headline: string;
    liveBadge: string;
    sub: string;
    slotLabel: string;
    cases: { name: string; desc: string; tag: string; href: string }[];
  };

  faq: {
    label: string;
    headline: string;
    items: { q: string; a: (vars: { phase1Anchor: string }) => string }[];
  };

  finalCta: {
    headline: string;
    sub: string;
    cta: string;
    messengerLabel: string;
    guarantee: string;
    /** Single sitewide source for the "X of 5 still open" capacity line. */
    capacityLine: string;
  };

  footer: { credit: string; location: string };

  industry: {
    label: string;
    headline: string;
    sub: string;
    swipeHint: string;
    colUseCase: string;
    colPain: string;
    colResult: string;
    sources: string;
    tabs: {
      manufacturing: IndustryTab;
      professionalServices: IndustryTab;
      ecommerce: IndustryTab;
      investorOperators: IndustryTab;
    };
  };
}

// ─── EN ───────────────────────────────────────────────────────────────────────

const en: DirectPageDict = {
  header: { langEn: "EN", langEs: "ES", langUk: "UK" },

  hero: {
    eyebrow: "Strategic AI Map",
    headlineStart: "See where AI actually pays off in your business — ",
    headlineAccent: "and where it doesn't.",
    subheadline:
      "A 90-minute working session that maps every AI opportunity in your business, ranked by ROI. Delivered as a one-page document within 48 hours.",
    cta: "Book your Strategic AI Map",
    daysLeft: (n) => `${n} ${n === 1 ? "day" : "days"} left`,
    offerCloses: `free access ends ${OFFER_DEADLINE}`,
    compChip: `${PRICE_CURRENT} — was ${PRICE_ANCHOR}`,
  },

  problem: {
    label: "The Problem",
    headline: "Your operation is leaking money. You just can't see where.",
    body:
      "Slow response times lose leads before you even know they existed. Manual work that should be automated costs you hours every week. Decisions bottlenecked at you slow everything down. Separately, each one is annoying. Together, they compound into thousands of euros a month leaving your business. The problem isn't the leaks — it's that you don't have a map of them.",
  },

  offer: {
    label: "The Solution",
    headline: "The Strategic AI Map",
    subhead:
      "A 90-minute working session + a one-page ROI-ranked document, delivered within 48 hours.",
    body:
      "We go through your business across three pillars — customer communication, internal operations, and repeatable execution. Every pain point gets scored for AI feasibility and estimated ROI. You leave with a clear, ranked, actionable map of what to fix and what to automate first. No pitch. No proposal you didn't ask for.",
    valueLabel: "What you get",
    del1: "Your operation mapped across 3 pillars",
    del2: "4–6 use cases ranked by estimated ROI",
    del3: "Phase 1 quoted — or an honest 'not yet'",
    anchorLabel: "Normally",
    anchorValue: PRICE_ANCHOR,
    compPriceLabel: `Free until ${OFFER_DEADLINE}`,
    compPriceValue: PRICE_CURRENT,
    compJustify:
      "This isn't a discovery call with a pitch at the end. It's a real working session with a real deliverable — a one-page, ROI-ranked map of your entire operation. If nothing's worth automating, I'll tell you straight. The map is yours either way.",
  },

  guarantee: {
    label: "Guarantee",
    headline: "The 10k Guarantee",
    body:
      "In 90 minutes I'll identify at least €10,000/year in recoverable cost or wasted time — quantified and ROI-ranked on your map. If I can't, I'll tell you straight: there's nothing worth automating yet. Your 90 minutes, and the map, are yours either way.",
    highlight: "At least €10k found — before we build a single thing.",
  },

  close: {
    label: "The Offer",
    headline: "Everything you need to know what to build — and whether to build it.",
    included1: "90-minute Strategic AI Map session",
    included2: "One-page ROI-ranked map, delivered within 48 hours",
    included3: "Phase 1 quoted — or an honest 'not yet'",
    compLine: `${PRICE_CURRENT} until ${OFFER_DEADLINE} — normally ${PRICE_ANCHOR}. No pitch, no obligation.`,
    guaranteeLine: "10k guarantee: find €10k+/yr in your business — or you owe nothing.",
    deadlineChip: `Free until ${OFFER_DEADLINE}`,
  },

  process: {
    label: "Process",
    headline: "How it works",
    steps: [
      {
        num: "01",
        title: "Book",
        body: "Pick a 90-minute slot. Answer 4 pre-call questions so I show up prepared, not generic.",
      },
      {
        num: "02",
        title: "Map",
        body: "We go through your business across 3 pillars. Every pain point gets scored for AI feasibility and estimated ROI.",
        // NOTE: "shared screen" line removed per spec (Phase 1 removal)
      },
      {
        num: "03",
        title: "Receive",
        body: "Your Strategic AI Map lands within 48 hours — a proper document, not rough notes. Phase 1 quoted if it's worth building.",
        trust: "We do the final analysis after the call. You get a document, not rough notes.",
      },
    ],
  },

  proof: {
    label: "Proof",
    headline: "Live builds",
    liveBadge: "LIVE",
    sub: "Software in production, handling real conversations every day.",
    slotLabel: "More case studies from first sessions — coming soon.",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "AI lead-response agent. Replies in 9 seconds across WhatsApp and the website.",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "AI agent handles booking requests and answers guest questions — 24/7 via WhatsApp and the website.",
        tag: "Hotel · Booking & Support",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Voice agent answers site visitor questions in real time — no forms, no waiting.",
        tag: "Demo · Voice Agent",
        href: "https://chasehughes.com/",
      },
    ],
  },

  faq: {
    label: "Questions",
    headline: "Before you book",
    items: [
      {
        q: "Free? What's the catch?",
        a: () =>
          `No catch. Until ${OFFER_DEADLINE} I'm running these sessions free — normally ${PRICE_ANCHOR} — while I build out case studies across new industries. You still get the full 90 minutes and the same one-page, ROI-ranked map. The only thing on the line is mine: if I don't find at least €10,000/year in recoverable cost, you've lost nothing and you keep the map anyway.`,
      },
      {
        q: "What if I can't implement what's on the map?",
        a: () =>
          `That's exactly what Phase 1 is — done-for-you implementation of the highest-ROI use case from your map. Typically ${PHASE1_ANCHOR}, 2–3 weeks. If you want to proceed, I'll quote it. If you don't, the map and the clarity are yours either way.`,
      },
      {
        q: "How is this different from a consultancy deck, a ChatGPT demo, or hiring a consultant?",
        a: () =>
          "A consultancy takes 6–8 weeks and €8–30k and gives you a presentation. A ChatGPT demo is free and gives you vague excitement. Hiring a consultant means a proposal, a retainer, and months of onboarding. This is 90 minutes and gives you a scored, ROI-ranked map of your own business — and you decide what to do with it.",
      },
      {
        q: "What if my business is too unique for AI?",
        a: () =>
          "Every founder thinks this. After 90 minutes you'll know specifically which parts of your business AI can touch — and which it genuinely can't. Sometimes the answer is 'almost none of it yet' — and that's a useful answer worth having.",
      },
      {
        q: "What does the map actually look like?",
        a: () =>
          "It's a one-page scored document: three pillars of your business, each broken into pain points, each scored for AI feasibility and estimated ROI. You leave with 4–6 ranked use cases and a clear Phase 1 recommendation — or an honest 'not yet' if nothing clears the bar. See the sample above.",
      },
      {
        q: "What does Phase 1 typically look like?",
        a: () =>
          `A working prototype of the highest-ROI use case from your map. Typically ${PHASE1_ANCHOR}, 2–3 weeks. Real software you can use on Monday — not a strategy document.`,
      },
      {
        q: "Who is this for?",
        a: () =>
          "For you if: you're running a €3–10M/year, owner-led business, you can decide and act inside 30 days, and you want numbers, not hype. Not for you if: every decision needs six stakeholders, or you're looking for someone to sell you an AI tool.",
      },
      {
        q: "In what language can we run the session?",
        a: () => "English or Spanish.",
      },
    ],
  },

  finalCta: {
    headline: "Get your map. Know your number.",
    sub: `${PRICE_CURRENT} until ${OFFER_DEADLINE} — normally ${PRICE_ANCHOR}. 90 minutes. No pitch.`,
    cta: "Book your Strategic AI Map",
    messengerLabel: "Message on WhatsApp first",
    guarantee: "10k guarantee: find €10k+/yr — or owe nothing.",
    capacityLine: `I build every project myself — only 5 slots per month. ${slotsOpen} of 5 still open.`,
  },

  footer: { credit: "care less AI automation", location: "Santander, Spain" },

  industry: {
    label: "Industry",
    headline: "What this looks like in your business",
    sub: "These are the exact patterns we map in the first 30 minutes.",
    swipeHint: "← swipe →",
    colUseCase: "Use case",
    colPain: "Pain it fixes",
    colResult: "Typical result",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · industry benchmarks · client-reported baselines. Figures are directional averages, not guarantees.",
    tabs: {
      manufacturing: {
        label: "Manufacturing",
        rows: [
          ["Quote/invoice acceleration", "\"Quotes take days; we lose jobs to whoever replies first.\"", "Prep: ~15 min → ~<strong>1 min</strong>; ~<strong>3×</strong> throughput, same team"],
          ["Production scheduling", "\"Scheduling lives in one head and breaks when they're out.\"", "Planning: <strong>~20 hrs/wk → ~5</strong>; on-time delivery <strong>82% → 95%</strong>"],
          ["After-sale routing", "\"Requests sit in an inbox; the wrong tech gets dispatched.\"", "<strong>60–70%</strong> tier-1 deflection; ~<strong>50%</strong> faster resolution"],
        ],
      },
      professionalServices: {
        label: "Professional Services",
        rows: [
          ["Client intake & conflict check", "\"Onboarding eats half a day of partner time.\"", "Intake → engagement letter in minutes; up to ~<strong>30 hrs/wk</strong> saved"],
          ["Document & proposal drafting", "\"Partners draft everything from scratch.\"", "~<strong>25%</strong> faster task completion"],
          ["Billable-time capture", "\"We under-bill because nobody logs time accurately.\"", "<strong>5–8%</strong> billable-hour recovery"],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          ["Tier-1 support automation", "\"Support drowns in 'where's my order' tickets.\"", "<strong>60–70%</strong> of tier-1 tickets auto-resolved"],
          ["Personalisation & recommendations", "\"Generic storefront leaves revenue on the table.\"", "Engaged-chat shoppers convert ~<strong>2–4×</strong> more"],
          ["SKU launch copy", "\"Listing copy bottlenecks every launch.\"", "Launch copy in <strong>N languages</strong> in hours, not weeks"],
        ],
      },
      investorOperators: {
        label: "Investor-Operators",
        rows: [
          ["Deal sourcing / underwriting", "\"Good deals get missed in the pile.\"", "~<strong>3–4×</strong> more deals screened, same team"],
          ["Portfolio digest", "\"Can't see across companies without chasing each one.\"", "Weekly digest; ~<strong>6–10 hrs/wk</strong> recovered"],
          ["Asset / property ops", "\"Manual ops drag NOI.\"", "Up to ~<strong>10%</strong> NOI improvement (directional)"],
        ],
      },
    },
  },
};

// ─── ES ───────────────────────────────────────────────────────────────────────

const es: DirectPageDict = {
  header: { langEn: "EN", langEs: "ES", langUk: "UK" },

  hero: {
    eyebrow: "Mapa Estratégico de IA",
    headlineStart: "Descubre dónde la IA realmente vale la pena en tu negocio — ",
    headlineAccent: "y dónde no.",
    subheadline:
      "Una sesión de trabajo de 90 minutos que mapea cada oportunidad de IA en tu negocio, priorizada por ROI. Entregada como un documento de una página en 48 horas.",
    cta: "Reserva tu Mapa Estratégico de IA",
    daysLeft: (n) => `${n} ${n === 1 ? "día" : "días"} restantes`,
    offerCloses: "acceso gratis hasta el 30 de junio",
    compChip: `${PRICE_CURRENT_ES} — antes ${PRICE_ANCHOR}`,
  },

  problem: {
    label: "El Problema",
    headline: "Tu operación está perdiendo dinero. Solo que no ves dónde.",
    body:
      "Las respuestas lentas pierden leads antes de que sepas que existían. El trabajo manual que debería estar automatizado te cuesta horas cada semana. Las decisiones que se bloquean en ti frenan todo. Por separado, cada una es molesta. Juntas, se acumulan en miles de euros al mes saliendo de tu negocio. El problema no son las fugas — es que no tienes un mapa de ellas.",
  },

  offer: {
    label: "La Solución",
    headline: "El Mapa Estratégico de IA",
    subhead:
      "Una sesión de trabajo de 90 minutos + un documento de una página priorizado por ROI, entregado en 48 horas.",
    body:
      "Revisamos tu negocio en tres pilares: comunicación con clientes, operaciones internas y ejecución repetible. Cada punto de dolor recibe una puntuación de viabilidad de IA y ROI estimado. Sales con un mapa claro, clasificado y accionable. Sin ventas. Sin propuesta que no pediste.",
    valueLabel: "Qué obtienes",
    del1: "Tu operación mapeada en 3 pilares",
    del2: "4–6 casos de uso clasificados por ROI estimado",
    del3: "Fase 1 cotizada — o un honesto 'todavía no'",
    anchorLabel: "Normalmente",
    anchorValue: PRICE_ANCHOR,
    compPriceLabel: "Gratis hasta el 30 de junio",
    compPriceValue: PRICE_CURRENT_ES,
    compJustify:
      "Esto no es una llamada de descubrimiento con una venta al final. Es una sesión de trabajo real con un entregable real: un mapa de una página, priorizado por ROI, de toda tu operación. Si no hay nada que valga la pena automatizar, te lo diré claramente. El mapa es tuyo en cualquier caso.",
  },

  guarantee: {
    label: "Garantía",
    headline: "La Garantía 10k",
    body:
      "En 90 minutos identificaré al menos €10,000/año en costes recuperables o tiempo perdido — cuantificado y priorizado por ROI en tu mapa. Si no puedo, te lo diré claramente: aún no hay nada que valga la pena automatizar. Tus 90 minutos, y el mapa, son tuyos en cualquier caso.",
    highlight: "Al menos €10k encontrados — antes de construir nada.",
  },

  close: {
    label: "La Oferta",
    headline: "Todo lo que necesitas para saber qué construir — y si construirlo.",
    included1: "Sesión del Mapa Estratégico de IA de 90 minutos",
    included2: "Mapa de una página priorizado por ROI, entregado en 48 horas",
    included3: "Fase 1 cotizada — o un honesto 'todavía no'",
    compLine: `${PRICE_CURRENT_ES} hasta el 30 de junio — normalmente ${PRICE_ANCHOR}. Sin venta, sin obligación.`,
    guaranteeLine: "Garantía 10k: encontramos €10k+/año en tu negocio — o no debes nada.",
    deadlineChip: "Gratis hasta el 30 de junio",
  },

  process: {
    label: "Proceso",
    headline: "Cómo funciona",
    steps: [
      {
        num: "01",
        title: "Reserva",
        body: "Elige un horario de 90 minutos. Responde 4 preguntas previas para que llegue preparado, no genérico.",
      },
      {
        num: "02",
        title: "Mapeamos",
        body: "Revisamos tu negocio en 3 pilares. Cada punto de dolor recibe una puntuación de viabilidad de IA y ROI estimado.",
      },
      {
        num: "03",
        title: "Recibes",
        body: "Tu Mapa Estratégico de IA llega en 48 horas — un documento real, no notas en borrador. Fase 1 cotizada si vale la pena construirla.",
        trust: "Hacemos el análisis final después de la llamada. Recibes un documento, no notas en borrador.",
      },
    ],
  },

  proof: {
    label: "Pruebas",
    headline: "Sistemas en producción",
    liveBadge: "EN VIVO",
    sub: "Software en producción, gestionando conversaciones reales cada día.",
    slotLabel: "Más casos de estudio de las primeras sesiones — próximamente.",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "Agente de respuesta a leads con IA. Responde en 9 segundos vía WhatsApp y web.",
        tag: "MedSpa UK · Respuesta de leads",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "Agente de IA gestiona reservas y responde preguntas de huéspedes — 24/7 vía WhatsApp y web.",
        tag: "Hotel · Reservas y soporte",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Agente de voz responde preguntas de visitantes en tiempo real — sin formularios, sin esperas.",
        tag: "Demo · Agente de voz",
        href: "https://chasehughes.com/",
      },
    ],
  },

  faq: {
    label: "Preguntas",
    headline: "Antes de reservar",
    items: [
      {
        q: "¿Gratis? ¿Cuál es la trampa?",
        a: () =>
          `Ninguna. Hasta el 30 de junio ofrezco estas sesiones gratis — normalmente ${PRICE_ANCHOR} — mientras desarrollo casos de estudio en nuevos sectores. Recibes los mismos 90 minutos y el mismo mapa de una página priorizado por ROI. El único riesgo es mío: si no encuentro al menos €10,000/año en costes recuperables, no pierdes nada y el mapa es tuyo igualmente.`,
      },
      {
        q: "¿Qué pasa si no puedo implementar lo del mapa?",
        a: () =>
          `Para eso existe la Fase 1: implementación hecha-por-ti del caso de uso con mayor ROI de tu mapa. Típicamente ${PHASE1_ANCHOR}, 2–3 semanas. Si quieres proceder, te haré un presupuesto. Si no, el mapa y la claridad son tuyos de todas formas.`,
      },
      {
        q: "¿En qué se diferencia de una consultoría, un demo de ChatGPT o contratar un consultor?",
        a: () =>
          "Una consultoría tarda 6–8 semanas, cuesta €8–30k y te da una presentación. Un demo de ChatGPT es gratis y te da vaga emoción. Contratar un consultor implica propuesta, anticipo y meses de onboarding. Esto son 90 minutos y te da un mapa puntuado y clasificado por ROI de tu propio negocio.",
      },
      {
        q: "¿Y si mi negocio es demasiado único para la IA?",
        a: () =>
          "Todos los fundadores piensan esto. Tras 90 minutos sabrás exactamente qué partes de tu negocio puede tocar la IA — y cuáles genuinamente no. A veces la respuesta es 'casi ninguna todavía' — y eso también es una respuesta valiosa.",
      },
      {
        q: "¿Cómo es el mapa en realidad?",
        a: () =>
          "Es un documento puntuado de una página: tres pilares de tu negocio, cada uno desglosado en puntos de dolor, cada uno puntuado por viabilidad de IA y ROI estimado. Sales con 4–6 casos de uso clasificados. Mira el ejemplo arriba.",
      },
      {
        q: "¿Cómo suele ser la Fase 1?",
        a: () =>
          `Un prototipo funcional del caso de uso con mayor ROI de tu mapa. Típicamente ${PHASE1_ANCHOR}, 2–3 semanas. Software real que puedes usar el lunes — no un documento estratégico.`,
      },
      {
        q: "¿Para quién es esto?",
        a: () =>
          "Para ti si: tienes un negocio de €3–10M/año, con un fundador al mando, puedes decidir y actuar en 30 días, y quieres cifras, no hype. No para ti si: cada decisión necesita seis partes interesadas.",
      },
      {
        q: "¿En qué idioma podemos hacer la sesión?",
        a: () => "Inglés o español.",
      },
    ],
  },

  finalCta: {
    headline: "Obtén tu mapa. Conoce tu número.",
    sub: `${PRICE_CURRENT_ES} hasta el 30 de junio — normalmente ${PRICE_ANCHOR}. 90 minutos. Sin venta.`,
    cta: "Reserva tu Mapa Estratégico de IA",
    messengerLabel: "Escribe primero por WhatsApp",
    guarantee: "Garantía 10k: €10k+/año — o no debes nada.",
    capacityLine: `Construyo cada proyecto yo mismo — solo 5 plazas al mes. Quedan ${slotsOpen} de 5.`,
  },

  footer: { credit: "care less AI automation", location: "Santander, España" },

  industry: {
    label: "Sector",
    headline: "Cómo se ve esto en tu negocio",
    sub: "Estos son los patrones exactos que mapeamos en los primeros 30 minutos.",
    swipeHint: "← desliza →",
    colUseCase: "Caso de uso",
    colPain: "Problema que resuelve",
    colResult: "Resultado típico",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · benchmarks del sector · datos reportados por clientes. Las cifras son promedios orientativos, no garantías.",
    tabs: {
      manufacturing: {
        label: "Fabricación",
        rows: [
          ["Aceleración de presupuestos/facturas", "\"Los presupuestos tardan días; perdemos trabajos ante quien responde primero.\"", "Prep: ~15 min → ~<strong>1 min</strong>; ~<strong>3×</strong> rendimiento, mismo equipo"],
          ["Planificación de producción", "\"La planificación vive en la cabeza de una persona y falla cuando no está.\"", "Planificación: <strong>~20 h/sem → ~5</strong>; entregas a tiempo <strong>82% → 95%</strong>"],
          ["Enrutamiento de posventa", "\"Las solicitudes se quedan en una bandeja; se envía al técnico equivocado.\"", "<strong>60–70%</strong> de deflexión tier-1; resolución ~<strong>50%</strong> más rápida"],
        ],
      },
      professionalServices: {
        label: "Servicios Profesionales",
        rows: [
          ["Acogida de clientes y verificación de conflictos", "\"El onboarding consume medio día del socio.\"", "Solicitud → carta de compromiso en minutos; hasta ~<strong>30 h/sem</strong> ahorradas"],
          ["Redacción de documentos y propuestas", "\"Los socios redactan todo desde cero.\"", "~<strong>25%</strong> más rápido en completar tareas"],
          ["Registro de horas facturables", "\"Facturamos de menos porque nadie registra el tiempo con precisión.\"", "Recuperación de <strong>5–8%</strong> de horas facturables"],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          ["Automatización de soporte tier-1", "\"El soporte se ahoga en tickets de '¿dónde está mi pedido?'.\"", "<strong>60–70%</strong> de tickets tier-1 resueltos automáticamente"],
          ["Personalización y recomendaciones", "\"Una tienda genérica deja ingresos sobre la mesa.\"", "Compradores que interactúan con el chat convierten ~<strong>2–4×</strong> más"],
          ["Textos de lanzamiento de SKU", "\"Los textos de producto cuellan cada lanzamiento.\"", "Textos en <strong>N idiomas</strong> en horas, no semanas"],
        ],
      },
      investorOperators: {
        label: "Inversores-Operadores",
        rows: [
          ["Búsqueda y análisis de operaciones", "\"Las buenas operaciones se pierden entre montones de datos.\"", "~<strong>3–4×</strong> más operaciones analizadas, mismo equipo"],
          ["Resumen de cartera", "\"No puedo ver el panorama de todas mis empresas sin perseguir a cada una.\"", "Resumen semanal de cartera; ~<strong>6–10 h/sem</strong> recuperadas"],
          ["Operaciones de activos / inmuebles", "\"Los procesos manuales arrastran el NOI.\"", "Hasta ~<strong>10%</strong> de mejora en NOI (orientativo)"],
        ],
      },
    },
  },
};

// ─── UK ───────────────────────────────────────────────────────────────────────

const uk: DirectPageDict = {
  header: { langEn: "EN", langEs: "ES", langUk: "УК" },

  hero: {
    eyebrow: "Стратегічна карта ШІ",
    headlineStart: "Побачте, де ШІ справді окупається у вашому бізнесі — ",
    headlineAccent: "а де ні.",
    subheadline:
      "90-хвилинна робоча сесія, яка відображає кожну можливість для ШІ у вашому бізнесі з пріоритетами за ROI. Результат — односторінковий документ протягом 48 годин.",
    cta: "Забронювати Стратегічну карту ШІ",
    daysLeft: (n) => {
      const l = n % 10, ll = n % 100;
      const form = (ll >= 11 && ll <= 14) ? "днів" : l === 1 ? "день" : (l >= 2 && l <= 4) ? "дні" : "днів";
      return `${n} ${form} залишилось`;
    },
    offerCloses: "безкоштовний доступ діє до 30 червня",
    compChip: `${PRICE_CURRENT_UK} — було ${PRICE_ANCHOR}`,
  },

  problem: {
    label: "Проблема",
    headline: "Ваш бізнес втрачає гроші. Просто не видно де.",
    body:
      "Повільні відповіді = втрачені ліди, ще до того як ви дізналися про них. Ручні процеси = зайві години щотижня. Рішення, що зависають на вас = вузькі місця скрізь. Разом — тисячі євро на місяць, що виходять з бізнесу. Проблема не в самих витоках — у тому, що у вас немає карти.",
  },

  offer: {
    label: "Рішення",
    headline: "Стратегічна карта ШІ",
    subhead:
      "90-хвилинна робоча сесія + односторінковий документ з пріоритетами за ROI протягом 48 годин.",
    body:
      "Ми розбираємо ваш бізнес за трьома напрямами — комунікація з клієнтами, внутрішні операції, повторювані процеси. Кожне вузьке місце оцінюється за здійсненністю ШІ та ROI. Ви отримуєте чітку, пріоритизовану, готову до дій карту. Без прихованих продажів.",
    valueLabel: "Що ви отримуєте",
    del1: "Бізнес відображено за 3 ключовими напрямами",
    del2: "4–6 сценаріїв, пріоритизованих за ROI",
    del3: "Оцінка першого етапу — або чесне «ще не час»",
    anchorLabel: "Зазвичай",
    anchorValue: PRICE_ANCHOR,
    compPriceLabel: "Безкоштовно до 30 червня",
    compPriceValue: PRICE_CURRENT_UK,
    compJustify:
      "Це не ознайомчий дзвінок із продажем наприкінці. Це реальна робоча сесія з реальним результатом — односторінкова карта вашого бізнесу з пріоритетами за ROI. Якщо нічого не варто автоматизувати — я скажу прямо. Карта залишається у вас у будь-якому разі.",
  },

  guarantee: {
    label: "Гарантія",
    headline: "Гарантія 10k",
    body:
      "За 90 хвилин я знайду щонайменше €10,000/рік відновлюваних витрат або змарнованого часу — з оцінкою та пріоритетами за ROI на вашій карті. Якщо не зможу — скажу прямо: поки що немає чого автоматизувати. Ваші 90 хвилин і карта залишаються у вас у будь-якому разі.",
    highlight: "Щонайменше €10k знайдено — ще до того, як ми збудуємо хоч щось.",
  },

  close: {
    label: "Пропозиція",
    headline: "Все, що потрібно — щоб знати, що будувати і чи варто.",
    included1: "90-хвилинна сесія Стратегічної карти ШІ",
    included2: "Односторінковий ROI-пріоритизований документ протягом 48 годин",
    included3: "Оцінка першого етапу — або чесне «ще не час»",
    compLine: `${PRICE_CURRENT_UK} до 30 червня — зазвичай ${PRICE_ANCHOR}. Без продажу, без зобов'язань.`,
    guaranteeLine: "Гарантія 10k: знайдемо €10k+/рік у вашому бізнесі — або ви нічого не платите.",
    deadlineChip: "Безкоштовно до 30 червня",
  },

  process: {
    label: "Процес",
    headline: "Як це працює",
    steps: [
      {
        num: "01",
        title: "Забронюйте",
        body: "Оберіть 90-хвилинний слот. Дайте відповідь на 4 запитання перед дзвінком — щоб я прийшов підготовленим.",
      },
      {
        num: "02",
        title: "Створюємо карту",
        body: "Ми розбираємо ваш бізнес за 3 ключовими напрямами. Кожне вузьке місце отримує оцінку за здійсненністю ШІ та очікуваним ROI.",
      },
      {
        num: "03",
        title: "Отримайте результат",
        body: "Стратегічна карта ШІ буде у вас протягом 48 годин — повноцінний документ. Якщо є що будувати — ви також отримаєте оцінку вартості першого етапу.",
        trust: "Фінальний аналіз ми робимо після дзвінка. Ви отримуєте документ, а не сирі нотатки.",
      },
    ],
  },

  proof: {
    label: "Докази",
    headline: "Реальні запущені рішення",
    liveBadge: "LIVE",
    sub: "Програмне забезпечення в продакшені, реальні розмови щодня.",
    slotLabel: "Кейси з перших сесій — скоро.",
    cases: [
      {
        name: "Amira for HC MedSpa",
        desc: "ШІ-агент для обробки лідів. Відповідає за 9 секунд у WhatsApp та на сайті.",
        tag: "UK MedSpa · Відповіді на ліди",
        href: "/automations/hcmedspa",
      },
      {
        name: "Elena Hotel & SPA",
        desc: "ШІ-агент обробляє запити на бронювання і відповідає на питання гостей — цілодобово у WhatsApp та на сайті.",
        tag: "Готель · Бронювання та підтримка",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        name: "Voice AI on Site",
        desc: "Голосовий агент відповідає на запитання відвідувачів сайту в реальному часі — без форм, без очікування.",
        tag: "Демонстрація · Голосовий агент",
        href: "https://chasehughes.com/",
      },
    ],
  },

  faq: {
    label: "Питання",
    headline: "Перед бронюванням",
    items: [
      {
        q: "Безкоштовно? А де підступ?",
        a: () =>
          `Підступу немає. До 30 червня я проводжу ці сесії безкоштовно — зазвичай ${PRICE_ANCHOR} — поки напрацьовую кейси в нових галузях. Ви отримуєте ті самі 90 хвилин і ту саму односторінкову карту з пріоритетами за ROI. Ризикую лише я: якщо не знайду щонайменше €10,000/рік відновлюваних витрат, ви нічого не втрачаєте, а карта залишається у вас.`,
      },
      {
        q: "А якщо я не зможу впровадити те, що є на карті?",
        a: () =>
          `Саме для цього і є перший етап — готова реалізація найпріоритетнішого сценарію. Зазвичай ${PHASE1_ANCHOR}, 2–3 тижні. Якщо захочете рухатися — я дам оцінку. Якщо ні — карта і ясність залишаються у вас.`,
      },
      {
        q: "Чим це відрізняється від консалтингу, демо ChatGPT або найму консультанта?",
        a: () =>
          "Консалтинг — 6–8 тижнів, €8–30k і слайди. Демо ChatGPT — безкоштовно, але без конкретики. Найм консультанта — пропозиція, передоплата, місяці онбордингу. Тут: 90 хвилин — і ви виходите з оцінкою власного бізнесу за ROI.",
      },
      {
        q: "А що, якщо мій бізнес занадто специфічний для ШІ?",
        a: () =>
          "Так думає кожен. Після 90 хвилин ви точно будете знати, яких частин вашого бізнесу ШІ може торкнутися — а яких ні. Іноді відповідь: «поки що майже нічого» — і це теж корисна відповідь.",
      },
      {
        q: "Як виглядає ця карта насправді?",
        a: () =>
          "Односторінковий документ з оцінками: три напрями бізнесу, кожен розбитий на больові точки, кожна — оцінена за здійсненністю ШІ та ROI. Ви виходите з 4–6 пріоритизованими сценаріями. Дивіться зразок вище.",
      },
      {
        q: "Як зазвичай виглядає перший етап?",
        a: () =>
          `Працюючий прототип сценарію з найвищим ROI з вашої карти. Зазвичай ${PHASE1_ANCHOR}, 2–3 тижні, команда перевірених українських девелоперів. Реальне програмне забезпечення на понеділок — не стратегічний документ.`,
      },
      {
        q: "Кому це підходить?",
        a: () =>
          "Підходить, якщо: бізнес від €30k–€200k+ на місяць, можете прийняти рішення протягом 30 днів, хочете конкретних цифр, а не хайпу.",
      },
      {
        q: "Якою мовою можна провести сесію?",
        a: () => "Українською, російською, англійською — або іспанською, якщо є настрій.",
      },
    ],
  },

  finalCta: {
    headline: "Отримайте карту. Дізнайтеся свої цифри.",
    sub: `${PRICE_CURRENT_UK} до 30 червня — зазвичай ${PRICE_ANCHOR}. 90 хвилин. Без продажу.`,
    cta: "Забронювати Стратегічну карту ШІ",
    messengerLabel: "Спочатку написати в WhatsApp",
    guarantee: "Гарантія 10k: €10k+/рік — або ви нічого не платите.",
    capacityLine: `Я будую кожен проєкт особисто — лише 5 місць на місяць. Залишилось ${slotsOpen} з 5.`,
  },

  footer: { credit: "care less AI automation", location: "Сантандер, Іспанія" },

  industry: {
    label: "Галузь",
    headline: "Як це може виглядати у вашому бізнесі",
    sub: "Саме такі патерни ми розбираємо протягом перших 30 хвилин.",
    swipeHint: "← свайп →",
    colUseCase: "Сценарій використання",
    colPain: "Яку проблему вирішує",
    colResult: "Типовий результат",
    sources:
      "McKinsey The State of AI 2024–2025 · Deloitte smart-manufacturing 2025 · галузеві бенчмарки · базові показники зі слів клієнтів. Цифри є орієнтовними середніми показниками, а не гарантіями.",
    tabs: {
      manufacturing: {
        label: "Виробництво",
        rows: [
          ["Прискорення підготовки пропозицій та рахунків", "«Комерційні пропозиції готуються днями; ми програємо тим, хто відповідає першим.»", "Підготовка: ~15 хв → ~<strong>1 хв</strong>; ~<strong>3×</strong> пропускна здатність, та сама команда"],
          ["Планування виробництва", "«Усе планування тримається в голові однієї людини.»", "Планування: <strong>~20 год/тиждень → ~5</strong>; вчасна доставка: <strong>82% → 95%</strong>"],
          ["Маршрутизація після продажних звернень", "«Запити лежать у пошті; відправляють не того спеціаліста.»", "<strong>60–70%</strong> базових звернень відсіюються автоматично; ~<strong>50%</strong> швидше"],
        ],
      },
      professionalServices: {
        label: "Професійні послуги",
        rows: [
          ["Прийом клієнта та перевірка конфлікту інтересів", "«Онбординг забирає пів дня часу партнера.»", "Від запиту до листа-зобов'язання за хвилини; до ~<strong>30 год/тиждень</strong> економії"],
          ["Підготовка документів і пропозицій", "«Партнери щоразу готують усе з нуля.»", "Виконання завдань ~<strong>25%</strong> швидше"],
          ["Фіксація оплачуваного часу", "«Компанія недовиставляє рахунки, бо ніхто точно не фіксує час.»", "Повернення <strong>5–8%</strong> оплачуваних годин"],
        ],
      },
      ecommerce: {
        label: "E-commerce",
        rows: [
          ["Автоматизація підтримки першої лінії", "«Підтримка тоне в запитах «де моє замовлення?».»", "<strong>60–70%</strong> звернень першої лінії вирішуються автоматично"],
          ["Персоналізація та рекомендації", "«Універсальна вітрина залишає гроші на столі.»", "Покупці з чатом конвертуються ~<strong>2–4×</strong> краще"],
          ["Тексти для запуску нових SKU", "«Тексти для карток гальмують кожен запуск.»", "Тексти для запуску <strong>N мовами</strong> — за години, а не тижні"],
        ],
      },
      investorOperators: {
        label: "Портфельні оператори",
        rows: [
          ["Пошук і первинна оцінка угод", "«Хороші угоди губляться в загальному потоці.»", "~<strong>3–4×</strong> більше угод перевіряється тією ж командою"],
          ["Дайджест портфеля", "«Неможливо бачити картину по всіх компаніях.»", "Щотижневий дайджест; ~<strong>6–10 год/тиждень</strong> повертається"],
          ["Операційка активів / нерухомості", "«Ручні процеси тягнуть NOI вниз.»", "До ~<strong>10%</strong> покращення NOI, орієнтовно"],
        ],
      },
    },
  },
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const directDict: Record<DirectLocale, DirectPageDict> = { en, es, uk };

export function getDirectDict(locale: DirectLocale): DirectPageDict {
  return directDict[locale];
}
