import { motion } from 'framer-motion'
import { whatsappLink } from '../../lib/whatsapp'

const CTA_URL = whatsappLink('Quero falar com a VanguardIA GOV')

export default function ManifestoCTAGov() {
  return (
    <section
      id="manifesto-gov"
      aria-labelledby="manifesto-gov-headline"
      className="relative bg-va-black text-white min-h-[100svh] flex items-center py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,107,26,0.10) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(32,70,234,0.10) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full text-center">
        {/* Bloco superior — manifesto */}
        <motion.h2
          id="manifesto-gov-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="font-editorial italic text-va-gold leading-[1.05] tracking-[-0.01em] max-w-5xl mx-auto text-balance font-extrabold"
          style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
        >
          "Modernizar o serviço público
          <br />
          não é uma promessa.
          <br />
          É uma decisão."
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500"
        >
          GRUPO VANGUARDIA · ICIA.GOV · 2026
        </motion.p>

        {/* Divisor sutil dourado (80px horizontal) */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-20 h-[2px] bg-va-gold mx-auto my-10 origin-center"
        />

        {/* Bloco inferior — CTA */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display font-extrabold tracking-[-0.02em] text-white leading-tight"
          style={{ fontSize: 'var(--text-display-m)' }}
        >
          Comece pela educação.
          <br />
          <span className="text-va-gray-500">A escada inteira espera depois.</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 max-w-2xl mx-auto text-va-gray-200 leading-relaxed"
          style={{ fontSize: 'var(--text-body-l)' }}
        >
          A primeira conversa não pede licitação, não exige convênio, não compromete orçamento.
          <br />
          Pede apenas que você reserve uma hora com a VanguardIA para entender como a CNH da IA pode entrar no seu órgão ainda este ciclo orçamentário — e o que vem depois.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-14"
        >
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 lg:px-14 py-5 lg:py-7 rounded-full font-display font-extrabold text-white text-lg lg:text-2xl tracking-tight shadow-2xl transition-transform hover:scale-[1.02]"
            style={{
              background:
                'linear-gradient(135deg, var(--color-va-orange-vivid) 0%, var(--color-va-teal) 100%)',
            }}
          >
            FALAR COM A VANGUARDIA GOV →
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500 leading-relaxed max-w-2xl mx-auto"
        >
          Resposta em até 24h úteis. Atendimento dedicado ao setor público.
          <br />
          Belém · GMT-3 · suporte presencial em Belém, Goiânia, Brasília e remoto em todo o país.
        </motion.p>
      </div>
    </section>
  )
}
