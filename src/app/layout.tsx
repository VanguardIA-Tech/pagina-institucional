import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { InvisibleHeader } from "@/components/InvisibleHeader";

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
        <InvisibleHeader />
        {children}
      </body>
    </html>
  );
}
