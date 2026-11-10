import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, SITE_URL } from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

const title = `${profile.name} — Desarrollador de Software | Backend · QA · Data`;
const description =
  "Portafolio de Daniel Vidal, desarrollador de software junior en Colombia. Backend, bases de datos (PostgreSQL, Supabase, SQL Server, MongoDB), QA Testing y automatización (Puppeteer, Jest, Playwright) y análisis de datos (Python, R, Power BI).";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  applicationName: `${profile.name} · Portafolio`,
  authors: [{ name: profile.fullName, url: profile.socials.github }],
  creator: profile.fullName,
  keywords: [
    "Daniel Vidal",
    "Daniel Esteban Vidal Ardila",
    "desarrollador de software",
    "backend developer",
    "QA tester",
    "automatización de pruebas",
    "data analytics",
    "Next.js",
    "Supabase",
    "PostgreSQL",
    "Villavicencio",
    "Colombia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: SITE_URL,
    siteName: `${profile.name} · Portafolio`,
    title,
    description,
    firstName: "Daniel",
    lastName: "Vidal",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#03050c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  jobTitle: "Desarrollador de Software Junior",
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Villavicencio", addressCountry: "CO" },
  sameAs: [profile.socials.github, profile.socials.linkedin],
  knowsAbout: ["Desarrollo backend", "Bases de datos", "QA Testing", "Automatización de pruebas", "Análisis de datos"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Corporación Universitaria Minuto de Dios" },
    { "@type": "EducationalOrganization", name: "Instituto Técnico Cofrem" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <div className="ambient" aria-hidden="true" />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
