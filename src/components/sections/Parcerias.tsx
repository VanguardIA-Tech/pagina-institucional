import { motion } from 'framer-motion'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'

type Partner = { name: string; slug?: string; ext?: 'png' | 'jpg' }

const PARTNERS: Partner[] = [
  { name: 'ACP', slug: 'acp', ext: 'png' },
  { name: 'Conjove', slug: 'conjove', ext: 'jpg' },
  { name: 'SEBRAE', slug: 'sebrae', ext: 'png' },
  { name: 'SINDARPA', slug: 'sindarpa', ext: 'png' },
  { name: 'OAB-PA', slug: 'oab-pa', ext: 'png' },
  { name: 'SINDILOJAS-GO' },
]

export default function Parcerias() {
  return (
    <section
      id="parcerias"
      aria-labelledby="parcerias-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <RevealSection as="div" className="mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-3">
            10 · PARCERIAS
          </p>
          <div className="h-px bg-white/15 max-w-[120px]" />
        </RevealSection>

        {/* Headline */}
        <RevealSection as="div" className="max-w-3xl mb-16 lg:mb-20">
          <h2
            id="parcerias-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-white"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            As instituições que{' '}
            <span style={{ color: 'var(--color-va-blue-glow)' }}>
              caminham conosco
            </span>
            .
          </h2>
        </RevealSection>

        {/* Logo grid */}
        <RevealSection
          as="ul"
          stagger
          staggerAmount={0.08}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {PARTNERS.map((partner) => (
            <motion.li
              key={partner.name}
              variants={revealItemVariants}
              className="group flex flex-col items-center justify-center gap-4 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 hover:border-va-blue-electric/50 hover:bg-white/[0.06] transition-all min-h-[180px]"
            >
              <div className="flex-1 flex items-center justify-center w-full">
                {partner.slug && partner.ext ? (
                  <img
                    src={`/logos/${partner.slug}.${partner.ext}`}
                    alt={partner.name}
                    loading="lazy"
                    width={180}
                    height={80}
                    className="max-h-16 sm:max-h-20 w-auto max-w-full object-contain transition-all duration-300"
                    style={{
                      filter: 'grayscale(1) brightness(1.8) contrast(0.85)',
                      opacity: 0.75,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0) brightness(1) contrast(1)'
                      e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(1) brightness(1.8) contrast(0.85)'
                      e.currentTarget.style.opacity = '0.75'
                    }}
                  />
                ) : (
                  <span
                    className="font-display font-extrabold tracking-[-0.02em] text-va-gray-200 group-hover:text-white transition-colors text-2xl sm:text-3xl text-center"
                  >
                    {partner.name}
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-gray-500 group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </motion.li>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
