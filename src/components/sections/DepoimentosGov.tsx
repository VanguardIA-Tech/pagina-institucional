import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Quote } from 'lucide-react'

type Item = {
  id: string
  type: 'video' | 'placeholder'
  videoUrl?: string
  org?: string
  cargo?: string
  quote?: string
}

const ITEMS: Item[] = [
  {
    id: 'acp',
    type: 'video',
    videoUrl: '/videos/alberto-acp.mp4',
    org: 'Alberto Villar',
    cargo: 'ACP · Associação Comercial do Pará',
    quote:
      'A CNH da IA mudou a forma como a Associação enxerga inovação no setor público. Cultura, método e prática nessa ordem — exatamente o que faltava.',
  },
  {
    id: 'sindarpa',
    type: 'video',
    org: 'Edivaldo Carvalho Neto',
    cargo: 'SINDARPA',
    quote:
      'Servidores certificados, política institucional pronta e processo de inexigibilidade documentado. O caderno técnico foi decisivo.',
  },
  {
    id: 'pl1',
    type: 'placeholder',
  },
  {
    id: 'pl2',
    type: 'placeholder',
  },
]

export default function DepoimentosGov() {
  const [index, setIndex] = useState(0)
  const total = ITEMS.length

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + total) % total)
  }

  const item = ITEMS[index]

  return (
    <section
      id="depoimentos-gov"
      aria-labelledby="depoimentos-gov-headline"
      className="bg-va-cream text-va-black py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-4">
            08 · VOZES INSTITUCIONAIS
          </p>
          <h2
            id="depoimentos-gov-headline"
            className="font-editorial italic font-extrabold tracking-[-0.025em] leading-[1] text-balance text-va-black"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Quem já caminha conosco.
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-white rounded-2xl border border-va-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-5 min-h-[360px]"
            >
              {/* Video / placeholder */}
              <div
                className="relative lg:col-span-2 min-h-[260px] lg:min-h-full flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    item.type === 'video'
                      ? 'linear-gradient(135deg, var(--color-va-blue-deep) 0%, var(--color-va-black) 100%)'
                      : 'var(--color-va-gray-50)',
                }}
              >
                {item.type === 'video' ? (
                  item.videoUrl ? (
                    <video
                      src={item.videoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label={`Depoimento de ${item.org}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <button
                      type="button"
                      aria-label={`Reproduzir depoimento — ${item.org}`}
                      className="group inline-flex items-center justify-center w-20 h-20 rounded-full bg-va-orange-vivid hover:bg-va-orange-glow transition-colors shadow-2xl"
                    >
                      <Play
                        size={28}
                        className="text-white ml-1"
                        fill="white"
                        strokeWidth={0}
                      />
                    </button>
                  )
                ) : (
                  <div className="text-center px-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-2">
                      + DEPOIMENTO EM BREVE
                    </p>
                    <p className="font-display font-bold text-va-gray-500 text-2xl">
                      +
                    </p>
                  </div>
                )}
              </div>

              {/* Quote */}
              <div className="lg:col-span-3 p-7 lg:p-10 flex flex-col justify-between">
                {item.type === 'video' && item.quote ? (
                  <>
                    <div>
                      <Quote
                        size={28}
                        className="text-va-orange-vivid mb-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      <p
                        className="font-editorial text-va-black italic leading-[1.3] text-balance"
                        style={{ fontSize: 'clamp(20px, 2.2vw, 26px)' }}
                      >
                        "{item.quote}"
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-va-gray-200/70">
                      <p className="font-display font-bold text-va-black text-base leading-tight">
                        {item.org}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-va-gray-700 mt-1">
                        {item.cargo}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="m-auto text-center px-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-2">
                      + DEPOIMENTO EM BREVE
                    </p>
                    <p className="mt-3 text-va-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                      Próximas vozes do ecossistema institucional VanguardIA Gov.
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {ITEMS.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  aria-label={`Ir para depoimento ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === index ? 32 : 12,
                    background:
                      i === index
                        ? 'var(--color-va-orange-vivid)'
                        : 'rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-va-gray-200 text-va-black hover:bg-va-black hover:text-white hover:border-va-black transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-va-gray-200 text-va-black hover:bg-va-black hover:text-white hover:border-va-black transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
