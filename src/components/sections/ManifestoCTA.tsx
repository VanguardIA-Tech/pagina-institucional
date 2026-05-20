import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTA_PRIVATE =
  'https://wa.me/559132233355?text=Quero%20conhecer%20a%20ICIA%20para%20empresas'

export default function ManifestoCTA() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 0.18, 0.18, 0]
  )

  return (
    <section
      ref={ref}
      id="manifesto"
      aria-labelledby="manifesto-headline"
      className="relative bg-va-black text-white py-28 lg:py-40 overflow-hidden"
    >
      {/* Scroll-driven violet radial glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: reduce ? 0.15 : glowOpacity,
          background:
            'radial-gradient(ellipse at 50% 50%, var(--color-va-violet-glow) 0%, var(--color-va-violet-deep) 35%, transparent 70%)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-8"
        >
          12 · Manifesto + CTA
        </motion.p>

        <motion.h2
          id="manifesto-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-editorial italic font-bold text-va-gold tracking-[-0.02em] leading-[1.05] text-balance"
          style={{ fontSize: 'var(--text-display-xl)' }}
        >
          A IA não vai esperar
          <br />
          <span className="text-white">o Brasil acordar.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 max-w-2xl mx-auto text-va-gray-200 leading-relaxed text-balance"
          style={{ fontSize: 'var(--text-body-l)' }}
        >
          Quem decide hoje constrói a soberania de amanhã. Não vendemos IA —
          construímos a cultura, o método e o sistema que transformam IA em
          resultado para empresas e governos brasileiros.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href={CTA_PRIVATE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-va-blue-electric hover:bg-va-blue-glow text-white font-semibold px-8 py-4 rounded-full transition-colors text-base animate-pulse-glow"
          >
            FALAR COM A VANGUARDIA
            <ArrowRight size={16} />
          </a>
          <a
            href="/icia-gov"
            className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
          >
            Conhecer ICIA Gov
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 font-mono text-[11px] uppercase tracking-[0.2em] text-va-gray-500"
        >
          Grupo VanguardIA · Da Amazônia para o Mundo · Est. 2020
        </motion.p>
      </div>
    </section>
  )
}
