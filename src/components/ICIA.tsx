"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    layer: "CAMADA CULTURAL",
    title: "Pessoas",
    entregas: ["CNH da IA", "Habilitação contínua", "Cultura de IA aplicada"],
    prova: "8.000+ pessoas habilitadas",
  },
  {
    layer: "CAMADA DIAGNÓSTICA",
    title: "Processos",
    entregas: ["DEEP", "PEI", "ICIA Process", "Documentação viva"],
    prova: "1.000+ POPs modernizados",
  },
  {
    layer: "CAMADA DE EXECUÇÃO",
    title: "Tecnologia",
    entregas: ["Data Lake", "Workers AI", "ICIA 360", "ICIA OS (patenteado)"],
    prova: "Dezenas de agentes em produção",
  },
];

const layerReveal = {
  initial: { clipPath: "inset(100% 0 0 0)" },
  animate: {
    clipPath: "inset(0% 0 0% 0)",
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export default function ICIA() {
  return (
    <section className="py-32 px-6 bg-vg-void">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6"
        >
          02 · Arquitetura
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-6xl leading-tight mb-6"
        >
          ICIA.
          <br />
          A arquitetura da
          <br />
          <span className="text-vg-blue-soft">Inteligência Aplicada.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-vg-text-muted max-w-2xl mb-20"
        >
          Não é consultoria. Não é treinamento. Não é software.
          É o sistema que organiza Pessoas, Processos e Tecnologia
          em camada permanente.
        </motion.p>

        <div className="space-y-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              variants={layerReveal}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="border-t border-white/[0.04] pt-12"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2 }}
                className="grid md:grid-cols-[200px_1fr_200px] gap-8 items-start"
              >
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-vg-text-dim uppercase mb-2">
                    {p.layer}
                  </p>
                  <h3 className="text-2xl font-serif">{p.title}</h3>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-vg-text-dim uppercase mb-3">
                    Entregas
                  </p>
                  <ul className="space-y-1">
                    {p.entregas.map((e) => (
                      <li key={e} className="text-vg-text-muted">
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-[0.2em] text-vg-text-dim uppercase mb-2">
                    Prova
                  </p>
                  <p className="text-vg-blue-soft font-medium">{p.prova}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-lg text-vg-text-muted italic max-w-xl mx-auto"
        >
          &ldquo;A tecnologia só se sustenta quando há cultura, diagnóstico e clareza.&rdquo;
          <br />
          <span className="text-sm text-vg-text-dim">
            Inverter a ordem é o que torna IA cara e descartável.
          </span>
        </motion.blockquote>
      </div>
    </section>
  );
}
