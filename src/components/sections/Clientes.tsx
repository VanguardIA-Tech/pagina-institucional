import { motion } from 'framer-motion'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'

type Client = { name: string; slug: string }

const CLIENTS: Client[] = [
  { name: 'BBB', slug: 'bbb' },
  { name: 'Paraferro', slug: 'paraferro' },
  { name: 'Grupo Mega', slug: 'grupo-mega' },
  { name: 'Grupo Lotus', slug: 'grupo-lotus' },
  { name: 'CF Distribuidora', slug: 'cf-distribuidora' },
  { name: 'MedNutri', slug: 'mednutri' },
  { name: 'Silveira Athias', slug: 'silveira-athias' },
  { name: 'Alves Martins', slug: 'alves-martins' },
  { name: 'Montalvão Neves', slug: 'montalvao-neves' },
  { name: 'Nativa Uniformes', slug: 'nativa-uniformes' },
  { name: 'Facilita Serviços', slug: 'facilita' },
  { name: 'Fibra', slug: 'fibra' },
  { name: 'Mave', slug: 'mave' },
  { name: 'IT Protect', slug: 'it-protect' },
  { name: 'Silnave', slug: 'silnave' },
  { name: 'Supermercado Econômico', slug: 'supermercado-economico' },
  { name: 'Nevoni', slug: 'nevoni' },
  { name: 'Prime Equipaments', slug: 'prime-equipaments' },
  { name: 'Toca Hub', slug: 'toca-hub' },
  { name: 'Cabotia', slug: 'cabotia' },
  { name: 'Dal Ferragens', slug: 'dal-ferragens' },
  { name: 'Unineuro', slug: 'unineuro' },
]

export default function Clientes() {
  return (
    <section
      id="clientes"
      aria-labelledby="clientes-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <RevealSection as="div" className="mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-3">
            07 · Clientes
          </p>
          <div className="h-px bg-white/10 max-w-[120px]" />
        </RevealSection>

        {/* Headline */}
        <RevealSection as="div" className="max-w-3xl mb-16 lg:mb-20">
          <h2
            id="clientes-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            As empresas que operam com a{' '}
            <span style={{ color: 'var(--color-va-blue-glow)' }}>
              VanguardIA
            </span>
            .
          </h2>
        </RevealSection>

        {/* Logo grid */}
        <RevealSection
          as="ul"
          stagger
          staggerAmount={0.04}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
        >
          {CLIENTS.map((client) => (
            <motion.li
              key={client.slug}
              variants={revealItemVariants}
              className="group relative bg-va-black hover:bg-white/[0.03] transition-colors aspect-[4/3] flex items-center justify-center p-5"
              title={client.name}
            >
              <img
                src={`/logos/${client.slug}.png`}
                alt={client.name}
                loading="lazy"
                width={160}
                height={60}
                className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain transition-all duration-300"
                style={{
                  filter: 'grayscale(1) brightness(1.6) contrast(0.9)',
                  opacity: 0.55,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    'grayscale(0) brightness(1) contrast(1)'
                  e.currentTarget.style.opacity = '1'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    'grayscale(1) brightness(1.6) contrast(0.9)'
                  e.currentTarget.style.opacity = '0.55'
                }}
              />
              <span
                className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-[0.15em] text-va-gray-500 whitespace-nowrap"
              >
                {client.name}
              </span>
            </motion.li>
          ))}
        </RevealSection>

        {/* Microcopy footer */}
        <RevealSection
          as="div"
          delay={0.2}
          className="mt-14 lg:mt-20 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-2">
              Sede
            </p>
            <p className="font-display text-base text-white">
              Belém · Pará
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-2">
              Escritórios
            </p>
            <p className="font-display text-base text-white">
              Goiânia · Rio · Coimbra
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-2">
              Expansão 2026
            </p>
            <p className="font-display text-base text-white">
              São Paulo · Brasília
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
