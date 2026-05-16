import { motion } from 'framer-motion'
import { ArrowRight, Star, Award } from 'lucide-react'

type Plano = {
  id: string
  level: string
  name: string
  tag?: { icon: 'star' | 'patent'; label: string }
  headline: string
  price: string
  priceCaption: string
  heightClass: string
  pxHeight: number
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
    level: 'Nível 01',
    name: 'ICIA Start',
    headline:
      'Tração imediata para empresas que precisam destravar o primeiro caso.',
    price: 'R$ 25k',
    priceCaption: 'setup único · R$ 12,9k/mês',
    heightClass: 'lg:h-[480px]',
    pxHeight: 480,
    inclui: [
      '1 CNH da IA Executiva (turma 25)',
      '1 caso de uso em produção (90 dias)',
      'Mapa de maturidade IA inicial',
      'Comitê de IA + ritual mensal',
      'Suporte 8x5',
    ],
    ideal: 'Mid-market · 1ª iniciativa estruturada',
    cta: 'Quero começar com Start',
    color: 'var(--color-va-blue-electric)',
    colorSoft: 'rgba(32, 70, 234, 0.18)',
    glow: '0 18px 60px -20px rgba(32, 70, 234, 0.55)',
  },
  {
    id: 'core',
    level: 'Nível 02',
    name: 'ICIA Core',
    tag: { icon: 'star', label: 'Recomendado' },
    headline:
      'O sistema completo: cultura, processo e orquestração rodando junto.',
    price: 'R$ 65k',
    priceCaption: 'setup + R$ 28,9k/mês',
    heightClass: 'lg:h-[540px]',
    pxHeight: 540,
    inclui: [
      'Tudo do Start +',
      'CNH Operacional em 3 áreas',
      'House Lake (dados em residência BR)',
      '3 agentes em produção (trilhas críticas)',
      'Política de IA + LGPD aplicada',
      'Observabilidade de custo e qualidade',
      'Suporte 12x6',
    ],
    ideal: 'Médias e grandes · cultura de dados em formação',
    cta: 'Quero o Core',
    color: 'var(--color-va-blue-glow)',
    colorSoft: 'rgba(74, 123, 255, 0.14)',
    glow: '0 22px 70px -18px rgba(74, 123, 255, 0.6)',
    featured: true,
  },
  {
    id: 'os',
    level: 'Nível 03',
    name: 'ICIA OS',
    tag: { icon: 'patent', label: 'Patenteado' },
    headline:
      'O sistema operacional de IA do grupo. Para quem opera escala bilionária.',
    price: 'Sob consulta',
    priceCaption: 'a partir de R$ 180k/mês',
    heightClass: 'lg:h-[600px]',
    pxHeight: 600,
    inclui: [
      'Tudo do Core +',
      'Orquestrador multi-modelo (ICIA OS)',
      'Agentes ilimitados por trilha',
      'Conselho ICIA dedicado (mensal)',
      'SLA 24x7 + Residência onsite',
      'Modelo proprietário (fine-tuning)',
      'Programa C-level + governança board',
    ],
    ideal: 'Grandes · governos · operações críticas',
    cta: 'Avaliar ICIA OS',
    color: 'var(--color-va-gold)',
    colorSoft: 'rgba(107, 63, 160, 0.22)',
    glow: '0 26px 80px -18px rgba(107, 63, 160, 0.65)',
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-4">
            03 · Escada ICIA
          </p>
          <h2
            id="escada-headline"
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Três níveis. Uma só{' '}
            <span className="text-va-blue-glow">arquitetura</span>.
          </h2>
          <p
            className="mt-6 text-va-gray-200 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Você entra no degrau que sustenta a sua operação hoje. E sobe
            quando o método pedir — não quando o discurso quiser.
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
                minHeight: p.pxHeight,
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
                  className="font-mono text-[11px] uppercase tracking-[0.16em] mb-2"
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

              <div
                className="px-7 py-5 border-y border-white/10"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <p
                  className="font-display font-extrabold leading-none"
                  style={{ fontSize: '32px', color: p.color }}
                >
                  {p.price}
                </p>
                <p className="font-mono text-[11px] text-va-gray-500 mt-1">
                  {p.priceCaption}
                </p>
              </div>

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
                  href="https://wa.me/559132233355"
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

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500">
          Tickets a partir de R$ 25k setup + R$ 12,9k/mês · contratos 12 meses
        </p>
      </div>
    </section>
  )
}
