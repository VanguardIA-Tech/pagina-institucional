import { motion } from 'framer-motion'
import { Layers, Database, Shield, UserCheck, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Acessorio = {
  id: string
  name: string
  description: string
  bullets: string[]
  icon: LucideIcon
  color: string
}

const ACESSORIOS: Acessorio[] = [
  {
    id: 'icia-360',
    name: 'ICIA 360',
    description:
      'Integração e substituição de sistemas. Substitui um, dois, três ou mais sistemas pré-existentes por um ambiente central fabricado para as regras do seu negócio. "A pergunta não é se vamos substituir. É em que ordem."',
    bullets: [],
    icon: Layers,
    color: 'var(--color-va-blue-electric)',
  },
  {
    id: 'data-lake',
    name: 'ICIA Data Lake',
    description:
      'Fundação de dados governada. Lakehouse sob medida, com camada ouro entregue. Dados deixam de ser arquivo isolado e viram base de decisão, dashboard, agente e governança.',
    bullets: [],
    icon: Database,
    color: 'var(--color-va-teal)',
  },
  {
    id: 'governanca',
    name: 'ICIA Governança IA',
    description:
      'POPs vivos e políticas de uso. POPs vivos, agentes-oráculos por área, políticas de uso de IA, documentação que se atualiza sozinha. Conhecimento sai da cabeça das pessoas e vira patrimônio.',
    bullets: [],
    icon: Shield,
    color: 'var(--color-va-violet-glow)',
  },
  {
    id: 'residencia',
    name: 'ICIA Residência',
    description:
      'Arquiteto de IA presencial. Um arquiteto VanguardIA dentro do seu escritório, duas vezes por semana. Embaixador interno do método.',
    bullets: [],
    icon: UserCheck,
    color: 'var(--color-va-orange-vivid)',
  },
]

export default function Acessorios() {
  return (
    <section
      id="acessorios"
      aria-labelledby="acessorios-headline"
      className="relative bg-va-cream text-va-black py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-gray-300) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-va-gray-500 mb-4">
            04 · ACESSÓRIOS
          </p>
          <h2
            id="acessorios-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-va-black"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Os multiplicadores de valor.
          </h2>
          <p
            className="mt-6 text-va-gray-700 leading-relaxed text-balance"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Soluções que se combinam com qualquer nível para resolver dores que o mercado cobra caro e entrega pela metade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {ACESSORIOS.map((a, i) => {
            const Icon = a.icon
            return (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative rounded-2xl px-7 py-8 lg:px-10 lg:py-10 overflow-hidden transition-all duration-300 bg-white border border-va-gray-200/70 hover:border-va-gray-300 shadow-[0_6px_24px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-1"
              >
                {/* Hover left accent */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-[3px] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500"
                  style={{
                    background: a.color,
                    boxShadow: `0 0 24px ${a.color}99`,
                  }}
                />

                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${a.color}14`,
                        color: a.color,
                        boxShadow: `inset 0 0 0 1px ${a.color}3A`,
                      }}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="font-display font-extrabold tracking-[-0.02em] leading-tight text-va-black"
                        style={{ fontSize: 'clamp(22px, 2.2vw, 26px)' }}
                      >
                        {a.name}
                      </h3>
                      <p className="mt-3 text-[14px] lg:text-sm leading-relaxed text-va-gray-700">
                        {a.description}
                      </p>
                      {a.bullets.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {a.bullets.map((b) => (
                            <li
                              key={b}
                              className="text-[11px] font-mono uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
                              style={{
                                background: `${a.color}14`,
                                color: a.color,
                                border: `1px solid ${a.color}55`,
                              }}
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 mt-2 text-va-gray-400 group-hover:text-va-black group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
