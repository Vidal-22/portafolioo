import Link from "next/link";
import { TbArrowDown, TbArrowUpRight, TbBrandGithub, TbBrandLinkedin, TbDownload, TbMapPin } from "react-icons/tb";
import { profile } from "@/data/profile";
import TechIcon from "@/components/ui/TechIcon";
import HeroVisual from "./HeroVisual";
import RoleTicker from "./RoleTicker";
import styles from "./Hero.module.css";

const coreStack = [
  { icon: "node", name: "Node.js" },
  { icon: "postgres", name: "PostgreSQL" },
  { icon: "supabase", name: "Supabase" },
  { icon: "react", name: "React / React Native" },
  { icon: "flutter", name: "Flutter" },
  { icon: "puppeteer", name: "Puppeteer" },
  { icon: "python", name: "Python" },
];

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={`${styles.kicker} ${styles.enter}`} style={{ "--d": "0ms" }}>
            <TbMapPin aria-hidden="true" /> {profile.location}
          </p>

          <h1 id="hero-title" className={`${styles.title} ${styles.enter}`} style={{ "--d": "80ms" }}>
            <span className={styles.hello}>Hola, soy</span>
            <span className={styles.name}>
              Daniel <span className="grad-text">Vidal</span>
            </span>
          </h1>

          <p className={`${styles.role} ${styles.enter}`} style={{ "--d": "160ms" }}>
            <span className={styles.roleMain}>{profile.title}</span>
            <span className={styles.roleSep} aria-hidden="true">
              {"//"}
            </span>
            <RoleTicker roles={profile.roles.slice(0, 3)} />
          </p>

          <p className={`${styles.tagline} ${styles.enter}`} style={{ "--d": "240ms" }}>
            {profile.tagline}
          </p>

          <div className={`${styles.ctas} ${styles.enter}`} style={{ "--d": "320ms" }}>
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos <TbArrowUpRight />
            </a>
            <Link href="/cv" className="btn">
              <TbDownload /> Descargar CV
            </Link>
            <div className={styles.socials}>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                aria-label="GitHub (se abre en una pestaña nueva)"
              >
                <TbBrandGithub />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-icon"
                aria-label="LinkedIn (se abre en una pestaña nueva)"
              >
                <TbBrandLinkedin />
              </a>
            </div>
          </div>

          <ul className={`${styles.stack} ${styles.enter}`} style={{ "--d": "400ms" }} aria-label="Stack principal">
            {coreStack.map((s) => (
              <li key={s.name} title={s.name}>
                <TechIcon icon={s.icon} />
                <span className="sr-only">{s.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.visualWrap} ${styles.enterScale}`}>
          <HeroVisual />
        </div>
      </div>

      <a href="#sobre-mi" className={styles.scrollCue} aria-label="Ir a la sección Sobre mí">
        <span className="mono">scroll</span>
        <TbArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
