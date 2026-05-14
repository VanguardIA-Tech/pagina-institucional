"use client";

import { motion } from "framer-motion";

const depoimentos = [
  {
    quote:
      "A VanguardIA não trouxe só tecnologia. Trouxe método. Pela primeira vez, nosso time entendeu o que está fazendo com IA — e os resultados apareceram em semanas, não meses.",
    author: "Diretor de Operações",
    company: "Pará Ferro",
  },
  {
    quote:
      "O DEEP expôs gargalos que estavam escondidos há anos. A CNH da IA destravou o medo do time. Hoje temos agentes rodando em produção e uma cultura de melhoria contínua que não existia.",
    author: "CEO",
    company: "Grupo Mega",
  },
  {
    quote:
      "Contratamos consultorias caras antes. Nenhuma entregou o que a VanguardIA entrega: gente habilitada, processo documentado e tecnologia que funciona de verdade.",
    author: "Sócio-Diretor",
    company: "CF Distribuidora",
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" aria-label="Depoimentos de clientes" className="py-20 md:py-32 px-6 bg-vg-deep">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6 text-center"
        >
          Quem opera com a gente
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-center mb-20"
        >
          Eles contam melhor do que a gente
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {depoimentos.map((dep, i) => (
            <motion.blockquote
              key={dep.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="border border-white/[0.04] bg-vg-elev p-8 rounded-2xl flex flex-col"
            >
              <p className="text-vg-text-muted leading-relaxed flex-1 mb-6">
                &ldquo;{dep.quote}&rdquo;
              </p>
              <footer>
                <p className="text-sm font-medium text-white">{dep.author}</p>
                <p className="text-xs text-vg-blue-soft">{dep.company}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
