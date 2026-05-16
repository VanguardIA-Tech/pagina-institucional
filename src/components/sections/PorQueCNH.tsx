import { motion } from 'framer-motion'
import { TrendingUp, Shield, Scale } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Card = {
  id: string
  number: string
  title: string
  subtitle: string
  bullets: string[]
  color: string
  colorSoft: string
  icon: LucideIcon
}

const CARDS: Card[] = [
  {
    id: 'valor',
    number: '01',
    title: 'Valor entregue',
    subtitle: 'Resultado mensurável em 90 dias',
    bullets: [
      'Produtividade individual auditada por área',
      'Triagem documental até 8× mais rápida',
      'Análise técnica assistida com rastreabilidade',
      'Atendimento ao cidadão com humano no loop',
    ],
    color: 'var(--color-va-orange-vivid)',
    colorSoft: 'rgba(255, 107, 26, 0.10)',
    icon: TrendingUp,
  },
  {
    id: 'risco',
    number: '02',
    title: 'Risco baixo',
    subtitle: 'Educação não altera sistemas críticos',
    bullets: [
      'Capacitação é a menor exposição institucional',
      'Sem integração em sistemas críticos',
      'Sem dependência de fornecedor único',
      'Cancelamento simples a qualquer momento',
    ],
    color: 'var(--color-va-green-vivid)',
    colorSoft: 'rgba(0, 200, 150, 0.10)',
    icon: Shield,
  },
  {
    id: 'juridica',
    number: '03',
    title: 'Viabilidade jurídica',
    subtitle: 'Inexigibilidade conforme Lei 14.133/21',
    bullets: [
      'Art. 74 — inexigibilidade aplicável',
      'Objeto singular e notória especialização',
      'Caderno técnico completo fornecido',
      'Pareceres de suporte ao processo',
    ],
    color: 'var(--color-va-gold)',
    colorSoft: 'rgba(201, 166, 107, 0.12)',
    icon: Scale,
  },
]

export default function PorQueCNH() {
  return (
    <section
      id="por-que-cnh"
      aria-labelledby="por-que-cnh-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-4xl mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-4">
            03 · A decisão racional
          </p>
          <h2
            id="por-que-cnh-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Por que a CNH da IA é a{' '}
            <span className="text-va-orange-vivid">
              primeira decisão racional
            </span>{' '}
            de qualquer gestor público em 2026.
          </h2>
          <p
            className="mt-6 max-w-3xl text-va-gray-200 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Três eixos sustentam a decisão — valor entregue, exposição
            institucional e viabilidade jurídica. Os três convergem para o
            mesmo ponto de entrada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {CARDS.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 lg:p-8 flex flex-col hover:border-white/20 transition-colors"
                style={{ minHeight: 400 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg ring-1"
                    style={{
                      background: c.colorSoft,
                      color: c.color,
                      boxShadow: `inset 0 0 0 1px ${c.color}33`,
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={22} strokeWidth={2.2} />
                  </span>
                  <span
                    className="font-mono text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: c.color }}
                  >
                    {c.number}
                  </span>
                </div>
                <h3
                  className="font-display font-extrabold tracking-[-0.02em] leading-tight"
                  style={{
                    fontSize: 'clamp(24px, 2.8vw, 30px)',
                    color: c.color,
                  }}
                >
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-va-gray-200 leading-snug mb-6">
                  {c.subtitle}
                </p>
                <ul className="space-y-3 mt-auto">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-va-gray-200 leading-snug"
                    >
                      <span
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ background: c.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl px-8 py-10 lg:px-14 lg:py-14 border border-va-green-vivid/30"
          style={{
            background:
              'linear-gradient(135deg, var(--color-va-green-deep) 0%, rgba(0, 200, 150, 0.15) 100%)',
          }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-va-green-glow mb-4">
            O recado
          </p>
          <p
            className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.02em] text-balance"
            style={{ fontSize: 'var(--text-display-m)' }}
          >
            Não capacitar servidores em IA é o risco.
            <br />
            <span className="text-va-green-glow">
              Capacitar com método é o caminho seguro.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
