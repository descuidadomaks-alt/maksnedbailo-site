import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import { WA_NUMBER } from "@/app/new/lib/config";
import ElevatorField from "@/app/new/components/ElevatorField";
import base from "../netbees/netbees.module.css";
import styles from "./netbees-v2.module.css";

export const metadata: Metadata = {
  title: "A note for Maura · NetBees",
  description: "A personal follow-up to a conversation with Maura about NetBees.",
  alternates: { canonical: "https://maksnedbailo.site/partners/netbees_v2" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const whatsappHref =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Maks, I read your note about NetBees. Let's find one real problem worth exploring.");

const possibilities = [
  {
    title: "THE HUMAN SIDE OF ADOPTION",
    copy: [
      "Efficiency may convince management. It doesn’t automatically convince the person whose job just changed.",
      "The first people using AI need to feel that it removes pain — not that it gives them more output to supervise. Get that right and they can become the people who carry adoption through the company.",
    ],
  },
  {
    title: "FROM BUSINESS PROBLEM TO THE RIGHT BUILD",
    copy: [
      "I’m comfortable sitting with a business, understanding how it actually works, separating the real problem from the “we should do something with AI” noise, and translating that into something a technical team can act on.",
      "That could mean discovery, customer-development conversations, shaping the opportunity — not necessarily building the automation myself.",
    ],
  },
  {
    title: "FROM ONE SUCCESS TO THE NEXT",
    copy: [
      "Once something works, the next question is how the next company understands it, trusts it and adopts it faster.",
      "That includes the product, the customer journey and the experience around the technology — not just the technology itself.",
    ],
  },
];

export default function NetBeesV2Page() {
  return (
    <main className={base.page}>
      <header className={base.header}>
        <Link href="/" aria-label="Care Less home" className={base.logoLink}>
          <Image src="/logo.svg" alt="Care Less" width={36} height={36} priority />
        </Link>
        <span className={base.headerNote}>A private note for NetBees</span>
      </header>

      <section className={base.hero} aria-labelledby="netbees-v2-title">
        <p className={base.eyebrow}>A NOTE AFTER OUR CONVERSATION</p>
        <h1 id="netbees-v2-title">Maura, I left yesterday’s conversation thinking two things…</h1>
        <div className={`${base.heroVisual} ${styles.heroVisual}`}>
          <Image
            src="/partners/netbees/bees_hero3.jpg"
            alt="Maura and a curious bee looking toward Max as he waves"
            width={1920}
            height={638}
            priority
            sizes="100vw"
            className={`${base.heroImage} ${styles.heroImage}`}
          />
        </div>
      </section>

      <section className={styles.note} aria-label="The two things I took away">
        <div className={styles.thoughts}>
          <article className={styles.thought} data-reveal>
            <span className={base.number} aria-hidden="true">01</span>
            <div>
              <h2>You already have the hard part.</h2>
              <p>The lab. Real industrial access. Real companies and real data. People who have already implemented this stuff. And a training model where people finish by building something useful instead of collecting another certificate.</p>
              <p>That’s much further ahead than I understood when I walked in.</p>
              <p>Afterwards I went through the industrial side, NetBees Agents and the Academy — three different doors into the same ecosystem. The picture became much clearer.</p>
            </div>
          </article>
          <article className={styles.thought} data-reveal>
            <span className={base.number} aria-hidden="true">02</span>
            <div>
              <h2>Which made me rethink where I could actually be useful.</h2>
              <p>Not because we’re competing. Simply because you already have the technical and industrial capability.</p>
              <p>My 16+ years have mostly been on the other side: understanding businesses, shaping products, translating messy needs into something teams can actually build — and making sure people understand, trust and adopt what gets built.</p>
              <p className={styles.overlap}>That might be the more useful overlap.</p>
            </div>
          </article>
        </div>
      </section>

      <ElevatorField clip cameraSpan={0.35} cameraOffset={0.32} className={styles.dotField}>
        <section className={styles.possibilities} aria-labelledby="possibilities-title">
          <div className={styles.middleInner}>
            <div className={styles.intro} data-reveal>
              <p className={base.eyebrow}>MAYBE HERE</p>
              <h2 id="possibilities-title">Three things I’d be curious to explore.</h2>
            </div>
            <div className={styles.cards}>
              {possibilities.map((item) => (
                <article className={styles.card} key={item.title} data-reveal>
                  <h3>{item.title}</h3>
                  {item.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </article>
              ))}
            </div>
            <div className={styles.caveat} data-reveal>
              <p>These are hypotheses, not a job description.</p>
              <p>You may already have all of this covered.</p>
            </div>
            <aside className={styles.aside} data-reveal>
              <h3>One side effect of looking properly at NetBees:</h3>
              <p>My product/design brain started collecting tiny notes from the website — a few mobile friction points, some English gaps, a logo asset that probably wants its vector file back, and a first-contact experience that could perhaps demonstrate more of what NetBees actually does.</p>
              <p>None of these is the opportunity. They’re just the kind of details I notice while looking for the bigger one.</p>
            </aside>
          </div>
        </section>
      </ElevatorField>

      <section className={`${base.finalSection} ${styles.final}`} aria-labelledby="final-title">
        <div className={base.finalInner} data-reveal>
          <h2 id="final-title">Or maybe the useful thing is something I haven’t thought of yet.</h2>
          <p>I don’t know enough to invent a role or a partnership.</p>
          <p>If there’s a company conversation, an unfinished piece, a customer experience or simply a problem that could use an experienced external pair of eyes — show it to me.</p>
          <p className={base.oneProblem}>One real problem is enough.</p>
          <p>If I add nothing, we find out quickly.</p>
          <p>If I do, we’ve probably found the overlap.</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={base.primaryCta}>Send me the annoying thing →</a>
          <p className={base.closingLine}>No title. No big commitment. No awkward “strategic partnership” required.</p>
        </div>
      </section>

      <footer className={base.footer}>
        <div><strong>MAKS</strong><span>Business · Product · Execution</span></div>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Contact →</a>
      </footer>
      <ScrollReveal />
    </main>
  );
}
