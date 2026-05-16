import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTA_URL =
  'https://wa.me/559132233355?text=Quero%20falar%20com%20a%20VanguardIA%20GOV'

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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-va-gold mb-10"
        >
          10 · Manifesto
        </motion.p>

        <motion.h2
          id="manifesto-gov-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="font-editorial italic text-va-gold leading-[1.05] tracking-[-0.01em] max-w-5xl mx-auto text-balance"
          style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}
        >
          Modernizar o serviço público não é uma promessa.
          <br />
          <span className="text-white not-italic font-display font-extrabold tracking-[-0.025em]">
            É uma decisão.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 max-w-3xl mx-auto text-va-gray-200 leading-relaxed"
          style={{ fontSize: 'var(--text-body-l)' }}
        >
          Comece pela educação. A escada inteira espera depois — política
          institucional, processos, dados soberanos, agentes e governança.
          Nessa ordem, a IA na administração pública vira legado, não
          escândalo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="mt-14 lg:mt-20"
        >
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 lg:px-14 py-5 lg:py-7 rounded-full font-display font-extrabold text-white text-lg lg:text-2xl tracking-tight shadow-2xl transition-transform hover:scale-[1.02]"
            style={{
              background:
                'linear-gradient(135deg, var(--color-va-orange-vivid) 0%, var(--color-va-green-vivid) 100%)',
            }}
          >
            Falar com a VanguardIA GOV
            <ArrowRight
              size={24}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500"
        >
          Inexigibilidade Lei 14.133/21, Art. 74 · Conforme LGPD · Da Amazônia
          para o Brasil
        </motion.p>
      </div>
    </section>
  )
}
