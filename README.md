# Portafolio — Daniel Vidal

Portafolio profesional de **Daniel Esteban Vidal Ardila**, desarrollador de software junior (backend, QA testing y análisis de datos).

**Demo:** https://portafolioo-beta.vercel.app

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) para la escena 3D del hero
- CSS Modules + design tokens en `src/app/globals.css` (sin framework CSS)
- `react-icons` para iconografía, `html2pdf.js` para descargar el CV en PDF

## Estructura

```
src/
├─ app/
│  ├─ layout.jsx            # fuentes, metadata SEO, JSON-LD
│  ├─ page.jsx              # composición de secciones
│  ├─ cv/                   # CV imprimible / descargable en PDF (/cv)
│  ├─ opengraph-image.jsx   # imagen Open Graph generada
│  ├─ icon.svg, robots.js, sitemap.js
│  └─ globals.css           # tokens, utilidades, fondo
├─ components/
│  ├─ Navbar.jsx, Footer.jsx
│  ├─ hero/                 # Hero, escena 3D (HeroScene), visual con fallback
│  ├─ sections/             # About, Skills, Projects, Experience, Education, Contact
│  └─ ui/                   # Reveal, TiltCard, TechIcon, SectionHeading, hooks
└─ data/profile.js          # ← TODO el contenido (textos, proyectos, formación, enlaces)
```

Para actualizar información **solo edita `src/data/profile.js`**. Los comentarios `TODO` marcan datos por confirmar.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Rendimiento y accesibilidad

- La escena 3D se carga de forma diferida (solo cliente), se pausa fuera de pantalla, usa una versión simplificada en móviles/equipos con pocos núcleos y se muestra un fallback CSS sin WebGL.
- Con `prefers-reduced-motion` las animaciones se desactivan y la escena se renderiza estática.
- Navegación por teclado (skip link, pestañas ARIA en habilidades, `<dialog>` nativo para certificados).

## Despliegue

Conectado a Vercel: cada push a `main` despliega automáticamente. No requiere variables de entorno.
