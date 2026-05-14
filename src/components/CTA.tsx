"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="cta" className="py-32 px-6 bg-vg-void">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl mb-6"
        >
          Não vendemos.
          <br />
          <span className="text-vg-blue-soft">Conectamos.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-vg-text-muted mb-12"
        >
          Cada empresa entra pelo nível certo. Ninguém pula degrau. Ninguém regride.
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          href="https://formbioj.vanguardiagrupo.com.br/?utm_source=home&utm_medium=bio_home&utm_content=link_in_bio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 bg-vg-blue hover:bg-vg-blue-deep text-white font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(31,60,255,0.3)]"
        >
          Falar com a VanguardIA
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-vg-text-dim"
        >
          Tv. Avertano Rocha, 192 — Belém, Pará · Do It Hub
        </motion.p>
      </div>
    </section>
  );
}
