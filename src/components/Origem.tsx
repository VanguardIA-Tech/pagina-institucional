"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function TypewriterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const [revealed, setRevealed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setRevealed((prev) => {
          if (prev >= text.length) {
            if (interval) clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 25);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [inView, text, delay]);

  return (
    <span ref={ref}>
      {text.slice(0, revealed)}
      {revealed < text.length && (
        <span className="animate-typewriter-cursor text-vg-blue-soft">|</span>
      )}
    </span>
  );
}

const statContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const statItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
            <TypewriterReveal
              text="anguardIA nasceu em 2020, em Belém do Pará, da inquietação de quem via empresas comprando tecnologia cara e esquecendo que, antes de qualquer algoritmo, existe gente. Gente que precisa entender. Gente que precisa confiar. Gente que precisa de método."
              delay={400}
            />
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-vg-text-muted">
            <TypewriterReveal
              text="Enquanto o mercado corria atrás de dashboards e promessas de revolução digital, a VanguardIA decidiu fazer o caminho inverso: primeiro a cultura, depois o processo, só então a tecnologia. Essa inversão — que muitos chamaram de lenta — se provou a única arquitetura sustentável de transformação com IA no Brasil."
              delay={1500}
            />
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-vg-text-muted">
            <TypewriterReveal
              text="Hoje, da Amazônia para o mundo, somos a referência em Inteligência Aplicada: a única empresa que une certificação de pessoas, diagnóstico de processos e agentes de IA em produção — tudo em camada permanente."
              delay={2600}
            />
          </p>
        </motion.div>

        <motion.div
          variants={statContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-3 gap-1 text-center"
        >
          {[
            { value: "2020", label: "Fundação" },
            { value: "Belém, PA", label: "Sede" },
            { value: "5.994+", label: "Certificados" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={statItem}
              className="py-8 border border-white/[0.04] bg-vg-elev"
            >
              <div className="text-2xl font-mono font-bold text-vg-blue-soft mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-vg-text-muted tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
