"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "ACP", logo: "/logos/acp-logo.jpg", category: "Membro" },
  { name: "Conjove", logo: "/logos/conjove-logo.jpg", category: "Membro" },
  { name: "SEBRAE", logo: "/logos/logo-sebrae.jpg", category: "Parceria" },
  { name: "SINDARPA", logo: "/logos/logo-sindarpa.jpg", category: "Parceria" },
  { name: "OAB", logo: "/logos/oab-logo.jpg", category: "Parceria" },
];

export default function Parcerias() {
  return (
    <section id="parcerias" className="py-32 px-6 bg-vg-void">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6 text-center"
        >
          Parcerias institucionais
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-center mb-20"
        >
          Quem caminha com a gente
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-4 p-6 rounded-xl border border-white/[0.04] bg-vg-elev hover:border-vg-blue-soft/20 transition-colors"
            >
              <div className="relative w-full h-16">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-[10px] font-mono text-vg-text-dim tracking-[0.2em] uppercase">
                {partner.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
