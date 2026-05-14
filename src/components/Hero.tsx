"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroParticles = dynamic(() => import("@/components/HeroParticles"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle field — loaded only on client */}
      <HeroParticles />

      {/* Subtle background overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,60,255,0.03)_0%,transparent_50%)] z-[1]" />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.02] z-[2] pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] font-mono tracking-[0.3em] text-vg-blue-soft/70 uppercase mb-8"
        >
          Grupo VanguardIA · Da Amazônia para o mundo · Est. 2020
        </motion.p>

        {/* Main headline — backdrop-blur so it sits ON the particles */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-8"
        >
          <span className="relative inline-block bg-vg-void/40 backdrop-blur-sm px-3 py-1 rounded-2xl">
            A única arquitetura brasileira de
            <br />
            <span className="text-vg-blue-soft">Inteligência Aplicada</span>
            <br />
            que une método, certificação,
            <br />
            processos e dados soberanos
            <br />
            em um único sistema.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg text-vg-text-muted max-w-2xl mx-auto mb-12"
        >
          Com dezenas de agentes de IA operando no dia a dia dos nossos
          clientes. Consequência de um trabalho bem feito.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex items-center justify-center gap-16 text-center"
        >
          {[
            { value: "+5.994", label: "Certificados CNH da IA" },
            { value: "+450", label: "Empresas atendidas" },
            { value: "R$ 1bi+", label: "Sob metodologia ICIA" },
          ].map((stat, i) => (
            <div key={stat.label}>
              <div className="text-4xl md:text-5xl font-mono font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-vg-text-muted mt-2 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="px-8 py-4 bg-vg-blue hover:bg-vg-blue-deep text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,60,255,0.3)]"
          >
            Empresas
          </a>
          <a
            href="#cta"
            className="px-8 py-4 border border-white/10 hover:border-white/30 text-white font-medium rounded-full transition-all duration-300"
          >
            Setor Público
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-vg-text-dim uppercase">
          Escolha por onde você chega
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-4 h-4 border-r-2 border-b-2 border-white/20 rotate-45"
        />
      </motion.div>
    </section>
  );
}
