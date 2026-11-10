import { TbBriefcase } from "react-icons/tb";
import { experience } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experiencia" className="section" aria-labelledby="exp-title">
      <div className="container">
        <SectionHeading
          id="exp-title"
          index="04"
          kicker="Experiencia"
          title={
            <>
              Trayectoria en <span className="grad-text">tecnología</span>.
            </>
          }
          sub="Experiencia en soporte, infraestructura y atención de incidentes: la base práctica sobre la que construyo software confiable."
        />

        <div className={styles.wrap}>
        <span className={styles.track} aria-hidden="true" />
        <ol className={styles.timeline}>
          {experience.map((job, i) => (
            <li key={job.company} className={`${styles.item} ${i % 2 ? styles.right : styles.left}`}>
              <span className={`${styles.node} ${job.current ? styles.nodeLive : ""}`} aria-hidden="true">
                <TbBriefcase />
              </span>
              <Reveal className={`glass holo-border ${styles.card}`} delay={80}>
                <div className={styles.top}>
                  <span className={`mono ${styles.period}`}>{job.period}</span>
                  {job.current && <span className={styles.live}>Actual</span>}
                </div>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.company}>{job.company}</p>
                <ul className={styles.tasks}>
                  {job.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <ul className={styles.tags} aria-label="Áreas">
                  {job.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
