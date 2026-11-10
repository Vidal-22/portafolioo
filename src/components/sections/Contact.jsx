"use client";

import { useState } from "react";
import {
  TbArrowUpRight,
  TbBrandGithub,
  TbBrandLinkedin,
  TbCheck,
  TbCopy,
  TbMail,
  TbPhone,
  TbSend,
} from "react-icons/tb";
import { profile } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import styles from "./Contact.module.css";

const channels = [
  { label: "LinkedIn", value: "Daniel Vidal", href: profile.socials.linkedin, Icon: TbBrandLinkedin, external: true },
  { label: "GitHub", value: "@Vidal-22", href: profile.socials.github, Icon: TbBrandGithub, external: true },
  { label: "Teléfono", value: profile.phone, href: profile.phoneHref, Icon: TbPhone },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const name = data.get("name").toString().trim();
    const email = data.get("email").toString().trim();
    const message = data.get("message").toString().trim();
    const subject = `Contacto desde el portafolio — ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Se abrió tu cliente de correo con el mensaje listo para enviar.");
  };

  return (
    <section id="contacto" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <Reveal className={styles.head}>
          <span className="section-kicker">06 // Contacto</span>
          <h2 id="contact-title" className={styles.title}>
            ¿Construimos algo <span className="grad-text">juntos</span>?
          </h2>
          <p className="section-sub">
            Estoy abierto a conversar sobre oportunidades como desarrollador junior, backend, QA o análisis de datos.
            Escríbeme y te respondo lo antes posible.
          </p>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.channels}>
            <div className={`glass holo-border ${styles.emailCard}`}>
              <span className={styles.chIcon} aria-hidden="true">
                <TbMail />
              </span>
              <div className={styles.chText}>
                <span className={styles.chLabel}>Correo electrónico</span>
                <a href={`mailto:${profile.email}`} className={styles.email}>
                  {profile.email}
                </a>
              </div>
              <button type="button" className="btn btn-icon" onClick={copyEmail} aria-label="Copiar correo">
                {copied ? <TbCheck /> : <TbCopy />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Correo copiado" : ""}
              </span>
            </div>

            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                className={`glass ${styles.channel}`}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className={styles.chIcon} aria-hidden="true">
                  <Icon />
                </span>
                <span className={styles.chText}>
                  <span className={styles.chLabel}>{label}</span>
                  <span className={styles.chValue}>{value}</span>
                </span>
                <TbArrowUpRight className={styles.arrow} aria-hidden="true" />
              </a>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <form className={`glass holo-border ${styles.form}`} onSubmit={onSubmit} noValidate>
              <p className={`mono ${styles.formHead}`}>
                <span className={styles.dot} aria-hidden="true" /> nuevo_mensaje.txt
              </p>
              <div className={styles.row}>
                <label className={styles.field}>
                  <span>Nombre</span>
                  <input name="name" type="text" required autoComplete="name" placeholder="Tu nombre" />
                </label>
                <label className={styles.field}>
                  <span>Correo</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="tu@correo.com" />
                </label>
              </div>
              <label className={styles.field}>
                <span>Mensaje</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  minLength={10}
                  placeholder="Cuéntame sobre la oportunidad o el proyecto…"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                <TbSend /> Enviar mensaje
              </button>
              <p className={styles.note} role="status">
                {status || "El formulario abre tu aplicación de correo con el mensaje preparado."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
