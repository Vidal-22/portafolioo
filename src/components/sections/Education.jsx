import { TbCircleCheck, TbCode, TbHourglassHigh, TbSchool } from "react-icons/tb";
import { education } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import styles from "./Education.module.css";

const STATUS_ICON = { current: TbCode, pending: TbHourglassHigh, done: TbCircleCheck };

function StatusBadge({ status, children }) {
  const Icon = STATUS_ICON[status];
  return (
    <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
      <Icon aria-hidden="true" /> {children}
    </span>
  );
}

/** Formación actual: tarjeta destacada a todo el ancho. */
function CurrentCard({ item }) {
  return (
    <TiltCard as="article" className={`glass holo-border ${styles.current}`} max={3} aria-labelledby={`edu-${item.id}`}>
      <div className={styles.currentBody}>
        <div className={styles.currentTop}>
          <span className={styles.eduIcon} aria-hidden="true">
            <TbSchool />
          </span>
          <StatusBadge status={item.status}>{item.badge}</StatusBadge>
        </div>
        <span className={`mono ${styles.label}`}>{"// formación actual"}</span>
        <h3 id={`edu-${item.id}`} className={styles.currentTitle}>
          {item.title}
        </h3>
        <p className={styles.institution}>{item.institution}</p>
        <p className={styles.desc}>{item.description}</p>
        <ul className={styles.focus} aria-label="Áreas de formación">
          {item.focus.map((f) => (
            <li key={f} className="chip">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.semester} aria-hidden="true">
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
        <div className={styles.semesterCore}>
          <span className={`mono ${styles.semesterNum}`}>{item.semester}</span>
          <span className={styles.semesterLabel}>semestre</span>
        </div>
      </div>
    </TiltCard>
  );
}

/** Estudio con materias finalizadas o finalizado. */
function StudyCard({ item }) {
  const pending = item.status === "pending";
  return (
    <article
      className={`glass ${styles.study} ${pending ? styles.studyPending : styles.studyDone}`}
      aria-labelledby={`edu-${item.id}`}
    >
      <div className={styles.studyTop}>
        <span className={`${styles.eduIcon} ${styles.eduIconSm}`} aria-hidden="true">
          <TbSchool />
        </span>
        <StatusBadge status={item.status}>{item.badge}</StatusBadge>
      </div>
      <h3 id={`edu-${item.id}`} className={styles.studyTitle}>
        {item.title}
      </h3>
      <p className={styles.institution}>{item.institution}</p>
      {pending && (
        <>
          <p className={styles.check}>
            <TbCircleCheck aria-hidden="true" /> Materias finalizadas
          </p>
          <p className={styles.desc}>{item.description}</p>
        </>
      )}
    </article>
  );
}

export default function Education() {
  const current = education.filter((e) => e.status === "current");
  const others = education.filter((e) => e.status !== "current");

  return (
    <section id="formacion" className="section" aria-labelledby="edu-title">
      <div className="container">
        <SectionHeading
          id="edu-title"
          index="05"
          kicker="Formación"
          title={
            <>
              Formación <span className="grad-text">Académica</span>
            </>
          }
          sub="Formación en ingeniería y desarrollo de software, construida sobre una base técnica en soporte de TI."
        />

        <div className={styles.stack}>
          {current.map((item) => (
            <Reveal key={item.id}>
              <CurrentCard item={item} />
            </Reveal>
          ))}

          <ul className={styles.grid}>
            {others.map((item, i) => (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 90}
                className={item.status === "pending" ? styles.wideCell : undefined}
              >
                <StudyCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
