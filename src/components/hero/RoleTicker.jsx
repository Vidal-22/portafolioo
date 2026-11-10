"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/components/ui/useMotionPrefs";
import styles from "./Hero.module.css";

/** Efecto de escritura para los roles. Texto completo siempre disponible para lectores de pantalla. */
export default function RoleTicker({ roles }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(roles[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = roles[index];
    let delay = deleting ? 38 : 70;
    if (!deleting && chars === word.length) delay = 1900;
    if (deleting && chars === 0) delay = 300;

    const t = setTimeout(() => {
      if (!deleting && chars === word.length) setDeleting(true);
      else if (deleting && chars === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else setChars((c) => c + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [chars, deleting, index, reduced, roles]);

  const text = reduced ? roles[0] : roles[index].slice(0, chars);

  return (
    <span className={styles.ticker}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className={styles.caret} />
      </span>
    </span>
  );
}
