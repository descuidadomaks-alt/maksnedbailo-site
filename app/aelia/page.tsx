import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AELIA — Презентация концепций фирменного стиля",
  robots: { index: false, follow: false },
};

export default function AeliaPresentationPage() {
  redirect("/aelia/index.html");
}
