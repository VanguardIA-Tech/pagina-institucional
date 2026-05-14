"use client";

import { motion } from "framer-motion";

const cardContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardItem = {
  initial: { opacity: 0, x: 80, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const pillarContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const pillarItem = {
  initial: { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
  animate: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export default function Tese() {
  return (
    <section id="tese" className="py-20 md:py-32 px-6 bg-vg-deep">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6"
        >
          01 · A Tese
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl leading-tight mb-6"
            >
              A maioria das empresas não tem um problema de IA.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-vg-blue-soft font-serif italic"
            >
              Tem um problema de organização que a IA expôs.
            </motion.p>
          </div>

          <motion.div
            variants={cardContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                film: 1,
                text: "Contratou consultoria de processos. Ganhou um Notion bonito que ninguém abriu.",
              },
              {
                film: 2,
                text: "Implantou um sistema caro. O time continuou na planilha do Drive.",
              },
              {
                film: 3,
                text: "Colocou ChatGPT na operação. Cada um virou um especialista em prompt no escuro. Sem padrão. Sem memória. Sem método.",
              },
            ].map((item) => (
              <motion.div
                key={item.film}
                variants={cardItem}
                className="flex gap-4"
              >
                <span className="text-xs font-mono text-vg-text-dim mt-1 shrink-0">
                  FILME {item.film}
                </span>
                <p className="text-vg-text-muted">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-serif text-center text-vg-text mb-20"
        >
          O problema não foi a ferramenta. Foi a <span className="text-vg-blue-soft">ordem</span>.
        </motion.p>

        <motion.div
          variants={pillarContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8"
        >
          {[
            { num: "01", title: "Pessoas", action: "Habilitar" },
            { num: "02", title: "Processos", action: "Diagnosticar" },
            { num: "03", title: "Tecnologia", action: "Personalizar" },
          ].map((item) => (
            <motion.div
              key={item.num}
              variants={pillarItem}
              className="border border-white/[0.04] bg-vg-elev p-8 rounded-2xl text-center"
            >
              <div className="text-3xl font-mono font-bold text-vg-blue-soft mb-3">
                {item.num}
              </div>
              <div className="text-lg font-medium mb-1">{item.title}</div>
              <div className="text-sm text-vg-text-muted">{item.action}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-lg text-vg-text-muted italic max-w-2xl mx-auto"
        >
          &ldquo;Antes de tecnologia, falta clareza. Antes de agente, falta processo.
          Antes de processo, falta pessoa habilitada para operar.&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}
