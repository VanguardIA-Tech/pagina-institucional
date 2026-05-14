"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    num: "01",
    name: "ICIA START",
    subtitle: "A entrada estratégica.",
    items: [
      "CNH da IA para áreas críticas",
      "Diagnóstico DEEP inicial",
      "1-2 agentes piloto em produção",
      "Linguagem comum instalada",
      "Ciclo: 6 meses",
    ],
    ideal: "Primeira experiência estruturada com IA aplicada no corporativo.",
    recommended: false,
  },
  {
    num: "02",
    name: "ICIA CORE",
    subtitle: "A transformação multissetorial.",
    items: [
      "CNH da IA corporativa completa",
      "DEEP em todas as áreas críticas",
      "5-15 agentes em produção",
      "Data Lake estruturado",
      "ICIA 360 implantado",
      "Ciclo: 12-18 meses",
    ],
    ideal: "Empresas que já validaram IA e querem escala com governança.",
    recommended: true,
  },
  {
    num: "03",
    name: "ICIA ENTERPRISE",
    subtitle: "A arquitetura permanente.",
    items: [
      "CNH da IA contínua (reciclagem)",
      "DEEP como cultura (não projeto)",
      "Dezenas de agentes autônomos",
      "ICIA OS com Workers AI",
      "Conselho ICIA dedicado",
      "Ciclo: contínuo",
    ],
    ideal: "Organizações que tratam IA como competência institucional, não projeto.",
    recommended: false,
  },
];

const stairVariants = (index: number) => ({
  initial: {
    opacity: 0,
    y: 60 + index * 20,
    scale: 0.92 + index * 0.03,
    rotateX: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      delay: index * 0.15,
      ease: [0.34, 1.56, 0.64, 1] as const,
    },
  },
});

export default function Tiers() {
  return (
    <section aria-label="Níveis de implementação ICIA" className="py-20 md:py-32 px-6 bg-vg-deep">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6"
        >
          03 · Implementação
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl leading-tight mb-6"
        >
          Três níveis.
          <br />
          Uma escada natural.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-vg-text-muted mb-20"
        >
          Cada empresa entra pelo nível certo. Ninguém pula degrau. Ninguém regride.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={stairVariants(i)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              style={{ perspective: "800px" }}
              className={`relative border bg-vg-elev p-8 rounded-2xl flex flex-col ${
                tier.recommended
                  ? "border-vg-blue-soft/40 shadow-[0_0_60px_rgba(31,60,255,0.08)]"
                  : "border-white/[0.04]"
              }`}
            >
              {tier.recommended && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: [0, 1.2, 1], opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-vg-blue text-white text-[10px] font-mono tracking-[0.2em] uppercase rounded-full"
                >
                  Recomendado
                </motion.div>
              )}
              <div className="text-3xl font-mono font-bold text-vg-blue-soft mb-3">
                {tier.num}
              </div>
              <h3 className="text-xl font-medium mb-2">{tier.name}</h3>
              <p className="text-sm text-vg-text-muted mb-6">{tier.subtitle}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-vg-text-muted flex items-start gap-2"
                  >
                    <span className="text-vg-blue-soft mt-1 shrink-0">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-vg-text-dim uppercase mb-1">
                  Ideal para
                </p>
                <p className="text-xs text-vg-text-muted">{tier.ideal}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
