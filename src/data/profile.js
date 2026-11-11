/**
 * Fuente única de verdad del contenido del portafolio.
 * Edita este archivo para actualizar textos, enlaces, proyectos o formación
 * sin tocar los componentes visuales.
 *
 * Marcas "TODO" = datos personales que debes confirmar o completar.
 */

export const SITE_URL = "https://portafolioo-beta.vercel.app";

export const profile = {
  name: "Daniel Vidal",
  fullName: "Daniel Esteban Vidal Ardila",
  initials: "DV",
  title: "Desarrollador de Software Junior",
  roles: ["Backend Developer", "QA Tester", "Data Analytics", "Desarrollador de Software"],
  location: "Villavicencio, Meta · Colombia",
  email: "danielvidalardila22@gmail.com",
  phone: "+57 305 246 9264",
  phoneHref: "tel:+573052469264",
  photo: "/yo.jpeg",
  socials: {
    github: "https://github.com/Vidal-22",
    linkedin: "https://www.linkedin.com/in/daniel-vidal-371165310",
    instagram: "https://www.instagram.com/vidal_daniel",
  },
  tagline:
    "Construyo soluciones de software con foco en backend, bases de datos, calidad y datos: desde el modelo relacional y la API hasta las pruebas automatizadas y el análisis de la información.",
  about: [
    "Soy desarrollador de software con una base técnica que empezó en el hardware: soporte, redes y mantenimiento de equipos. Esa experiencia me dio algo que hoy aplico al código: entender cómo fallan los sistemas y cómo resolver incidentes con método.",
    "Hoy me enfoco en el desarrollo backend y la gestión de bases de datos —PostgreSQL, Supabase, MySQL, MongoDB— construyendo aplicaciones con autenticación, roles y seguridad a nivel de fila (RLS). Complemento el desarrollo con QA: pruebas funcionales, de integración y automatización con Puppeteer, Jest y Playwright.",
    "Mi formación en Ciencia de Datos y Análisis Predictivo me permite trabajar con Python, R Studio, SQL Server y Power BI para convertir datos en decisiones.",
  ],
  highlights: [
    { value: "4", label: "proyectos de software" },
    { value: "350 h", label: "formación certificada en datos" },
    { value: "2", label: "experiencias en tecnología" },
    { value: "QA", label: "pruebas manuales y automatizadas" },
  ],
  focus: [
    { id: "backend", label: "Backend & APIs", text: "Lógica de negocio, APIs REST e integración con servicios externos." },
    { id: "db", label: "Bases de datos", text: "Modelado relacional, SQL, autenticación y Row Level Security." },
    { id: "qa", label: "QA & Automatización", text: "Pruebas funcionales, de integración y automatizadas en navegador." },
    { id: "data", label: "Análisis de datos", text: "EDA, limpieza, visualización y modelos predictivos." },
  ],
};

/**
 * Niveles de conocimiento justificables:
 *  - "proyecto":    usado en uno de los proyectos listados abajo
 *  - "certificado": respaldado por un certificado del portafolio
 *  - "base":        conocimiento adquirido en formación académica / práctica
 */
export const skillTiers = {
  proyecto: { label: "Aplicado en proyectos", short: "Proyecto" },
  certificado: { label: "Formación certificada", short: "Certificado" },
  base: { label: "Conocimiento base", short: "Base" },
};

export const skillCategories = [
  {
    id: "lang",
    title: "Lenguajes",
    code: "LANG",
    accent: "cyan",
    summary: "Lenguajes con los que programo lógica, apps y análisis.",
    skills: [
      { name: "JavaScript", icon: "js", tier: "proyecto" },
      { name: "Dart", icon: "dart", tier: "proyecto" },
      { name: "Python", icon: "python", tier: "certificado" },
      { name: "Java", icon: "java", tier: "base" },
      { name: "C++", icon: "cpp", tier: "base" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    code: "API",
    accent: "blue",
    summary: "Servicios, lógica de negocio e integración entre sistemas.",
    skills: [
      { name: "Node.js", icon: "node", tier: "proyecto" },
      { name: "Laravel", icon: "laravel", tier: "proyecto" },
      { name: "Integración con servicios externos", icon: "plug", tier: "proyecto" },
      { name: "APIs REST", icon: "api", tier: "base" },
      { name: "NestJS", icon: "nest", tier: "base" },
      { name: "Python", icon: "python", tier: "certificado" },
      { name: "Java", icon: "java", tier: "base" },
    ],
  },
  {
    id: "db",
    title: "Bases de datos",
    code: "DB",
    accent: "violet",
    summary: "Modelado, consultas y seguridad de la información.",
    skills: [
      { name: "PostgreSQL", icon: "postgres", tier: "proyecto" },
      { name: "Supabase", icon: "supabase", tier: "proyecto" },
      { name: "SQL Server", icon: "sql", tier: "certificado" },
      { name: "MongoDB", icon: "mongo", tier: "certificado" },
      { name: "MySQL", icon: "mysql", tier: "base" },
      { name: "Oracle Database", icon: "oracle", tier: "base" },
    ],
    concepts: [
      "Modelado de bases de datos",
      "Diseño de tablas y relaciones",
      "Consultas SQL",
      "Operaciones CRUD",
      "Integración BD ↔ aplicación",
      "Autenticación y autorización",
      "Row Level Security (RLS)",
    ],
  },
  {
    id: "qa",
    title: "QA & Testing",
    code: "QA",
    accent: "cyan",
    summary: "Calidad de software: pruebas manuales y automatizadas.",
    skills: [
      { name: "Puppeteer", icon: "puppeteer", tier: "proyecto" },
      { name: "Jest", icon: "jest", tier: "proyecto" },
      { name: "Playwright", icon: "playwright", tier: "proyecto" },
      { name: "Conceptos de CI/CD", icon: "cicd", tier: "base" },
    ],
    concepts: [
      "Pruebas manuales",
      "Pruebas funcionales",
      "Pruebas no funcionales",
      "Pruebas de integración",
      "Pruebas de aceptación",
      "Pruebas de usabilidad",
      "Pruebas de seguridad",
      "Pruebas de rendimiento",
      "Validación de interfaces",
      "Inspección de elementos web",
      "Emulación de dispositivos móviles",
      "Documentación de errores",
    ],
  },
  {
    id: "data",
    title: "Ciencia de datos",
    code: "DATA",
    accent: "violet",
    summary: "Formación CIIP LATAM en análisis predictivo para banca y finanzas.",
    skills: [
      { name: "Python (análisis)", icon: "python", tier: "certificado" },
      { name: "R Studio", icon: "r", tier: "certificado" },
      { name: "Power BI", icon: "powerbi", tier: "certificado" },
      { name: "SQL Server", icon: "sql", tier: "certificado" },
      { name: "Modelos predictivos", icon: "brain", tier: "certificado" },
      { name: "MongoDB", icon: "mongo", tier: "certificado" },
    ],
    concepts: [
      "Análisis exploratorio (EDA)",
      "Limpieza y transformación",
      "Visualización de información",
      "Análisis de bases de datos",
      "Modelos supervisados",
      "Modelos no supervisados",
      "Análisis estadístico",
    ],
  },
  {
    id: "front",
    title: "Frontend & Mobile",
    code: "UI",
    accent: "blue",
    summary: "Interfaces web y aplicaciones móviles multiplataforma.",
    skills: [
      { name: "React Native", icon: "react", tier: "base" },
      { name: "Flutter", icon: "flutter", tier: "proyecto" },
      { name: "React", icon: "react", tier: "proyecto" },
      { name: "Next.js", icon: "next", tier: "proyecto" },
      { name: "HTML5", icon: "html", tier: "proyecto" },
      { name: "CSS3", icon: "css", tier: "proyecto" },
      { name: "Vite", icon: "vite", tier: "base" },
    ],
  },
  {
    id: "tools",
    title: "Herramientas",
    code: "DEV",
    accent: "cyan",
    summary: "Entorno de trabajo, control de versiones y despliegue.",
    skills: [
      { name: "Git", icon: "git", tier: "proyecto" },
      { name: "GitHub", icon: "github", tier: "proyecto" },
      { name: "Vercel", icon: "vercel", tier: "proyecto" },
      { name: "npm", icon: "npm", tier: "proyecto" },
      { name: "Visual Studio Code", icon: "vscode", tier: "proyecto" },
      { name: "Android Studio", icon: "android", tier: "base" },
      { name: "IntelliJ IDEA", icon: "intellij", tier: "base" },
      { name: "PowerShell", icon: "terminal", tier: "base" },
    ],
  },
];

export const projects = [
  {
    id: "lechera",
    name: "Gestión Lechera Inteligente",
    kind: "App multiplataforma · Agro-tech",
    visual: "mobile-chart",
    description:
      "Aplicación para fincas lecheras que centraliza el registro de animales, la producción de leche, el peso y la salud del hato con historial individual.",
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL"],
    features: [
      "Registro de animales y razas",
      "Control de producción de leche",
      "Seguimiento de peso",
      "Enfermedades y tratamientos",
      "Historial individual por animal",
    ],
    // TODO: verifica/ajusta tu participación exacta.
    role: "Desarrollo de la app en Flutter y del modelo de datos relacional en Supabase/PostgreSQL.",
    github: null, // TODO
    demo: null,
  },
  {
    id: "qa",
    name: "Automatización QA",
    kind: "Testing · Automatización web",
    visual: "terminal",
    description:
      "Suite de pruebas automatizadas sobre aplicaciones y páginas web: navegación, validación de elementos, extracción de datos y emulación de dispositivos.",
    stack: ["JavaScript", "Puppeteer", "Jest", "Playwright"],
    features: [
      "Automatización de navegación",
      "Extracción de información",
      "Validación de elementos",
      "Pruebas de interfaces",
      "Emulación de dispositivos",
      "Verificación de comportamiento",
    ],
    role: "Diseño y escritura de los scripts de prueba, aserciones y escenarios de emulación móvil.",
    github: null, // TODO
    demo: null,
  },
  {
    id: "ia-etica",
    name: "Plataforma de IA Ética",
    kind: "Proyecto académico · Innovación",
    visual: "ai",
    description:
      "Plataforma web inteligente para fortalecer el uso ético de la inteligencia artificial en entornos escolares.",
    stack: ["WordPress", "Laravel", "Chatbot", "Recomendador"],
    features: [
      "Chatbot formativo",
      "Tutor ético",
      "Recomendador de recursos educativos",
      "Contenido para comunidad escolar",
    ],
    role: "Proyecto académico de innovación tecnológica: diseño de la plataforma y sus componentes inteligentes.",
    github: null, // TODO
    demo: null,
  },
  {
    id: "portfolio",
    name: "Portafolio Profesional",
    kind: "Web · 3D interactivo",
    visual: "web",
    description:
      "Este sitio: Next.js con escena 3D en tiempo real (Three.js / React Three Fiber), SEO técnico y despliegue continuo en Vercel.",
    stack: ["Next.js", "React", "Three.js", "CSS", "Vercel"],
    features: [
      "Escena 3D adaptativa",
      "Diseño responsive",
      "Accesibilidad y movimiento reducido",
      "SEO y Open Graph",
    ],
    role: "Diseño, desarrollo y despliegue completo.",
    github: "https://github.com/Vidal-22/portafolioo",
    demo: SITE_URL,
  },
];

export const experience = [
  {
    company: "TicTelco",
    role: "Técnico de Sistemas",
    // TODO: confirma el año de inicio (7 de mayo de ____).
    period: "7 de mayo — Actualidad",
    current: true,
    tasks: [
      "Soporte técnico a usuarios y atención de incidentes",
      "Mantenimiento preventivo y correctivo de equipos",
      "Diagnóstico y solución de problemas tecnológicos",
    ],
    tags: ["Soporte", "Incidentes", "Hardware", "Software"],
  },
  {
    company: "Cofrem Villavicencio",
    role: "Aprendiz — Área de Tecnología",
    period: "Abril 2023 — Octubre 2023",
    current: false,
    tasks: [
      "Mantenimiento y soporte de equipos informáticos",
      "Atención a usuarios y soporte de hardware y software",
      "Apoyo en redes y sistemas",
      "Configuración y mantenimiento de equipos",
      "Documentación de actividades técnicas",
    ],
    tags: ["Redes", "Soporte", "Documentación"],
  },
];

/**
 * Formación académica, en orden de relevancia.
 *  status: "current" (en curso) | "pending" (materias finalizadas, pendiente de grado) | "done" (finalizado)
 *  badge:  etiqueta visible en la tarjeta
 *  period: texto de estado usado en el CV (/cv)
 */
export const education = [
  {
    id: "ingenieria",
    title: "Ingeniería de Software",
    institution: "Corporación Escuela Tecnológica del Oriente – Instituto de Educación Superior",
    status: "current",
    badge: "En curso · Séptimo semestre",
    semester: "07",
    period: "En curso · Séptimo semestre",
    description:
      "Actualmente cursando séptimo semestre de Ingeniería de Software, fortaleciendo conocimientos en desarrollo de software, arquitectura de aplicaciones, programación y tecnologías informáticas.",
    focus: ["Desarrollo de software", "Arquitectura de aplicaciones", "Programación", "Tecnologías informáticas"],
  },
  {
    id: "ciip",
    complementary: true, // formación complementaria (en el CV va en su propio bloque)
    title: "Ciencia de Datos y Análisis Predictivo aplicado a Banca y Finanzas",
    institution: "CIIP LATAM",
    status: "done",
    badge: "Finalizado",
    kicker: "Formación complementaria",
    period: "25 de enero de 2025 — 26 de abril de 2025",
    hours: "350 horas académicas",
    description:
      "Formación complementaria en ciencia de datos aplicada al sector financiero: análisis de bases de datos, programación en Python y R, análisis estadístico, modelos predictivos y visualización de información con Power BI.",
    focus: [
      "Ciencia de datos",
      "Análisis de bases de datos",
      "Python",
      "R Studio",
      "Análisis estadístico",
      "Modelos predictivos",
      "Power BI",
      "Análisis de información financiera",
      "MongoDB",
    ],
    certificatesIssuer: "CIIP LATAM", // los documentos se toman de `certificates`
  },
  {
    id: "tecnologia",
    title: "Tecnología en Desarrollo de Software",
    institution: "Corporación Universitaria Minuto de Dios – UNIMINUTO",
    status: "pending",
    badge: "Pendiente de grado",
    period: "Materias finalizadas · Pendiente de grado",
    description:
      "Plan de estudios finalizado en Tecnología en Desarrollo de Software. Actualmente pendiente de culminar el proceso de grado y recibir el título profesional de tecnólogo.",
  },
  {
    id: "tecnico",
    title: "Técnico en Asistencia y Soporte de TI",
    institution: "Instituto Técnico Cofrem",
    status: "done",
    badge: "Finalizado",
    period: "Finalizado",
  },
  {
    id: "bachiller",
    title: "Bachiller Académico",
    institution: "Colegio Cofrem",
    status: "done",
    badge: "Finalizado",
    period: "Finalizado",
  },
];

export const ciip = education.find((e) => e.id === "ciip");

export const certificates = [
  {
    id: "ciip-general",
    title: "Ciencia de Datos y Análisis Predictivo aplicado a Banca y Finanzas",
    issuer: "CIIP LATAM",
    hours: "350 horas académicas",
    src: "/certs/General.png",
    width: 626,
    height: 439,
    featured: true,
  },
  {
    id: "mongo",
    title: "Building GenAI Applications with MongoDB",
    issuer: "MongoDB",
    date: "Octubre 2025",
    src: "/certs/badge mongo.png",
    width: 553,
    height: 431,
    verify: "https://www.credly.com/go/Zs546x5b",
  },
  {
    id: "r",
    title: "Análisis Predictivo y Gestión de Bases de Datos con R Studio",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/ANALISIS PREDICTIVO Y GESTION DE BASE DE DATOS CON R STUDIOS PARA BANCA Y FINANZAS.png",
    width: 736,
    height: 520,
  },
  {
    id: "python",
    title: "Programación y Gestión de Datos en Python",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/PROGRAMACION Y GESTION DE DATOS EN PYTHON PARA LA BANCA Y FINANZAS.png",
    width: 543,
    height: 390,
  },
  {
    id: "sql",
    title: "Gestión de Datos y Análisis Financiero con SQL Server",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/GESTION DE DATOS Y ANALISIS FINANCIERA CON SQL.png",
    width: 626,
    height: 442,
  },
  {
    id: "powerbi",
    title: "Visualización de Datos y Automatización de Informes con Power BI",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/VISUALIZACION DE DATOS Y REPORTERIA CON POWER BI.png",
    width: 586,
    height: 414,
  },
  {
    id: "supervised",
    title: "Análisis Predictivo y Modelos Supervisados",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/ANALISIS PREDICTIVO YY MODELOS SUPERVISADOS PARA BANCA Y FINANZAS.png",
    width: 486,
    height: 341,
  },
  {
    id: "unsupervised",
    title: "Análisis Predictivo y Modelos No Supervisados",
    issuer: "CIIP LATAM",
    hours: "60 horas académicas",
    src: "/certs/ANALISIS PREDICTIVO Y MODELOS NO SUPERVISADOS PARA BANA Y FINANZAS.png",
    width: 642,
    height: 450,
  },
  {
    id: "tecnico",
    title: "Técnico en Asistencia y Soporte de TI",
    issuer: "Instituto Técnico Cofrem",
    date: "Mayo 2024",
    src: "/certs/Certificado Tecncico.jpeg",
    width: 1037,
    height: 1600,
  },
  {
    id: "bachiller",
    title: "Bachiller Académico",
    issuer: "Colegio Cofrem",
    date: "Noviembre 2021",
    src: "/certs/Certificado bachiller.jpeg",
    width: 1072,
    height: 1600,
  },
];

export const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "formacion", label: "Formación" },
  { id: "contacto", label: "Contacto" },
];
