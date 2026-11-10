"use client";

import { useState } from "react";
import { TbDownload, TbPrinter } from "react-icons/tb";
import styles from "./cv.module.css";

export default function CvActions() {
  const [busy, setBusy] = useState(false);

  const download = async () => {
    const el = document.getElementById("cv-sheet");
    if (!el) return;
    setBusy(true);
    try {
      const mod = await import("html2pdf.js");
      const html2pdf = mod.default || mod;
      await html2pdf()
        .set({
          margin: [8, 8, 10, 8],
          filename: "CV_Daniel_Vidal.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: ["h3", "li"] },
        })
        .from(el)
        .save();
    } catch (err) {
      console.error("Error generando el PDF, usando impresión del navegador:", err);
      window.print();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.actions}>
      <button type="button" onClick={() => window.print()} className={styles.ghost}>
        <TbPrinter aria-hidden="true" /> Imprimir
      </button>
      <button type="button" onClick={download} className={styles.primary} disabled={busy} aria-busy={busy}>
        <TbDownload aria-hidden="true" /> {busy ? "Generando…" : "Descargar PDF"}
      </button>
    </div>
  );
}
