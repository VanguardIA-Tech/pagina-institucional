import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
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
  { name: 'Facilita Serviços', slug: 'facilita', bg: '#fefefe' },
  { name: 'Fibra', slug: 'fibra', bg: '#fefefe' },
  { name: 'Mave', slug: 'mave', bg: '#ffffff' },
  { name: 'IT Protect', slug: 'it-protect', bg: '#3366fd' },
  { name: 'Silnave', slug: 'silnave', bg: '#ffffff' },
  { name: 'Supermercado Econômico', slug: 'supermercado-economico', bg: '#ca2e28' },
  { name: 'Nevoni', slug: 'nevoni', bg: '#2e276c' },
  { name: 'Prime Equipaments', slug: 'prime-equipaments', bg: '#5d9b7d' },
  { name: 'Toca Hub', slug: 'toca-hub', bg: '#db5701' },
  { name: 'Cabotia', slug: 'cabotia', bg: '#ffffff' },
  { name: 'Dal Ferragens', slug: 'dal-ferragens', bg: '#ffffff' },
  { name: 'Unineuro', slug: 'unineuro', bg: '#ffffff' },
]

const STAGGER_MS = 250
const BLOOM_MS = 400
const FADE_MS = 400
const WAVE_PAUSE_MS = 1500
const FAINT_ALPHA = 0.08

const GRAY_STYLE = { filter: 'grayscale(1) brightness(1.6) contrast(0.9)', opacity: 0.55 }
const COLOR_STYLE = { filter: 'grayscale(0) brightness(1) contrast(1)', opacity: 1 }

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function ClienteCellAnimated({
  client,
  index,
  total,
  paused,
}: {
  client: Client
  index: number
  total: number
  paused: boolean
}) {
  const logoControls = useAnimationControls()
  const bgControls = useAnimationControls()
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    let cancelled = false
    const timers = new Set<ReturnType<typeof setTimeout>>()

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => {
          timers.delete(id)
          resolve()
        }, ms)
        timers.add(id)
      })

    const waitWhilePaused = async () => {
      while (!cancelled && pausedRef.current) {
        await sleep(120)
      }
    }

    const bgFull = hexToRgba(client.bg, 1)
    const bgFaint = hexToRgba(client.bg, FAINT_ALPHA)

    // Full wave cycle: every cell starts staggered, blooms, fades, then waits the rest of the cycle
    const cycleMs =
      (total - 1) * STAGGER_MS + BLOOM_MS + FADE_MS + WAVE_PAUSE_MS
    const ownActivity = BLOOM_MS + FADE_MS
    const restAfterFade = Math.max(cycleMs - ownActivity - index * STAGGER_MS, 600)

    const loop = async () => {
      // initial offset puts each cell on the wave timeline
      await sleep(index * STAGGER_MS)
      while (!cancelled) {
        await waitWhilePaused()
        if (cancelled) return

        // Bloom: bg + logo together
        logoControls.start({
          ...COLOR_STYLE,
          transition: { duration: BLOOM_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        })
        await bgControls.start({
          background: bgFull,
          transition: { duration: BLOOM_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        })
        if (cancelled) return

        await waitWhilePaused()
        if (cancelled) return

        // Fade: bg + logo together
        logoControls.start({
          ...GRAY_STYLE,
          transition: { duration: FADE_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        })
        await bgControls.start({
          background: bgFaint,
          transition: { duration: FADE_MS / 1000, ease: [0.4, 0, 0.2, 1] },
        })
        if (cancelled) return

        await sleep(restAfterFade)
      }
    }

    loop()

    return () => {
      cancelled = true
      logoControls.stop()
      bgControls.stop()
      timers.forEach((id) => clearTimeout(id))
      timers.clear()
    }
  }, [logoControls, bgControls, index, total, client.bg])

  return (
    <li
      className="group relative bg-va-black aspect-[4/3] overflow-hidden"
      title={client.name}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 z-0"
        initial={{ background: hexToRgba(client.bg, FAINT_ALPHA) }}
        animate={bgControls}
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-5">
        <motion.img
          src={`/logos/${client.slug}.png`}
          alt={client.name}
          loading="lazy"
          width={160}
          height={60}
          className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain"
          initial={GRAY_STYLE}
          animate={logoControls}
        />
      </div>
      <span className="pointer-events-none absolute z-20 bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 whitespace-nowrap drop-shadow">
        {client.name}
      </span>
    </li>
  )
}

function ClienteCellStatic({ client }: { client: Client }) {
  const faint = hexToRgba(client.bg, FAINT_ALPHA)
  const full = hexToRgba(client.bg, 1)

  return (
    <li
      className="group relative bg-va-black aspect-[4/3] overflow-hidden transition-colors duration-300"
      title={client.name}
      style={{ background: faint }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = full
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = faint
      }}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center p-5">
        <img
          src={`/logos/${client.slug}.png`}
          alt={client.name}
          loading="lazy"
          width={160}
          height={60}
          className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain transition-all duration-300"
          style={GRAY_STYLE}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = COLOR_STYLE.filter
            e.currentTarget.style.opacity = String(COLOR_STYLE.opacity)
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = GRAY_STYLE.filter
            e.currentTarget.style.opacity = String(GRAY_STYLE.opacity)
          }}
        />
      </div>
      <span className="pointer-events-none absolute z-20 bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 whitespace-nowrap drop-shadow">
        {client.name}
      </span>
    </li>
  )
}

export default function Clientes() {
  const prefersReducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)

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

        {/* Logo grid with fluid colored wave */}
        <ul
          aria-label="Empresas que operam com a VanguardIA"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden"
        >
          {CLIENTS.map((client, i) =>
            prefersReducedMotion ? (
              <ClienteCellStatic key={client.slug} client={client} />
            ) : (
              <ClienteCellAnimated
                key={client.slug}
                client={client}
                index={i}
                total={CLIENTS.length}
                paused={hovered}
              />
            ),
          )}
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
