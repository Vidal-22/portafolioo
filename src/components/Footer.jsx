import { TbArrowUp, TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbMail } from "react-icons/tb";
import { profile } from "@/data/profile";
import styles from "./Footer.module.css";

const links = [
  { href: profile.socials.github, label: "GitHub", Icon: TbBrandGithub },
  { href: profile.socials.linkedin, label: "LinkedIn", Icon: TbBrandLinkedin },
  { href: profile.socials.instagram, label: "Instagram", Icon: TbBrandInstagram },
  { href: `mailto:${profile.email}`, label: "Correo", Icon: TbMail },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.name}>{profile.fullName}</p>
          <p className="mono">Software Developer · Backend · QA · Data</p>
        </div>

        <ul className={styles.links}>
          {links.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <a href="#inicio" className={styles.top}>
          Volver arriba <TbArrowUp aria-hidden="true" />
        </a>
      </div>
      <p className={`container mono ${styles.copy}`}>
        © {new Date().getFullYear()} Daniel Vidal — Hecho con Next.js, Three.js y desplegado en Vercel.
      </p>
    </footer>
  );
}
