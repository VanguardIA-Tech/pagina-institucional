import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "VanguardIA — A arquitetura brasileira de Inteligência Aplicada",
  description:
    "A única arquitetura brasileira de Inteligência Aplicada que une método, certificação, processos e dados soberanos em um único sistema. Da Amazônia para o mundo.",
  openGraph: {
    title: "VanguardIA — Inteligência Aplicada",
    description:
      "Pessoas, Processos e Tecnologia em camada permanente. +5.994 certificados CNH da IA. +450 empresas atendidas.",
    images: [
      "https://directus.vanguardiagrupo.com.br/assets/8cfd3629-a6f2-4386-a3ec-79fe98b638aa",
    ],
  },
  icons: {
    icon: "/logos/logo-vanguardia-mark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Fixed header */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/[0.04] bg-vg-void/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/logos/logo-vanguardia-mark.png"
                alt="VanguardIA"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="text-sm font-medium tracking-tight">
                VanguardIA
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.15em] text-vg-text-muted uppercase">
              <a href="#tese" className="hover:text-white transition-colors">Tese</a>
              <a href="#icia" className="hover:text-white transition-colors">ICIA</a>
              <a href="#clientes" className="hover:text-white transition-colors">Clientes</a>
              <a href="#cta" className="px-4 py-2 bg-vg-blue hover:bg-vg-blue-deep text-white rounded-full transition-all">
                Contato
              </a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
