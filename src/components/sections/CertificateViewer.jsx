"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  TbArrowLeft,
  TbCertificate,
  TbChevronLeft,
  TbChevronRight,
  TbDownload,
  TbStarFilled,
  TbX,
  TbZoomIn,
  TbZoomOut,
} from "react-icons/tb";
import styles from "./CertificateViewer.module.css";

/**
 * Botón «Ver certificados» + modal con galería y vista ampliada.
 * Los documentos solo se montan (y descargan) cuando se abre el modal.
 *
 * @param {{ certificates: Array<{id,title,hours,src,width,height,featured?}>, issuer: string }} props
 */
export default function CertificateViewer({ certificates, issuer }) {
  const dialogRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null); // null = vista de galería
  const [zoom, setZoom] = useState(false);

  const total = certificates.length;
  const current = index !== null ? certificates[index] : null;

  const show = (i) => {
    setIndex(i);
    setZoom(false);
  };
  const step = useCallback(
    (d) => {
      setIndex((i) => (i === null ? i : (i + d + total) % total));
      setZoom(false);
    },
    [total]
  );
  const close = () => setOpen(false);

  // Sincroniza el estado con el <dialog> nativo y bloquea el scroll de la página
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      dlg.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && dlg.open) dlg.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onKeyDown = (e) => {
    if (index === null) return;
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };

  const fileName = (c) => `${issuer} - ${c.title}${c.src.slice(c.src.lastIndexOf("."))}`;

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary ${styles.trigger}`}
        onClick={() => {
          setIndex(null);
          setOpen(true);
        }}
        aria-haspopup="dialog"
      >
        <TbCertificate /> Ver certificados
        <span className={styles.count} aria-label={`${total} documentos`}>
          {total}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="cert-dialog-title"
        onClose={() => {
          setOpen(false);
          setIndex(null);
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        onKeyDown={onKeyDown}
      >
        {open && (
          <div className={styles.inner}>
            {/* ---------- Cabecera ---------- */}
            <header className={styles.head}>
              {current ? (
                <button type="button" className={styles.back} onClick={() => setIndex(null)}>
                  <TbArrowLeft aria-hidden="true" /> Todos
                </button>
              ) : null}
              <div className={styles.headText}>
                <p className={`mono ${styles.kicker}`}>
                  {issuer} · {current ? `${index + 1} / ${total}` : `${total} documentos`}
                </p>
                <h2 id="cert-dialog-title" className={styles.title}>
                  {current ? current.title : "Certificados de la formación"}
                </h2>
              </div>
              <button type="button" className="btn btn-icon" onClick={close} aria-label="Cerrar">
                <TbX />
              </button>
            </header>

            {/* ---------- Galería ---------- */}
            {!current && (
              <ul className={styles.grid}>
                {certificates.map((c, i) => (
                  <li key={c.id} className={c.featured ? styles.featuredCell : undefined} style={{ "--i": i }}>
                    <button
                      type="button"
                      className={`${styles.card} ${c.featured ? styles.cardFeatured : ""}`}
                      onClick={() => show(i)}
                    >
                      <span className={styles.thumb}>
                        <Image
                          src={c.src}
                          alt=""
                          fill
                          sizes={c.featured ? "(max-width: 640px) 92vw, 560px" : "(max-width: 640px) 46vw, 280px"}
                          className={styles.thumbImg}
                        />
                        <span className={styles.zoomHint} aria-hidden="true">
                          <TbZoomIn />
                        </span>
                      </span>
                      <span className={styles.cardText}>
                        {c.featured && (
                          <span className={styles.generalBadge}>
                            <TbStarFilled aria-hidden="true" /> Certificado general
                          </span>
                        )}
                        <span className={styles.cardTitle}>{c.title}</span>
                        <span className={`mono ${styles.cardMeta}`}>
                          {c.featured ? "Programa completo" : `Módulo ${i}`} · {c.hours}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {/* ---------- Vista ampliada ---------- */}
            {current && (
              <>
                <div className={`${styles.stage} ${zoom ? styles.stageZoom : ""}`}>
                  {current.featured && (
                    <span className={`${styles.generalBadge} ${styles.stageBadge}`}>
                      <TbStarFilled aria-hidden="true" /> Certificado general
                    </span>
                  )}
                  <button
                    type="button"
                    className={styles.imageBtn}
                    onClick={() => setZoom((z) => !z)}
                    aria-label={zoom ? "Reducir documento" : "Ampliar documento"}
                  >
                    <Image
                      key={current.src}
                      src={current.src}
                      alt={`Certificado: ${current.title}`}
                      width={current.width}
                      height={current.height}
                      sizes={zoom ? "1600px" : "(max-width: 900px) 92vw, 880px"}
                      quality={90}
                      className={styles.full}
                      // ampliado: 2× el tamaño original del documento (desplazable)
                      style={zoom ? { width: Math.max(current.width * 2, 1100) } : undefined}
                    />
                  </button>
                </div>

                <footer className={styles.foot}>
                  <div className={styles.nav}>
                    <button type="button" className="btn btn-icon" onClick={() => step(-1)} aria-label="Certificado anterior">
                      <TbChevronLeft />
                    </button>
                    <button type="button" className="btn btn-icon" onClick={() => step(1)} aria-label="Certificado siguiente">
                      <TbChevronRight />
                    </button>
                  </div>
                  <p className={`mono ${styles.meta}`}>{current.hours}</p>
                  <div className={styles.actions}>
                    <button type="button" className="btn" onClick={() => setZoom((z) => !z)}>
                      {zoom ? <TbZoomOut /> : <TbZoomIn />} {zoom ? "Reducir" : "Ampliar"}
                    </button>
                    <a href={encodeURI(current.src)} download={fileName(current)} className="btn btn-primary">
                      <TbDownload /> Descargar
                    </a>
                  </div>
                </footer>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
