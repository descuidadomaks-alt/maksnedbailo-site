import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/app/partners/[slug]/components/ScrollReveal";
import { WA_NUMBER } from "@/app/new/lib/config";
import ElevatorField from "@/app/new/components/ElevatorField";
import base from "./netbees.module.css";
import styles from "./note.module.css";

const copy = {
  en: {
    header: "A private note for NetBees",
    eyebrow: "A NOTE AFTER OUR CONVERSATION",
    headline: "Maura, I left yesterday’s conversation thinking two things…",
    imageAlt: "Maura and a curious bee looking toward Max as he waves",
    oneTitle: "You already have the hard part.",
    one: [
      "The lab. Real industrial access. Real companies and real data. People who have already implemented this stuff. And a training model where people finish by building something useful instead of collecting another certificate.",
      "That’s much further ahead than I understood when I walked in.",
      "Afterwards I went through the industrial side, NetBees Agents and the Academy — three different doors into the same ecosystem. The picture became much clearer.",
    ],
    twoTitle: "Which made me rethink where I could actually be useful.",
    two: [
      "Not because we’re competing. Simply because you already have the technical and industrial capability.",
      "My 16+ years have mostly been on the other side: understanding businesses, shaping products, translating messy needs into something teams can actually build — and making sure people understand, trust and adopt what gets built.",
    ],
    overlap: "That might be the more useful overlap.",
    maybe: "MAYBE HERE",
    possibilitiesTitle: "Three things I’d be curious to explore.",
    cards: [
      { title: "THE HUMAN SIDE OF ADOPTION", copy: ["Efficiency may convince management. It doesn’t automatically convince the person whose job just changed.", "The first people using AI need to feel that it removes pain — not that it gives them more output to supervise. Get that right and they can become the people who carry adoption through the company."] },
      { title: "FROM BUSINESS PROBLEM TO THE RIGHT BUILD", copy: ["I’m comfortable sitting with a business, understanding how it actually works, separating the real problem from the “we should do something with AI” noise, and translating that into something a technical team can act on.", "That could mean discovery, customer-development conversations, shaping the opportunity — not necessarily building the automation myself."] },
      { title: "FROM ONE SUCCESS TO THE NEXT", copy: ["Once something works, the next question is how the next company understands it, trusts it and adopts it faster.", "That includes the product, the customer journey and the experience around the technology — not just the technology itself."] },
    ],
    caveat: "These are hypotheses, not a job description.",
    caveatSoft: "You may already have all of this covered.",
    asideTitle: "One side effect of looking properly at NetBees:",
    aside: "My product/design brain started collecting tiny notes from the website — a few mobile friction points, some English gaps, a logo asset that probably wants its initial vector file back, and a first-contact experience that could perhaps demonstrate more of what NetBees actually does.",
    asideSoft: "None of these is the opportunity. They’re just the kind of details I notice while looking for the bigger one.",
    finalTitle: "Or maybe the useful thing is something I haven’t thought of yet.",
    final: ["I don’t know enough to invent a role or a partnership.", "If there’s a company conversation, an unfinished piece, a customer experience or simply a problem that could use an experienced external pair of eyes — show it to me."],
    oneProblem: "One real problem is enough.",
    finalEnd: ["If I add nothing, we find out quickly.", "If I do, we’ve probably found the overlap."],
    cta: "Send me the annoying thing →",
    microcopy: "No title. No big commitment. No awkward “strategic partnership” required.",
    footer: "Business · Product · Execution",
    contact: "Contact →",
    whatsapp: "Hi Maks, I read your note about NetBees. Let's find one real problem worth exploring.",
  },
  es: {
    header: "Una nota privada para NetBees",
    eyebrow: "UNA NOTA DESPUÉS DE NUESTRA CONVERSACIÓN",
    headline: "Maura, salí de nuestra conversación de ayer con dos ideas dando vueltas…",
    imageAlt: "Maura y otros personajes con una abeja curiosa miran a Max, que saluda",
    oneTitle: "Lo difícil ya lo tenéis.",
    one: [
      "El laboratorio. Acceso real a la industria. Empresas y datos reales. Personas que ya han llevado todo esto a la práctica. Y un modelo de formación en el que la gente termina construyendo algo útil, en lugar de llevarse simplemente otro certificado.",
      "Eso está bastante más avanzado de lo que entendí cuando entré por la puerta.",
      "Después estuve mirando con más calma la parte industrial, NetBees Agents y la Academy: tres puertas bastante distintas dentro del mismo ecosistema. Y entonces entendí mucho mejor el conjunto.",
    ],
    twoTitle: "Eso me hizo replantearme dónde podría ser realmente útil.",
    two: [
      "No porque estemos compitiendo. Simplemente porque vosotros ya tenéis la capacidad técnica y el conocimiento industrial.",
      "Mis más de 16 años han estado principalmente en el otro lado: entender negocios, dar forma a productos, convertir necesidades poco claras en algo que un equipo pueda construir y conseguir que después la gente lo entienda, confíe en ello y realmente lo utilice.",
    ],
    overlap: "Quizá ahí esté el encaje más interesante.",
    maybe: "QUIZÁ AQUÍ",
    possibilitiesTitle: "Hay tres cosas que me gustaría explorar.",
    cards: [
      { title: "EL LADO HUMANO DE LA ADOPCIÓN", copy: ["La eficiencia puede convencer a dirección. Eso no significa que convenza automáticamente a la persona cuyo trabajo acaba de cambiar.", "Las primeras personas que utilizan IA tienen que sentir que les elimina trabajo y fricción, no que ahora tienen más resultados que revisar. Si eso se hace bien, pueden convertirse en quienes impulsen la adopción dentro de la propia empresa."] },
      { title: "DEL PROBLEMA DE NEGOCIO A LA SOLUCIÓN ADECUADA", copy: ["Me siento cómodo sentándome con una empresa, entendiendo cómo funciona realmente, separando el problema de verdad del típico «deberíamos hacer algo con IA» y convirtiéndolo en algo sobre lo que un equipo técnico pueda actuar.", "Eso puede significar discovery, conversaciones de customer development o dar forma a la oportunidad; no necesariamente construir yo mismo la automatización."] },
      { title: "DE UN CASO DE ÉXITO AL SIGUIENTE", copy: ["Cuando algo funciona, la siguiente pregunta es cómo conseguir que otra empresa lo entienda, confíe en ello y lo adopte más rápido.", "Ahí entran el producto, el recorrido del cliente y toda la experiencia alrededor de la tecnología, no solo la tecnología en sí."] },
    ],
    caveat: "Son hipótesis, no la descripción de un puesto.",
    caveatSoft: "Puede que ya tengáis todo esto perfectamente cubierto.",
    asideTitle: "Un efecto secundario de mirar NetBees con un poco más de calma:",
    aside: "Mi cerebro de producto/diseño empezó a apuntar pequeñas cosas de la web: algunos detalles de fricción en móvil, partes en inglés que se quedan a medio camino, un logo que probablemente echa de menos su archivo vectorial original y una primera interacción que quizá podría mostrar un poco mejor lo que NetBees sabe hacer.",
    asideSoft: "Nada de esto es la oportunidad. Son simplemente el tipo de detalles que suelo detectar mientras intento encontrar algo más importante.",
    finalTitle: "O quizá lo útil sea algo en lo que todavía no he pensado.",
    final: ["Todavía no sé lo suficiente como para inventarme un puesto o una colaboración.", "Si hay una conversación con una empresa, una pieza sin terminar, una experiencia de cliente o simplemente algún problema al que le vendría bien una mirada externa con experiencia, enséñamelo."],
    oneProblem: "Con un problema real basta.",
    finalEnd: ["Si no aporto nada, lo descubrimos rápido.", "Si aporto, probablemente habremos encontrado el punto de encuentro."],
    cta: "Mándame eso que os está dando guerra →",
    microcopy: "Sin cargos. Sin grandes compromisos. Sin necesidad de inventarnos una incómoda «alianza estratégica».",
    footer: "Negocio · Producto · Ejecución",
    contact: "Contacto →",
    whatsapp: "Hola Maks, he leído tu nota sobre NetBees. Hablemos de un problema real que podamos explorar.",
  },
};

export default function NetBeesNote({ locale }: { locale: "en" | "es" }) {
  const c = copy[locale];
  const whatsappHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(c.whatsapp)}`;
  return (
    <main className={base.page} lang={locale}>
      <header className={base.header}>
        <Link href="/" aria-label="Care Less home" className={base.logoLink}>
          <Image src="/logo.svg" alt="Care Less" width={36} height={36} priority />
        </Link>
        <span className={base.headerNote}>{c.header}</span>
      </header>

      <section className={base.hero} aria-labelledby="netbees-title">
        <p className={base.eyebrow}>{c.eyebrow}</p>
        <h1 id="netbees-title">{c.headline}</h1>
        <div className={`${base.heroVisual} ${styles.heroVisual}`}>
          <Image
            src={`/partners/netbees/${locale === "es" ? "bees_hero4_sp" : "bees_hero4"}.webp`}
            alt={c.imageAlt}
            width={1920}
            height={700}
            priority
            sizes="100vw"
            className={`${base.heroImage} ${styles.heroImage}`}
          />
        </div>
      </section>

      <section className={styles.note} aria-label={locale === "es" ? "Las dos ideas" : "The two things I took away"}>
        <div className={styles.thoughts}>
          <article className={styles.thought} data-reveal>
            <span className={base.number} aria-hidden="true">01</span>
            <div><h2>{c.oneTitle}</h2>{c.one.map((p) => <p key={p}>{p}</p>)}</div>
          </article>
          <article className={styles.thought} data-reveal>
            <span className={base.number} aria-hidden="true">02</span>
            <div>
              <h2>{c.twoTitle}</h2>
              {c.two.map((p) => <p key={p}>{p}</p>)}
              <p className={styles.overlap}>{c.overlap}</p>
            </div>
          </article>
        </div>
      </section>

      <ElevatorField clip cameraSpan={0.45} cameraOffset={0.32} className={styles.dotField}>
        <section className={styles.possibilities} aria-labelledby="possibilities-title">
          <div className={styles.middleInner}>
            <div className={styles.intro} data-reveal>
              <p className={base.eyebrow}>{c.maybe}</p>
              <h2 id="possibilities-title">{c.possibilitiesTitle}</h2>
            </div>
            <div className={styles.cards}>
              {c.cards.map((item) => (
                <article className={styles.card} key={item.title} data-reveal>
                  <h3>{item.title}</h3>
                  {item.copy.map((p) => <p key={p}>{p}</p>)}
                </article>
              ))}
            </div>
            <div className={styles.caveat} data-reveal><p>{c.caveat}</p><p>{c.caveatSoft}</p></div>
            <aside className={styles.aside} data-reveal>
              <h3>{c.asideTitle}</h3><p>{c.aside}</p><p>{c.asideSoft}</p>
            </aside>
          </div>
        </section>
      </ElevatorField>

      <section className={`${base.finalSection} ${styles.final}`} aria-labelledby="final-title">
        <div className={base.finalInner} data-reveal>
          <h2 id="final-title">{c.finalTitle}</h2>
          {c.final.map((p) => <p key={p}>{p}</p>)}
          <p className={base.oneProblem}>{c.oneProblem}</p>
          {c.finalEnd.map((p) => <p key={p}>{p}</p>)}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={base.primaryCta}>{c.cta}</a>
          <p className={base.closingLine}>{c.microcopy}</p>
        </div>
      </section>

      <footer className={`${base.footer} ${styles.footer}`}>
        <div><strong>MAKS</strong><span>{c.footer}</span></div>
        <Link className={styles.languageSwitch} href={locale === "es" ? "/partners/netbees" : "/partners/netbees/es"} hrefLang={locale === "es" ? "en" : "es"} aria-label={locale === "es" ? "Read in English" : "Leer en español"}>{locale === "es" ? "EN" : "ES"}</Link>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">{c.contact}</a>
      </footer>
      <ScrollReveal />
    </main>
  );
}
