"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clients = [
  { name: "BBB", logo: "/logos/logo-BBB.jpg" },
  { name: "Pará Ferro", logo: "/logos/paraferro.png" },
  { name: "Grupo Mega", logo: "/logos/grupo-mega.jpg" },
  { name: "Grupo Lotus", logo: "/logos/grupo-lotus.jpg" },
  { name: "CF Distribuidora", logo: "/logos/cf-distribuidora.jpg" },
  { name: "MedNutri", logo: "/logos/mednutri.jpg" },
  { name: "Silveira Athias", logo: "/logos/Athias_LogoCor@4x.png" },
  { name: "Alves Martins", logo: "/logos/alves-martins.jpg" },
  { name: "Nativa Uniformes", logo: "/logos/nativa-uniformes.jpg" },
  { name: "Fibra", logo: "/logos/fibra.jpg" },
  { name: "Mave", logo: "/logos/mave.png" },
  { name: "Silnave", logo: "/logos/silnave-navegacao-s-a.png" },
  { name: "Nevoni", logo: "/logos/nevoni.jpg" },
  { name: "Cabotia", logo: "/logos/cabotia.jpg" },
  { name: "Facilita Serviços", logo: "/logos/facilita-servicos-terceirizados-ltda.jpg" },
  { name: "It Protect", logo: "/logos/it-protect-brasil.jpg" },
  { name: "Toca Hub", logo: "/logos/toca-hub-data-lake.jpg" },
  { name: "Supermercado Econômico", logo: "/logos/supermercados-economico.jpg" },
  { name: "Dal Ferragens", logo: "/logos/dal-ferragens.jpg" },
  { name: "Prime Equipaments", logo: "/logos/prime-equipaments.jpg" },
  { name: "Unineuro", logo: "/logos/unineuro.jpg" },
  { name: "Montalvão Neves", logo: "/logos/montalvao-neves-e-oliveira-advogados.jpg" },
];

const stats = [
  { value: "8.000+", label: "Certificados CNH da IA" },
  { value: "450+", label: "Empresas atendidas" },
  { value: "R$ 1bi+", label: "Sob metodologia ICIA" },
  { value: "2020", label: "Desde a Amazônia" },
];

const stagger = {
  animate: {
    transition: { staggerChildren: 0.05 },
  },
};

const logoItem = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const match = target.match(/[\d.,]+/);
  const numericStr = match?.[0] ?? "";
  const numericPart = numericStr
    ? parseInt(numericStr.replace(/[.,]/g, ""), 10)
    : 0;
  const matchIndex = match?.index ?? 0;
  const prefix = target.slice(0, matchIndex);
  const suffix = target.slice(matchIndex + numericStr.length);
  const useLocale = numericStr.includes(".") || numericStr.includes(",");

  useEffect(() => {
    if (!inView || numericPart === 0) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(numericPart / (duration / 16)));
    const interval = setInterval(() => {
      start += step;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, numericPart, duration]);

  const formatted = useLocale ? count.toLocaleString("pt-BR") : count.toString();

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Numeros() {
  return (
    <section id="clientes" className="py-32 px-6 bg-vg-void">
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-text-dim uppercase mb-4"
        >
          Operam conosco
        </motion.p>

        {/* Client logos grid — dark-mode treatment + staggered entry + breathing wave */}
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 mb-24"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              variants={logoItem}
              animate={{ x: [0, 4, 0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              className="flex items-center justify-center p-5 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 group"
              style={{
                boxShadow: "0 0 0px transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(31,60,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0px transparent";
              }}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={140}
                height={60}
                className="max-h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  filter: "brightness(0) invert(1) opacity(0.5)",
                  transition: "filter 0.3s ease, opacity 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "brightness(0) invert(1) opacity(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "brightness(0) invert(1) opacity(0.5)";
                }}
                unoptimized
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Big numbers — count up from 0 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2">
                <CountUp target={stat.value} />
              </div>
              <div className="text-xs text-vg-text-muted tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
