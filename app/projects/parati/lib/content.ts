/**
 * content.ts — single source of truth for ALL copy + business data.
 *
 * i18n-readiness: every user-facing string lives inside the `es` object below.
 * Adding Ukrainian (uk) or English (en) later means duplicating this shape into
 * a sibling object and selecting by locale — no Spanish is hard-coded in the
 * components. (UA/EN are an upgrade tier; not built now — see context.md.)
 */

export type Service = {
  name: string;
  duration: string; // "[duración]" placeholder where unknown
  price: string; // "[precio]" placeholder where unknown
  benefit: string;
  /** Order is meaningful: most expensive first for price anchoring. */
};

export type Review = {
  name: string;
  stars: number;
  quote: string;
  meta?: string; // e.g. "Local Guide · 22 reseñas"
};

const es = {
  locale: "es-ES",
  lang: "es",

  // ── Business facts (from context.md) ───────────────────────────────
  business: "Para Ti",
  tagline: "Masaje, Estética & Bienestar",
  therapist: "Oksana",
  city: "Santander",
  region: "Cantabria",
  // NOTE: DEMO DATA — this is a portfolio showcase, not a live business page.
  // Contact details below are placeholders; swap for real values to go live.
  address: "Calle de Ejemplo, 10, 39000 Santander, Cantabria",
  whatsapp: "34600000000", // dummy number — links open WhatsApp but go nowhere real
  phone: "+34 600 000 000",
  instagram: "https://www.instagram.com/",
  instagramHandle: "@parati.demo",
  googleMaps: "https://www.google.com/maps?q=Santander,Cantabria",
  googleRating: "5.0",
  reviewCount: 24,

  hours: [
    { day: "Lunes – Viernes", time: "9:30–13:30 · 16:00–20:00" },
    { day: "Sábado", time: "10:00–14:00" },
    { day: "Domingo", time: "Cerrado" },
  ],

  // ── WhatsApp messages (centralized, used by lib/whatsapp.ts) ────────
  whatsapp_messages: {
    generic: "Hola, me gustaría reservar una cita. ¿Qué disponibilidad tienes?",
    service: (name: string) =>
      `Hola, me gustaría reservar el ${name}. ¿Qué disponibilidad tienes?`,
  },

  // ── Navigation / sticky bar ─────────────────────────────────────────
  nav: {
    cta: "Reservar por WhatsApp",
    links: [
      { label: "Servicios", href: "#servicios" },
      { label: "Sobre mí", href: "#sobre-mi" },
      { label: "Reseñas", href: "#resenas" },
      { label: "Contacto", href: "#contacto" },
    ],
  },

  // ── Hero ────────────────────────────────────────────────────────────
  hero: {
    eyebrow: "Masaje · Estética · Bienestar",
    headline: "Dedica tiempo a quien más lo merece: tú.",
    sub: "Masajes y rituales de bienestar en el corazón de Santander. Manos que deshacen la tensión, en un espacio pensado solo para ti.",
    cta: "Reservar por WhatsApp",
    proof: (rating: string, count: number) =>
      `★ ${rating} en Google · ${count} reseñas`,
    imageAlt:
      "Espacio de masaje sereno con luz dorada y cálida en Santander",
  },

  // ── Servicios ───────────────────────────────────────────────────────
  services: {
    eyebrow: "Servicios",
    heading: "Rituales pensados para ti",
    intro:
      "Cada sesión es un momento solo tuyo. Elige el ritual que tu cuerpo te está pidiendo.",
    cardCta: "Reservar este servicio",
    durationLabel: "Duración",
    // Order: most expensive first (price anchoring), descending.
    items: [
      {
        name: "Método Golden Touch",
        duration: "90 min",
        price: "99€",
        benefit: "Masaje relajante y reparador energético. Sales nueva.",
      },
      {
        name: "Golden Skin Microneedling",
        duration: "Tratamiento facial",
        price: "90€",
        benefit: "Piel renovada, firme y luminosa desde dentro.",
      },
      {
        name: "Luxury Detox Flow",
        duration: "90 min",
        price: "80€",
        benefit: "Drenaje linfático corporal. Ligereza que se nota.",
      },
      {
        name: "Signature Balance",
        duration: "60 min",
        price: "60€",
        benefit: "Masaje clásico de recuperación. Cuerpo en equilibrio.",
      },
      {
        name: "Imperial Gold Ritual",
        duration: "50 min",
        price: "55€",
        benefit: "Ritual exclusivo de relajación profunda.",
      },
      {
        name: "Diamond Face Sculpt",
        duration: "50 min",
        price: "55€",
        benefit: "Masaje premium de rejuvenecimiento facial.",
      },
      {
        name: "Deep Recovery",
        duration: "40 min",
        price: "45€",
        benefit: "Masaje de recuperación muscular. Tensión deshecha.",
      },
      {
        name: "Lifting de cejas con tinte y forma",
        duration: "Tratamiento estético",
        price: "40€",
        benefit: "Cejas definidas, con forma y color a tu medida.",
      },
      {
        name: "Lifting de pestañas",
        duration: "Tratamiento estético",
        price: "35€",
        benefit: "Mirada abierta y curvada, sin extensiones.",
      },
      {
        name: "Silk Steps",
        duration: "30 min",
        price: "30€",
        benefit: "Ritual de piernas ligeras. Alivio inmediato.",
      },
    ] as Service[],
    // Loyalty bundles + tax note, from the printed carta de servicios.
    bonos: [
      "Bono 5 sesiones — la 5ª al 50%",
      "Bono 10 sesiones — la 10ª gratis",
    ],
    note: "Precios con IVA incluido.",
  },

  // ── Disponibilidad cue ──────────────────────────────────────────────
  availability: "Agenda limitada — reserva tu momento con antelación.",

  // ── Sobre mí ────────────────────────────────────────────────────────
  about: {
    eyebrow: "Sobre mí",
    heading: "Hola, soy Oksana",
    // Authority first (Sinek: the why follows), then the personal why.
    authority:
      "Con [años] de experiencia y formación en [formación], llevo el cuidado del cuerpo como una vocación, no como un oficio.",
    body: [
      "Creé Para Ti porque creo que cuidarse no debería ser un lujo reservado para días señalados, sino un momento que mereces tener a menudo.",
      "Trabajo con calma, con atención al detalle y con las manos puestas en una sola cosa: que salgas de aquí más ligera de como entraste. Sin prisas, sin ruido. Solo tú y el tiempo que te dedicas.",
    ],
    signature: "— Oksana",
    portraitAlt: "Oksana, terapeuta de Para Ti en Santander",
  },

  // ── Reseñas (DEMO — placeholder text, not real clients) ─────────────
  reviews: {
    eyebrow: "Reseñas",
    heading: "Lo que cuentan quienes ya han venido",
    pullQuote: "Unas manos prodigiosas.",
    moreLink: "Ver más en Google",
    items: [
      {
        name: "Lucía M.",
        stars: 5,
        quote:
          "Reseña de ejemplo. Salí completamente renovada — cada detalle pensado para que te sientas cómoda. El espacio es precioso y está impecable. Sin duda volveré.",
      },
      {
        name: "Carmen R.",
        stars: 5,
        meta: "Reseña de ejemplo",
        quote:
          "Texto de demostración. Una gran profesional: atenta, delicada y con mucha experiencia. El sitio transmite confianza y calma desde el primer momento. Muy recomendable.",
      },
      {
        name: "Elena S.",
        stars: 5,
        quote:
          "Reseña ficticia para la demo. Un masaje excepcional, súper completo. He salido relajada, todo muy limpio y un ambiente de paz. Unas manos prodigiosas.",
      },
    ] as Review[],
  },

  // ── Galería ─────────────────────────────────────────────────────────
  gallery: {
    eyebrow: "Galería",
    heading: "Un espacio pensado para desconectar",
    imageAlt: (n: number) => `Espacio y rituales de Para Ti en Santander (${n})`,
  },

  // ── Pre-CTA micro-yes ───────────────────────────────────────────────
  preCta: {
    heading: "¿Lista para desconectar?",
    sub: "Tu momento empieza con un mensaje.",
    cta: "Reservar por WhatsApp",
  },

  // ── Contacto & Ubicación ────────────────────────────────────────────
  contact: {
    eyebrow: "Contacto",
    heading: "Dónde encontrarme",
    addressLabel: "Dirección",
    hoursLabel: "Horario",
    cta: "Reservar por WhatsApp",
    instagramLabel: "Síguenos en Instagram",
    mapTitle: "Mapa de Para Ti en Santander",
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    tagline: "Masaje · Estética & Bienestar · Santander",
    legal: "Aviso legal y Política de privacidad",
    rights: (year: number) => `© ${year} Para Ti. Todos los derechos reservados.`,
  },

  floatingWhatsAppLabel: "Reservar por WhatsApp",
} as const;

// Default export: the active locale. Swap/select here when locales are added.
export const site = es;
export type Site = typeof es;
