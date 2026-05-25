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

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=620&h=460&q=80',
  'https://images.unsplash.com/photo-1542744173-8e0ee26cf195?auto=format&fit=crop&w=620&h=460&q=80',
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
                <div className="flex items-center gap-2 mb-6">
                  <span className={`w-2.5 h-2.5 rounded-full ${evt.dotColor} animate-pulse`} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500">
                    {evt.tag}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl tracking-tight text-white mb-4">
                  {evt.title}
                </h3>
                <p className="text-sm text-va-gray-200 leading-relaxed">
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

        {/* Horizontal photo gallery */}
        <div className="-mx-5 sm:-mx-8 overflow-x-auto pb-4 scrollbar-none touch-pan-x">
          <div className="flex gap-4 px-5 sm:px-8">
            {GALLERY_IMAGES.map((imgSrc, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 w-[320px] h-[240px] rounded-2xl overflow-hidden group shadow-lg border border-white/5"
              >
                <img
                  src={imgSrc}
                  alt={`Do It Hub ambient ${i + 1}`}
                  loading="lazy"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
