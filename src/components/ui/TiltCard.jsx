"use client";

import { useRef } from "react";

/**
 * Tarjeta con inclinación 3D + reflejo que sigue al puntero.
 * Solo reacciona a ratón (no táctil) y respeta prefers-reduced-motion.
 * Escribe variables CSS directamente (sin re-render de React).
 */
export default function TiltCard({ as: Tag = "div", max = 8, className = "", children, ...props }) {
  const ref = useRef(null);
  const frame = useRef(0);

  const canTilt = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e) => {
    const el = ref.current;
    if (!el || !canTilt()) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
      el.style.setProperty("--spot-o", "1");
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--spot-o", "0");
  };

  return (
    <Tag
      ref={ref}
      className={`tilt spotlight ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
