import { motion } from 'framer-motion'
import { ArrowRight, Star, Award } from 'lucide-react'
import { whatsappLink } from '../../lib/whatsapp'

type Plano = {
  id: string
  level: string
  name: string
  tag?: { icon: 'star' | 'patent'; label: string }
  headline: string
  heightClass: string
  inclui: string[]
  ideal: string
  cta: string
  color: string
  colorSoft: string
  glow: string
  featured?: boolean
}

const PLANOS: Plano[] = [
  {
    id: 'start',
    level: '01',
    name: 'ICIA START',
    headline: 'A entrada estratégica.',
    heightClass: 'lg:min-h-[460px]',
    inclui: [
      'CNH da IA para áreas críticas',
      'Diagnóstico DEEP inicial',
      '1-2 agentes piloto em produção',
      'Linguagem comum instalada',
      'Ciclo: 6 meses',
    ],
    ideal: 'Primeira experiência estruturada com IA aplicada no corporativo.',
    cta: 'Quero começar com Start',
    color: 'var(--color-va-blue-glow)',
    colorSoft: 'rgba(74, 123, 255, 0.12)',
    glow: '0 18px 60px -20px rgba(74, 123, 255, 0.55)',
  },
  {
    id: 'core',
    level: '02',
    name: 'ICIA CORE',
    tag: { icon: 'star', label: 'RECOMENDADO' },
    headline: 'A transformação multissetorial.',
    heightClass: 'lg:min-h-[520px]',
    inclui: [
      'CNH da IA em múltiplas áreas',
      'DEEP + PEI completos',
      'Múltiplos agentes em produção',
      'Data Lake operacional',
      'Governança IA instalada',
      'Dashboards conversacionais',
      'Ciclo: 12 meses',
    ],
    ideal: 'Empresas prontas para fazer da IA Aplicada um diferencial competitivo permanente.',
    cta: 'Quero o Core',
    color: 'var(--color-va-blue-glow)',
    colorSoft: 'rgba(74, 123, 255, 0.12)',
    glow: '0 22px 70px -18px rgba(74, 123, 255, 0.6)',
    featured: true,
  },
  {
    id: 'os',
    level: '03',
    name: 'ICIA OS',
    tag: { icon: 'patent', label: 'PATENTEADO' },
    headline: 'O sistema nervoso completo.',
    heightClass: 'lg:min-h-[580px]',
    inclui: [
      'Sistema entre sistemas',
      'Agentes orquestrados',
      'Dados governados',
      'Pessoas habilitadas',
      'ICIA 360 integrado',
      'Camada permanente',
      'Contrato perpétuo',
    ],
    ideal: 'Empresas que querem deixar legado operacional.',
    cta: 'Avaliar ICIA OS',
    color: 'var(--color-va-gold)',
    colorSoft: 'rgba(201, 166, 107, 0.22)',
    glow: '0 26px 80px -18px rgba(201, 166, 107, 0.65)',
  },
]

export default function EscadaICIA() {
  return (
    <section
      id="escada"
      aria-labelledby="escada-headline"
      className="relative py-24 lg:py-32 overflow-hidden text-white"
      style={{ background: 'var(--gradient-data)' }}
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
        <div className="max-w-3xl mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-4 animate-pulse">
            03  ·  ICIA OS
          </p>
          <h2
            id="escada-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Três níveis. Uma escada natural.
          </h2>
          <p
            className="mt-6 text-va-gray-200 leading-relaxed text-balance"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Cada empresa entra pelo nível certo. Ninguém pula degrau. Ninguém regride.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-end">
          {PLANOS.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={{
                y: -8,
                boxShadow: p.glow,
                transition: { duration: 0.25 },
              }}
              className={`relative rounded-2xl border bg-white/[0.03] backdrop-blur-sm flex flex-col overflow-hidden ${p.heightClass}`}
              style={{
                borderColor: p.featured ? p.color : 'rgba(255,255,255,0.08)',
              }}
            >
              {p.tag && (
                <div
                  className="absolute top-5 right-5 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: p.colorSoft,
                    color: p.color,
                    border: `1px solid ${p.color}55`,
                  }}
                >
                  {p.tag.icon === 'star' ? (
                    <Star size={11} fill={p.color} strokeWidth={0} />
                  ) : (
                    <Award size={11} strokeWidth={2.5} />
                  )}
                  {p.tag.label}
                </div>
              )}

              <div className="px-7 pt-8 pb-6">
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2 font-bold animate-pulse"
                  style={{ color: p.color }}
                >
                  {p.level}
                </p>
                <h3
                  className="font-display font-extrabold tracking-[-0.02em] leading-none"
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    color: 'white',
                  }}
                >
                  {p.name}
                </h3>
                <p className="mt-3 text-sm text-va-gray-200 leading-relaxed pr-6">
                  {p.headline}
                </p>
              </div>

              <div className="h-px bg-white/10 mx-7" />

              <div className="px-7 py-6 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-3">
                  O que inclui
                </p>
                <ul className="space-y-2 text-sm text-va-gray-200">
                  {p.inclui.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 leading-snug"
                    >
                      <span
                        className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-7 pb-6 mt-auto">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-va-gray-500 mb-2">
                  Ideal para
                </p>
                <p className="text-xs text-va-gray-200 mb-5 leading-snug">
                  {p.ideal}
                </p>

                <a
                  href={whatsappLink(p.cta)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between w-full gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
                  style={{
                    background: p.featured ? p.color : 'transparent',
                    color: p.featured ? 'var(--color-va-black)' : 'white',
                    border: p.featured
                      ? 'none'
                      : `1px solid ${p.color}`,
                  }}
                >
                  {p.cta}
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.18em] text-va-gray-200 text-balance">
          Tickets a partir de R$ 25k de setup + R$ 12,9k/mês. Todos os programas são semestrais com renovação automática.
        </p>
      </div>
    </section>
  )
}
