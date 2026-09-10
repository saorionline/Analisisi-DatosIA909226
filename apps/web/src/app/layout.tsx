import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Portafolio — Arquitectura escalable en NestJS",
  description:
    "Portafolio tecnico servido por una API NestJS y renderizado con Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
