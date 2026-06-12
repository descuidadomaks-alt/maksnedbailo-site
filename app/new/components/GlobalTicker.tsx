"use client";

/**
 * Site-wide announcement ticker — sits above NewHeader on every page.
 * Pure marquee, no locale context dependency (locale passed as a prop so it
 * can be reused from /new's NewLocaleProvider, the older LanguageContext on
 * /blog + city pages, and DirectLocaleProvider on /ai-map).
 */

const MESSAGES: Record<"en" | "es", string[]> = {
  en: [
    "AVERAGE FOUNDER RESPONSE TIME: 4–19 HOURS",
    "85% OF LEADS WHO CAN'T REACH YOU NEVER COME BACK",
    "YOU'RE THE BOTTLENECK — NOTHING MOVES WITHOUT YOU",
    "LOSING DEALS BECAUSE YOU CAN'T BE EVERYWHERE",
    "YOUR COMPETITORS AREN'T BETTER — THEY'RE JUST FASTER",
    "TEAM ASKS YOU EVERYTHING. REVENUE HAS PLATEAUED.",
    "73% BUY FROM WHO RESPONDS FIRST — NOT WHO'S BEST",
    "I TRIED AI AND IT DIDN'T WORK. JUST MORE GARBAGE.",
    "WEARING ALL THE HATS AND STILL LOSING SALES",
    "IF YOU GOT HIT BY A BUS TOMORROW, DOES THE BUSINESS SURVIVE?",
    "“IT'S FASTER IF I DO IT MYSELF” — UNTIL YOU BURN OUT",
    "KNOWLEDGE LIVES ONLY IN YOUR HEAD — MONEY IS LEAKING",
    "RESPOND IN UNDER 60 SECONDS OR WATCH LEADS DIE",
    "YOU BUILT IT. NOW IT OWNS YOU.",
    "MOST FOUNDERS ARE STUCK IN THEIR OWN YOUOS",
    "85% OF UNANSWERED INQUIRIES GO TO COMPETITORS",
    "TEAM DEPENDS ON YOU FOR EVERY DECISION",
    "YOUOS IS THE REAL CEILING OF YOUR €1M–€10M BUSINESS",
  ],
  es: [
    "TIEMPO MEDIO DE RESPUESTA DEL FUNDADOR: 4–19 HORAS",
    "EL 85% DE LOS LEADS QUE NO TE ALCANZAN NUNCA VUELVEN",
    "TÚ ERES EL CUELLO DE BOTELLA — NADA AVANZA SIN TI",
    "PIERDES VENTAS PORQUE NO PUEDES ESTAR EN TODAS PARTES",
    "TUS COMPETIDORES NO SON MEJORES — SOLO MÁS RÁPIDOS",
    "EL EQUIPO TE PREGUNTA TODO. LOS INGRESOS SE ESTANCARON.",
    "EL 73% COMPRA AL PRIMERO QUE RESPONDE — NO AL MEJOR",
    "PROBÉ LA IA Y NO FUNCIONÓ. SOLO MÁS BASURA.",
    "HACES DE TODO Y AÚN PIERDES VENTAS",
    "SI TE ATROPELLA UN AUTOBÚS MAÑANA, ¿SOBREVIVE EL NEGOCIO?",
    "“ES MÁS RÁPIDO SI LO HAGO YO” — HASTA QUE TE QUEMAS",
    "EL CONOCIMIENTO SOLO VIVE EN TU CABEZA — EL DINERO SE ESCAPA",
    "RESPONDE EN MENOS DE 60 SEGUNDOS O PIERDE EL LEAD",
    "TÚ LO CONSTRUISTE. AHORA TE POSEE A TI.",
    "LA MAYORÍA DE LOS FUNDADORES ESTÁ ATRAPADA EN SU PROPIO YOUOS",
    "EL 85% DE LAS CONSULTAS SIN RESPUESTA VAN A LA COMPETENCIA",
    "EL EQUIPO DEPENDE DE TI PARA CADA DECISIÓN",
    "YOUOS ES EL VERDADERO TECHO DE TU NEGOCIO DE 1M–10M €",
  ],
};

export default function GlobalTicker({ locale }: { locale: "en" | "es" }) {
  const items = MESSAGES[locale];
  const doubled = [...items, ...items];
  const separator = " ·· ";

  return (
    <div
      data-site-element="announcement"
      className="relative w-full overflow-hidden flex items-center"
      style={{
        height: "28px",
        background: "rgba(212,255,43,0.045)",
        borderBottom: "1px solid rgba(212,255,43,0.07)",
      }}
    >
      <div className="ticker-track whitespace-nowrap flex absolute top-0 left-0 h-full items-center">
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="font-sora text-[9.5px] font-light text-accent/55 tracking-widest"
            style={{ marginRight: "0px" }}
          >
            {msg}
            <span className="text-accent/20 mx-5">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
