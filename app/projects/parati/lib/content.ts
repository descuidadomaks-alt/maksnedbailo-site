/**
 * content.ts — single source of truth for ALL copy + business data.
 *
 * i18n-readiness: every user-facing string lives inside the `es` object below.
 * Adding Ukrainian (uk) or English (en) later means duplicating this shape into
 * a sibling object and selecting by locale — no Spanish is hard-coded.
 */

export type Service = {
  name: string;
  duration: string;
  price: string;
  benefit: string; // the warm, sensory one-liner
  plain: string; // first-timer-friendly "what it actually is / does"
  zones: string[]; // body-map zone ids this service belongs to
};

export type Review = {
  name: string;
  stars: number;
  quote: string;
  meta?: string;
};

export type Zone = {
  id: string;
  label: string;
  tagline: string;
  services: string[]; // service names, resolved in the component
};

const es = {
  locale: "es-ES",
  lang: "es",

  // ── Business facts ──────────────────────────────────────────────────
  business: "Para Ti",
  tagline: "Masaje, Estética & Bienestar",
  therapist: "Oksana",
  city: "Santander",
  region: "Cantabria",
  address: "C. Isabel la Católica, 10, 39007 Santander, Cantabria",
  geo: { lat: 43.4627201, lng: -3.8142308 },
  whatsapp: "34611263063", // real booking number (from the printed carta)
  phone: "+34 611 26 30 63",
  instagram: "https://www.instagram.com/parati_masaje_santander/",
  instagramHandle: "@parati_masaje_santander",
  googleMaps: "https://maps.app.goo.gl/QkM4Wp29A1hSC1av9",
  googleRating: "5.0",
  reviewCount: 32,

  hours: [
    { day: "Lunes – Viernes", time: "9:30–13:30 · 16:00–20:00" },
    { day: "Sábado", time: "10:00–14:00" },
    { day: "Domingo", time: "Cerrado" },
  ],

  whatsapp_messages: {
    generic: "Hola, me gustaría reservar una cita. ¿Qué disponibilidad tienes?",
    service: (name: string) =>
      `Hola, me gustaría reservar ${name}. ¿Qué disponibilidad tienes?`,
  },

  nav: {
    cta: "Reservar",
    links: [
      { label: "Rituales", href: "#rituales" },
      { label: "Oksana", href: "#sobre-mi" },
      { label: "Reseñas", href: "#resenas" },
      { label: "Dónde estoy", href: "#contacto" },
    ],
  },

  // ── Hero ────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Masaje · Estética · Bienestar · Santander",
    // Editorial, split across lines for the asymmetric layout.
    headlineLines: ["Un ritual", "para ti,", "y para nadie", "más."],
    sub: "Masaje y bienestar en el corazón de Santander. Unas manos que deshacen la tensión, en un espacio pensado para que, por un rato, no tengas que ser nada ni nadie.",
    cta: "Reserva tu momento",
    ctaNote: "Respondo por WhatsApp, normalmente en minutos.",
    proof: (rating: string, count: number) => `${rating} ★ · ${count} reseñas en Google`,
    imageAlt: "Ritual de masaje con luz dorada y cálida en Para Ti, Santander",
  },

  // ── Ritual explorer (the body-map centerpiece) ──────────────────────
  explorer: {
    eyebrow: "Encuentra tu ritual",
    heading: "¿Por dónde te está pidiendo cuidado el cuerpo?",
    intro:
      "Toca la zona en la que sientes tensión, cansancio o ganas de cuidarte. Te muestro lo que puedo hacer por ti ahí — sin nombres raros, en cristiano.",
    hint: "Toca una zona del cuerpo",
    listToggle: "Ver la carta completa",
    mapToggle: "Volver al cuerpo",
    fullListHeading: "Carta de servicios",
    bookLabel: "Reservar",
    minutesLabel: "min",
  },

  // ── Services ────────────────────────────────────────────────────────
  services: {
    cardCta: "Reservar este servicio",
    bonos: [
      "Bono 5 sesiones — la 5ª al 50%",
      "Bono 10 sesiones — la 10ª gratis",
    ],
    note: "Precios con IVA incluido.",
    items: [
      {
        name: "Método Golden Touch",
        duration: "90 min",
        price: "99€",
        benefit: "El ritual completo. Sales nueva, ligera, renovada.",
        plain:
          "El más completo: masaje de cuerpo entero que combina técnicas para soltar tensión y recargar energía. 90 minutos solo para ti.",
        zones: ["cuerpo"],
      },
      {
        name: "Luxury Detox Flow",
        duration: "90 min",
        price: "80€",
        benefit: "Drenaje linfático. Ligereza que se nota al instante.",
        plain:
          "Masaje suave y rítmico que activa la circulación y reduce hinchazón y retención de líquidos. Ideal si te sientes pesada o hinchada.",
        zones: ["cuerpo", "piernas"],
      },
      {
        name: "Signature Balance",
        duration: "60 min",
        price: "60€",
        benefit: "Masaje clásico. El cuerpo vuelve a su sitio.",
        plain:
          "El masaje relajante de toda la vida, de cuerpo entero. Perfecto si es tu primera vez y quieres desconectar sin más.",
        zones: ["cuerpo"],
      },
      {
        name: "Imperial Gold Ritual",
        duration: "50 min",
        price: "55€",
        benefit: "Relajación profunda. La tensión deshecha, capa a capa.",
        plain:
          "Masaje envolvente centrado en espalda, cuello y hombros — donde más se acumula el estrés del día.",
        zones: ["espalda"],
      },
      {
        name: "Deep Recovery",
        duration: "40 min",
        price: "45€",
        benefit: "Descarga muscular. Alivio donde más cargas.",
        plain:
          "Masaje más firme, de descarga, para músculos cargados y contracturas: espalda, cuello, piernas. Alivia dolor y rigidez.",
        zones: ["espalda", "piernas"],
      },
      {
        name: "Silk Steps",
        duration: "30 min",
        price: "30€",
        benefit: "Piernas ligeras. Alivio inmediato al caminar.",
        plain:
          "Masaje de piernas y pies que quita el cansancio y la pesadez. Un pequeño momento con un gran alivio.",
        zones: ["piernas"],
      },
      {
        name: "Diamond Face Sculpt",
        duration: "50 min",
        price: "55€",
        benefit: "Rejuvenecimiento facial. Sales luminosa.",
        plain:
          "Masaje facial que reafirma y define los rasgos. La piel queda descansada, luminosa y más firme, sin agujas.",
        zones: ["rostro"],
      },
      {
        name: "Golden Skin Microneedling",
        duration: "Tratamiento facial",
        price: "90€",
        benefit: "Piel renovada, firme y luminosa desde dentro.",
        plain:
          "Microagujas finísimas que estimulan tu piel para producir colágeno: más firmeza, textura y luz. Resultados que van a más con el tiempo.",
        zones: ["rostro"],
      },
      {
        name: "Lifting de pestañas",
        duration: "Tratamiento estético",
        price: "35€",
        benefit: "Mirada abierta y curvada, sin extensiones.",
        plain:
          "Se curvan y elevan tus propias pestañas desde la raíz. Mirada más despierta durante semanas, sin poner pestañas postizas.",
        zones: ["rostro"],
      },
      {
        name: "Lifting de cejas con tinte y forma",
        duration: "Tratamiento estético",
        price: "40€",
        benefit: "Cejas definidas, con forma y color a tu medida.",
        plain:
          "Se peinan, fijan y tintan tus cejas para darles forma y densidad. Mirada más definida y armónica durante semanas.",
        zones: ["rostro"],
      },
    ] as Service[],
  },

  // ── Body-map zones ──────────────────────────────────────────────────
  zones: [
    {
      id: "rostro",
      label: "Rostro y mirada",
      tagline: "Piel luminosa y una mirada despierta.",
      services: [
        "Diamond Face Sculpt",
        "Golden Skin Microneedling",
        "Lifting de pestañas",
        "Lifting de cejas con tinte y forma",
      ],
    },
    {
      id: "espalda",
      label: "Espalda, cuello y hombros",
      tagline: "Donde más se acumula la tensión del día.",
      services: ["Imperial Gold Ritual", "Deep Recovery"],
    },
    {
      id: "cuerpo",
      label: "Cuerpo entero",
      tagline: "Desconexión completa, de la cabeza a los pies.",
      services: ["Método Golden Touch", "Signature Balance", "Luxury Detox Flow"],
    },
    {
      id: "piernas",
      label: "Piernas y pies",
      tagline: "Ligereza para las piernas cansadas.",
      services: ["Silk Steps", "Luxury Detox Flow", "Deep Recovery"],
    },
  ] as Zone[],

  // ── Availability cue ────────────────────────────────────────────────
  availability: "Trabajo yo sola, a una persona cada vez. Por eso la agenda es limitada — reserva tu momento con antelación.",

  // ── Sobre mí ────────────────────────────────────────────────────────
  about: {
    eyebrow: "Hola, soy Oksana",
    heading: "Trabajo con las manos, pero cuido con la cabeza y el corazón.",
    authority:
      "Llevo años dedicada al masaje y al bienestar, y con el tiempo he desarrollado una técnica propia que me permite adaptar cada sesión a lo que tu cuerpo necesita ese día.",
    body: [
      "Creé Para Ti porque creo que cuidarse no debería ser un lujo de días señalados, sino un momento que mereces tener a menudo.",
      "Recibo a una sola persona cada vez, sin prisas y sin ruido. Solo tú, mis manos y el tiempo que te dedicas. Que salgas más ligera de como entraste — ese es todo mi trabajo.",
    ],
    signature: "— Oksana, Para Ti",
    portraitAlt: "Oksana, terapeuta de Para Ti en Santander",
  },

  // ── Reseñas (real Google reviews) ───────────────────────────────────
  reviews: {
    eyebrow: "Reseñas reales",
    heading: "5,0 ★ en Google, con el corazón",
    pullQuote: "Unas manos prodigiosas.",
    moreLink: "Leer las 32 reseñas en Google",
    items: [
      {
        name: "Emely Roque",
        stars: 5,
        quote:
          "Hoy he ido a hacerme el Método Golden Touch y vale completamente lo que cuesta, me ha dejado nueva literalmente. Oksana es encantadora y cuida cada detalle para que te sientas cómoda. El sitio, además de bonito, está impecable. Sin duda volveré — 100×100 recomendado.",
      },
      {
        name: "Anastasia Tsy",
        stars: 5,
        meta: "Local Guide · 22 reseñas",
        quote:
          "Tuve una experiencia excelente con Oksana. El salón siempre está impecablemente limpio y cuidado, transmite confianza desde el primer momento. Una gran profesional: atenta, delicada y con mucha experiencia. Me preparó la piel para mi boda y el resultado fue notable. La recomiendo y volveré.",
      },
      {
        name: "Dani R",
        stars: 5,
        quote:
          "Un masaje excepcional, súper completo. He salido súper relajada, todo muy limpio y un ambiente de paz. Tiene unas manos prodigiosas.",
      },
    ] as Review[],
  },

  // ── Pre-CTA micro-yes ───────────────────────────────────────────────
  preCta: {
    eyebrow: "Tu momento empieza aquí",
    heading: "¿Bajamos el ritmo?",
    sub: "Escríbeme y buscamos juntas el hueco. Sin compromiso, sin prisa.",
    cta: "Reservar por WhatsApp",
  },

  // ── Contacto & Ubicación ────────────────────────────────────────────
  contact: {
    eyebrow: "Dónde estoy",
    heading: "En el corazón de Santander",
    addressLabel: "Dirección",
    hoursLabel: "Horario",
    cta: "Reservar por WhatsApp",
    instagramLabel: "Sígueme en Instagram",
    mapTitle: "Mapa de Para Ti en Santander",
    openMaps: "Cómo llegar",
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    tagline: "Masaje · Estética & Bienestar · Santander",
    legal: "Aviso legal y Política de privacidad",
    rights: (year: number) => `© ${year} Para Ti · Santander`,
  },

  floatingWhatsAppLabel: "Reservar por WhatsApp",
} as const;

export const site = es;
export type Site = typeof es;
