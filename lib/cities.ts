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
  heroEn?: {
    tag: string;
    h1: string;
    h1accent: string;
    sub: string;
  };
  meta: {
    title: string;
    description: string;
  };
  metaEn?: {
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
  faqItemsEn?: CityFAQItem[];
  testimonials: CityTestimonial[];
};

const CITIES: Record<string, CityData> = {
  santander: {
    slug: "santander",
    name: "Santander",
    region: "Cantabria",
    industries: [
      "salones de belleza",
      "spas",
      "centros de estética",
      "clínicas",
      "restaurantes",
      "hoteles",
      "inmobiliarias",
    ],
    hero: {
      tag: "Para salones, spas y clínicas de Cantabria que pierden citas por no poder atender el móvil",
      h1: "Estás con una Clienta. Te Entra un Mensaje.",
      h1accent: "¿Quién Agenda la Siguiente Cita?",
      sub: "Configuro asistentes inteligentes para salones de belleza, spas y clínicas en Santander que responden en menos de 60 segundos — gestionan citas, preguntas sobre tratamientos y listas de espera en WhatsApp o tu web. Auditoría gratuita. 30 días sin riesgo.",
    },
    heroEn: {
      tag: "For beauty salons, spas & clinics in Cantabria missing bookings while serving clients",
      h1: "You're With a Client. Someone Messages.",
      h1accent: "Who Books the Next Appointment?",
      sub: "I set up AI assistants for beauty salons, spas and clinics in Santander that reply in under 60 seconds — handling bookings, treatment questions and waiting lists on WhatsApp or your website. Free audit. 30 days risk-free.",
    },
    meta: {
      title: "Automatización IA para Salones y Spas en Santander | Maks Nedbailo",
      description:
        "Asistente IA para salones de belleza, spas y clínicas en Santander. Gestiona citas y responde clientes en menos de 60 segundos, 24/7. Auditoría gratuita.",
    },
    metaEn: {
      title: "AI Automation for Beauty Salons & Spas in Santander | Maks Nedbailo",
      description:
        "AI assistant for beauty salons, spas and clinics in Santander. Handles bookings and answers clients in under 60 seconds, 24/7. Free audit. 30-day guarantee.",
    },
    schema: {
      name: "Maks Nedbailo AI Automation — Santander, Cantabria",
      description:
        "Asistente de IA para salones de belleza, spas y clínicas en Santander y Cantabria. Gestiona citas y responde clientes en menos de 60 segundos, 24/7.",
      areaServed: "Santander, Cantabria, España",
      telephone: "+34641935207",
    },
    faqItems: [
      {
        q: "Soy esteticista y no puedo coger el móvil mientras hago un tratamiento. ¿Qué pasa con esas llamadas perdidas?",
        a: "Exactamente para eso está diseñado. Cuando estás haciendo una depilación, un masaje o una limpieza facial, el asistente responde automáticamente a los mensajes de WhatsApp, resuelve preguntas sobre tratamientos y agenda la siguiente cita — sin que tú interrumpas lo que estás haciendo.",
      },
      {
        q: "¿Puede gestionar la agenda de mi salón de belleza y las listas de espera?",
        a: "Sí. El asistente se integra con tu sistema de reservas (o gestiona las citas directamente por WhatsApp si no usas ninguno). Gestiona cancelaciones, reagendaciones, y añade clientes a listas de espera cuando no hay huecos disponibles — todo de forma automática.",
      },
      {
        q: "¿Puede responder a turistas en inglés, francés o alemán?",
        a: "Sí. El asistente detecta el idioma del mensaje y responde en el mismo idioma automáticamente. Para negocios en Santander con clientes internacionales, esto supone capturar un segmento que antes quedaba sin respuesta por la barrera del idioma.",
      },
      {
        q: "¿Cuánto tiempo tarda en estar activo para mi negocio?",
        a: "48 horas desde que me das la información de tu negocio. No tocas ninguna tecnología — yo lo configuro, lo pruebo y lo pongo en marcha. Tú sigues con tus clientes.",
      },
      {
        q: "¿Funciona con el WhatsApp Business que ya tengo?",
        a: "Sí, se integra directamente con tu número de WhatsApp Business actual. No cambias de número, no pierdes historial de conversaciones, y tus clientes no notan ninguna diferencia — solo que ahora respondes en segundos.",
      },
      {
        q: "¿Cuánto cuesta? ¿Hay permanencia?",
        a: "Sin permanencia. Los primeros 30 días son completamente gratuitos — si no te genera resultados, no pagas nada. A partir del mes 2, el coste mensual es menos que el salario semanal de un empleado a media jornada.",
      },
    ],
    faqItemsEn: [
      {
        q: "I'm a beautician and can't answer my phone during treatments. What happens to those missed messages?",
        a: "That's exactly what this is built for. While you're doing a facial, massage or wax, the assistant automatically replies to WhatsApp messages, answers questions about treatments and books the next appointment — without you interrupting what you're doing.",
      },
      {
        q: "Can it manage my salon's booking diary and waiting lists?",
        a: "Yes. The assistant integrates with your booking system (or manages appointments directly via WhatsApp if you don't use one). It handles cancellations, rescheduling, and adds clients to waiting lists when there are no available slots — all automatically.",
      },
      {
        q: "Can it reply to tourists in English, French or German?",
        a: "Yes. The assistant detects the language of the incoming message and replies in the same language automatically. For businesses in Santander with international clients, this means capturing a segment that previously went unanswered due to the language barrier.",
      },
      {
        q: "How long does it take to go live for my business?",
        a: "48 hours from when you give me your business information. You don't touch any technology — I configure it, test it and launch it. You carry on with your clients.",
      },
      {
        q: "Does it work with my existing WhatsApp Business number?",
        a: "Yes, it integrates directly with your current WhatsApp Business number. You don't change numbers, you don't lose conversation history, and your clients notice no difference — except that you now reply in seconds.",
      },
      {
        q: "How much does it cost? Is there a contract?",
        a: "No contract. The first 30 days are completely free — if it doesn't generate results, you pay nothing. From month 2, the monthly cost is less than a week's wage for a part-time employee.",
      },
    ],
    testimonials: [
      {
        text: "Tenía clientas que me escribían mientras estaba en medio de un tratamiento y cuando podía responder, ya habían reservado en otro sitio. Ahora el asistente responde en segundos y yo llego al final del día con la agenda llena.",
        author: "María S.",
        role: "Salón de belleza, Santander",
      },
      {
        text: "Nunca pensé que los turistas extranjeros fueran tan fáciles de capturar. El asistente les responde en inglés o francés automáticamente. Hemos aumentado las reservas internacionales un 40% este verano.",
        author: "Lucía T.",
        role: "Spa boutique, Cantabria",
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
    heroEn: {
      tag: "For Madrid businesses losing clients to whoever responds first",
      h1: "In Madrid, the First to Reply",
      h1accent: "Keeps the Client.",
      sub: "I set up AI assistants for Madrid businesses that reply in under 60 seconds — while you're with another client, in a meeting, or off. Free audit. 30 days risk-free.",
    },
    meta: {
      title: "Automatización de IA en Madrid | Consultor IA para Pymes | Maks Nedbailo",
      description:
        "Asistente de IA para pymes de Madrid. Responde a cada cliente en menos de 60 segundos en WhatsApp y tu web. Auditoría gratuita. Sin contratos. 30 días de garantía.",
    },
    metaEn: {
      title: "AI Automation Consultant in Madrid | AI for SMEs | Maks Nedbailo",
      description:
        "AI assistant for Madrid businesses. Replies to every client in under 60 seconds on WhatsApp and your website. Free audit. No contracts. 30-day guarantee.",
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
    faqItemsEn: [
      {
        q: "Why is fast response more critical in Madrid than other cities?",
        a: "In Madrid, competition is far denser. A client who doesn't get a reply within 5-10 minutes has literally dozens of alternatives one click away. Response speed in Madrid isn't a competitive advantage — it's the entry price to the market.",
      },
      {
        q: "I have a clinic in Madrid. How does it work for my practice?",
        a: "The assistant answers questions about services, pricing and availability, and guides patients towards booking. It never gives medical advice — it escalates those to your team. But it eliminates missed calls and unanswered messages that send patients to a competitor.",
      },
      {
        q: "Can I use it to capture property rental or sale leads?",
        a: "Yes, and it's one of the most powerful use cases in Madrid. Property enquiries come at any hour — many buyers browse listings at 11pm. The assistant captures the contact, qualifies the interest and proposes a viewing, while you sleep.",
      },
      {
        q: "How quickly will I see results in such a demanding market?",
        a: "Most Madrid clients see their first automatically captured lead within 48 hours of activation. Real ROI — converted clients who would have been lost — typically appears within the first week.",
      },
      {
        q: "How do I know the assistant won't give incorrect information about my business?",
        a: "It only responds with information you review and approve before it goes live. Any question outside its scope gets forwarded directly to you. It never improvises or guesses.",
      },
      {
        q: "Is there a minimum contract period?",
        a: "No. The first 30 days are free. If it doesn't generate tangible results, you pay nothing and we cancel at no cost. No contracts, no lock-in, no small print.",
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

  barcelona: {
    slug: "barcelona",
    name: "Barcelona",
    region: "Cataluña",
    industries: [
      "restaurantes",
      "hoteles",
      "salones de belleza",
      "clínicas",
      "inmobiliarias",
      "tiendas",
    ],
    hero: {
      tag: "Para negocios en Barcelona que no pueden permitirse perder clientes internacionales",
      h1: "Barcelona No Espera.",
      h1accent: "Tus Clientes Tampoco.",
      sub: "Configuro asistentes de IA para negocios en Barcelona que responden en menos de 60 segundos — en español, inglés o catalán. Capta turistas, cualifica leads y agenda citas automáticamente. Auditoría gratuita. 30 días sin riesgo.",
    },
    heroEn: {
      tag: "For Barcelona businesses that can't afford to miss international clients",
      h1: "Barcelona Doesn't Wait.",
      h1accent: "Neither Do Your Clients.",
      sub: "I set up AI assistants for Barcelona businesses that reply in under 60 seconds — in Spanish, English or Catalan. Capture tourists, qualify leads and book appointments automatically. Free audit. 30 days risk-free.",
    },
    meta: {
      title: "Automatización de IA en Barcelona | Asistente para Pymes | Maks Nedbailo",
      description:
        "Asistente de IA para negocios en Barcelona. Responde en español, inglés y catalán en menos de 60 segundos. Capta clientes internacionales 24/7. Auditoría gratuita.",
    },
    metaEn: {
      title: "AI Automation for Barcelona Businesses | Maks Nedbailo",
      description:
        "AI assistant for Barcelona businesses. Replies in Spanish, English and Catalan in under 60 seconds. Capture international clients 24/7. Free audit. 30-day guarantee.",
    },
    schema: {
      name: "Maks Nedbailo AI Automation — Barcelona, Cataluña",
      description:
        "Asistente de IA para pymes de Barcelona. Responde en español, inglés y catalán en menos de 60 segundos, 24/7.",
      areaServed: "Barcelona, Cataluña, España",
      telephone: "+34641935207",
    },
    faqItems: [
      {
        q: "Mi negocio en Barcelona tiene muchos clientes extranjeros. ¿El asistente les puede atender?",
        a: "Sí. El asistente detecta el idioma del mensaje —inglés, francés, alemán, italiano— y responde automáticamente en ese idioma. En Barcelona, donde el turismo internacional es parte del negocio, esto supone capturar clientes que antes se perdían simplemente por la barrera del idioma.",
      },
      {
        q: "¿Puede responder en catalán además de en español?",
        a: "Sí, perfectamente. El asistente gestiona conversaciones en catalán, español e inglés sin ningún problema. Muchos clientes locales prefieren el catalán y aprecian que el negocio les responda en su idioma.",
      },
      {
        q: "Tengo un restaurante en Barcelona. ¿Para qué me sirve exactamente?",
        a: "Para gestionar reservas, responder preguntas sobre el menú, horarios, alérgenos y precios, y capturar grupos para eventos privados — todo en cualquier idioma. Sin que tú o tu equipo tengáis que dejar las mesas para mirar el móvil.",
      },
      {
        q: "¿Cuánto tiempo tarda en estar activo?",
        a: "48 horas desde que me das la información de tu negocio. Yo lo configuro todo, tú no tocas nada. El primer mes es gratis.",
      },
      {
        q: "¿Funciona con WhatsApp Business?",
        a: "Sí, se integra con tu número de WhatsApp Business actual. No cambias de número, no pierdes el historial, y tus clientes no notan ninguna diferencia salvo que ahora respondes en segundos.",
      },
      {
        q: "¿Hay permanencia o contrato?",
        a: "No. Los primeros 30 días son completamente gratuitos. Si no genera resultados, no pagas nada y cancelamos sin coste. Sin letra pequeña.",
      },
    ],
    faqItemsEn: [
      {
        q: "My Barcelona business has many foreign clients. Can the assistant handle them?",
        a: "Yes. The assistant detects the message language — English, French, German, Italian — and replies automatically in that language. In Barcelona, where international tourism is part of the business, this means capturing clients who were previously lost simply due to the language barrier.",
      },
      {
        q: "Can it reply in Catalan as well as Spanish?",
        a: "Yes, perfectly. The assistant handles conversations in Catalan, Spanish and English without any issue. Many local clients prefer Catalan and appreciate when a business responds in their language.",
      },
      {
        q: "I have a restaurant in Barcelona. What exactly does it do for me?",
        a: "It manages reservations, answers questions about the menu, opening hours, allergens and prices, and captures groups for private events — all in any language. Without you or your team having to step away from tables to check your phone.",
      },
      {
        q: "How long does it take to go live?",
        a: "48 hours from when you give me your business information. I configure everything, you don't touch anything. The first month is free.",
      },
      {
        q: "Does it work with WhatsApp Business?",
        a: "Yes, it integrates with your current WhatsApp Business number. You don't change numbers, you don't lose chat history, and your clients notice no difference except that you now reply in seconds.",
      },
      {
        q: "Is there a contract or minimum term?",
        a: "No. The first 30 days are completely free. If it doesn't generate results, you pay nothing and we cancel at no cost. No small print.",
      },
    ],
    testimonials: [
      {
        text: "Teníamos turistas escribiéndonos en inglés y francés y nadie del equipo podía atenderles bien. Ahora el asistente lo gestiona todo y hemos visto un aumento claro en reservas internacionales.",
        author: "Pau M.",
        role: "Restaurante, Barcelona",
      },
      {
        text: "En temporada alta es imposible responder a todo. El asistente filtra las consultas serias de las que solo preguntan el precio y luego desaparecen. Me ahorra horas cada día.",
        author: "Carla V.",
        role: "Salón de belleza, Barcelona",
      },
    ],
  },

  valencia: {
    slug: "valencia",
    name: "Valencia",
    region: "Comunitat Valenciana",
    industries: [
      "restaurantes",
      "salones de belleza",
      "hoteles",
      "clínicas",
      "comercios",
      "inmobiliarias",
    ],
    hero: {
      tag: "Para negocios en Valencia que responden tarde y pierden clientes al momento",
      h1: "En Valencia, Cada Minuto sin Responder",
      h1accent: "es un Cliente que se Va.",
      sub: "Configuro asistentes de IA para negocios en Valencia que responden en menos de 60 segundos — en WhatsApp, tu web o los dos. Gestionan reservas, cualifican leads y atienden a clientes nacionales e internacionales. Auditoría gratuita. 30 días sin riesgo.",
    },
    heroEn: {
      tag: "For Valencia businesses losing clients to slow response times",
      h1: "In Valencia, Every Minute Without a Reply",
      h1accent: "Is a Client Gone.",
      sub: "I set up AI assistants for Valencia businesses that reply in under 60 seconds — on WhatsApp, your website or both. They manage bookings, qualify leads and serve local and international clients. Free audit. 30 days risk-free.",
    },
    meta: {
      title: "Automatización de IA en Valencia | Asistente para Pymes | Maks Nedbailo",
      description:
        "Asistente de IA para negocios en Valencia. Responde en menos de 60 segundos en WhatsApp y tu web. Auditoría gratuita. Sin contratos. 30 días de garantía.",
    },
    metaEn: {
      title: "AI Automation for Valencia Businesses | Maks Nedbailo",
      description:
        "AI assistant for Valencia businesses. Replies in under 60 seconds on WhatsApp and your website. Free audit. No contracts. 30-day guarantee.",
    },
    schema: {
      name: "Maks Nedbailo AI Automation — Valencia, Comunitat Valenciana",
      description:
        "Asistente de IA para pymes de Valencia. Responde a clientes en menos de 60 segundos en WhatsApp y web, 24/7.",
      areaServed: "Valencia, Comunitat Valenciana, España",
      telephone: "+34641935207",
    },
    faqItems: [
      {
        q: "Tengo un negocio de hostelería en Valencia. ¿Qué me aporta exactamente?",
        a: "Gestiona reservas, responde preguntas sobre menús, horarios y alérgenos, y capta grupos para eventos. En temporada de Fallas u otros eventos, el volumen de consultas puede multiplicarse por diez — el asistente lo absorbe todo sin que tú tengas que estar pegado al móvil.",
      },
      {
        q: "¿Puede atender a turistas internacionales?",
        a: "Sí. El asistente detecta el idioma del mensaje y responde en ese mismo idioma automáticamente. Para negocios en Valencia con turismo internacional —especialmente en verano— esto supone capturar clientes que antes se perdían por la barrera del idioma.",
      },
      {
        q: "¿Cuánto tiempo tarda en estar operativo?",
        a: "48 horas desde que me facilitas la información de tu negocio. Yo configuro todo, tú no tocas ninguna tecnología. Tu negocio sigue funcionando mientras yo lo preparo.",
      },
      {
        q: "¿Funciona con WhatsApp Business?",
        a: "Sí, directamente con tu número actual. No cambias nada, no pierdes historiales, y tus clientes solo notan que ahora respondes más rápido.",
      },
      {
        q: "¿Es útil también fuera de la temporada turística?",
        a: "Sí. En temporada baja mantiene activa la captación de clientes locales sin que tú tengas que estar pendiente del móvil a todas horas. Muchos negocios en Valencia descubren que hay demanda local que antes se escapaba simplemente porque no respondían a tiempo.",
      },
      {
        q: "¿Hay permanencia?",
        a: "No. Los primeros 30 días son gratuitos. Si no genera resultados, no pagas nada y cancelamos sin coste. Sin contratos.",
      },
    ],
    faqItemsEn: [
      {
        q: "I run a hospitality business in Valencia. What does it do for me exactly?",
        a: "It manages bookings, answers questions about menus, opening hours and allergens, and captures groups for events. During Fallas or other peak periods, enquiry volume can increase tenfold — the assistant absorbs all of it without you being glued to your phone.",
      },
      {
        q: "Can it handle international tourists?",
        a: "Yes. The assistant detects the language of the message and replies in that language automatically. For Valencia businesses with international tourism — especially in summer — this means capturing clients who were previously lost due to the language barrier.",
      },
      {
        q: "How quickly can it go live?",
        a: "48 hours from when you provide your business information. I configure everything, you don't touch any technology. Your business keeps running while I set it up.",
      },
      {
        q: "Does it work with WhatsApp Business?",
        a: "Yes, directly with your existing number. You change nothing, you don't lose any chat history, and your clients only notice that you now respond faster.",
      },
      {
        q: "Is it useful outside of tourist season too?",
        a: "Yes. In low season it keeps local client capture active without you having to watch your phone all day. Many Valencia businesses discover there's local demand they were missing simply because they didn't respond in time.",
      },
      {
        q: "Is there a minimum term?",
        a: "No. The first 30 days are free. If it doesn't generate results, you pay nothing and we cancel at no cost. No contracts.",
      },
    ],
    testimonials: [
      {
        text: "Durante las Fallas el volumen de mensajes era insoportable. El asistente gestionó todo el flujo de reservas sin que yo tuviera que mirar el móvil una sola vez mientras estaba en la sala.",
        author: "Tomàs R.",
        role: "Restaurante, Valencia",
      },
      {
        text: "Pensaba que el turismo solo era verano. Resulta que hay clientes buscando servicios todo el año y yo no respondía a tiempo. En el primer mes ya recuperé lo que me costaba.",
        author: "Nuria F.",
        role: "Centro de estética, Valencia",
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
