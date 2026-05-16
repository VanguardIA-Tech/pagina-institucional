import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const CTA_URL =
  'https://wa.me/559132233355?text=Quero%20conversar%20sobre%20o%20legado%20COP-30'

export default function COP30() {
  return (
    <section
      id="cop30"
      aria-labelledby="cop30-headline"
      className="relative text-white py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #00563F 0%, #00C896 55%, #FF6B1A 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-white/85 mb-5"
        >
          08 · Janela COP-30 · Belém · novembro 2026
        </motion.p>

        <motion.h2
          id="cop30-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold tracking-[-0.025em] leading-[1.02] text-white text-balance max-w-5xl"
          style={{ fontSize: 'var(--text-display-l)' }}
        >
          COP-30 em Belém. O Pará é a vitrine.
          <br />
          <span className="text-white/85">
            A administração pública pode ser parte do legado.
          </span>
        </motion.h2>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-va-black/40 backdrop-blur-sm border border-white/15 p-7 lg:p-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-orange-glow mb-4">
              O que está em jogo
            </p>
            <p
              className="text-white/95 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              Belém será o centro do debate global sobre clima, soberania
              amazônica e governança digital. A administração pública
              brasileira tem uma janela única para mostrar que a IA aplicada à
              gestão pode ser feita com método, soberania e responsabilidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-va-black/40 backdrop-blur-sm border border-white/15 p-7 lg:p-9"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-green-glow mb-4">
              O que entregamos
            </p>
            <p
              className="text-white/95 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              CNH da IA para servidores, política institucional pronta,
              arquitetura soberana de dados, agentes auditáveis e governança
              board. Tudo conforme Lei 14.133/21, LGPD e diretrizes do CPSI —
              entregue antes da janela COP-30.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16"
        >
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-va-green-deep transition-colors text-white font-semibold px-7 py-4 rounded-full"
          >
            Conversar sobre o legado COP-30
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
