import { TbApi, TbBug, TbChartDots, TbDatabase } from "react-icons/tb";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import styles from "./About.module.css";

const focusIcons = { backend: TbApi, db: TbDatabase, qa: TbBug, data: TbChartDots };

export default function About() {
  return (
    <section id="sobre-mi" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="01"
          kicker="Sobre mí"
          title={
            <>
              Del hardware al <span className="grad-text">código</span>, con mentalidad de calidad.
            </>
          }
        />

        <div className={styles.grid}>
          <div className={styles.text}>
            {profile.about.map((p, i) => (
              <Reveal as="p" key={i} delay={i * 90}>
                {p}
              </Reveal>
            ))}

            <Reveal as="dl" className={styles.stats} delay={200}>
              {profile.highlights.map((h) => (
                <div key={h.label} className={styles.stat}>
                  <dt>{h.label}</dt>
                  <dd className="grad-text">{h.value}</dd>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={120}>
            <TiltCard className={`glass holo-border ${styles.code}`} max={6}>
              <div className={styles.codeBar} aria-hidden="true">
                <span />
                <span />
                <span />
                <p className="mono">profile.ts</p>
              </div>
              <pre className={styles.pre} aria-label="Resumen del perfil en formato de código">
                <code>
                  <span className={styles.k}>const</span> <span className={styles.v}>developer</span> = {"{"}
                  {"\n"}  name: <span className={styles.s}>&quot;{profile.fullName}&quot;</span>,
                  {"\n"}  role: <span className={styles.s}>&quot;Software Developer Jr.&quot;</span>,
                  {"\n"}  focus: [
                  {"\n"}    <span className={styles.s}>&quot;backend&quot;</span>, <span className={styles.s}>&quot;databases&quot;</span>,
                  {"\n"}    <span className={styles.s}>&quot;qa-testing&quot;</span>, <span className={styles.s}>&quot;data&quot;</span>
                  {"\n"}  ],
                  {"\n"}  stack: {"{"}
                  {"\n"}    api: [<span className={styles.s}>&quot;Node.js&quot;</span>, <span className={styles.s}>&quot;Laravel&quot;</span>],
                  {"\n"}    db: [<span className={styles.s}>&quot;PostgreSQL&quot;</span>, <span className={styles.s}>&quot;Supabase&quot;</span>],
                  {"\n"}    qa: [<span className={styles.s}>&quot;Puppeteer&quot;</span>, <span className={styles.s}>&quot;Jest&quot;</span>, <span className={styles.s}>&quot;Playwright&quot;</span>],
                  {"\n"}    data: [<span className={styles.s}>&quot;Python&quot;</span>, <span className={styles.s}>&quot;R&quot;</span>, <span className={styles.s}>&quot;Power BI&quot;</span>]
                  {"\n"}  {"}"},
                  {"\n"}  location: <span className={styles.s}>&quot;Villavicencio, CO&quot;</span>,
                  {"\n"}  learning: <span className={styles.b}>true</span>
                  {"\n"}{"}"};
                  {"\n"}
                  {"\n"}<span className={styles.c}>{"// "}construir · probar · medir · mejorar</span>
                </code>
              </pre>
            </TiltCard>
          </Reveal>
        </div>

        <ul className={styles.focus}>
          {profile.focus.map((f, i) => {
            const Icon = focusIcons[f.id];
            return (
              <Reveal as="li" key={f.id} delay={i * 80} className={`glass ${styles.focusCard}`}>
                <span className={styles.focusIcon} aria-hidden="true">
                  <Icon />
                </span>
                <span className={`mono ${styles.focusNum}`} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3>{f.label}</h3>
                <p>{f.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
