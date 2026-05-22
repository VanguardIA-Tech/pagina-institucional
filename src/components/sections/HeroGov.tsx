import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import CountUp from '../ui/CountUp'

const CTA_CNH =
  'https://wa.me/559132233355?text=Quero%20a%20CNH%20da%20IA%20para%20servidores'
const CTA_ICIA =
  'https://wa.me/559132233355?text=Quero%20conhecer%20a%20arquitetura%20ICIA.GOV'

const STATS = [
  {
    value: 8000,
    label: 'servidores e líderes já capacitados pela CNH da IA',
    prefix: '+',
    accent: 'var(--color-va-orange-vivid)',
  },
  {
    value: 6,
    label: 'programas PMI estruturados para o setor público',
    accent: 'var(--color-va-green-vivid)',
  },
  {
    value: null,
    label: 'Lei 14.133/21 · LC 182/2021 · LGPD · CPSI',
    text: 'CONFORME',
    accent: 'var(--color-va-gold)',
  },
] as const

const HEADLINE_PARTS: { text: string; color?: string }[] = [
  { text: 'A primeira arquitetura brasileira de ' },
  {
    text: 'Inteligência Aplicada',
    color: 'var(--color-va-orange-vivid)',
  },
  { text: ' desenhada para o ' },
  { text: 'setor público', color: 'var(--color-va-green-vivid)' },
  { text: '.' },
]

export default function HeroGov() {
  const reduce = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  }

  return (
    <section
      id="hero-gov"
      aria-labelledby="hero-gov-headline"
      className="relative overflow-hidden bg-va-black"
    >
      {/* Explosive gov gradient — high-saturation red-orange dominant */}
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-hero-breathe"
        style={{
          background:
            'radial-gradient(ellipse at 20% 25%, #FF6B1A 0%, #B84A00 30%, #00563F 70%, #0A0A0F 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 70%, rgba(255,107,26,0.25) 0%, transparent 55%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 lg:pt-40 pb-20 lg:pb-28 min-h-[100svh] flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/90 mb-8"
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-3 align-middle animate-pulse"
              style={{
                background: '#FF6B1A',
                boxShadow: '0 0 12px rgba(255, 107, 26, 0.7)',
              }}
            />
            ICIA.GOV · INTELIGÊNCIA APLICADA PARA O SETOR PÚBLICO · AMAZÔNIA · BRASIL
          </motion.p>

          <motion.h1
            id="hero-gov-headline"
            variants={itemVariants}
            className="font-display text-white font-extrabold tracking-[-0.03em] leading-[0.98] max-w-5xl text-balance"
            style={{ fontSize: 'var(--text-display-xl)' }}
          >
            {HEADLINE_PARTS.map((part, i) => (
              <span
                key={i}
                style={part.color ? { color: part.color } : undefined}
              >
                {part.text}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-2xl text-va-gray-200 text-balance"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Começa pela educação que já capacitou 8.000+ profissionais. Continua pela modernização de processos, governança de IA e infraestrutura de dados. Em conformidade com a Lei 14.133/21, a LC 182/2021 e a LGPD.
          </motion.p>

          {/* Carteirada tripla */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors"
              >
                <div
                  className="font-display font-extrabold tracking-tight leading-none"
                  style={{
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    color: stat.accent,
                  }}
                >
                  {stat.value !== null ? (
                    <CountUp
                      to={stat.value as number}
                      prefix={'prefix' in stat ? stat.prefix : ''}
                    />
                  ) : (
                    <span style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
                      {stat.text}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-va-gray-200 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 1.8, duration: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={CTA_CNH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-va-orange-vivid hover:bg-va-orange-glow text-white font-semibold px-7 py-4 rounded-full transition-colors text-base"
            >
              COMEÇAR PELA CNH DA IA ▶
            </a>
            <a
              href={CTA_ICIA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-7 py-4 rounded-full transition-colors text-base"
            >
              CONHECER O PROGRAMA ICIA.GOV ▶
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 2.1, duration: 0.6 }}
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-200/70"
          >
            Inexigibilidade de licitação aplicável — Lei 14.133/21, Art. 74.
          </motion.p>
        </motion.div>

        <motion.a
          href="#tese-gov"
          aria-label="Continuar para a próxima seção"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 2.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-va-gray-200/70 hover:text-white transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-orange-vivid">
            CONTINUE
          </span>
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} className="text-va-orange-vivid" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
