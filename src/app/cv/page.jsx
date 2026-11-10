import Link from "next/link";
import { TbArrowLeft } from "react-icons/tb";
import {
  certificates,
  ciip,
  education,
  experience,
  profile,
  projects,
  skillCategories,
  SITE_URL,
} from "@/data/profile";
import CvActions from "./CvActions";
import styles from "./cv.module.css";

export const metadata = {
  title: "Curriculum Vitae",
  description: `Hoja de vida de ${profile.fullName}: desarrollador de software junior con enfoque en backend, QA y datos.`,
  alternates: { canonical: "/cv" },
};

const ciipModules = certificates.filter((c) => c.issuer === "CIIP LATAM" && !c.featured);
const mongo = certificates.find((c) => c.id === "mongo");

export default function CvPage() {
  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.back}>
          <TbArrowLeft aria-hidden="true" /> Volver al portafolio
        </Link>
        <CvActions />
      </div>

      <main id="contenido">
        <article id="cv-sheet" className={styles.sheet}>
          <header className={styles.header}>
            <div>
              <h1>{profile.fullName}</h1>
              <p className={styles.headline}>
                {profile.title} · Backend · QA Tester · Data Analytics
              </p>
            </div>
            <ul className={styles.contact}>
              <li>{profile.location}</li>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>{profile.phone}</li>
              <li>
                <a href={profile.socials.linkedin}>linkedin.com/in/daniel-vidal-371165310</a>
              </li>
              <li>
                <a href={profile.socials.github}>github.com/Vidal-22</a>
              </li>
              <li>
                <a href={SITE_URL}>{SITE_URL.replace("https://", "")}</a>
              </li>
            </ul>
          </header>

          <section className={styles.block}>
            <h2>Perfil</h2>
            <p>{profile.about.join(" ")}</p>
          </section>

          <section className={styles.block}>
            <h2>Experiencia</h2>
            {experience.map((job) => (
              <div key={job.company} className={styles.entry}>
                <div className={styles.entryHead}>
                  <h3>
                    {job.role} — {job.company}
                  </h3>
                  <span>{job.period}</span>
                </div>
                <ul>
                  {job.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className={styles.block}>
            <h2>Proyectos</h2>
            {projects.map((p) => (
              <div key={p.id} className={styles.entry}>
                <div className={styles.entryHead}>
                  <h3>{p.name}</h3>
                  <span>{p.stack.join(" · ")}</span>
                </div>
                <p>{p.description}</p>
              </div>
            ))}
          </section>

          <section className={styles.block}>
            <h2>Habilidades técnicas</h2>
            <dl className={styles.skills}>
              {skillCategories.map((c) => (
                <div key={c.id}>
                  <dt>{c.title}</dt>
                  <dd>{[...c.skills.map((s) => s.name), ...(c.concepts ?? [])].join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={styles.block}>
            <h2>Formación académica</h2>
            {education.map((e) => (
              <div key={e.title} className={styles.entryHead}>
                <h3>
                  {e.title} — <span className={styles.normal}>{e.institution}</span>
                </h3>
                <span>{e.period}</span>
              </div>
            ))}
          </section>

          <section className={styles.block}>
            <h2>Formación complementaria</h2>
            <div className={styles.entry}>
              <div className={styles.entryHead}>
                <h3>
                  {ciip.title} — <span className={styles.normal}>CIIP LATAM</span>
                </h3>
                <span>
                  {ciip.period} · {ciip.hours}
                </span>
              </div>
              <ul>
                {ciipModules.map((m) => (
                  <li key={m.id}>
                    {m.title} ({m.date})
                  </li>
                ))}
              </ul>
            </div>
            {mongo && (
              <div className={styles.entryHead}>
                <h3>
                  {mongo.title} — <span className={styles.normal}>{mongo.issuer}</span>
                </h3>
                <span>{mongo.date}</span>
              </div>
            )}
          </section>
        </article>
      </main>
    </div>
  );
}
