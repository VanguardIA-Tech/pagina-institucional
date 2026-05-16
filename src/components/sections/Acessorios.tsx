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
      'Diagnóstico completo de maturidade, riscos e oportunidades de IA em até 30 dias.',
    bullets: ['Mapa AS-IS / TO-BE', 'Score NPS interno', 'Roadmap 12 meses'],
    icon: Layers,
    color: 'var(--color-va-blue-electric)',
  },
  {
    id: 'data-lake',
    name: 'Data Lake (House Lake)',
    description:
      'Repositório soberano em residência brasileira — pronto para alimentar agentes sem expor dados sensíveis.',
    bullets: [
      'Hospedagem nacional',
      'Pipelines auditáveis',
      'Integração com legados',
    ],
    icon: Database,
    color: 'var(--color-va-green-vivid)',
  },
  {
    id: 'governanca',
    name: 'Governança IA',
    description:
      'Política, comitê e controles para operar IA sem violar LGPD, Marco Civil ou compliance setorial.',
    bullets: [
      'Política de uso interna',
      'Matriz de risco por trilha',
      'Treinamento de jurídico',
    ],
    icon: Shield,
    color: 'var(--color-va-orange-vivid)',
  },
  {
    id: 'residencia',
    name: 'Residência ICIA',
    description:
      'Especialistas alocados na sua operação para acelerar adoção e blindar a curva de aprendizado.',
    bullets: ['Onsite ou híbrido', 'Squad sênior dedicado', 'SLA 12x6'],
    icon: UserCheck,
    color: 'var(--color-va-gold)',
  },
]

export default function Acessorios() {
  return (
    <section
      id="acessorios"
      aria-labelledby="acessorios-headline"
      className="bg-va-cream text-va-black py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14 lg:mb-20 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-4">
            04 · Acessórios
          </p>
          <h2
            id="acessorios-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Módulos que se encaixam em qualquer degrau da escada.
          </h2>
          <p
            className="mt-6 text-va-gray-700 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Plug-ins de método, dado e governança que aceleram o ICIA Start,
            Core ou OS — sem retrabalho de arquitetura.
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
                whileHover={{ x: 4 }}
                className="group relative bg-white border border-va-gray-200 rounded-2xl px-7 py-8 lg:px-9 lg:py-10 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Hover left border */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-[3px] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300"
                  style={{ background: a.color }}
                />

                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <span
                      className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{
                        background: `${a.color}1A`,
                        color: a.color,
                      }}
                    >
                      <Icon size={22} strokeWidth={2.2} />
                    </span>
                    <div>
                      <h3
                        className="font-display font-extrabold tracking-[-0.02em] text-va-black leading-tight"
                        style={{ fontSize: 'clamp(22px, 2.4vw, 28px)' }}
                      >
                        {a.name}
                      </h3>
                      <p className="mt-3 text-sm text-va-gray-700 leading-relaxed pr-2">
                        {a.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {a.bullets.map((b) => (
                          <li
                            key={b}
                            className="text-[11px] font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                            style={{
                              background: `${a.color}14`,
                              color: a.color,
                            }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 mt-2 text-va-gray-500 group-hover:text-va-black transition-colors"
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
