import { useEffect, useRef, useState } from 'react'
import RevealSection from '../ui/RevealSection'

type Client = { name: string; slug: string; bg: string }

const CLIENTS: Client[] = [
  { name: 'BBB', slug: 'bbb', bg: '#72ae26' },
  { name: 'Paraferro', slug: 'paraferro', bg: '#004aad' },
  { name: 'Grupo Mega', slug: 'grupo-mega', bg: '#1d2f79' },
  { name: 'Grupo Lotus', slug: 'grupo-lotus', bg: '#fefefe' },
  { name: 'CF Distribuidora', slug: 'cf-distribuidora', bg: '#192446' },
  { name: 'MedNutri', slug: 'mednutri', bg: '#eeeeee' },
  { name: 'Silveira Athias', slug: 'silveira-athias', bg: '#e4e4e4' },
  { name: 'Alves Martins', slug: 'alves-martins', bg: '#041930' },
  { name: 'Montalvão Neves', slug: 'montalvao-neves', bg: '#bdbec1' },
  { name: 'Nativa Uniformes', slug: 'nativa-uniformes', bg: '#00345e' },
  { name: 'Rede+ Saúde', slug: 'rede-mais-saude', bg: '#e53e3e' },
  { name: 'Facilita Serviços', slug: 'facilita-servicos', bg: '#fefefe' },
  { name: 'Fibra', slug: 'fibra', bg: '#fefefe' },
  { name: 'Mave', slug: 'mave', bg: '#ffffff' },
  { name: 'IT Protect', slug: 'it-protect', bg: '#3366fd' },
  { name: 'Silnave', slug: 'silnave', bg: '#ffffff' },
  { name: 'Supermercado Econômico', slug: 'supermercado-economico', bg: '#ca2e28' },
  { name: 'Monobloco Exata', slug: 'monobloco-exata', bg: '#1a1a2e' },
  { name: 'Nevoni', slug: 'nevoni', bg: '#2e276c' },
  { name: 'Prime Equipaments', slug: 'prime-equipaments', bg: '#5d9b7d' },
  { name: 'Toca Hub', slug: 'toca-hub', bg: '#db5701' },
  { name: 'Sandrinha Deluxe', slug: 'sandrinha-deluxe', bg: '#f43f5e' },
  { name: 'Cabotia', slug: 'cabotia', bg: '#ffffff' },
  { name: 'Frutalí', slug: 'frutali', bg: '#f97316' },
]

const STAGGER_MS = 250

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

function ClienteCell({ client, index }: { client: Client; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <li
      className="clientes-wave-cell group relative aspect-[4/3] overflow-hidden"
      style={
        {
          '--cell-bg-rgb': hexToRgb(client.bg),
          '--cell-delay': `${index * STAGGER_MS}ms`,
        } as React.CSSProperties
      }
      title={client.name}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {imgError ? (
          <span className="font-display font-black text-xs uppercase tracking-wider text-white text-center break-words max-w-[90%]">
            {client.name}
          </span>
        ) : (
          <img
            src={`/logos/${client.slug}.png`}
            alt={client.name}
            loading="lazy"
            width={160}
            height={60}
            className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <span className="pointer-events-none absolute z-20 bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 whitespace-nowrap drop-shadow">
        {client.name}
      </span>
    </li>
  )
}

export default function Clientes() {
  const gridRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        el.dataset.clientesPaused = entry.isIntersecting ? 'false' : 'true'
      },
      { threshold: 0.05 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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
            07 · CLIENTES
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

        {/* Logo grid — wave bloom via CSS */}
        <ul
          ref={gridRef}
          aria-label="Empresas que operam com a VanguardIA"
          data-clientes-paused="false"
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
        >
          {CLIENTS.map((client, i) => (
            <ClienteCell key={client.slug} client={client} index={i} />
          ))}
        </ul>

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
