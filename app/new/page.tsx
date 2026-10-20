import type { Metadata } from "next";
import CareLess from "./_cinematic/CareLess";
export const metadata: Metadata = {
 title: "Care Less | Better experiences. Less work behind them.",
 description: "We design better customer experiences and build the AI, software, websites and business systems that make them work.",
 alternates: { canonical: "https://maksnedbailo.site/new" },
 robots: { index: false, follow: true },
 openGraph: { title: "Care Less | Better experiences. Less work behind them.", description: "Thoughtful experiences. Working systems.", url: "https://maksnedbailo.site/new", images: [{ url: "/careless/images/pool-placeholder.svg", alt: "Care Less sunset storyboard placeholder" }] },
 twitter: { card: "summary", title: "Care Less | Better experiences", description: "Thoughtful experiences. Working systems.", images: ["/careless/images/pool-placeholder.svg"] },
};
export default function NewPage() { return <CareLess />; }
