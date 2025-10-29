"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import {
  FaEnvelope,
  FaFilePdf,
  FaUser,
  FaGraduationCap,
  FaTools,
  FaDatabase,
  FaLaptopCode,
  FaRegImages,
  FaPhone,
} from "react-icons/fa";
import "./globals.css";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openModal = (src, title) => {
    setModalSrc(src);
    setModalTitle(title);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalSrc("");
    setModalTitle("");
    document.body.style.overflow = "";
  };

  const handleDownload = async () => {
  const html2pdfModule = await import("html2pdf.js");
  const html2pdf = html2pdfModule.default || html2pdfModule;

  const original = document.getElementById("portafolio");
  const clone = original.cloneNode(true);

  // 1️⃣ Forzar modo exportación PDF
  document.body.classList.add("pdf-export");

  // 2️⃣ Crear contenedor invisible
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.top = "-9999px";
  wrapper.style.left = "-9999px";
  wrapper.style.width = "210mm";
  wrapper.style.background = "#ffffff";
  wrapper.style.color = "#000000";
  wrapper.style.padding = "25px";
  wrapper.style.zIndex = "-1";
  wrapper.style.overflow = "hidden";

  // 3️⃣ Añadir estilos negros por completo
  const style = document.createElement("style");
  style.textContent = `
    * {
      color: #000 !important;
      background: #fff !important;
      text-shadow: none !important;
      box-shadow: none !important;
      border: none !important;
    }
    h1, h2, h3, strong, b {
      color: #000 !important;
      font-weight: bold !important;
    }
    p, li, span, div, a {
      color: #000 !important;
      font-size: 12pt !important;
    }
    ul { list-style-type: disc !important; margin-left: 20px !important; }
  `;
  clone.prepend(style);

  // 4️⃣ Ocultar imágenes, fondos o efectos visuales
  /*const elementsToHide = clone.querySelectorAll(
    "img, svg, .photo-container, .export-btn, .nav-buttons, .modal-overlay, .cert-image"
  );
  elementsToHide.forEach((el) => (el.style.display = "none"));*/

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  const opt = {
    margin: 0.5,
    filename: "Portafolio_Daniel_Vidal.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2, backgroundColor: "#ffffff", useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  try {
    await html2pdf().set(opt).from(clone).save();
  } catch (err) {
    console.error("Error exportando PDF:", err);
  } finally {
    document.body.removeChild(wrapper);
    document.body.classList.remove("pdf-export"); // 🔙 restablece colores
  }
};




  // Certificados placeholders: usa public/certs/cert1.jpg ... cert10.jpg si las subes
 const certificados = [
  { id: 1, title: "ANALISIS PREDICTIVO Y GESTION DE BASE DE DATOS CON R STUDIOS PARA BANCA Y FINANZAS", date: "Enero 2025", src: "/certs/ANALISIS PREDICTIVO Y GESTION DE BASE DE DATOS CON R STUDIOS PARA BANCA Y FINANZAS.png" },
  { id: 2, title: "ANALISIS PREDICTIVO Y MODELOS NO SUPERVISADOS PARA BANA Y FINANZAS", date: "Febrero 2025", src: "/certs/ANALISIS PREDICTIVO Y MODELOS NO SUPERVISADOS PARA BANA Y FINANZAS.png" },
  { id: 3, title: "ANALISIS PREDICTIVO Y MODELOS SUPERVISADOS PARA BANCA Y FINANZAS", date: "Febrero 2025", src: "/certs/ANALISIS PREDICTIVO YY MODELOS SUPERVISADOS PARA BANCA Y FINANZAS.png" },
  { id: 4, title: "VISUALIZACION DE DATOS Y REPORTERIA CON POWER BI", date: "Abril 2025", src: "/certs/VISUALIZACION DE DATOS Y REPORTERIA CON POWER BI.png" },
  { id: 5, title: "PROGRAMACION Y GESTION DE DATOS EN PYTHON PARA LA BANCA Y FINANZAS", date: "Marzo 2025", src: "/certs/PROGRAMACION Y GESTION DE DATOS EN PYTHON PARA LA BANCA Y FINANZAS.png" },
  { id: 6, title: "VISUALIZACION DE DATOS Y REPORTERIA CON POWER BI (2)", date: "Abril 2025", src: "/certs/VISUALIZACION DE DATOS Y REPORTERIA CON POWER BI.png" },
  { id: 7, title: "CERTIFICADO GENERAL CIIP LATAM", date: "Marzo 2025", src: "/certs/General.png" },
  { id: 8, title: "badge mongo", date: "Abril 2025", src: "/certs/badge mongo.png" },
  { id: 9, title: "CERTIFICADO BACHILLER", date: "Noviembre 2021", src: "/certs/Certificado bachiller.jpeg" },
  { id: 10, title: "CERTIFICACIÓN ASISTENCIA Y SOPORTE DE TECNOLOGÍAS DE LA INFORMACIÓN", date: "Mayo 2024", src: "/certs/Certificado Tecncico.jpeg" }
];


  return (
    <main className="app">
      {/* NAV (visible solo en la parte superior: atTop === true) */}
      {atTop && (
        <nav className="nav-buttons">
          <a href="#quien" className="nav-link">
            <FaUser /> Quién soy
          </a>
          <a href="#estudios" className="nav-link">
            <FaGraduationCap /> Estudios
          </a>
          <a href="#habilidades" className="nav-link">
            <FaTools /> Habilidades
          </a>
          <a href="#certificados" className="nav-link">
            <FaRegImages /> Certificados
          </a>
          <a href="#contacto" className="nav-link">
            <FaPhone /> Contáctame
          </a>
          <a
            className="nav-link mail-link"
            href={`mailto:danielvidalardila22@gmail.com`}
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelope /> Enviar correo
          </a>
        </nav>
      )}

      <div id="portafolio" className="portafolio-container">
        {/* HERO / QUIEN SOY */}
        <section id="quien" className="hero-section fade-in">
          <div className="info-container">
            <h1 className="title-glow">¿Quién soy yo?</h1>
            <p className="lead">
              Soy un profesional en sistemas con una base sólida en mantenimiento de hardware y redes,
               actualmente especializado en desarrollo de software y ciencia de datos. A lo largo de mi
                experiencia, he fortalecido mis conocimientos en lenguajes como C++, Java y JavaScript,
                 y en frameworks modernos como React, React Native, Next.js, NestJS y Vite.

              Además, tengo experiencia en el manejo de bases de datos SQL (MySQL) y NoSQL (MongoDB), 
              así como en herramientas de análisis de datos como Python, Power BI y R Studio. Me apasiona
              el desarrollo backend y el análisis de información aplicada a la toma de decisiones, buscando
              siempre crear soluciones eficientes, escalables y orientadas a la innovación tecnológica.
            </p>
            <p className="lead">
              Estoy certificado en Ciencia de Datos (CIIP LATAM). Mi
              objetivo es seguir desarrollándome como desarrollador back-end,
              con enfoque en JavaScript y análisis de datos.
            </p>
            <div className="top-actions">
              <button className="export-btn small" onClick={handleDownload}>
                <FaFilePdf /> Exportar PDF
              </button>

              <a
                className="export-btn small mail"
                href={`mailto:danielvidalardila22@gmail.com`}
                target="_blank"
                rel="noreferrer"
              >
                <FaEnvelope /> Enviar correo
              </a>
            </div>
          </div>

          <div className="photo-container">
            <div className="photo-placeholder pulse-border">
              <Image
                src="/yo.jpg"
                alt="Foto Daniel Vidal"
                width={260}
                height={260}
                className="profile-photo"
                priority
              />
            </div>
          </div>
        </section>

        {/* ESTUDIOS */}
        <section id="estudios" className="section fade-up">
          <h2 className="section-title">
            <FaGraduationCap /> Estudios
          </h2>
          <ul>
            <li>
              <strong>CIIP LATAM</strong> — Ciencia de Datos y Análisis Predictivo aplicado a Banca y Finanzas (Enero 2025 - Abril 2025) — Certificados: 6
            </li>
            <li>
              <strong>Corporación Universitaria Minuto de Dios</strong> — Tecnología en Desarrollo de Software — En curso
            </li>
            <li>
              <strong>Instituto Técnico Cofrem</strong> — Técnico en Asistencia y Soporte de Tecnologías de la Información — 2024 (Graduado)
            </li>
            <li>
              <strong>Colegio Cofrem</strong> — Bachiller Académico — 2021 (Graduado)
            </li>
          </ul>
        </section>

        {/* HABILIDADES */}
        <section id="habilidades" className="section fade-up">
          <h2 className="section-title">
            <FaTools /> Habilidades Técnicas
          </h2>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">
                <FaLaptopCode />
              </div>
              <h3>Lenguajes</h3>
              <div className="skill-items">
                <span className="skill-pill">C++</span>
                <span className="skill-pill">Java</span>
                <span className="skill-pill">JavaScript</span>
                <span className="skill-pill">React</span>
                <span className="skill-pill">React Native</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">
                <FaLaptopCode />
              </div>
              <h3>Desarrollo Web</h3>
              <div className="skill-items">
                <span className="skill-pill">HTML</span>
                <span className="skill-pill">CSS</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">
                <FaDatabase />
              </div>
              <h3>Bases de Datos</h3>
              <div className="skill-items">
                <span className="skill-pill">MySQL</span>
                <span className="skill-pill">Oracle</span>
                <span className="skill-pill">MongoDB</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">
                <FaTools />
              </div>
              <h3>Herramientas</h3>
              <div className="skill-items">
                <span className="skill-pill">SQL</span>
                <span className="skill-pill">NoSQL</span>
                <span className="skill-pill">Análisis de Datos</span>
                <span className="skill-pill">R Studio</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-icon">
                <FaFilePdf />
              </div>
              <h3>Ofimática</h3>
              <div className="skill-items">
                <span className="skill-pill">Word</span>
                <span className="skill-pill">Excel</span>
                <span className="skill-pill">PowerPoint</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA LABORAL */}
<section id="experiencia" className="section fade-up">
  <h2 className="section-title">
    <FaLaptopCode /> Experiencia Laboral
  </h2>
  <ul>
    <li>
      <strong>Caja de Compensación Familiar Cofrem</strong> — 
      Aprendiz en el área de tecnología (Abril 2023 - Octubre 2023) — 6 meses de experiencia práctica en soporte técnico, mantenimiento de equipos y gestión de sistemas informáticos.
    </li>
  </ul>
</section>


        {/* CERTIFICADOS */}
        <section id="certificados" className="section fade-up">
          <h2 className="section-title">
            <FaRegImages /> Certificados
          </h2>

          <p className="muted">Haz click para ampliar. Las miniaturas son marcadores — puedes subir tus imágenes en /public/certs/</p>

          <div className="cert-grid">
            {certificados.map((c) => (
              <div
                key={c.id}
                className="cert-card"
                onClick={() => openModal(c.src, `${c.title} — ${c.date}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openModal(c.src, `${c.title} — ${c.date}`)}
              >
                <div className="cert-thumb">
                  {/* Si subes la imagen en public/certs/cert{n}.jpg, se mostrará aquí */}
                  <Image
                    src={c.src}
                    alt={c.title}
                    width={300}
                    height={200}
                    onError={(e) => {
                      // si la imagen no existe, se mantendrá el placeholder vacío
                      e.currentTarget.style.display = "none";
                    }}
                    className="cert-image"
                  />
                  <div className="cert-placeholder">
                    <FaRegImages size={34} />
                    <span>{c.title}</span>
                    <small>{c.date}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="section contacto fade-up">
          <h2 className="section-title">
            <FaPhone /> Contáctame
          </h2>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:danielvidalardila22@gmail.com">danielvidalardila22@gmail.com</a>
            <br />
            <strong>Teléfono:</strong> +57 305 246 9264
          </p>

          <div className="socials">
            {/* cambia los href por tus enlaces reales */}
            <a href="https://www.linkedin.com/in/daniel-vidal-371165310" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
            <a href="https://github.com/Vidal-22" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
            <a href="https://www.instagram.com/vidal_daniel?igsh=anYwN241ejAzZWZ2" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
          </div>
        </section>
      </div>

      {/* Modal de certificado (overlay + zoom) */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Cerrar">
              ✖
            </button>
            <div className="modal-image-wrapper">
              {/* Si la imagen no existe, muestra placeholder grande */}
              <Image
                src={modalSrc}
                alt={modalTitle}
                width={1000}
                height={800}
                className="modal-image"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="modal-placeholder">
                <FaRegImages size={64} />
                <p>{modalTitle}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
