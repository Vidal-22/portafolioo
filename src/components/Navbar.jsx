"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TbMenu2, TbX, TbDownload } from "react-icons/tb";
import { navItems, profile } from "@/data/profile";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);

  // Barra de progreso + estado "scrolled" (sin re-render por frame)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Scrollspy
  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menú móvil: bloquear scroll + cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${open ? styles.menuOpen : ""}`}
    >
      <nav className={styles.nav} aria-label="Principal">
        <a href="#inicio" className={styles.brand} aria-label={`${profile.name}, ir al inicio`}>
          <span className={styles.logo} aria-hidden="true">
            {profile.initials}
          </span>
          <span className={styles.brandText}>
            VIDAL<span className={styles.slash}> / </span>DEV
          </span>
        </a>

        <ul className={styles.links}>
          {navItems.slice(1).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${styles.link} ${active === item.id ? styles.active : ""}`}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/cv" className={`btn ${styles.cv}`}>
            <TbDownload /> CV
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <TbX /> : <TbMenu2 />}
          </button>
        </div>
      </nav>

      <div className={styles.progress} aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ""}`}
        hidden={!open}
      >
        <ul>
          {navItems.map((item, i) => (
            <li key={item.id} style={{ "--i": i }}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={active === item.id ? styles.active : ""}
              >
                <span className="mono">{String(i).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/cv" className="btn btn-primary" onClick={() => setOpen(false)}>
          <TbDownload /> Descargar CV
        </Link>
      </div>
    </header>
  );
}
