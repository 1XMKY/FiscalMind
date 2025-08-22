import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./Providers";
import AuthButtons from "./components/AuthButtons"; // ruta relativa correcta

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FiscalMind",
  description:
    "Declaración de impuestos simplificada para independientes y profesionales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#2F3E40] text-white`}
      >
        <Providers>
          {/* Navbar */}
          <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 items-center">
              {/* Logo */}
              <a
                href="/"
                className="text-2xl italic font-serif text-[#1F2E2F]"
              >
                Fiscalmind
              </a>

              {/* Menú central */}
              <nav className="hidden md:flex justify-center gap-10 text-[#1F2E2F]">
                <a href="#planes" className="hover:opacity-70">
                  Planes
                </a>
                <a href="#sobre" className="hover:opacity-70">
                  Sobre nosotros
                </a>
                <a href="#clientes" className="hover:opacity-70">
                  Testimonios
                </a>
                <a href="#contacto" className="hover:opacity-70">
                  Contacto
                </a>
              </nav>

              {/* Botones de autenticación */}
              <div className="flex justify-end gap-3">
                <AuthButtons />
              </div>
            </div>
          </header>

          {/* Contenido principal */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
