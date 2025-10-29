export const metadata = {
  title: "Portafolio Daniel Vidal",
  description: "Portafolio personal desarrollado con Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
