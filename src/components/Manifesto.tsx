"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="py-40 px-6 bg-vg-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,60,255,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif italic leading-tight text-white"
        >
          &ldquo;Manejar o artificial,
          <br />
          pra viver mais do que é real.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-vg-text-muted font-serif text-lg italic"
        >
          A clareza não é o oposto da complexidade.
          <br />
          É o resultado de dominá-la.
        </motion.p>
      </div>
    </section>
  );
}
