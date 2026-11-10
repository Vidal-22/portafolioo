"use client";

import { useRef, useState } from "react";
import { skillCategories, skillTiers } from "@/data/profile";
import TechIcon from "@/components/ui/TechIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import styles from "./Skills.module.css";

const RADIUS = 39; // % del contenedor orbital
const nodes = skillCategories.map((c, i) => {
  const a = ((-90 + (i * 360) / skillCategories.length) * Math.PI) / 180;
  return { ...c, x: 50 + RADIUS * Math.cos(a), y: 50 + RADIUS * Math.sin(a) };
});

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const tabsRef = useRef([]);
  const current = nodes.find((n) => n.id === active);

  // Navegación con flechas entre pestañas (patrón ARIA tabs)
  const onKeyDown = (e, i) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in keys) {
      e.preventDefault();
      const next = (i + keys[e.key] + nodes.length) % nodes.length;
      setActive(nodes[next].id);
      tabsRef.current[next]?.focus();
    }
  };

  return (
    <section id="habilidades" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="02"
          kicker="Habilidades"
          title={
            <>
              Un stack orientado a <span className="grad-text">construir, probar y medir</span>.
            </>
          }
          sub="Selecciona una especialidad. Cada tecnología indica de dónde viene el conocimiento: si la apliqué en un proyecto, si está respaldada por un certificado o si es formación base."
        />

        <div className={styles.layout}>
          {/* ---------- Mapa orbital ---------- */}
          <Reveal className={styles.orbitWrap}>
            <div className={styles.orbit}>
              <svg className={styles.lines} viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r={RADIUS} className={styles.track} />
                <circle cx="50" cy="50" r={RADIUS - 14} className={styles.trackInner} />
                {nodes.map((n) => (
                  <line
                    key={n.id}
                    x1="50"
                    y1="50"
                    x2={n.x}
                    y2={n.y}
                    className={`${styles.link} ${n.id === active ? styles.linkActive : ""}`}
                  />
                ))}
              </svg>

              <div className={styles.core} aria-hidden="true">
                <span className="mono">{current.code}</span>
                <small>{current.skills.length} tecnologías</small>
              </div>

              <div role="tablist" aria-label="Especialidades" className={styles.tabs}>
                {nodes.map((n, i) => {
                  const selected = n.id === active;
                  return (
                    <button
                      key={n.id}
                      ref={(el) => {
                        tabsRef.current[i] = el;
                      }}
                      role="tab"
                      type="button"
                      id={`tab-${n.id}`}
                      aria-selected={selected}
                      aria-controls={`panel-${n.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActive(n.id)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className={`${styles.node} ${styles[n.accent]} ${selected ? styles.nodeActive : ""}`}
                      style={{ "--x": `${n.x}%`, "--y": `${n.y}%` }}
                    >
                      <span className={`mono ${styles.nodeCode}`} aria-hidden="true">
                        {n.code}
                      </span>
                      <span className={styles.nodeLabel}>{n.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ---------- Paneles ---------- */}
          <Reveal delay={120} className={styles.panels}>
            {nodes.map((n) => (
              <div
                key={n.id}
                role="tabpanel"
                id={`panel-${n.id}`}
                aria-labelledby={`tab-${n.id}`}
                hidden={n.id !== active}
                className={`glass holo-border ${styles.panel}`}
              >
                <header className={styles.panelHead}>
                  <span className={`mono ${styles.panelCode}`}>
                    [{n.code}] · {String(nodes.indexOf(n) + 1).padStart(2, "0")}/
                    {String(nodes.length).padStart(2, "0")}
                  </span>
                  <h3>{n.title}</h3>
                  <p>{n.summary}</p>
                </header>

                <ul className={styles.skillGrid}>
                  {n.skills.map((s, i) => (
                    <li key={s.name} className={styles.skill} style={{ "--i": i }}>
                      <span className={styles.skillIcon}>
                        <TechIcon icon={s.icon} />
                      </span>
                      <span className={styles.skillName}>{s.name}</span>
                      <span className={`${styles.tier} ${styles[`tier_${s.tier}`]}`}>
                        {skillTiers[s.tier].short}
                      </span>
                    </li>
                  ))}
                </ul>

                {n.concepts && (
                  <div className={styles.concepts}>
                    <p className={`mono ${styles.conceptsTitle}`}>{"// "}conocimientos</p>
                    <ul>
                      {n.concepts.map((c) => (
                        <li key={c} className="chip">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <ul className={styles.legend} aria-label="Leyenda de niveles">
              {Object.entries(skillTiers).map(([key, t]) => (
                <li key={key}>
                  <span className={`${styles.tierDot} ${styles[`tier_${key}`]}`} aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
