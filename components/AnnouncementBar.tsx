"use client";

import { useLang } from "@/lib/LanguageContext";

const messages = {
  en: [
    "73% BUY FROM WHO RESPONDS FIRST — NOT WHO'S BEST",
    "AVERAGE SMALL BUSINESS RESPONSE TIME: 19 HOURS",
    "85% OF CUSTOMERS WHO CAN'T REACH YOU NEVER COME BACK",
    "YOUR COMPETITORS AREN'T BETTER — THEY'RE JUST FASTER",
    "RESPOND IN UNDER 60 SECONDS. AUTOMATICALLY. 24/7.",
  ],
  es: [
    "EL 73% COMPRA AL PRIMERO QUE RESPONDE — NO AL MEJOR",
    "TIEMPO MEDIO DE RESPUESTA EN PEQUEÑOS NEGOCIOS: 19 HORAS",
    "EL 85% QUE NO TE ENCUENTRA NUNCA VUELVE",
    "TUS COMPETIDORES NO SON MEJORES — SOLO SON MÁS RÁPIDOS",
    "RESPONDE EN MENOS DE 60 SEGUNDOS. AUTOMÁTICAMENTE. 24/7.",
  ],
};

export default function AnnouncementBar() {
  const { lang } = useLang();
  const items = messages[lang];
  const doubled = [...items, ...items];
  const separator = " ·· ";

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{
        height: "28px",
        background: "rgba(212,255,43,0.045)",
        borderBottom: "1px solid rgba(212,255,43,0.07)",
      }}
    >
      <div className="ticker-track whitespace-nowrap flex">
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
