"use client";

import { motion } from "framer-motion";

export default function Origem() {
  return (
    <section id="origem" className="py-32 px-6 bg-vg-void">
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-[0.3em] text-vg-blue-soft uppercase mb-6"
        >
          Nossa origem
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-vg-text space-y-6"
        >
          <p className="text-6xl md:text-8xl leading-none text-vg-blue-soft">
            V
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-vg-text-muted">
            anguardIA nasceu em 2020, em Belém do Pará, da inquietação de quem
            via empresas comprando tecnologia cara e esquecendo que, antes de
            qualquer algoritmo, existe gente. Gente que precisa entender. Gente
            que precisa confiar. Gente que precisa de método.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-vg-text-muted">
            Enquanto o mercado corria atrás de dashboards e promessas de
            revolução digital, a VanguardIA decidiu fazer o caminho inverso:
            primeiro a cultura, depois o processo, só então a tecnologia. Essa
            inversão — que muitos chamaram de lenta — se provou a única
            arquitetura sustentável de transformação com IA no Brasil.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-vg-text-muted">
            Hoje, da Amazônia para o mundo, somos a referência em Inteligência
            Aplicada: a única empresa que une certificação de pessoas,
            diagnóstico de processos e agentes de IA em produção — tudo em
            camada permanente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-3 gap-1 text-center"
        >
          {[
            { value: "2020", label: "Fundação" },
            { value: "Belém, PA", label: "Sede" },
            { value: "5.994+", label: "Certificados" },
          ].map((stat) => (
            <div key={stat.label} className="py-8 border border-white/[0.04] bg-vg-elev">
              <div className="text-2xl font-mono font-bold text-vg-blue-soft mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-vg-text-muted tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
