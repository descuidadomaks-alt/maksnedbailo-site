import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import { WA_NUMBER } from "@/app/new/lib/config";
import styles from "./netbees.module.css";

export const metadata: Metadata = {
  title: "A note for Maura · NetBees",
  description: "A personal note after a conversation with Maura and a closer look at NetBees.",
  alternates: { canonical: "https://maksnedbailo.site/partners/netbees" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const whatsappHref =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Maks, I read your note about NetBees. Let's find one real problem worth exploring.");

const areas = [
  {
    title: "THE EXPERIENCE AROUND THE TECHNOLOGY",
    copy: "Not whether the AI works — what happens before, during and after people start using it. Trust, onboarding, decisions, exceptions and feedback.",
  },
  {
    title: "FROM ONE PROJECT TO THE NEXT",
    copy: "Taking something that worked for one company and making the next implementation easier to understand, adopt and repeat — without rebuilding everything from zero.",
  },
  {
    title: "THE EXPERIENCE BETWEEN THE PIECES",
    copy: "How the website, products, training, onboarding and first customer interaction connect — so the technology feels as considered from the outside as it is behind the scenes.",
  },
];

export default function NetBeesPage() {
  return (
    <main className={styles.page} data-short-page>
      <header className={styles.header}>
        <Link href="/" aria-label="Care Less home" className={styles.logoLink}>
          <Image src="/logo.svg" alt="Care Less" width={36} height={36} priority />
        </Link>
        <span className={styles.headerNote}>A private note for NetBees</span>
      </header>

      <section className={styles.hero} aria-labelledby="netbees-title">
        <p className={styles.eyebrow}>A NOTE AFTER OUR CONVERSATION</p>
        <h1 id="netbees-title">Maura, I left yesterday’s conversation thinking two things…</h1>
        <div className={styles.heroVisual}>
          <Image
            src="/partners/netbees/bees_hero.jpg"
            alt="Maura and a curious bee looking toward Max as he waves"
            width={1920}
            height={1024}
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section className={styles.twoThings} aria-label="Two things I took away">
        <div className={styles.container}>
          <article className={styles.numbered} data-reveal>
            <span className={styles.number} aria-hidden="true">01</span>
            <div>
              <h2>You already have the hard part.</h2>
              <p>Real companies. Real industrial processes. Real data. People who have already implemented this stuff. And a training model that ends with someone actually building something instead of collecting another certificate.</p>
              <p>That’s much further ahead than I understood when I walked in.</p>
              <p className={styles.supporting}>I went through the industrial side, NetBees Agents and the Academy afterwards — three quite different doors into the same ecosystem. That made the picture much clearer.</p>
            </div>
          </article>
          <article className={styles.numbered} data-reveal>
            <span className={styles.number} aria-hidden="true">02</span>
            <div>
              <h2>Which means competing with you on “AI automation” would be a remarkably efficient way for me to waste everyone’s time.</h2>
              <p>You have the industrial access, local network and groundwork. I don’t.</p>
              <p>What I do have is 16+ years sitting somewhere between business, product, UX and execution — usually taking something technically possible and figuring out how it becomes something people understand, trust, buy and actually use.</p>
              <p className={styles.lastLine}>That’s a different job.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.areasSection} aria-labelledby="areas-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-reveal>
            <p className={styles.eyebrow}>MAYBE HERE</p>
            <h2 id="areas-title">A few places where my experience might complement yours.</h2>
          </div>
          <div className={styles.threeGrid}>
            {areas.map((item, index) => (
              <article className={styles.card} key={item.title} data-reveal={`d${index}`}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className={styles.hypothesisNote} data-reveal>
            <p>These are hypotheses, not a job description.</p>
            <p>You may already have all of this covered.</p>
          </div>
          <aside className={styles.aside} data-reveal>
            <h3>And yes, my designer brain already started making a list.</h3>
            <p>A few mobile friction points. Some English gaps. <span>A logo asset that probably deserves its vector file back.</span> And a “NetBees Assistant” that could potentially behave a little more like NetBees.</p>
            <p>Nothing dramatic. I just tend to notice these things before anyone asks me to.</p>
          </aside>
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="final-title">
        <div className={styles.finalInner} data-reveal>
          <h2 id="final-title">Or maybe the useful thing is something I haven’t thought of yet.</h2>
          <p>I don’t know enough yet to invent a role or a partnership.</p>
          <p>If there’s a real problem, unfinished piece or something the team knows should be better but nobody has had the time to properly attack — show it to me.</p>
          <p className={styles.oneProblem}>One real problem is enough.</p>
          <p>If I add nothing, we find out quickly.</p>
          <p>If I do, we’ve probably found the reason to work together.</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>Send me the annoying thing →</a>
          <p className={styles.closingLine}>No title. No big commitment. No awkward “strategic partnership” required.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>Max</strong><span>Digital products · business · experience</span></div>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Contact →</a>
      </footer>
      <ScrollReveal />
    </main>
  );
}
