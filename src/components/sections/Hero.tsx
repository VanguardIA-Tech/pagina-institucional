import { lazy, Suspense } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import CountUp from '../ui/CountUp'
import { whatsappLink } from '../../lib/whatsapp'

const HeroParticleBackground = lazy(
  () => import('../ui/HeroParticleBackground'),
)

const CTA_PRIVATE = whatsappLink('Quero conhecer a ICIA para empresas')

const STATS = [
  {
    value: 8000,
    label: 'certificados CNH da IA',
    prefix: '+',
    accent: 'var(--color-va-teal)',
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
  { text: 'um único sistema', color: 'var(--color-va-teal)' },
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
        className="absolute inset-0 opacity-[0.035]"
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
      {/* Legibility overlay: darkens left/center where the headline sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 25% 50%, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0) 65%)',
        }}
      />
      {/* Bottom fade to smooth the transition into the next section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,0.85) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 lg:pt-28 pb-20 lg:pb-24 min-h-[640px] lg:min-h-[680px] flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-va-gray-200/80 mb-7 flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 bg-va-orange-vivid"
            />
            <span>GRUPO VANGUARDIA · DA AMAZÔNIA PARA O MUNDO · EST. 2020</span>
          </motion.p>

          <motion.h1
            id="hero-headline"
            variants={itemVariants}
            className="font-display text-white font-extrabold tracking-[-0.03em] leading-[1.04] max-w-[820px] text-balance"
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
            className="mt-5 lg:mt-6 max-w-xl text-va-gray-200 text-balance leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Com dezenas de agentes de IA operando no dia a dia dos nossos clientes. Consequência de um trabalho bem feito.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between min-h-[112px] sm:min-h-[120px] border border-white/10 bg-white/[0.04] backdrop-blur-sm rounded-2xl px-5 py-4 sm:px-6 sm:py-5 hover:border-white/25 hover:bg-white/[0.06] transition-colors"
              >
                <div
                  className="font-display font-extrabold tracking-tight leading-none"
                  style={{
                    fontSize: 'clamp(30px, 2.8vw, 42px)',
                    color: stat.accent,
                  }}
                >
                  <CountUp
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm text-va-gray-200 leading-snug">
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
            className="mt-8 lg:mt-10 flex flex-col items-stretch sm:items-start gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href={CTA_PRIVATE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-va-blue-electric hover:bg-va-blue-glow text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm sm:text-base"
              >
                EMPRESAS ▶
              </a>
              <a
                href="/icia-gov"
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 hover:bg-white/5 text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-sm sm:text-base"
              >
                SETOR PÚBLICO ▶
              </a>
            </div>
            <p className="text-xs text-va-gray-500 font-mono tracking-wider pl-1 mt-1">
              Escolha por onde você chega.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — hidden on short viewports to avoid overlap with CTAs */}
        <motion.a
          href="#tese"
          aria-label="Continuar para a próxima seção"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 2.4, duration: 0.6 }}
          className="hidden xl:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-va-gray-200/60 hover:text-white transition-colors z-10"
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
