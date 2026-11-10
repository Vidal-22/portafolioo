import { TbBrandGithub, TbExternalLink, TbUser } from "react-icons/tb";
import { projects } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import TechIcon from "@/components/ui/TechIcon";
import ProjectVisual from "./ProjectVisual";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="proyectos" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="03"
          kicker="Proyectos"
          title={
            <>
              Soluciones <span className="grad-text">reales</span>, de la base de datos a la interfaz.
            </>
          }
          sub="Aplicaciones móviles con autenticación y datos multi-tenant, automatización de pruebas y plataformas web."
        />

        <ul className={styles.grid}>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 3) * 90} className={i < 2 ? styles.wide : styles.narrow}>
              <TiltCard as="article" className={`glass holo-border ${styles.card}`} max={5} aria-labelledby={`p-${p.id}`}>
                <ProjectVisual type={p.visual} />

                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                    <span>{p.kind}</span>
                  </div>

                  <h3 id={`p-${p.id}`} className={styles.name}>
                    {p.name}
                  </h3>
                  <p className={styles.desc}>{p.description}</p>

                  <ul className={styles.features} aria-label="Funcionalidades principales">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <p className={styles.role}>
                    <TbUser aria-hidden="true" />
                    <span>
                      <strong>Mi participación: </strong>
                      {p.role}
                    </span>
                  </p>

                  <ul className={styles.stack} aria-label="Tecnologías">
                    {p.stack.map((t) => (
                      <li key={t} className="chip">
                        <TechIcon name={t} /> {t}
                      </li>
                    ))}
                  </ul>

                  {(p.github || p.demo) && (
                    <div className={styles.links}>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn">
                          <TbBrandGithub /> Código
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          <TbExternalLink /> Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
