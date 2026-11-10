"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/components/ui/useMotionPrefs";
import styles from "./Hero.module.css";

// Three.js solo se descarga en el cliente y después del primer render.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => null });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function HeroVisual() {
  const wrap = useRef(null);
  const reduced = useReducedMotion();
  const [env, setEnv] = useState(null); // { webgl, simple }
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);

  // Detectar capacidades (después de hidratar)
  useEffect(() => {
    const small = window.matchMedia("(max-width: 760px)").matches;
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
    const saveData = navigator.connection?.saveData === true;
    // setState en efecto: lectura única de capacidades del navegador tras hidratar
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv({ webgl: hasWebGL() && !saveData, simple: small || lowCores });
  }, []);

  // Pausar el render cuando el hero sale de pantalla
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={styles.visual}>
      {/* Fallback / base CSS: siempre presente, la escena 3D aparece encima */}
      <div className={`${styles.fallback} ${ready ? styles.fallbackHidden : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {env?.webgl && (
        <div className={`${styles.canvas} ${ready ? styles.canvasReady : ""}`}>
          <HeroScene simple={env.simple} reduced={reduced} active={active} onReady={() => setReady(true)} />
        </div>
      )}

      <div className={styles.avatar}>
        <div className={styles.avatarRing} aria-hidden="true" />
        <Image
          src={profile.photo}
          alt={`Fotografía de ${profile.fullName}`}
          width={320}
          height={320}
          sizes="(max-width: 760px) 44vw, 240px"
          priority
          className={styles.photo}
        />
      </div>

      {/* Etiquetas HUD */}
      <div className={`${styles.hud} ${styles.hudTop}`} aria-hidden="true">
        <span className={styles.dot} /> SYS.ONLINE
      </div>
      <div className={`${styles.hud} ${styles.hudLeft}`} aria-hidden="true">
        &lt;backend /&gt;
      </div>
      <div className={`${styles.hud} ${styles.hudRight}`} aria-hidden="true">
        expect(qa).toPass()
      </div>
      <div className={`${styles.hud} ${styles.hudBottom}`} aria-hidden="true">
        SELECT * FROM data;
      </div>
    </div>
  );
}
