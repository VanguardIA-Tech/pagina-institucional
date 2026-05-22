import { motion, useReducedMotion } from 'framer-motion'
import { Users, Workflow, Cpu, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Pilar = {
  id: string
  label: string
  title: string
  description: string
  color: string
  colorSoft: string
  icon: LucideIcon
  entregas: string[]
  prova: { stat: string; caption: string }
}

const PILARES: Pilar[] = [
  {
    id: 'pessoas',
    label: 'PESSOAS',
    title: 'Camada cultural',
    description: 'Formação continuada e governança humana para que toda a empresa opere sob o mesmo método.',
    color: 'var(--color-va-orange-vivid)',
    colorSoft: 'rgba(255, 107, 26, 0.12)',
    icon: Users,
    entregas: [
      'CNH da IA',
      'Habilitação contínua',
      'Cultura de IA aplicada',
    ],
    prova: { stat: '8.000+', caption: 'pessoas habilitadas' },
  },
  {
    id: 'processos',
    label: 'PROCESSOS',
    title: 'Camada diagnóstica',
    description: 'Diagnóstico profundo e desenho de rituais que evitam o desperdício em automações inúteis.',
    color: 'var(--color-va-blue-electric)',
    colorSoft: 'rgba(32, 70, 234, 0.12)',
    icon: Workflow,
    entregas: [
      'DEEP',
      'PEI',
      'ICIA Process',
      'Documentação viva',
    ],
    prova: { stat: '1.000+', caption: 'POPs modernizados' },
  },
  {
    id: 'tecnologia',
    label: 'TECNOLOGIA',
    title: 'Camada de execução',
    description: 'Workers autônomos, lakehouses sob medida e governança soberana permanente.',
    color: 'var(--color-va-green-vivid)',
    colorSoft: 'rgba(32, 70, 234, 0.1)',
    icon: Cpu,
    entregas: [
      'Data Lake',
      'Workers AI',
      'ICIA 360',
      'ICIA OS (patenteado)',
    ],
    prova: { stat: 'Dezenas', caption: 'de agentes em produção' },
  },
]

export default function ArquiteturaICIA() {
  const reduce = useReducedMotion()

  return (
    <section
      id="arquitetura"
      aria-labelledby="arquitetura-headline"
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
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-4"
          >
            02  ·  ARQUITETURA
          </motion.p>
          <motion.h2
            id="arquitetura-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            ICIA.
            <br />
            <span className="text-va-white">
              A arquitetura da Inteligência Aplicada.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 max-w-2xl text-va-gray-200 leading-relaxed text-balance"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Não é consultoria. Não é treinamento. Não é software. É o sistema que organiza Pessoas, Processos e Tecnologia em camada permanente.
          </motion.p>
        </div>

        {/* 3 columns with connectors */}
        <div className="relative">
          {/* SVG connector */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute top-[90px] left-0 right-0 w-full h-2 pointer-events-none"
            viewBox="0 0 1200 8"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="200"
              y1="4"
              x2="1000"
              y2="4"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              initial={{ pathLength: reduce ? 1 : 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {PILARES.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: reduce ? 0 : i * 0.2,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl flex flex-col overflow-hidden hover:-translate-y-1 transition-all duration-300"
                  style={{
                    minHeight: 550,
                    boxShadow: `0 0 0 1px ${p.color}22`,
                  }}
                >
                  {/* Top color banner */}
                  <div
                    className="h-2"
                    style={{
                      background: p.color,
                      boxShadow: `0 0 24px ${p.color}66`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="px-7 py-7 border-b border-white/10"
                    style={{ background: p.colorSoft }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1 bg-va-black/40"
                        style={{
                          color: p.color,
                          boxShadow: `inset 0 0 0 1px ${p.color}55`,
                        }}
                      >
                        <Icon size={20} strokeWidth={2.2} />
                      </span>
                      <p
                        className="font-mono text-[11px] uppercase tracking-[0.16em] font-medium"
                        style={{ color: p.color }}
                      >
                        {p.label}
                      </p>
                    </div>
                    <h3
                      className="font-display font-extrabold tracking-[-0.02em] leading-[1.05] text-white text-balance"
                      style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}
                    >
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="mt-3 text-sm text-va-gray-200 leading-relaxed">
                        {p.description}
                      </p>
                    )}
                  </div>

                  {/* Entregas */}
                  <div className="px-7 py-7 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-4">
                      ENTREGAS
                    </p>
                    <ul className="space-y-3">
                      {p.entregas.map((e) => (
                        <li
                          key={e}
                          className="flex items-start gap-3 text-sm text-va-gray-200"
                        >
                          <span
                            className="shrink-0 mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full"
                            style={{ background: p.colorSoft, color: p.color }}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Proof footer */}
                  <div
                    className="px-7 py-5 border-t border-white/10 flex items-baseline gap-3"
                    style={{ background: p.colorSoft }}
                  >
                    <span
                      className="font-display font-extrabold tracking-[-0.02em]"
                      style={{
                        color: p.color,
                        fontSize: 'clamp(24px, 2.8vw, 32px)',
                      }}
                    >
                      {p.prova.stat}
                    </span>
                    <span className="text-xs text-va-gray-200 leading-tight">
                      {p.prova.caption}
                    </span>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Black anchor banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-20 rounded-2xl px-8 py-10 lg:px-14 lg:py-14 text-center border border-white/10"
          style={{
            background:
              'linear-gradient(135deg, rgba(32,70,234,0.1) 0%, rgba(10,10,15,0.85) 100%)',
          }}
        >
          <p
            className="font-editorial italic text-va-gold leading-[1.2] max-w-4xl mx-auto text-balance"
            style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
          >
            "A tecnologia só se sustenta quando há cultura, diagnóstico e clareza."
            <br />
            <span className="text-va-gray-200 text-base font-body font-normal block mt-2">
              Inverter a ordem é o que torna IA cara e descartável.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
