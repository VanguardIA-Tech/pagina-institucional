import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { InvisibleHeader } from "@/components/InvisibleHeader";
import MotionProvider from "@/components/MotionProvider";

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
  metadataBase: new URL("https://vanguardiagrupo.com.br"),
  title: {
    default: "VanguardIA — A arquitetura brasileira de Inteligência Aplicada",
    template: "%s | VanguardIA",
  },
  description:
    "A única arquitetura brasileira de Inteligência Aplicada que une método, certificação, processos e dados soberanos em um único sistema. Da Amazônia para o mundo.",
  keywords: [
    "Inteligência Artificial",
    "IA Aplicada",
    "CNH da IA",
    "DEEP",
    "ICIA",
    "Transformação Digital",
    "Belém",
    "Amazônia",
  ],
  authors: [{ name: "Grupo VanguardIA" }],
  creator: "Grupo VanguardIA",
  publisher: "Grupo VanguardIA",
  alternates: {
    canonical: "https://vanguardiagrupo.com.br",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://vanguardiagrupo.com.br",
    siteName: "VanguardIA",
    title: "VanguardIA — Inteligência Aplicada",
    description:
      "Pessoas, Processos e Tecnologia em camada permanente. +5.994 certificados CNH da IA. +450 empresas atendidas.",
    images: [
      {
        url: "https://directus.vanguardiagrupo.com.br/assets/8cfd3629-a6f2-4386-a3ec-79fe98b638aa",
        width: 1200,
        height: 630,
        alt: "VanguardIA — Arquitetura brasileira de Inteligência Aplicada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VanguardIA — Inteligência Aplicada",
    description: "Pessoas, Processos e Tecnologia em camada permanente.",
    images: [
      "https://directus.vanguardiagrupo.com.br/assets/8cfd3629-a6f2-4386-a3ec-79fe98b638aa",
    ],
  },
  icons: {
    icon: "/logos/logo-vanguardia-mark.png",
    apple: "/logos/logo-vanguardia-mark.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo VanguardIA",
  alternateName: "VanguardIA",
  url: "https://vanguardiagrupo.com.br",
  logo: "https://vanguardiagrupo.com.br/logos/logo-vanguardia-mark.png",
  description:
    "A única arquitetura brasileira de Inteligência Aplicada que une método, certificação, processos e dados soberanos em um único sistema.",
  foundingDate: "2020",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belém",
    addressRegion: "PA",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.instagram.com/grupovanguard.ia/",
    "https://www.linkedin.com/company/grupovanguardiabr/",
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-vg-blue focus:text-white focus:rounded-full focus:outline-none"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <InvisibleHeader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
