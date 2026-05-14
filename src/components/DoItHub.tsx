"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DoItHub() {
  return (
    <section className="py-32 px-6 bg-vg-void">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6"
        >
          04 · Do It Hub
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl leading-tight mb-6"
            >
              Onde a teoria
              <br />
              encontra a prática.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-vg-text-muted"
            >
              Espaço físico em Belém do Pará onde a VanguardIA opera. 
              Um laboratório vivo de IA aplicada que recebe empresários, 
              times jurídicos e lideranças para workshops, imersões e 
              conselhos estratégicos.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.04] bg-vg-elev"
          >
            <Image
              src="/logos/do-it.jpg"
              alt="Do It Hub"
              fill
              className="object-cover opacity-60"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "AI Night",
              type: "Mensal · Aberto ao público",
              desc: "Encontro mensal que reúne empresários, desenvolvedores e curiosos para discutir IA aplicada em negócios reais. Cases, debates e networking.",
            },
            {
              title: "AI On Hands",
              type: "Workshop prático",
              desc: "Imersão hands-on onde times inteiros colocam a mão na massa: constroem agentes, mapeiam processos e saem com um plano de IA para a empresa.",
            },
            {
              title: "Conselho ICIA",
              type: "Mensal · Fechado · Almoço",
              desc: "Almoço fechado com lideranças empresariais. Troca de experiências entre quem já implementou IA em escala e quem está começando a jornada.",
              featured: true,
            },
          ].map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border p-8 rounded-2xl flex flex-col ${
                event.featured
                  ? "border-vg-blue-soft/20 bg-vg-blue-glow"
                  : "border-white/[0.04] bg-vg-elev"
              }`}
            >
              {event.featured && (
                <span className="text-[10px] font-mono text-vg-blue-soft tracking-[0.2em] uppercase mb-3">
                  Featured
                </span>
              )}
              <h3 className="text-lg font-medium mb-2">{event.title}</h3>
              <p className="text-xs text-vg-text-dim mb-4">{event.type}</p>
              <p className="text-sm text-vg-text-muted flex-1">{event.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-vg-text-dim"
        >
          Tv. Avertano Rocha, 192 — Belém, Pará
        </motion.p>
      </div>
    </section>
  );
}
