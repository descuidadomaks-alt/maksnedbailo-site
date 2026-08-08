import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import styles from "./eufloria.module.css";

const URL = "https://maksnedbailo.site/projects/eufloria";

export const metadata: Metadata = {
  title: "Eufloria | Asistente floral",
  description:
    "Prepara tu pedido floral paso a paso con el asistente de Eufloria Santander.",
  alternates: { canonical: URL },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Eufloria | Prueba el asistente floral",
    description:
      "Una forma sencilla de organizar cada detalle antes de hablar con la florista.",
    type: "website",
    url: URL,
    siteName: "Eufloria",
    locale: "es_ES",
    images: [
      {
        url: `${URL}/og.png`,
        width: 1536,
        height: 1024,
        alt: "Eufloria — Prueba el asistente floral",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eufloria | Prueba el asistente floral",
    description: "Organiza tu pedido floral paso a paso.",
    images: [`${URL}/og.png`],
  },
};

export default function EufloriaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.scope}>
      {children}
      <Script
        id="eufloria-live-chat"
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a76fcf5e425d99b06104559"
        strategy="afterInteractive"
      />
    </div>
  );
}
