"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  left: string;
  top: string;
  drift: number;
  duration: number;
  delay: number;
};

export default function Manifesto() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 12 }).map(() => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      drift: 20 + Math.random() * 30,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="py-40 px-6 bg-vg-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,60,255,0.06)_0%,transparent_60%)]" />

      {/* Ambient particles — pure CSS floating dots */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-vg-blue-soft/30"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -p.drift, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif italic leading-tight text-white"
        >
          &ldquo;Manejar o artificial,
          <br />
          pra viver mais do que é real.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.8 }}
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
