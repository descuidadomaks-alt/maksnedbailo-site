import styles from "./eufloria.module.css";

export default function EufloriaDemoPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="eufloria-title">
        <div className={styles.topbar}>
          <a className={styles.wordmark} href="#inicio" aria-label="Eufloria, inicio">
            Eufloria
          </a>
          <span className={styles.location}>C. Tetuán 36 · Santander</span>
        </div>

        <div className={styles.heroGrid} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Tu florista, también online</p>
            <h1 className={styles.title} id="eufloria-title">
              Flores para decir lo que importa.
            </h1>
            <p className={styles.intro}>
              Cuéntanos la ocasión, los tonos y tu presupuesto. Nuestro
              asistente organiza cada detalle y la florista revisa siempre la
              composición final.
            </p>
            <div className={styles.availability} aria-label="Asistente disponible">
              <span className={styles.statusDot} aria-hidden="true" />
              Asistente disponible para pruebas
            </div>
          </div>

          <div className={styles.floralCard} aria-hidden="true">
            <div className={`${styles.stem} ${styles.stemOne}`} />
            <div className={`${styles.stem} ${styles.stemTwo}`} />
            <div className={`${styles.stem} ${styles.stemThree}`} />
            <div className={`${styles.leaf} ${styles.leafOne}`} />
            <div className={`${styles.leaf} ${styles.leafTwo}`} />
            <div className={`${styles.leaf} ${styles.leafThree}`} />
            <div className={`${styles.flower} ${styles.flowerOne}`}>
              <i /><i /><i /><i /><i />
            </div>
            <div className={`${styles.flower} ${styles.flowerTwo}`}>
              <i /><i /><i /><i /><i />
            </div>
            <div className={`${styles.flower} ${styles.flowerThree}`}>
              <i /><i /><i /><i /><i />
            </div>
            <div className={styles.ribbon} />
            <p className={styles.handmade}>Hecho a mano<br />con flor fresca</p>
          </div>
        </div>

        <div className={styles.details} aria-label="Cómo funciona">
          <article>
            <span>01</span>
            <h2>Cuéntanos la ocasión</h2>
            <p>Un cumpleaños, un gracias o simplemente porque sí.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Define el estilo</h2>
            <p>Colores, formato y presupuesto, paso a paso.</p>
          </article>
          <article>
            <span>03</span>
            <h2>La florista lo revisa</h2>
            <p>Cada composición se confirma personalmente.</p>
          </article>
        </div>
      </section>

      <aside className={styles.chatHint} aria-hidden="true">
        <span>Prueba el asistente aquí</span>
        <b>↘</b>
      </aside>
    </main>
  );
}
