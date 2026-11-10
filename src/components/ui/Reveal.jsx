"use client";

import { useEffect, useRef } from "react";

/**
 * Revela su contenido cuando entra en el viewport (una sola vez).
 * Usa IntersectionObserver + transiciones CSS: sin librerías de animación.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { "--delay": `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
