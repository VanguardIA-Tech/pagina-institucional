import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import RevealSection from '../ui/RevealSection'
import { whatsappLink } from '../../lib/whatsapp'

const CTA_PRIVATE = whatsappLink('Quero conhecer a ICIA para empresas')

export default function ManifestoCTA() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-headline"
      className="relative bg-va-black text-white py-28 lg:py-40 overflow-hidden min-h-[100vh] flex flex-col justify-center border-t border-white/5"
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, var(--color-va-blue-glow) 0%, transparent 60%)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
        {/* Section Label */}
        <RevealSection as="div" className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500">
            11 · MANIFESTO
          </p>
        </RevealSection>

        {/* Manifesto Quote */}
        <motion.h2
          id="manifesto-headline"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-editorial italic font-bold text-va-gold tracking-[-0.025em] leading-[1.1] text-balance mb-6"
          style={{ fontSize: 'var(--text-display-xl)' }}
        >
          "Manejar o artificial,<br />pra viver mais do que é real."
        </motion.h2>

        {/* Brand Year */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs uppercase tracking-[0.2em] text-va-gray-500 mb-8"
        >
          GRUPO VANGUARDIA · 2026
        </motion.p>

        {/* Gold sutil divisor */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-0.5 w-20 bg-va-gold origin-center mb-14"
        />

        {/* Sub-headline */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-display font-extrabold text-white tracking-tight mb-6"
          style={{ fontSize: 'var(--text-display-l)' }}
        >
          Não vendemos. Conectamos.
        </motion.h3>

        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl text-va-gray-200 leading-relaxed text-balance mb-12"
          style={{ fontSize: 'var(--text-body-l)' }}
        >
          Este site não pediu que você comprasse nada. Pediu algo mais difícil: que você se reconhecesse em alguma parte do que leu. Seja isso no diagnóstico ou na ambição. Se isso aconteceu, vale uma conversa. Sem proposta. Sem pitch. Apenas duas empresas se entendendo.
        </motion.p>

        {/* Giant single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={CTA_PRIVATE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 text-white font-bold px-12 py-5 rounded-full transition-all duration-300 text-base shadow-2xl hover:scale-105"
            style={{
              background:
                'linear-gradient(90deg, var(--color-va-blue-electric) 0%, var(--color-va-teal) 100%)',
            }}
          >
            FALAR COM A VANGUARDIA
            <ArrowRight size={18} />
          </a>
          
          <p className="font-mono text-xs text-va-gray-500 uppercase tracking-widest mt-2">
            Resposta em até 24h úteis. Belém · GMT-3.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
