"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  TbCertificate,
  TbChevronLeft,
  TbChevronRight,
  TbExternalLink,
  TbSchool,
  TbX,
  TbZoomIn,
} from "react-icons/tb";
import { certificates, ciip, education } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import styles from "./Education.module.css";

const modules = certificates.filter((c) => c.issuer === "CIIP LATAM" && !c.featured);

export default function Education() {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(null);

  const open = useCallback((src) => {
    const i = certificates.findIndex((c) => c.src === src);
    if (i >= 0) setIndex(i);
  }, []);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + certificates.length) % certificates.length)),
    []
  );

  // Sincroniza el estado con el <dialog> nativo
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (index !== null && !dlg.open) dlg.showModal();
    if (index === null && dlg.open) dlg.close();
  }, [index]);

  const current = index !== null ? certificates[index] : null;

  return (
    <section id="formacion" className="section" aria-labelledby="edu-title">
      <div className="container">
        <SectionHeading
          id="edu-title"
          index="05"
          kicker="Formación"
          title={
            <>
              Formación académica y <span className="grad-text">certificaciones</span>.
            </>
          }
        />

        <div className={styles.top}>
          {/* ---------- CIIP destacado ---------- */}
          <Reveal className={styles.featuredWrap}>
            <TiltCard as="article" className={`glass holo-border ${styles.featured}`} max={4}>
              <div className={styles.featuredHead}>
                <span className={styles.badge}>
                  <TbCertificate aria-hidden="true" /> Formación complementaria
                </span>
                <span className={`mono ${styles.hours}`}>{ciip.hours}</span>
              </div>
              <h3>{ciip.title}</h3>
              <p className={styles.inst}>
                {ciip.institution} · <span className="mono">{ciip.period}</span>
              </p>

              <ol className={styles.modules}>
                {modules.map((m, i) => (
                  <li key={m.id}>
                    <button type="button" onClick={() => open(m.src)}>
                      <span className={`mono ${styles.modNum}`}>M{i + 1}</span>
                      <span className={styles.modTitle}>{m.title}</span>
                      <span className={`mono ${styles.modDate}`}>{m.date}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className={styles.learned}>
                {ciip.learned.map((l) => (
                  <span key={l} className="chip">
                    {l}
                  </span>
                ))}
              </div>

              <button type="button" className="btn btn-primary" onClick={() => open(ciip.cert)}>
                <TbZoomIn /> Ver certificado general
              </button>
            </TiltCard>
          </Reveal>

          {/* ---------- Académica ---------- */}
          <ul className={styles.academic}>
            {education.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 90} className={`glass ${styles.eduCard}`}>
                <span className={`${styles.eduIcon} ${e.status === "current" ? styles.eduLive : ""}`} aria-hidden="true">
                  <TbSchool />
                </span>
                <div className={styles.eduBody}>
                  <span className={`mono ${styles.eduPeriod}`}>{e.period}</span>
                  <h3>{e.title}</h3>
                  <p>{e.institution}</p>
                </div>
                {e.cert && (
                  <button
                    type="button"
                    className={styles.eduView}
                    onClick={() => open(e.cert)}
                    aria-label={`Ver diploma: ${e.title}`}
                  >
                    <TbZoomIn />
                  </button>
                )}
              </Reveal>
            ))}
          </ul>
        </div>

        {/* ---------- Galería ---------- */}
        <Reveal className={styles.galleryHead}>
          <h3>
            Certificados <span className="mono">({certificates.length})</span>
          </h3>
          <p>Haz clic en cualquier certificado para ampliarlo.</p>
        </Reveal>

        <ul className={styles.gallery}>
          {certificates.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 4) * 60}>
              <button type="button" className={styles.thumb} onClick={() => setIndex(i)}>
                <span className={styles.thumbImg}>
                  <Image
                    src={c.src}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 50vw, (max-width: 980px) 33vw, 260px"
                    className={styles.img}
                  />
                  <span className={styles.zoom} aria-hidden="true">
                    <TbZoomIn />
                  </span>
                </span>
                <span className={styles.thumbText}>
                  <span className={styles.thumbTitle}>{c.title}</span>
                  <span className={`mono ${styles.thumbMeta}`}>
                    {c.issuer} · {c.date}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* ---------- Visor ---------- */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={current ? current.title : "Certificado"}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {current && (
          <div className={styles.dialogInner}>
            <header className={styles.dialogHead}>
              <div>
                <p className={styles.dialogTitle}>{current.title}</p>
                <p className={`mono ${styles.dialogMeta}`}>
                  {current.issuer} · {current.date}
                </p>
              </div>
              <button type="button" className="btn btn-icon" onClick={close} aria-label="Cerrar">
                <TbX />
              </button>
            </header>

            <div className={styles.dialogImg}>
              <Image
                key={current.src}
                src={current.src}
                alt={`Certificado: ${current.title}`}
                width={current.width}
                height={current.height}
                sizes="(max-width: 900px) 92vw, 860px"
                className={styles.full}
              />
            </div>

            <footer className={styles.dialogFoot}>
              <button type="button" className="btn btn-icon" onClick={() => step(-1)} aria-label="Anterior">
                <TbChevronLeft />
              </button>
              <span className="mono">
                {index + 1} / {certificates.length}
              </span>
              <button type="button" className="btn btn-icon" onClick={() => step(1)} aria-label="Siguiente">
                <TbChevronRight />
              </button>
              {current.verify && (
                <a href={current.verify} target="_blank" rel="noopener noreferrer" className="btn">
                  <TbExternalLink /> Verificar en Credly
                </a>
              )}
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
}
