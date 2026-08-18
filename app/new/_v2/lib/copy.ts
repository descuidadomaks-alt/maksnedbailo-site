/**
 * /new V3 — experimental homepage copy. EN + ES, operator voice.
 *
 * Positioning: Care Less finds the expensive manual work inside a business
 * and builds the system that removes it. The diagnosis (AI Map) is free,
 * permanently. Every external stat in this file is sourced and recent —
 * see docs/NEW-HOMEPAGE-V3-BRIEF.md section 3. Illustrative numbers in the
 * Sell/Serve/Operate visuals are covered by ONE caption on the section,
 * never repeated per-card.
 */

import type { NewLocale } from "../../lib/locale";

export interface V2Copy {
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryCta: string;
    primaryMicrocopy: string;
    anim: {
      sourceLabel: string;
      todayLabel: string;
      todayResult: string;
      systemLabel: string;
      systemResult: string;
      caption: string;
    };
  };

  problem: {
    label: string;
    headline: string;
    items: { title: string; body: string }[];
    factGridLabel: string;
    /**
     * `image` is an optional photo behind the tile, rendered under a heavy
     * gradient scrim (see V2Problem). Drop a file in /public and set the
     * path here to switch a tile from the gradient-only treatment to a
     * photographic one. Leave undefined and the tile still looks finished.
     * `funders` renders a small mono wordmark row along the tile's base.
     */
    factGrid: {
      value: string;
      body: string;
      source: string;
      accent?: boolean;
      image?: string;
      funders?: string[];
    }[];
  };

  fix: {
    label: string;
    headline: string;
    sub: string;
    basisCaption: string;
    rows: { title: string; body: string }[];
    capacityGap: { capacityLabel: string; wonLabel: string; gapLabel: string };
    leakFunnel: { steps: { label: string; count: number }[]; lostLabel: string };
    weekGrid: { adminLabel: string; earnLabel: string };
  };

  cases: {
    label: string;
    headline: string;
    sub: string;
    liveBadge: string;
    items: { tier: string; name: string; desc: string; tag: string; href: string }[];
  };

  worldProof: {
    label: string;
    headline: string;
    items: { name: string; stats: { value: string; label: string }[]; line: string; source: string }[];
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
    body: string[];
    quote: string;
    quoteAttr: string;
  };

  start: {
    label: string;
    headline: string;
    body: string[];
    steps: string[];
    trustLine: string;
    cta: string;
    ctaMicrocopy: string;
    paymentLabel: string;
    paymentSteps: string[];
  };

  faq: {
    label: string;
    headline: string;
    items: { q: string; a: string }[];
  };

  finalCta: {
    headline: string;
    sub: string[];
    primaryCta: string;
    microcopy: string;
    whatsapp: string;
    closingLine: string;
  };

  footer: {
    wordmark: string;
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
    headline: "Your customer already bought from whoever answered first.",
    sub: "We find where your business is losing work, then build the system that stops it. The diagnosis is free. You only pay for the build once it is live and working.",
    primaryCta: "Get your free AI Map",
    primaryMicrocopy: "Up to 90 minutes, usually less. Yours to keep either way.",
    anim: {
      sourceLabel: "Calls · WhatsApp · Forms · Email",
      todayLabel: "By hand",
      todayResult: "lost",
      systemLabel: "With a system",
      systemResult: "kept",
      caption: "83% of people buy from whoever replies first. Not the best. The first.",
    },
  },

  problem: {
    label: "Sound Familiar",
    headline: "The expensive work is hiding in plain sight.",
    items: [
      {
        title: "The Friday night lead",
        body: "Lands at 9pm. Nobody replies until Monday. By then they booked someone else.",
      },
      {
        title: "The phone you cannot answer",
        body: "It rings while you are with a customer. It goes to voicemail. So does the job.",
      },
      {
        title: "The quote that vanished",
        body: "Sent, then buried in a spreadsheet nobody reopens. No second touch, ever.",
      },
      {
        title: "The same three questions",
        body: "Answered by hand, fifty times a week, by someone you pay to do better work.",
      },
    ],
    factGridLabel: "Two things worth knowing",
    factGrid: [
      {
        value: "83%",
        body: "of people buy from the business that responds first.",
        source: "Moneypenny, 2026. 2,000 consumers.",
        accent: true,
      },
      {
        value: "$1.5B",
        body: "went into one new firm that installs AI inside billion-dollar companies. We do the same job, at the size where it is still your own money.",
        source: "May 2026.",
        funders: ["Anthropic", "Blackstone", "Goldman Sachs", "Hellman & Friedman"],
      },
    ],
  },

  fix: {
    label: "What We Fix",
    headline: "We sell outcomes, not technology.",
    sub: "Almost everything we build lands in one of three places.",
    basisCaption: "Numbers above show an average week in a 10 to 30 person company.",
    rows: [
      {
        title: "Sell",
        body: "Every enquiry answered, qualified, quoted, booked, and chased until they reply.",
      },
      {
        title: "Serve",
        body: "Calls and messages handled around the clock. People get the ones that need a person.",
      },
      {
        title: "Operate",
        body: "Repetitive admin gone. Your team gets answers instantly instead of digging for them.",
      },
    ],
    capacityGap: {
      capacityLabel: "Could serve",
      wonLabel: "Actually won",
      gapLabel: "lost to slow replies",
    },
    leakFunnel: {
      steps: [
        { label: "Enquiries", count: 100 },
        { label: "Answered", count: 68 },
        { label: "Followed up", count: 41 },
        { label: "Booked", count: 11 },
      ],
      lostLabel: "89 never became customers",
    },
    weekGrid: {
      adminLabel: "Repetitive admin",
      earnLabel: "Work that earns",
    },
  },

  cases: {
    label: "Working Systems",
    headline: "Real systems, live now.",
    sub: "Software in production, handling real conversations every day.",
    liveBadge: "LIVE",
    items: [
      {
        tier: "Sell",
        name: "Amira for HC MedSpa",
        desc: "Answers every enquiry on WhatsApp and the website in 9 seconds, day or night, and books the consultation.",
        tag: "UK MedSpa · Lead response",
        href: "/automations/hcmedspa",
      },
      {
        tier: "Serve",
        name: "Elena Hotel & SPA",
        desc: "Handles booking requests and guest questions 24/7 across WhatsApp and the site, in the guest's own language.",
        tag: "Hotel · Booking & Support",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        tier: "Operate",
        name: "Overtime OS",
        desc: "A whole front office in one system. Missed calls texted back, jobs booked on the calendar, follow-ups and review requests running on their own.",
        tag: "Home Services · Front office",
        href: "https://overtimeos.com/",
      },
    ],
  },

  worldProof: {
    label: "The Same Pattern, At Scale",
    headline: "They handed the repetitive half to software. Their customers got happier, not angrier.",
    items: [
      {
        name: "IKEA",
        stats: [
          { value: "74%", label: "of queries handled" },
          { value: "60% → 89%", label: "customer satisfaction" },
          { value: "8,500", label: "staff retrained, none cut" },
        ],
        line: "Their bot took the opening hours, order updates and returns. The call centre staff became interior design advisors, and that remote sales channel now turns over 1.25 billion euros.",
        source: "Fortune, 2026.",
      },
      {
        name: "Octopus Energy",
        stats: [
          { value: "34%", label: "of queries answered" },
          { value: "80% vs 65%", label: "satisfaction, AI vs human" },
          { value: "250", label: "people's worth of work" },
        ],
        line: "AI drafts the reply in the company's own voice. A person reviews it and sends it. Customers rated those answers higher than the ones written by hand.",
        source: "Greg Jackson, CEO, in The Times.",
      },
      {
        name: "Vodafone",
        stats: [
          { value: "15% → 60%", label: "solved on first contact" },
          { value: "+14", label: "points of net promoter score" },
        ],
        line: "Replacing the old chatbot with a proper one meant four times as many people got an answer straight away instead of joining a queue.",
        source: "Vodafone, on SuperTOBi.",
      },
    ],
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
    body: [
      "Nobody started a business so their people could retype addresses into a spreadsheet.",
      "We take the repetitive half. The call that needs judgment, the customer about to leave, the work that actually grows this quarter, those stay with your people. And most of what we build needs no training at all, because we run it.",
    ],
    quote: "Most people will lose their job to somebody who uses AI.",
    quoteAttr: "Jensen Huang, Nvidia CEO, April 2026",
  },

  start: {
    label: "How We Start",
    headline: "Ninety minutes to find out exactly what it is costing you.",
    body: [
      "We go through how your business actually runs. Where work comes in, where it stalls, where it dies.",
      "You get one page back. What is bleeding, roughly what it costs you a year, and what to fix first, in order. Yours to keep, whether you hire us or not.",
    ],
    steps: ["Understand", "Find", "Rank", "Build"],
    trustLine: "If there is nothing worth building, we say so and you keep the page.",
    cta: "Get your free AI Map",
    ctaMicrocopy: "Free. No card. Up to 90 minutes, usually less.",
    paymentLabel: "How paying works",
    paymentSteps: [
      "The map is free. No card, no catch, no obligation after it.",
      "If something is worth building, you get a fixed price before anything starts.",
      "We build the first piece on your own business data. You try it yourself before you commit.",
      "Only then does a payment cover the build and the first month. Monthly after that, or three to six months at a lower rate.",
    ],
  },

  faq: {
    label: "Before You Book",
    headline: "The things people actually ask.",
    items: [
      {
        q: "What does it cost?",
        a: "The map is free. If we build something, you get a fixed price before we start, you see it working on your own business before you commit, and the first payment covers the build and the first month. After that it is monthly, or three to six months at a lower rate.",
      },
      {
        q: "What if you don't find anything worth fixing?",
        a: "Then we tell you, and you keep the map anyway. It happens. Those calls are shorter and nobody is upset about it.",
      },
      {
        q: "Is this going to replace my staff?",
        a: "No. We take the repetitive half off them so they can do the work you actually hired them for. Klarna went all in on automation and a year later started hiring people back for the conversations that needed a human. We would rather skip that lesson.",
      },
      {
        q: "We tried an AI tool already and nothing happened.",
        a: "Usually that is because the tool never touched the work it was bought to change. Someone bought software and left the process exactly as it was. We start with your process, and we only build the piece that pays for itself.",
      },
      {
        q: "I'm not technical. Is that a problem?",
        a: "No, and you don't need to become technical. We run the thing. You'll know how to use it in about ten minutes because there is usually nothing new to learn.",
      },
      {
        q: "How long before something is actually live?",
        a: "The first piece is usually weeks, not quarters. It depends on what we are connecting to and how fast we can get access.",
      },
      {
        q: "What do you need from me?",
        a: "Ninety minutes, honest answers, and access to whatever we are connecting to when we build. That is it.",
      },
    ],
  },

  finalCta: {
    headline: "You already know which one it is.",
    sub: [
      "You thought of it somewhere in the last two minutes. The thing everybody in the business quietly works around. It costs the same every month whether you look at it or not.",
      "Ninety minutes, free, and you will know the number.",
    ],
    primaryCta: "Show me what it's costing me",
    microcopy: "Free. No card. You keep the map either way.",
    whatsapp: "Rather message first?",
    closingLine: "Or don't, and keep paying for it quietly.",
  },

  footer: {
    wordmark: "Care Less",
    tagline: "We find the expensive manual work inside a business and build the system that removes it.",
    navHome: "Home",
    navAiMap: "Free AI Map",
    navBlog: "Blog",
    waLabel: "WhatsApp",
  },
};

const es: V2Copy = {
  hero: {
    eyebrow: "Ventas. Atención. Operaciones.",
    headline: "Tu cliente ya le compró al que respondió primero.",
    sub: "Encontramos por dónde tu negocio está perdiendo trabajo y construimos el sistema que lo frena. El diagnóstico es gratis. Solo pagas la construcción cuando ya está funcionando.",
    primaryCta: "Consigue tu AI Map gratis",
    primaryMicrocopy: "Hasta 90 minutos, normalmente menos. Es tuyo pase lo que pase.",
    anim: {
      sourceLabel: "Llamadas · WhatsApp · Formularios · Email",
      todayLabel: "A mano",
      todayResult: "perdidos",
      systemLabel: "Con un sistema",
      systemResult: "ganados",
      caption: "El 83% de la gente le compra al que responde primero. No al mejor. Al primero.",
    },
  },

  problem: {
    label: "Te Suena",
    headline: "El trabajo caro está a la vista de todos.",
    items: [
      {
        title: "El lead del viernes por la noche",
        body: "Entra a las 21h. Nadie responde hasta el lunes. Para entonces ya reservaron con otro.",
      },
      {
        title: "El teléfono que no puedes coger",
        body: "Suena mientras atiendes a un cliente. Va al buzón. Y el trabajo, con él.",
      },
      {
        title: "El presupuesto que desapareció",
        body: "Enviado y enterrado en una hoja que nadie vuelve a abrir. Sin segundo contacto, nunca.",
      },
      {
        title: "Las mismas tres preguntas",
        body: "Respondidas a mano, cincuenta veces por semana, por alguien a quien pagas para hacer más.",
      },
    ],
    factGridLabel: "Dos cosas que conviene saber",
    factGrid: [
      {
        value: "83%",
        body: "de la gente le compra al negocio que responde primero.",
        source: "Moneypenny, 2026. 2.000 consumidores.",
        accent: true,
      },
      {
        value: "$1.5B",
        body: "fueron a una nueva firma que instala IA dentro de empresas de mil millones. Nosotros hacemos el mismo trabajo, al tamaño donde el dinero todavía es tuyo.",
        source: "Mayo de 2026.",
        funders: ["Anthropic", "Blackstone", "Goldman Sachs", "Hellman & Friedman"],
      },
    ],
  },

  fix: {
    label: "Lo Que Arreglamos",
    headline: "Vendemos resultados, no tecnología.",
    sub: "Casi todo lo que construimos cae en uno de estos tres lugares.",
    basisCaption: "Los números de arriba son una semana media en una empresa de 10 a 30 personas.",
    rows: [
      {
        title: "Vender",
        body: "Cada consulta respondida, cualificada, presupuestada, reservada y perseguida hasta que contestan.",
      },
      {
        title: "Atender",
        body: "Llamadas y mensajes atendidos a todas horas. Las personas se quedan con las que necesitan una persona.",
      },
      {
        title: "Operar",
        body: "Se acabó el admin repetitivo. Tu equipo obtiene respuestas al instante en vez de buscarlas.",
      },
    ],
    capacityGap: {
      capacityLabel: "Podrías atender",
      wonLabel: "Ganaste de verdad",
      gapLabel: "perdidos por responder tarde",
    },
    leakFunnel: {
      steps: [
        { label: "Consultas", count: 100 },
        { label: "Respondidas", count: 68 },
        { label: "Con seguimiento", count: 41 },
        { label: "Reservadas", count: 11 },
      ],
      lostLabel: "89 nunca llegaron a ser clientes",
    },
    weekGrid: {
      adminLabel: "Admin repetitivo",
      earnLabel: "Trabajo que genera",
    },
  },

  cases: {
    label: "Sistemas En Marcha",
    headline: "Sistemas reales, funcionando ahora.",
    sub: "Software en producción, gestionando conversaciones reales cada día.",
    liveBadge: "EN VIVO",
    items: [
      {
        tier: "Vender",
        name: "Amira para HC MedSpa",
        desc: "Responde cada consulta en WhatsApp y la web en 9 segundos, de día o de noche, y reserva la consulta.",
        tag: "MedSpa (Reino Unido) · Respuesta a leads",
        href: "/automations/hcmedspa",
      },
      {
        tier: "Atender",
        name: "Elena Hotel & SPA",
        desc: "Gestiona solicitudes de reserva y preguntas de huéspedes 24/7 en WhatsApp y la web, en el idioma del huésped.",
        tag: "Hotel · Reservas y atención",
        href: "https://bukovel-elena.com.ua/en/",
      },
      {
        tier: "Operar",
        name: "Overtime OS",
        desc: "Toda la oficina de atención en un solo sistema. Llamadas perdidas respondidas por SMS, trabajos reservados en el calendario, seguimientos y reseñas funcionando solos.",
        tag: "Servicios a domicilio · Front office",
        href: "https://overtimeos.com/",
      },
    ],
  },

  worldProof: {
    label: "El Mismo Patrón, A Escala",
    headline: "Le dieron la mitad repetitiva al software. Sus clientes acabaron más contentos, no más enfadados.",
    items: [
      {
        name: "IKEA",
        stats: [
          { value: "74%", label: "de consultas resueltas" },
          { value: "60% → 89%", label: "satisfacción del cliente" },
          { value: "8.500", label: "empleados reconvertidos, cero despidos" },
        ],
        line: "Su bot se quedó con los horarios, el estado de los pedidos y las devoluciones. El personal del call center pasó a asesorar en diseño de interiores, y ese canal de venta remota ya factura 1.250 millones de euros.",
        source: "Fortune, 2026.",
      },
      {
        name: "Octopus Energy",
        stats: [
          { value: "34%", label: "de consultas respondidas" },
          { value: "80% vs 65%", label: "satisfacción, IA frente a humano" },
          { value: "250", label: "personas de trabajo equivalente" },
        ],
        line: "La IA redacta la respuesta con la voz de la empresa. Una persona la revisa y la envía. Los clientes puntuaron esas respuestas mejor que las escritas a mano.",
        source: "Greg Jackson, CEO, en The Times.",
      },
      {
        name: "Vodafone",
        stats: [
          { value: "15% → 60%", label: "resuelto en el primer contacto" },
          { value: "+14", label: "puntos de net promoter score" },
        ],
        line: "Cambiar el chatbot viejo por uno de verdad hizo que cuatro veces más gente obtuviera respuesta al momento en lugar de entrar en una cola.",
        source: "Vodafone, sobre SuperTOBi.",
      },
    ],
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
    body: [
      "Nadie montó un negocio para que su equipo retipeara direcciones en una hoja de cálculo.",
      "Nosotros nos quedamos con la parte repetitiva. La llamada que necesita criterio, el cliente a punto de irse, el trabajo que de verdad hace crecer el trimestre, eso se queda con tu gente. Y casi nada de lo que construimos necesita formación, porque lo operamos nosotros.",
    ],
    quote: "La mayoría perderá su trabajo frente a alguien que usa IA.",
    quoteAttr: "Jensen Huang, CEO de Nvidia, abril de 2026",
  },

  start: {
    label: "Cómo Empezamos",
    headline: "Noventa minutos para saber exactamente qué te está costando.",
    body: [
      "Repasamos cómo funciona tu negocio de verdad. Por dónde entra el trabajo, dónde se atasca, dónde se muere.",
      "Te devolvemos una página. Qué se está desangrando, más o menos cuánto te cuesta al año, y qué arreglar primero, en orden. Es tuya, nos contrates o no.",
    ],
    steps: ["Entender", "Encontrar", "Priorizar", "Construir"],
    trustLine: "Si no hay nada que merezca la pena construir, te lo decimos y te quedas la página.",
    cta: "Consigue tu AI Map gratis",
    ctaMicrocopy: "Gratis. Sin tarjeta. Hasta 90 minutos, normalmente menos.",
    paymentLabel: "Cómo funciona el pago",
    paymentSteps: [
      "El mapa es gratis. Sin tarjeta, sin trampa, sin obligación después.",
      "Si algo merece la pena construirlo, recibes un precio fijo antes de empezar.",
      "Construimos la primera pieza con los datos de tu negocio. La pruebas tú antes de comprometerte.",
      "Solo entonces un pago cubre la construcción y el primer mes. Mensual después, o de tres a seis meses a un precio menor.",
    ],
  },

  faq: {
    label: "Antes De Reservar",
    headline: "Lo que la gente realmente pregunta.",
    items: [
      {
        q: "¿Cuánto cuesta?",
        a: "El mapa es gratis. Si construimos algo, recibes un precio fijo antes de empezar, lo ves funcionando en tu propio negocio antes de comprometerte, y el primer pago cubre la construcción y el primer mes. Después es mensual, o de tres a seis meses a un precio menor.",
      },
      {
        q: "¿Y si no encontráis nada que merezca la pena arreglar?",
        a: "Entonces te lo decimos, y te quedas con el mapa igualmente. Pasa. Esas llamadas son más cortas y nadie se lo toma mal.",
      },
      {
        q: "¿Esto va a reemplazar a mi equipo?",
        a: "No. Le quitamos la parte repetitiva para que pueda hacer el trabajo para el que lo contrataste. Klarna apostó todo por la automatización y un año después empezó a recontratar personas para las conversaciones que necesitaban una. Preferimos ahorrarnos esa lección.",
      },
      {
        q: "Ya probamos una herramienta de IA y no pasó nada.",
        a: "Normalmente es porque la herramienta nunca tocó el trabajo que debía cambiar. Alguien compró software y dejó el proceso exactamente igual. Nosotros empezamos por tu proceso, y solo construimos la pieza que se paga sola.",
      },
      {
        q: "No soy técnico. ¿Es un problema?",
        a: "No, y no necesitas volverte técnico. Nosotros operamos el sistema. Sabrás usarlo en unos diez minutos porque normalmente no hay nada nuevo que aprender.",
      },
      {
        q: "¿Cuánto tarda en estar algo realmente en marcha?",
        a: "La primera pieza suele tardar semanas, no trimestres. Depende de a qué nos conectemos y de lo rápido que consigamos acceso.",
      },
      {
        q: "¿Qué necesitáis de mí?",
        a: "Noventa minutos, respuestas honestas, y acceso a lo que conectemos cuando construyamos. Eso es todo.",
      },
    ],
  },

  finalCta: {
    headline: "Ya sabes cuál es.",
    sub: [
      "Lo pensaste en algún momento de los últimos dos minutos. Eso que todo el mundo en el negocio esquiva en silencio. Cuesta lo mismo cada mes, lo mires o no.",
      "Noventa minutos, gratis, y sabrás la cifra.",
    ],
    primaryCta: "Muéstrame lo que me está costando",
    microcopy: "Gratis. Sin tarjeta. Te quedas el mapa igual.",
    whatsapp: "¿Prefieres escribir primero?",
    closingLine: "O no lo hagas, y sigue pagándolo en silencio.",
  },

  footer: {
    wordmark: "Care Less",
    tagline: "Encontramos el trabajo manual caro dentro de un negocio y construimos el sistema que lo elimina.",
    navHome: "Inicio",
    navAiMap: "AI Map gratis",
    navBlog: "Blog",
    waLabel: "WhatsApp",
  },
};

export function getV2Copy(locale: NewLocale): V2Copy {
  return locale === "es" ? es : en;
}
