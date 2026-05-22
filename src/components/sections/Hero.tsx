import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import CountUp from '../ui/CountUp'

const HeroParticleBackground = lazy(
  () => import('../ui/HeroParticleBackground'),
)

const CTA_PRIVATE =
  'https://wa.me/559132233355?text=Quero%20conhecer%20a%20ICIA%20para%20empresas'

const STATS = [
  {
    value: 8000,
    label: 'certificados CNH da IA',
    prefix: '+',
    accent: 'var(--color-va-green-vivid)',
  },
  {
    value: 600,
    label: 'empresas atendidas',
    prefix: '+',
    accent: 'var(--color-va-blue-electric)',
  },
  {
    value: 1,
    label: 'sob a metodologia ICIA',
    prefix: 'R$ ',
    suffix: 'bi+',
    accent: 'var(--color-va-orange-vivid)',
  },
]

const HEADLINE_PARTS: { text: string; color?: string }[] = [
  { text: 'A única arquitetura brasileira de ' },
  { text: 'Inteligência Aplicada', color: 'var(--color-va-orange-vivid)' },
  { text: ' que une método, certificação, processos e dados soberanos em ' },
  { text: 'um único sistema', color: 'var(--color-va-green-vivid)' },
  { text: '.' },
]

export default function Hero() {
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
      id="hero"
      aria-labelledby="hero-headline"
      className="relative overflow-hidden bg-va-black"
    >
      {/* Animated radial background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-hero-breathe"
        style={{ background: 'var(--gradient-hero)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Particle constellation — code-split R3F layer */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Suspense fallback={null}>
          <HeroParticleBackground />
        </Suspense>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-32 lg:pt-40 pb-20 lg:pb-28 min-h-[100svh] flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] text-va-gray-200/80 mb-8"
          >
            <span className="inline-block w-2 h-2 bg-va-orange-vivid rounded-full mr-3 align-middle" />
            GRUPO VANGUARDIA  ·  DA AMAZÔNIA PARA O MUNDO  ·  EST. 2020
          </motion.p>

          <motion.h1
            id="hero-headline"
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
            Com dezenas de agentes de IA operando no dia a dia dos nossos clientes. Consequência de um trabalho bem feito.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 hover:border-white/20 transition-colors"
              >
                <div
                  className="font-display font-extrabold tracking-tight leading-none"
                  style={{
                    fontSize: 'clamp(40px, 5vw, 64px)',
                    color: stat.accent,
                  }}
                >
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
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
            className="mt-12 flex flex-col items-center sm:items-start gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={CTA_PRIVATE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-va-blue-electric hover:bg-va-blue-glow text-white font-semibold px-7 py-4 rounded-full transition-colors text-base"
              >
                EMPRESAS ▶
              </a>
              <a
                href="/icia-gov"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-full transition-colors text-base"
              >
                SETOR PÚBLICO ▶
              </a>
            </div>
            <p className="text-xs text-va-gray-500 font-mono tracking-wider pl-1 mt-1">
              Escolha por onde você chega.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#tese"
          aria-label="Continuar para a próxima seção"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 2.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-va-gray-200/70 hover:text-white transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            Continue
          </span>
          <motion.span
            animate={reduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}
