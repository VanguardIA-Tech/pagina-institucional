import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import RevealSection from '../ui/RevealSection'

type FaqItem = {
  q: string
  a: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'O que é a CNH da IA?',
    a: 'É a certificação institucional do Grupo VanguardIA que habilita pessoas a operar Inteligência Artificial com método, ética e segurança — antes de comprar ferramenta. Funciona como uma habilitação real: sem CNH, o piloto opera no escuro.',
  },
  {
    q: 'Em quanto tempo conseguimos ver resultado mensurável?',
    a: 'O ICIA 360 (diagnóstico) entrega o mapa AS-IS / TO-BE em até 30 dias. A maturidade operacional começa a aparecer entre o terceiro e o sexto mês, conforme a escada ICIA Start → Core → OS é percorrida.',
  },
  {
    q: 'A solução é compatível com LGPD e compliance setorial?',
    a: 'Sim. O módulo de Governança IA entrega política de uso, comitê, matriz de risco por trilha e treinamento jurídico — alinhado a LGPD, Marco Civil e exigências regulatórias setoriais (financeiro, saúde, governo).',
  },
  {
    q: 'Vocês atendem órgãos públicos?',
    a: 'Sim. A arquitetura ICIA.GOV foi desenhada para o setor público brasileiro, com contratação por inexigibilidade (Lei nº 14.133/21, Art. 74) e foco em CNH da IA para servidores, soberania de dados e governança auditável.',
  },
  {
    q: 'Como funcionam os dados — ficam onde?',
    a: 'O Data Lake (House Lake) opera em residência brasileira, com pipelines auditáveis e integração com sistemas legados. Nenhum dado sensível sai da soberania do cliente sem autorização explícita.',
  },
  {
    q: 'O que torna a VanguardIA diferente de uma consultoria tradicional?',
    a: 'Não vendemos hora de consultor nem licença de ferramenta. Entregamos uma arquitetura institucional — cultura, método e sistema — com certificação, governança e residência. O resultado é mensurável e auditável.',
  },
  {
    q: 'Quem participa do Conselho ICIA?',
    a: 'O Conselho ICIA é uma frente do Do It Hub voltada a C-level e líderes de inovação que querem antecipar movimentos estratégicos de IA. Acesso por curadoria.',
  },
  {
    q: 'Como começo o engajamento?',
    a: 'O primeiro passo é uma conversa direta com a equipe VanguardIA pelo botão "FALAR COM A VANGUARDIA". A partir do diagnóstico inicial, desenhamos o degrau certo da escada ICIA para sua organização.',
  },
]

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem
  index: number
  open: boolean
  onToggle: () => void
}) {
  const reduce = useReducedMotion()
  const baseId = useId()
  const buttonId = `${baseId}-trigger`
  const panelId = `${baseId}-panel`

  return (
    <li className="border-b border-white/10 last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group w-full flex items-start gap-5 sm:gap-6 py-6 sm:py-7 text-left hover:bg-white/[0.02] focus-visible:bg-white/[0.03] transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-lg"
        >
          <span
            aria-hidden="true"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-va-gray-500 pt-1 w-8 shrink-0"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="flex-1 font-display font-bold tracking-[-0.02em] text-white leading-[1.25] text-balance"
            style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
          >
            {item.q}
          </span>
          <span
            aria-hidden="true"
            className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white transition-all duration-300 group-hover:border-va-blue-electric group-hover:text-va-blue-glow"
            style={{
              transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
              background: open
                ? 'rgba(32, 70, 234, 0.18)'
                : 'rgba(255,255,255,0.02)',
              borderColor: open
                ? 'var(--color-va-blue-electric)'
                : undefined,
              color: open ? 'var(--color-va-blue-glow)' : undefined,
            }}
          >
            <Plus size={16} strokeWidth={2.4} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={
              reduce ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: 'auto' }}
            exit={
              reduce ? { opacity: 0, height: 'auto' } : { opacity: 0, height: 0 }
            }
            transition={{
              duration: reduce ? 0 : 0.35,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-12 sm:pl-14 pr-2 sm:pr-12 -mt-1">
              <p
                className="text-va-gray-200 leading-relaxed max-w-3xl"
                style={{ fontSize: 'var(--text-body-m)' }}
              >
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(FAQ_JSON_LD)
    script.setAttribute('data-faq-jsonld', 'true')
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])

  return (
    <section
      id="faq"
      aria-labelledby="faq-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <RevealSection as="div" className="mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-3">
            11 · FAQ
          </p>
          <div className="h-px bg-white/15 max-w-[120px]" />
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <RevealSection as="div" className="lg:col-span-5">
            <h2
              id="faq-headline"
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-white"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              Perguntas{' '}
              <span style={{ color: 'var(--color-va-blue-glow)' }}>
                frequentes
              </span>
              .
            </h2>
            <p
              className="mt-6 text-va-gray-200 leading-relaxed max-w-md"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              As dúvidas que repetem nas conversas com diretorias, comitês e
              gabinetes. Se a sua não está aqui, fale com a gente.
            </p>
            <p
              className="mt-8 font-editorial italic text-va-gold leading-[1.2]"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
            >
              "Antes da máquina, a clareza."
            </p>
          </RevealSection>

          <RevealSection
            as="div"
            className="lg:col-span-7"
            aria-labelledby="faq-headline"
          >
            <ul className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 sm:px-6 lg:px-8">
              {FAQ_ITEMS.map((item, i) => (
                <FaqRow
                  key={item.q}
                  item={item}
                  index={i}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </ul>
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
