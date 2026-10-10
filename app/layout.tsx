import type { Metadata } from "next";
import "./globals.css";
import "./visual-lessons.css";
import "./visual-overhaul.css";
import { WikiShell } from "@/components/WikiShell";

export const metadata: Metadata = {
  title: { default: "Sistoma Wiki · Atlas de Sol", template: "%s · Sistoma Wiki" },
  description: "La enciclopedia de Sistoma en español. 130 fichas de naves, componentes, materiales y estaciones, 25 guías y herramientas de planificación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body><WikiShell>{children}</WikiShell></body>
    </html>
  );
}
