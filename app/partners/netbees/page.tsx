import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import { WA_NUMBER } from "@/app/new/lib/config";
import styles from "./netbees.module.css";

export const metadata: Metadata = {
  title: "A note for Maura · NetBees",
  description: "A few open hypotheses after a conversation with Maura and a closer look at the NetBees ecosystem.",
  alternates: { canonical: "https://maksnedbailo.site/partners/netbees" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const whatsappHref =
  `https://wa.me/${WA_NUMBER}?text=` +
  encodeURIComponent("Hi Maks, I read your note about NetBees. Let's find one real problem worth exploring.");

const strengths = [
  {
    label: "LAB",
    title: "Real industrial environment",
    copy: "Real companies, real production processes, real data — including the Maflow environment and industrial challenges already tested in practice.",
  },
  {
    label: "SOLUTIONS",
    title: "Already beyond prototypes",
    copy: "KAIROS, ARIS, the intelligent process timer, the 3D digital twin and other solutions already give NetBees something far stronger than another AI presentation.",
  },
  {
    label: "ACADEMY",
    title: "Education connected to work",
    copy: "Training, industry professionals and public / FUNDAE-supported mechanisms create a route into companies that most independent AI consultants simply do not have.",
  },
  {
    label: "ECOSYSTEM",
    title: "More than one capability",
    copy: "Industry, technology, education, talent, institutions and implementation already sit inside the same ecosystem.",
  },
];

const roles = [
  {
    title: "PRODUCT EXPERIENCE",
    copy: "How does a technically strong solution become something people immediately understand, trust and actually want to use?",
  },
  {
    title: "PRODUCTISATION",
    copy: "How does something that works brilliantly once become easier to explain, implement and scale the next ten times?",
  },
  {
    title: "OUTSIDE PERSPECTIVE",
    copy: "What becomes visible when someone who has spent years between business and digital products looks at the system from outside?",
  },
];

const doors = [
  { href: "https://netbees.es", domain: "netbees.es", detail: "Industrial AI / NetBees ecosystem" },
  { href: "https://agents.netbees.es", domain: "agents.netbees.es", detail: "AI agents / automation proposition" },
  { href: "https://academy.netbees.es", domain: "academy.netbees.es", detail: "Training / Academy" },
];

const commonFlow = ["Visit", "choose a page", "fill in a form", "explain the situation", "wait for a response"];
const possibleFlow = [
  "Visit",
  "short intelligent conversation",
  "understand company + process + friction",
  "qualify the need",
  "route to training / existing solution / challenge / human",
];

const buyerJourney = [
  "My current situation",
  "What changes",
  "What implementation requires",
  "What my team experiences",
  "What outcome we measure",
];

const details = [
  "mobile performance and responsiveness",
  "English-language continuity across the experience",
  "mobile interaction details such as floating elements / cookie UI competing for space",
  "visual asset quality, including the logo used in some materials",
  "small UI / animation / QA inconsistencies",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

function Flow({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <div className={`${styles.flow} ${accent ? styles.flowAccent : ""}`}>
      <p className={styles.flowTitle}>{title}</p>
      <div className={styles.flowSteps}>
        {items.map((item, index) => (
          <div className={styles.flowItem} key={item}>
            <span>{item}</span>
            {index < items.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

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
        <div className={styles.heroCopy}>
          <Eyebrow>A NOTE AFTER OUR CONVERSATION</Eyebrow>
          <h1 id="netbees-title">Maura, I kept thinking about our conversation.</h1>
          <p className={styles.heroStatement}>You already have the industrial AI part.</p>
          <p className={styles.heroQuestion}>So where could someone like me actually add value?</p>
          <p className={styles.heroBody}>I spent a little time looking properly at what NetBees is building. These are a few hypotheses — not a pitch.</p>
          <a href="#homework" className={styles.scrollCta}>A few thoughts ↓</a>
        </div>

        <div className={styles.heroVisual}>
          <Image
            src="/partners/netbees/bees_hero.jpg"
            alt="Maura and a curious bee looking toward Max as he waves"
            width={1920}
            height={1024}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 55vw, 60vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section id="homework" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-reveal>
            <Eyebrow>FIRST</Eyebrow>
            <h2>I did my homework.</h2>
            <p>The more I looked, the clearer one thing became: competing with NetBees on industrial AI would make very little sense.</p>
          </div>

          <div className={styles.fourGrid}>
            {strengths.map((item, index) => (
              <article className={styles.card} key={item.label} data-reveal={`d${index}`}>
                <span className={styles.cardLabel}>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <p className={styles.conclusion} data-reveal>
            So no — you don&apos;t need another person telling companies they should <span>“use AI.”</span>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-reveal>
            <h2>So where could I possibly be useful?</h2>
            <p>My background is different: 16+ years moving between business, digital products, UX, technology and execution across very different markets.</p>
          </div>

          <div className={styles.threeGrid}>
            {roles.map((item, index) => (
              <article className={`${styles.card} ${styles.roleCard}`} key={item.title} data-reveal={`d${index}`}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className={styles.hypothesisNote} data-reveal>
            <p>These are hypotheses, not conclusions.</p>
            <p>You may already have all three completely covered.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.observations}`}>
        <div className={styles.container}>
          <div className={styles.sectionIntro} data-reveal>
            <Eyebrow>FROM THE OUTSIDE</Eyebrow>
            <h2>And then my brain started doing what it always does.</h2>
            <p>Not “problems”. Just small pieces of friction and opportunity that I automatically notice when I experience a product or business from the outside.</p>
          </div>

          <article className={styles.observation} data-reveal>
            <span className={styles.observationNumber}>01</span>
            <div>
              <h3>One ecosystem. Several doors.</h3>
              <div className={styles.doorGrid}>
                {doors.map((door) => (
                  <a key={door.domain} href={door.href} target="_blank" rel="noopener noreferrer" className={styles.door}>
                    <strong>{door.domain}</strong>
                    <span>{door.detail}</span>
                    <span className={styles.external} aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <p>Each proposition makes sense on its own. From outside, I wondered whether the relationship between them could become even more obvious — so a new visitor immediately understands which door is for them and where the others fit.</p>
            </div>
          </article>

          <article className={styles.observation} data-reveal>
            <span className={styles.observationNumber}>02</span>
            <div>
              <h3>What if the first NetBees interaction demonstrated NetBees?</h3>
              <div className={styles.flowGrid}>
                <Flow title="TODAY / COMMON WEBSITE PATTERN" items={commonFlow} />
                <Flow title="POSSIBLE EXPERIENCE" items={possibleFlow} accent />
              </div>
              <p>Not a chatbot for the sake of having a chatbot. A useful first diagnostic that behaves like the company behind it.</p>
            </div>
          </article>

          <article className={styles.observation} data-reveal>
            <span className={styles.observationNumber}>03</span>
            <div>
              <h3>From “what it does” to “what happens to me”</h3>
              <p>The existing solutions communicate technical capability well. One additional layer could tell the buyer the whole story:</p>
              <div className={styles.journey}>
                {buyerJourney.map((step, index) => (
                  <div className={styles.journeyItem} key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              <p className={styles.caption}>Especially useful when taking a successful solution from one company to the next.</p>
            </div>
          </article>

          <article className={styles.observation} data-reveal>
            <span className={styles.observationNumber}>04</span>
            <div>
              <h3>Small things still tell a story.</h3>
              <ul className={styles.detailList}>
                {details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
              <div className={styles.frictionNote}>
                <p>None of these are “the business problem.”</p>
                <p>They&apos;re simply examples of the kind of friction I tend to notice before anyone asks me to.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.finalInner} data-reveal>
          <h2>But maybe the useful thing is none of this.</h2>
          <p>During our conversation you mentioned product, platform, marketing, sales, CRM and getting the next stage into the market.</p>
          <p>I don&apos;t know enough yet to decide where I fit — and I&apos;d rather not invent a role just to create a collaboration.</p>

          <div className={styles.bigStatement}>
            <strong>If there&apos;s a real problem, unfinished piece or project where an experienced external perspective could help, give me the problem.</strong>
            <span>I&apos;ll see what I can contribute.</span>
          </div>

          <div className={styles.noList} aria-label="A low-commitment way to explore">
            <span>No title.</span>
            <span>No big commitment.</span>
            <span>No need to make space for “another person on the team.”</span>
          </div>

          <p className={styles.oneProblem}>One real problem is enough.</p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.primaryCta}>Let&apos;s find one →</a>
          <p className={styles.closingLine}>Worst case, we discover quickly that I add nothing. Best case, we find the piece that fits.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>Max</strong>
          <span>Digital products · business · experience</span>
        </div>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Contact →</a>
      </footer>

      <ScrollReveal />
    </main>
  );
}
