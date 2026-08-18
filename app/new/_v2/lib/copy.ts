/**
 * /new V3 — experimental homepage copy. EN + ES, operator voice.
 *
 * Positioning: Care Less finds the expensive manual work inside a business
 * and builds the system that removes it. The diagnosis (AI Map) is free,
 * permanently. Every external stat used anywhere in this file is sourced —
 * see docs/NEW-HOMEPAGE-V3-BRIEF.md section 3 for the verified fact table.
 * Illustrative (non-sourced) numbers in the Sell/Serve/Operate visuals are
 * clearly labelled as illustrative wherever they render — never presented
 * as fact.
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
    diagram: {
      inputsLabel: string;
      inputs: string[];
      todayLabel: string;
      todayItems: string[];
      todayResult: string;
      systemLabel: string;
      systemItems: string[];
      systemResult: string;
      sourceLine: string;
      sourceAttr: string;
    };
  };

  problem: {
    label: string;
    headline: string;
    items: string[];
    factGridLabel: string;
    factGrid: { value: string; body: string; source: string; accent?: boolean }[];
  };

  fix: {
    label: string;
    headline: string;
    sub: string;
    illustrativeCaption: string;
    rows: { tier: string; title: string; body: string }[];
    capacityGap: {
      capacityLabel: string;
      wonLabel: string;
      gapLabel: string;
      note: string;
    };
    leakFunnel: {
      steps: { label: string; dropNote?: string }[];
      note: string;
    };
    weekGrid: {
      adminLabel: string;
      earnLabel: string;
      sourceLine: string;
      sourceAttr: string;
      note: string;
    };
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
    items: { name: string; line: string; source: string }[];
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
    headline: "Find out what your business is quietly losing. Then stop it.",
    sub: "We spend up to 90 minutes on how your business actually runs, and hand you a ranked list of what is costing you money. It's free. If something is worth building, we build it, you try it on your own business, and you pay once it works.",
    primaryCta: "Get your free AI Map",
    primaryMicrocopy: "Up to 90 minutes, usually less. Yours to keep either way.",
    secondaryCta: "See what we've built",
    diagram: {
      inputsLabel: "What comes in",
      inputs: ["Calls", "WhatsApp", "Web forms", "Emails", "Quote requests"],
      todayLabel: "Today",
      todayItems: [
        "Sits in a queue",
        "Answered when someone is free",
        "Some are never followed up at all",
      ],
      todayResult: "Lost revenue",
      systemLabel: "With the system",
      systemItems: [
        "Answered in seconds",
        "Qualified and booked",
        "Followed up until they answer",
        "Nothing goes cold",
      ],
      systemResult: "Won work",
      sourceLine:
        "Answer a new enquiry within the hour and you're about 7x more likely to qualify it. Wait a day and it's 60x worse.",
      sourceAttr: "Harvard Business Review, 2011. 1.25M leads.",
    },
  },

  problem: {
    label: "The Problem",
    headline: "The expensive work is hiding in plain sight.",
    items: [
      "A lead comes in on Friday night. Nobody replies until Monday, if at all.",
      "The phone rings while you're with a customer. It goes to voicemail. So does the sale.",
      "A quote goes out, then disappears into a spreadsheet nobody reopens.",
      "The same three questions, answered by hand, fifty times a week.",
    ],
    factGridLabel: "What's happening everywhere else",
    factGrid: [
      {
        value: "88%",
        body: "of companies now run AI in at least one part of the business.",
        source: "McKinsey, State of AI 2025.",
      },
      {
        value: "95%",
        body: "of company AI projects produce no measurable financial return. Not because the models are bad. Because the tool never reached the work it was bought to change.",
        source: "MIT Project NANDA, 2025.",
      },
      {
        value: "$1.5B",
        body: "put by Anthropic, Blackstone, Goldman Sachs and Hellman & Friedman into one new firm. Its whole job is to go inside mid-size companies, find where AI belongs, and build it into how they run.",
        source: "Announced May 2026.",
        accent: true,
      },
      {
        value: "700",
        body: "agents' worth of customer conversations handled by one company's AI assistant in a single month. A year later they hired humans back for the conversations that needed one.",
        source: "Klarna, 2024 and 2025.",
      },
    ],
  },

  fix: {
    label: "What We Fix",
    headline: "We sell outcomes, not technology.",
    sub: "Almost everything we build lands in one of three places.",
    illustrativeCaption: "Illustrative. A typical week for a small team.",
    rows: [
      {
        tier: "Sell",
        title: "Sell",
        body: "Capture every enquiry. Qualify it. Follow up. Quote. Book. Reactivate the ones that went quiet.",
      },
      {
        tier: "Serve",
        title: "Serve",
        body: "Answer calls and messages. Handle the questions you've answered a thousand times. Send the exceptions to a person.",
      },
      {
        tier: "Operate",
        title: "Operate",
        body: "Take the repetitive admin off people. Give the team instant answers from your own business knowledge. Connect the systems that don't talk.",
      },
    ],
    capacityGap: {
      capacityLabel: "Enquiries you could serve this week",
      wonLabel: "Enquiries you actually won",
      gapLabel: "you were capable of serving",
      note: "The gap usually isn't demand. It's how fast you answered and whether anyone followed up.",
    },
    leakFunnel: {
      steps: [
        { label: "Enquiries received" },
        { label: "Someone answered", dropNote: "32 came in after hours or while you were busy" },
        { label: "Got a second touch", dropNote: "27 never followed up" },
        { label: "Got a third touch", dropNote: "23 forgotten" },
        { label: "Booked" },
      ],
      note: "Nobody decided to lose those. They just fell through the day.",
    },
    weekGrid: {
      adminLabel: "Repetitive admin, chasing, retyping, the same answers again",
      earnLabel: "The work that actually earns",
      sourceLine: "In one study people spent 28% of the week on email and another 19% just looking for information.",
      sourceAttr: "McKinsey, The Social Economy.",
      note: "Your business only really earns in the blocks that are left.",
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
        desc: "AI lead-response agent on WhatsApp and the website. Replies in 9 seconds, day or night, and books the consultation.",
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
        desc: "A whole front office in one system for home-services companies. Missed calls texted back, leads qualified, jobs booked on the calendar, follow-ups and review requests running on their own.",
        tag: "Home Services · Front office",
        href: "https://overtimeos.com/",
      },
    ],
  },

  worldProof: {
    label: "The Same Pattern, At Scale",
    items: [
      {
        name: "Klarna",
        line: "Their AI assistant took two-thirds of all customer chats in its first month. The work of about 700 agents. Resolution went from 11 minutes to under 2.",
        source: "Klarna, February 2024.",
      },
      {
        name: "IKEA",
        line: "Automated the routine customer questions, then retrained call-centre staff into advisory roles.",
        source: "Industry, in production.",
      },
      {
        name: "Octopus Energy",
        line: "AI drafts replies in the company's own voice. A human reviews and sends. Speed of automation, judgment of a person.",
        source: "Industry, in production.",
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
      "Right now someone on your team is doing work they're bad at, that they hate, that goes wrong when they're tired. And the work only a human can do, the call that needs judgment, the customer about to leave, the thing that would actually grow this quarter, waits until Friday. Or never.",
      "We take the repetitive half. Most of what we build needs no training from anyone, because we run it. When something does touch your team, we sit with them until it's boring.",
    ],
    quote: "Most people will lose their job to somebody who uses AI.",
    quoteAttr: "Jensen Huang, Nvidia CEO, Stanford GSB, April 2026",
  },

  start: {
    label: "How We Start",
    headline: "Not sure where it's actually leaking? That's the normal answer.",
    body: [
      "Most owners can feel that something is wrong. Money goes out, the week fills up, and nobody can point at the exact place it happens.",
      "That part is free. We go through how the business actually runs, then you get one page. What's costing you, roughly what it's costing, and what to fix first, in order.",
    ],
    steps: ["Understand", "Find", "Rank", "Build"],
    trustLine: "If there's nothing worth building, we say so and you keep the page. Those calls are short, and that's fine.",
    cta: "Get your free AI Map",
    ctaMicrocopy: "Up to 90 minutes. Usually less.",
    paymentLabel: "How paying works",
    paymentSteps: [
      "The map is free. No card, no catch, no obligation after it.",
      "If something's worth building, you get a fixed price before anything starts.",
      "We build the first piece and connect it to your own business. You try it yourself before you commit.",
      "Then a prepayment covers the build and the first month. After that it's monthly, or three to six months at a lower rate.",
    ],
  },

  faq: {
    label: "Before You Book",
    headline: "The things people actually ask.",
    items: [
      {
        q: "What does it cost?",
        a: "The map is free. If we build something, you get a fixed price before we start, you see it working on your own business before you commit, and the first payment covers the build and the first month. After that it's monthly, or three to six months at a lower rate.",
      },
      {
        q: "What if you don't find anything worth fixing?",
        a: "Then we tell you, and you keep the map anyway. It happens. Those calls are shorter and nobody is upset about it.",
      },
      {
        q: "Is this going to replace my staff?",
        a: "No. We take the repetitive half off them. Klarna went all in on automation and a year later started hiring people back for the conversations that needed a human. We'd rather skip that lesson.",
      },
      {
        q: "We tried an AI tool already and nothing happened.",
        a: "That's the normal outcome. In a 2025 MIT study, 95% of company AI projects produced no measurable financial return, mostly because the tool never reached the work it was bought to change. That's why we start by finding the work, not by picking a tool.",
      },
      {
        q: "I'm not technical. Is that a problem?",
        a: "No, and you don't need to become technical. We run the thing. You'll know how to use it in about ten minutes because there's usually nothing new to learn.",
      },
      {
        q: "How long before something is actually live?",
        a: "The first piece is usually weeks, not quarters. It depends on what we're connecting to and how fast we can get access.",
      },
      {
        q: "What do you need from me?",
        a: "Ninety minutes, honest answers, and access to whatever we're connecting to when we build. That's it.",
      },
    ],
  },

  finalCta: {
    headline: "You already know which one it is.",
    sub: [
      "You thought of it somewhere in the last two minutes. The thing everybody in the business quietly works around. It costs the same every month whether you look at it or not.",
      "Ninety minutes, free, and you'll know the number.",
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
    headline: "Descubre qué está perdiendo tu negocio en silencio. Y páralo.",
    sub: "Pasamos hasta 90 minutos entendiendo cómo funciona tu negocio de verdad, y te entregamos una lista priorizada de lo que te está costando dinero. Es gratis. Si algo merece la pena construirlo, lo construimos, lo pruebas en tu propio negocio, y pagas cuando funciona.",
    primaryCta: "Consigue tu AI Map gratis",
    primaryMicrocopy: "Hasta 90 minutos, normalmente menos. Es tuyo lo mires o no.",
    secondaryCta: "Mira lo que hemos construido",
    diagram: {
      inputsLabel: "Lo que entra",
      inputs: ["Llamadas", "WhatsApp", "Formularios web", "Correos", "Solicitudes de presupuesto"],
      todayLabel: "Hoy",
      todayItems: [
        "Se queda en cola",
        "Se responde cuando alguien tiene un hueco",
        "Algunas nunca reciben seguimiento",
      ],
      todayResult: "Ingresos perdidos",
      systemLabel: "Con el sistema",
      systemItems: [
        "Respondido en segundos",
        "Cualificado y reservado",
        "Con seguimiento hasta que responden",
        "Nada se enfría",
      ],
      systemResult: "Trabajo ganado",
      sourceLine:
        "Responder a un lead nuevo en la primera hora lo hace unas 7 veces más probable de cualificar. Esperar un día lo empeora 60 veces.",
      sourceAttr: "Harvard Business Review, 2011. 1,25M de leads.",
    },
  },

  problem: {
    label: "El Problema",
    headline: "El trabajo caro está a la vista de todos.",
    items: [
      "Llega un lead un viernes por la noche. Nadie responde hasta el lunes, si es que responde.",
      "Suena el teléfono mientras atiendes a un cliente. Va al buzón de voz. Y la venta, con él.",
      "Un presupuesto sale por la puerta y desaparece en una hoja de cálculo que nadie vuelve a abrir.",
      "Las mismas tres preguntas, respondidas a mano, cincuenta veces a la semana.",
    ],
    factGridLabel: "Lo que está pasando en el resto del mundo",
    factGrid: [
      {
        value: "88%",
        body: "de las empresas ya usa IA en al menos una parte del negocio.",
        source: "McKinsey, State of AI 2025.",
      },
      {
        value: "95%",
        body: "de los proyectos de IA en empresas no genera un retorno financiero medible. No porque los modelos sean malos. Porque la herramienta nunca llegó al trabajo que debía cambiar.",
        source: "MIT Project NANDA, 2025.",
      },
      {
        value: "1.500M$",
        body: "invertidos por Anthropic, Blackstone, Goldman Sachs y Hellman & Friedman en una nueva firma. Su único trabajo es entrar en empresas medianas, encontrar dónde encaja la IA y construirla dentro de cómo funcionan.",
        source: "Anunciado en mayo de 2026.",
        accent: true,
      },
      {
        value: "700",
        body: "agentes de conversaciones con clientes gestionadas por el asistente de IA de una sola empresa en un mes. Un año después, volvieron a contratar personas para las conversaciones que necesitaban una.",
        source: "Klarna, 2024 y 2025.",
      },
    ],
  },

  fix: {
    label: "Lo Que Arreglamos",
    headline: "Vendemos resultados, no tecnología.",
    sub: "Casi todo lo que construimos cae en uno de estos tres lugares.",
    illustrativeCaption: "Ilustrativo. Una semana típica de un equipo pequeño.",
    rows: [
      {
        tier: "Vender",
        title: "Vender",
        body: "Captura cada consulta. Cualifícala. Haz seguimiento. Presupuesta. Reserva. Reactiva las que se enfriaron.",
      },
      {
        tier: "Atender",
        title: "Atender",
        body: "Responde llamadas y mensajes. Resuelve las preguntas que ya has contestado mil veces. Deriva las excepciones a una persona.",
      },
      {
        tier: "Operar",
        title: "Operar",
        body: "Quita el admin repetitivo de encima de las personas. Da al equipo respuestas instantáneas desde el conocimiento del negocio. Conecta los sistemas que no se hablan entre sí.",
      },
    ],
    capacityGap: {
      capacityLabel: "Consultas que podrías atender esta semana",
      wonLabel: "Consultas que realmente ganaste",
      gapLabel: "que eras capaz de atender",
      note: "La brecha normalmente no es de demanda. Es de cuánto tardaste en responder y si alguien hizo seguimiento.",
    },
    leakFunnel: {
      steps: [
        { label: "Consultas recibidas" },
        { label: "Alguien respondió", dropNote: "32 llegaron fuera de horario o mientras estabas ocupado" },
        { label: "Recibieron un segundo contacto", dropNote: "27 nunca tuvieron seguimiento" },
        { label: "Recibieron un tercer contacto", dropNote: "23 olvidadas" },
        { label: "Reservadas" },
      ],
      note: "Nadie decidió perder esas. Simplemente se cayeron dentro del día.",
    },
    weekGrid: {
      adminLabel: "Admin repetitivo, perseguir, retipear, las mismas respuestas otra vez",
      earnLabel: "El trabajo que realmente genera ingresos",
      sourceLine: "En un estudio, las personas pasaban el 28% de la semana en el correo y otro 19% solo buscando información.",
      sourceAttr: "McKinsey, The Social Economy.",
      note: "Tu negocio solo gana de verdad en los bloques que quedan.",
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
        desc: "Agente de IA de respuesta a leads en WhatsApp y la web. Responde en 9 segundos, de día o de noche, y reserva la consulta.",
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
        desc: "Toda una oficina de atención al cliente en un solo sistema para empresas de servicios a domicilio. Llamadas perdidas respondidas por SMS, leads cualificados, trabajos reservados en el calendario, seguimientos y solicitudes de reseñas funcionando solos.",
        tag: "Servicios a domicilio · Front office",
        href: "https://overtimeos.com/",
      },
    ],
  },

  worldProof: {
    label: "El Mismo Patrón, A Escala",
    items: [
      {
        name: "Klarna",
        line: "Su asistente de IA gestionó dos tercios de todos los chats de atención al cliente en su primer mes. El trabajo de unos 700 agentes. La resolución pasó de 11 minutos a menos de 2.",
        source: "Klarna, febrero de 2024.",
      },
      {
        name: "IKEA",
        line: "Automatizó las preguntas rutinarias de clientes, y luego reconvirtió a su personal de call center en roles de asesoría.",
        source: "Industria, en producción.",
      },
      {
        name: "Octopus Energy",
        line: "La IA redacta respuestas con la voz propia de la empresa. Una persona las revisa y las envía. Velocidad de la automatización, criterio de una persona.",
        source: "Industria, en producción.",
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
      "Ahora mismo alguien de tu equipo está haciendo un trabajo en el que es malo, que odia, que sale mal cuando está cansado. Y el trabajo que solo una persona puede hacer, la llamada que necesita criterio, el cliente a punto de irse, lo que de verdad haría crecer el negocio este trimestre, espera hasta el viernes. O no llega nunca.",
      "Nosotros nos quedamos con la parte repetitiva. Casi todo lo que construimos no necesita formación de nadie, porque lo operamos nosotros. Cuando algo sí toca a tu equipo, nos quedamos con ellos hasta que les resulta aburrido.",
    ],
    quote: "La mayoría de la gente perderá su trabajo frente a alguien que usa IA.",
    quoteAttr: "Jensen Huang, CEO de Nvidia, Stanford GSB, abril de 2026",
  },

  start: {
    label: "Cómo Empezamos",
    headline: "¿No sabes dónde se está escapando de verdad? Es la respuesta normal.",
    body: [
      "La mayoría de los dueños sienten que algo va mal. El dinero sale, la semana se llena, y nadie puede señalar el punto exacto donde pasa.",
      "Esa parte es gratis. Repasamos cómo funciona tu negocio de verdad, y te damos una página. Qué te está costando, más o menos cuánto, y qué merece la pena arreglar primero, en orden.",
    ],
    steps: ["Entender", "Encontrar", "Priorizar", "Construir"],
    trustLine: "Si no hay nada que merezca la pena construir, te lo decimos y te quedas con la página igual. Esas llamadas son cortas, y está bien así.",
    cta: "Consigue tu AI Map gratis",
    ctaMicrocopy: "Hasta 90 minutos. Normalmente menos.",
    paymentLabel: "Cómo funciona el pago",
    paymentSteps: [
      "El mapa es gratis. Sin tarjeta, sin trampa, sin obligación después.",
      "Si algo merece la pena construirlo, recibes un precio fijo antes de empezar.",
      "Construimos la primera pieza y la conectamos a tu propio negocio. La pruebas tú mismo antes de comprometerte.",
      "Luego un anticipo cubre la construcción y el primer mes. Después es mensual, o de tres a seis meses a un precio menor.",
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
        a: "No. Le quitamos la parte repetitiva de encima. Klarna apostó todo por la automatización y un año después empezó a recontratar personas para las conversaciones que necesitaban una. Preferimos ahorrarnos esa lección.",
      },
      {
        q: "Ya probamos una herramienta de IA y no pasó nada.",
        a: "Es el resultado normal. En un estudio de MIT de 2025, el 95% de los proyectos de IA en empresas no generó un retorno financiero medible, sobre todo porque la herramienta nunca llegó al trabajo que debía cambiar. Por eso empezamos encontrando el trabajo, no eligiendo una herramienta.",
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
    microcopy: "Gratis. Sin tarjeta. Te quedas con el mapa igual.",
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
