export type CityFAQItem = {
  q: string;
  a: string;
};

export type CityTestimonial = {
  text: string;
  author: string;
  role: string;
};

export type CityData = {
  slug: string;
  name: string;
  region: string;
  industries: string[];
  hero: {
    tag: string;
    h1: string;
    h1accent: string;
    sub: string;
  };
  meta: {
    title: string;
    description: string;
  };
  schema: {
    name: string;
    description: string;
    areaServed: string;
    telephone: string;
  };
  faqItems: CityFAQItem[];
  testimonials: CityTestimonial[];
};

const CITIES: Record<string, CityData> = {
  santander: {
    slug: "santander",
    name: "Santander",
    region: "Cantabria",
    industries: ["restaurantes", "hoteles", "comercios", "clínicas", "inmobiliarias"],
    hero: {
      tag: "Para pymes de Cantabria que no quieren perder más clientes",
      h1: "Tus Clientes Te Escriben Mientras Estás",
      h1accent: "con Otro. ¿Quién Responde?",
      sub: "Configuro asistentes inteligentes para negocios en Santander que responden en menos de 60 segundos — en WhatsApp, tu web, o los dos. Auditoría gratuita. 30 días sin riesgo. Si no funciona, no pagas.",
    },
    meta: {
      title: "Automatización de IA en Santander | Maks Nedbailo",
      description:
        "Asistente de IA para pymes de Santander y Cantabria. Responde a cada cliente en menos de 60 segundos, 24/7. Auditoría gratuita. 30 días sin riesgo.",
    },
    schema: {
      name: "Maks Nedbailo AI Automation — Santander, Cantabria",
      description:
        "Asistente de IA para pymes de Santander y Cantabria. Responde a clientes en menos de 60 segundos en WhatsApp y web, 24/7.",
      areaServed: "Santander, Cantabria, España",
      telephone: "+34641935207",
    },
    faqItems: [
      {
        q: "¿Esto funciona para negocios de temporada en Cantabria?",
        a: "Perfectamente. En temporada alta, el asistente gestiona el volumen de consultas sin contratar personal extra. En temporada baja, mantiene la presencia activa sin que tú estés pendiente del móvil. Muchos negocios en zonas turísticas ven el mayor ROI precisamente en los picos de verano.",
      },
      {
        q: "¿Puede responder a turistas en inglés, francés o alemán?",
        a: "Sí. El asistente detecta el idioma del mensaje y responde en el mismo idioma automáticamente. Para negocios en Santander con clientes internacionales, esto supone capturar un segmento que antes quedaba sin respuesta por la barrera del idioma.",
      },
      {
        q: "¿Cuánto tiempo tarda en estar activo para mi pyme?",
        a: "48 horas desde que me das la información de tu negocio. No tocas ninguna tecnología — yo lo configuro, lo pruebo y lo pongo en marcha. Tú sigues con tu trabajo normal.",
      },
      {
        q: "¿Funciona con el WhatsApp Business que ya tengo?",
        a: "Sí, se integra directamente con tu número de WhatsApp Business actual. No cambias de número, no pierdes historial de conversaciones, y tus clientes no notan ninguna diferencia — solo que ahora respondes en segundos.",
      },
      {
        q: "Tengo un restaurante en Santander. ¿Para qué me sirve exactamente?",
        a: "Para gestionar reservas, responder preguntas sobre el menú, horarios y alérgenos, y capturar contactos de grupos que quieren organizar eventos privados. Todo sin que tú o tu equipo dejéis de atender la sala para mirar el móvil.",
      },
      {
        q: "¿Cuánto cuesta? ¿Hay permanencia?",
        a: "Sin permanencia. Los primeros 30 días son completamente gratuitos — si no te genera resultados, no pagas nada. A partir del mes 2, el coste mensual es menos que el salario semanal de un empleado a media jornada.",
      },
    ],
    testimonials: [
      {
        text: "En verano teníamos 40-50 mensajes de WhatsApp al día preguntando por disponibilidad. Ahora el asistente los gestiona todos. Nosotros solo confirmamos las reservas que él ya ha pre-cualificado.",
        author: "Carlos M.",
        role: "Restaurante, Santander",
      },
      {
        text: "Nunca pensé que los turistas extranjeros fueran tan fáciles de capturar. El asistente les responde en inglés o francés automáticamente. Hemos aumentado las reservas internacionales un 40% este verano.",
        author: "Lucía T.",
        role: "Hotel boutique, Cantabria",
      },
    ],
  },

  madrid: {
    slug: "madrid",
    name: "Madrid",
    region: "Comunidad de Madrid",
    industries: [
      "restaurantes",
      "clínicas",
      "inmobiliarias",
      "despachos de abogados",
      "comercios",
    ],
    hero: {
      tag: "Para negocios en Madrid que pierden clientes por no responder primero",
      h1: "En Madrid, el Primero que Responde",
      h1accent: "se Queda con el Cliente.",
      sub: "Configuro asistentes de IA para negocios madrileños que responden en menos de 60 segundos — mientras estás con otro cliente, en reunión, o desconectado. Auditoría gratuita. 30 días sin riesgo.",
    },
    meta: {
      title: "Automatización de IA en Madrid | Consultor IA para Pymes | Maks Nedbailo",
      description:
        "Asistente de IA para pymes de Madrid. Responde a cada cliente en menos de 60 segundos en WhatsApp y tu web. Auditoría gratuita. Sin contratos. 30 días de garantía.",
    },
    schema: {
      name: "Maks Nedbailo AI Automation — Madrid",
      description:
        "Consultor de automatización IA para pymes de Madrid. Asistente que responde a clientes en menos de 60 segundos en WhatsApp y web, 24/7.",
      areaServed: "Madrid, Comunidad de Madrid, España",
      telephone: "+34641935207",
    },
    faqItems: [
      {
        q: "¿Por qué es más crítico responder rápido en Madrid que en otras ciudades?",
        a: "En Madrid, la competencia es mucho más densa. Un cliente que no recibe respuesta en 5-10 minutos tiene literalmente decenas de alternativas a un clic. La velocidad de respuesta no es una ventaja competitiva en Madrid — es el precio de entrada al mercado.",
      },
      {
        q: "Tengo una clínica en Madrid. ¿Cómo funciona para mi consulta?",
        a: "El asistente responde consultas sobre servicios, precios y disponibilidad, y dirige a los pacientes al proceso de reserva. Nunca da consejo médico — para eso deriva al equipo. Pero elimina las llamadas perdidas y los mensajes sin responder que hacen que los pacientes vayan a otra clínica.",
      },
      {
        q: "¿Puedo usarlo para capturar leads de pisos en alquiler o venta?",
        a: "Sí, y es uno de los usos más potentes en Madrid. Las consultas inmobiliarias llegan a cualquier hora — muchos compradores miran portales a las 11 de la noche. El asistente captura el contacto, cualifica el interés y propone una visita, mientras tú duermes.",
      },
      {
        q: "¿Cuánto tiempo tardaré en ver resultados en un mercado tan exigente?",
        a: "La mayoría de clientes en Madrid ven su primer lead capturado automáticamente en las primeras 48 horas de activación. El ROI real — clientes convertidos que antes se perdían — suele aparecer en la primera semana.",
      },
      {
        q: "¿Cómo sé que el asistente no va a dar información incorrecta sobre mi negocio?",
        a: "Solo responde con información que tú revisas y apruebas antes de activarlo. Cualquier pregunta fuera de su alcance te la envía directamente a ti. Nunca improvisa ni adivina.",
      },
      {
        q: "¿Hay contrato de permanencia?",
        a: "No. Los primeros 30 días son gratis. Si no te genera resultados tangibles, no pagas nada y cancelamos sin coste. Sin contratos, sin permanencia, sin letra pequeña.",
      },
    ],
    testimonials: [
      {
        text: "Tenía pacientes que dejaban de intentar contactar porque tardábamos demasiado. Ahora el asistente responde en segundos y yo solo intervengo para confirmar la cita.",
        author: "Dra. Ana P.",
        role: "Clínica dental, Madrid",
      },
      {
        text: "Las consultas de pisos me llegaban a todas horas y no podía responderlas todas. Ahora el asistente cualifica el interés primero. Solo atiendo a los que ya están listos para visitar.",
        author: "Jorge R.",
        role: "Inmobiliaria, Madrid",
      },
    ],
  },
};

export function getCity(slug: string): CityData | null {
  return CITIES[slug] ?? null;
}

export function getAllCities(): CityData[] {
  return Object.values(CITIES);
}
