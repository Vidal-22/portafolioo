import styles from "./ProjectVisual.module.css";

/**
 * Mockups ilustrativos construidos con CSS (no son capturas reales).
 * Sustitúyelos por screenshots en /public/projects/ cuando los tengas.
 */

function Phone({ children }) {
  return (
    <div className={styles.phone}>
      <div className={styles.notch} />
      <div className={styles.screen}>{children}</div>
    </div>
  );
}

function DairyUI() {
  const bars = [52, 68, 61, 80, 74, 90, 84];
  return (
    <div className={styles.stage}>
      <Phone>
        <div className={styles.appBar}>
          <div className={styles.lines}>
            <i style={{ width: "50%" }} />
          </div>
          <span className={styles.pill}>L / día</span>
        </div>
        <div className={styles.chart}>
          {bars.map((h, i) => (
            <span key={i} style={{ "--h": `${h}%`, "--i": i }} />
          ))}
        </div>
        <div className={styles.animalCard}>
          <span className={styles.cow}>#</span>
          <div className={styles.lines}>
            <i style={{ width: "70%" }} />
            <i style={{ width: "45%" }} />
          </div>
        </div>
        <div className={styles.animalCard}>
          <span className={styles.cow}>#</span>
          <div className={styles.lines}>
            <i style={{ width: "55%" }} />
            <i style={{ width: "40%" }} />
          </div>
        </div>
      </Phone>
      <div className={`${styles.floatCard} ${styles.fcRight}`}>
        <span className="mono">peso</span> ↗ seguimiento
      </div>
    </div>
  );
}

function TerminalUI() {
  return (
    <div className={styles.stage}>
      <div className={styles.terminal}>
        <div className={styles.termBar}>
          <span />
          <span />
          <span />
          <p className="mono">npx jest --runInBand</p>
        </div>
        <pre className={styles.termBody}>
          <span className={styles.pass}> PASS </span> tests/login.e2e.test.js{"\n"}
          {"  "}<span className={styles.ok}>✓</span> carga la página (812 ms){"\n"}
          {"  "}<span className={styles.ok}>✓</span> valida campos requeridos{"\n"}
          {"  "}<span className={styles.ok}>✓</span> emula iPhone 13{"\n"}
          <span className={styles.pass}> PASS </span> tests/scraping.test.js{"\n"}
          {"  "}<span className={styles.ok}>✓</span> extrae elementos de la lista{"\n"}
          {"\n"}
          <span className={styles.dim}>Tests:</span> <span className={styles.ok}>5 passed</span>, 5 total{"\n"}
          <span className={styles.cursor}>▍</span>
        </pre>
      </div>
    </div>
  );
}

function AiUI() {
  return (
    <div className={styles.stage}>
      <div className={styles.chat}>
        <div className={`${styles.bubble} ${styles.user}`}>¿Puedo usar IA en mi tarea?</div>
        <div className={`${styles.bubble} ${styles.bot}`}>
          <span className={styles.botIcon}>✦</span>
          Sí, con criterios éticos: cita la fuente y explica tu proceso…
        </div>
        <div className={styles.recos}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.brain} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <i key={i} style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
}

function WebUI() {
  return (
    <div className={styles.stage}>
      <div className={styles.browser}>
        <div className={styles.termBar}>
          <span />
          <span />
          <span />
          <p className="mono">portafolioo-beta.vercel.app</p>
        </div>
        <div className={styles.site}>
          <div className={styles.siteText}>
            <i style={{ width: "40%" }} />
            <i className={styles.big} style={{ width: "80%" }} />
            <i style={{ width: "65%" }} />
            <div className={styles.siteBtns}>
              <b />
              <b />
            </div>
          </div>
          <div className={styles.siteOrb} />
        </div>
      </div>
    </div>
  );
}

const MAP = {
  "mobile-chart": DairyUI,
  terminal: TerminalUI,
  ai: AiUI,
  web: WebUI,
};

export default function ProjectVisual({ type }) {
  const Comp = MAP[type] ?? WebUI;
  return (
    <div className={styles.visual} aria-hidden="true">
      <Comp />
      <span className={`mono ${styles.label}`}>vista ilustrativa</span>
    </div>
  );
}
