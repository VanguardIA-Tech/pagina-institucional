import { motion } from 'framer-motion'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'
import { whatsappLink } from '../../lib/whatsapp'

type EventCard = {
  id: string
  dotColor: string
  tag: string
  title: string
  description: string
  cta: string
}

type GalleryItem = { type: 'video'; src: string } | { type: 'image'; src: string }

const EVENTS: EventCard[] = [
  {
    id: 'ai-night',
    dotColor: 'bg-va-blue-glow',
    tag: 'ABERTO · MENSAL',
    title: 'AI NIGHT',
    description: 'Tema rotativo por vertical. Encontro aberto onde quem vive Inteligência Aplicada encontra quem quer começar.',
    cta: 'Próxima edição →',
  },
  {
    id: 'ai-on-hands',
    dotColor: 'bg-va-orange-vivid',
    tag: 'APLICADO · QUINZENAL',
    title: 'AI ON HANDS',
    description: 'Workshop prático. Você sai com um agente, um fluxo ou um GPT customizado funcionando no seu negócio.',
    cta: 'Próxima edição →',
  },
  {
    id: 'conselho-icia',
    dotColor: 'bg-va-gold',
    tag: 'ESTRATÉGICO · MENSAL',
    title: 'CONSELHO ICIA',
    description: 'Almoço fechado entre fundadores, diretores e CEOs. Onde o ecossistema encontra sua densidade máxima.',
    cta: 'Convite exclusivo →',
  },
]

const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'video', src: '/images/doit-2.webm' },
  { type: 'image', src: '/images/mesas-doit.webp' },
  { type: 'image', src: '/images/espaco-doit.webp' },
  { type: 'image', src: '/images/estudio-doit.webp' },
]

const GALLERY_IMAGE_ALTS = [
  'Mesas de trabalho compartilhadas no Do It Hub',
  'Espaço físico do Do It Hub preparado para encontros',
  'Estúdio de gravação e conteúdo do Do It Hub',
]

export default function DoItHub() {
  return (
    <section
      id="do-it-hub"
      aria-labelledby="do-it-hub-headline"
      className="relative text-white py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-va-teal) 0%, var(--color-va-blue-electric) 50%, var(--color-va-orange-vivid) 100%)',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <RevealSection as="div" className="mb-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/80 mb-2">
              09 · DO IT HUB
            </p>
            <div className="h-px bg-white/30 max-w-[120px]" />
          </RevealSection>
          
          <h2
            id="do-it-hub-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1.05] text-balance mb-6"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Do It Hub.<br />O corpo físico do movimento.
          </h2>
          
          <p
            className="text-white/90 leading-relaxed text-balance"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            VanguardIA é o método. Do It Hub é onde o método acontece. Toda semana. Por método e por convivência.
          </p>
        </div>

        {/* 3x1 Event Grid */}
        <RevealSection
          as="ul"
          stagger
          staggerAmount={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {EVENTS.map((evt) => (
            <motion.li
              key={evt.id}
              variants={revealItemVariants}
              className="bg-va-black/85 backdrop-blur-md rounded-2xl border border-white/10 p-8 lg:p-10 flex flex-col justify-between min-h-[380px] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${evt.dotColor}`} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-va-gray-400">
                    {evt.tag}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl lg:text-[26px] tracking-tight text-white mb-4 leading-none">
                  {evt.title}
                </h3>
                <p className="text-[13.5px] lg:text-sm text-va-gray-200 leading-relaxed">
                  {evt.description}
                </p>
              </div>
              
              <div className="mt-8">
                <a
                  href={whatsappLink('Quero participar dos eventos do Do It Hub')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-white hover:text-va-orange-glow transition-colors group"
                >
                  {evt.cta}
                </a>
              </div>
            </motion.li>
          ))}
        </RevealSection>

        {/* Horizontal media gallery */}
        <div className="-mx-5 sm:-mx-8 overflow-x-auto pb-4 scrollbar-none touch-pan-x">
          <div className="flex gap-4 px-5 sm:px-8">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[320px] h-[240px] rounded-2xl overflow-hidden group shadow-lg border border-white/5"
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label="Vídeo do espaço físico do Do It Hub em Belém"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={GALLERY_IMAGE_ALTS[i - 1]}
                    loading="lazy"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-va-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white">
                    DO IT HUB · BELÉM · 2026
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
