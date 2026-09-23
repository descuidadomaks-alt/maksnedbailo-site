import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import { WA_NUMBER } from "@/app/new/lib/config";
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
    number: "01",
    title: "The programme you're finishing",
    copy: "The hybrid format and a final project that builds a real solution are compelling. As the remaining pieces come together, how do the right working professionals see themselves in it by January?",
  },
  {
    number: "02",
    title: "What happens after the learning",
    copy: "When someone finishes training and spots an automation opportunity at work, what makes the step from ‘I understand this’ to ‘let's do this with NetBees’ feel natural?",
  },
  {
    number: "03",
    title: "The first conversation",
    copy: "Could the first interaction make it easier to find the right path — training, an existing solution or a real conversation with the team?",
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
            sizes="(max-width: 1280px) 100vw, 1280px"
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
              <p>The lab, real industrial access and people who have already implemented this in companies. And the hybrid programme we talked about is for people who are already working; it ends with an actual solution, not another certificate. I understood that much better after we spoke.</p>
            </div>
          </article>
          <article className={styles.thought} data-reveal>
            <span className={base.number} aria-hidden="true">02</span>
            <div>
              <h2>Competing with you on “AI automation” would be a remarkably efficient way for me to waste everyone’s time.</h2>
              <p>You have the industrial groundwork. I don’t. My 16+ years have been between business, product, UX and execution — helping make what’s possible understandable, trusted and usable.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.possibilities} aria-labelledby="possibilities-title">
        <div className={styles.narrow}>
          <div className={styles.intro} data-reveal>
            <p className={base.eyebrow}>MAYBE HERE</p>
            <h2 id="possibilities-title">The useful overlap might be closer to the unfinished parts we talked about.</h2>
            <p>Three questions I kept coming back to:</p>
          </div>
          <div className={styles.list}>
            {possibilities.map((item) => (
              <article className={styles.item} key={item.number} data-reveal>
                <span className={styles.itemNumber} aria-hidden="true">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.caveat} data-reveal>Just hypotheses. You may already have these covered.</p>
        </div>
      </section>

      <section className={`${base.finalSection} ${styles.final}`} aria-labelledby="final-title">
        <div className={base.finalInner} data-reveal>
          <h2 id="final-title">Or maybe the useful thing is something I haven’t thought of yet.</h2>
          <p>I don’t know enough to invent a role or a partnership. If there’s a real problem or unfinished piece, show it to me.</p>
          <p className={base.oneProblem}>One real problem is enough.</p>
          <p>If I add nothing, we find out quickly. If I do, we’ve probably found a reason to work together.</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={base.primaryCta}>Send me the annoying thing →</a>
          <p className={base.closingLine}>No title. No big commitment. No awkward “strategic partnership” required.</p>
        </div>
      </section>

      <footer className={base.footer}>
        <div><strong>Max</strong><span>Digital products · business · experience</span></div>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Contact →</a>
      </footer>
      <ScrollReveal />
    </main>
  );
}
