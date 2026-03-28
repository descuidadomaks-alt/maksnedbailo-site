"use client";

import { useLang } from "@/lib/LanguageContext";

const messages = {
  en: [
    "If you're still reading this — you're ahead of 99% of businesses.",
    "The average business responds to leads in 19 hours. Yours doesn't have to.",
    "85% of customers who can't reach you never come back.",
    "Your competitors aren't better. They're just faster.",
    "73% of customers buy from whoever responds first — not whoever's best.",
  ],
  es: [
    "Si sigues leyendo esto — ya estás por delante del 99% de negocios.",
    "El tiempo medio de respuesta es 19 horas. El tuyo no tiene por qué serlo.",
    "El 85% de los clientes que no te alcanzan no vuelven nunca.",
    "Tus competidores no son mejores. Solo son más rápidos.",
    "El 73% de los clientes compra al primero que responde — no al mejor.",
  ],
};

export default function AnnouncementBar() {
  const { lang } = useLang();
  const items = messages[lang];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const separator = " ·· ";

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-center"
      style={{
        height: "36px",
        background: "rgba(212,255,43,0.045)",
        borderBottom: "1px solid rgba(212,255,43,0.07)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="ticker-track whitespace-nowrap flex">
        {doubled.map((msg, i) => (
          <span
            key={i}
            className="font-sora text-[10.5px] font-light text-accent/60 tracking-wide"
            style={{ marginRight: "0px" }}
          >
            {msg}
            <span className="text-accent/25 mx-5">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
