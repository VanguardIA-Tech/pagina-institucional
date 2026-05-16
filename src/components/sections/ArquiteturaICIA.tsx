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
    label: 'Pilar 01 · Pessoas',
    title: 'A cultura precede a ferramenta.',
    description:
      'Antes da stack, formamos quem decide. CNH da IA, mentorias e governança humana — para que o time pare de pilotar no escuro.',
    color: 'var(--color-va-blue-glow)',
    colorSoft: 'rgba(74, 123, 255, 0.18)',
    icon: Users,
    entregas: [
      'CNH da IA Executiva (8h)',
      'CNH Operacional por área (24h)',
      'Comitê de IA setup + ritual mensal',
      'Mapa de Maturidade IA (NPS interno)',
      'Plano de comunicação interna',
    ],
    prova: { stat: '8.000+', caption: 'pessoas certificadas em 5 anos' },
  },
  {
    id: 'processos',
    label: 'Pilar 02 · Processos',
    title: 'Onde o método sustenta a máquina.',
    description:
      'Mapeamos cadeias críticas, encaixamos IA onde gera valor mensurável e blindamos contra alucinação, vazamento e descontrole de custo.',
    color: 'var(--color-va-blue-electric)',
    colorSoft: 'rgba(32, 70, 234, 0.18)',
    icon: Workflow,
    entregas: [
      'Mapa AS-IS / TO-BE assistido por IA',
      'Catálogo de casos de uso priorizados',
      'Playbook de operação (SLAs, owners)',
      'Política de uso e LGPD aplicada',
      'KPIs de adoção e ROI por trilha',
    ],
    prova: { stat: '600+', caption: 'projetos entregues em produção' },
  },
  {
    id: 'tecnologia',
    label: 'Pilar 03 · Tecnologia',
    title: 'A stack que cabe no problema.',
    description:
      'Orquestração multi-modelo, dados soberanos em residência brasileira, agentes específicos por trilha — não a moda da semana.',
    color: 'var(--color-va-orange-vivid)',
    colorSoft: 'rgba(255, 107, 26, 0.18)',
    icon: Cpu,
    entregas: [
      'ICIA OS — orquestrador multi-modelo',
      'House Lake (dados em residência BR)',
      'Agentes por trilha (jurídico, comercial, ops)',
      'Observabilidade de custo e qualidade',
      'Integração com sistemas legados',
    ],
    prova: { stat: 'R$ 1bi+', caption: 'em ativos sob orquestração' },
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
            className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-4"
          >
            02 · Arquitetura
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
            Três pilares. Uma única ordem.
            <br />
            <span className="text-va-gray-500">
              Pessoas → Processos → Tecnologia.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 max-w-2xl text-va-gray-200 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            A Arquitetura ICIA é o esqueleto operacional do Grupo VanguardIA.
            Cada pilar opera como um sistema, mas é a conexão entre eles que
            mantém a IA dentro do orçamento — e fora do escândalo.
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
                    <p className="mt-3 text-sm text-va-gray-200 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Entregas */}
                  <div className="px-7 py-7 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-4">
                      Entregas
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
              'linear-gradient(135deg, rgba(45,16,80,0.45) 0%, rgba(10,10,15,0.85) 100%)',
          }}
        >
          <p
            className="font-editorial italic text-va-gold leading-[1.1] max-w-3xl mx-auto text-balance"
            style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
          >
            Não orquestramos modelos. Orquestramos pessoas, processos e
            tecnologia — nessa ordem.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
