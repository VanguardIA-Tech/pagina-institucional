import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'

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

const STAGGER_MS = 80
const COLOR_HOLD_MS = 800
const COLOR_DURATION_MS = 400
const WAVE_PAUSE_MS = 2000

function LogoChipAnimated({
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
  const controls = useAnimationControls()
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    let cancelled = false

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(resolve, ms)
        return () => clearTimeout(id)
      })

    const waitWhilePaused = async () => {
      while (!cancelled && pausedRef.current) {
        await sleep(120)
      }
    }

    const loop = async () => {
      while (!cancelled) {
        await waitWhilePaused()
        if (cancelled) return

        await sleep(WAVE_PAUSE_MS + index * STAGGER_MS)
        if (cancelled) return
        await waitWhilePaused()
        if (cancelled) return

        await controls.start({
          filter: 'grayscale(0) brightness(1)',
          opacity: 1,
          transition: { duration: COLOR_DURATION_MS / 1000, ease: 'easeOut' },
        })
        if (cancelled) return

        await sleep(COLOR_HOLD_MS)
        if (cancelled) return
        await waitWhilePaused()
        if (cancelled) return

        await sleep((total - index) * STAGGER_MS)
        if (cancelled) return

        await controls.start({
          filter: 'grayscale(1) brightness(0.85)',
          opacity: 0.7,
          transition: { duration: COLOR_DURATION_MS / 1000, ease: 'easeIn' },
        })
      }
    }

    loop()

    return () => {
      cancelled = true
      controls.stop()
    }
  }, [controls, index, total])

  return (
    <div
      className="flex items-center gap-3 shrink-0 px-8 py-3 border-r border-va-gray-200/40"
      title={client.name}
    >
      <motion.img
        src={`/logos/${client.slug}.png`}
        alt={client.name}
        loading="lazy"
        width={120}
        height={32}
        className="h-7 sm:h-8 w-auto max-w-[140px] object-contain"
        initial={{ filter: 'grayscale(1) brightness(0.85)', opacity: 0.7 }}
        animate={controls}
      />
    </div>
  )
}

function LogoChipStatic({ client }: { client: Client }) {
  return (
    <div
      className="group flex items-center gap-3 shrink-0 px-8 py-3 border-r border-va-gray-200/40"
      title={client.name}
    >
      <img
        src={`/logos/${client.slug}.png`}
        alt={client.name}
        loading="lazy"
        width={120}
        height={32}
        className="h-7 sm:h-8 w-auto max-w-[140px] object-contain transition-all duration-300"
        style={{
          filter: 'grayscale(1) brightness(0.85)',
          opacity: 0.7,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'grayscale(0) brightness(1)'
          e.currentTarget.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = 'grayscale(1) brightness(0.85)'
          e.currentTarget.style.opacity = '0.7'
        }}
      />
    </div>
  )
}

export default function LogoBar() {
  const prefersReducedMotion = useReducedMotion()
  const list = [...CLIENTS, ...CLIENTS]
  const [hovered, setHovered] = useState(false)

  return (
    <section
      aria-label="Clientes que operam com a VanguardIA"
      className="relative bg-va-cream border-y border-va-gray-200/60"
      style={{ minHeight: 120 }}
    >
      <div
        className="flex items-stretch h-[120px] group/ticker"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Vertical label */}
        <div className="shrink-0 flex items-center justify-center px-5 sm:px-8 border-r border-va-gray-200/60 bg-va-cream">
          <span
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-va-gray-700 font-medium"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Operam Conosco
          </span>
        </div>

        {/* Ticker */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <div className="flex items-center h-full animate-ticker w-max group-hover/ticker:[animation-play-state:paused]">
            {list.map((client, i) =>
              prefersReducedMotion ? (
                <LogoChipStatic key={`${client.slug}-${i}`} client={client} />
              ) : (
                <LogoChipAnimated
                  key={`${client.slug}-${i}`}
                  client={client}
                  index={i % CLIENTS.length}
                  total={CLIENTS.length}
                  paused={hovered}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
