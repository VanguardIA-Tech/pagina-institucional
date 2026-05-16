import { motion } from 'framer-motion'
import {
  GraduationCap,
  Search,
  FileText,
  Database,
  Bot,
  Cpu,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Programa = {
  id: string
  number: string
  title: string
  tagline: string
  body: string
  bullets: string[]
  color: string
  colorSoft: string
  icon: LucideIcon
}

const PROGRAMAS: Programa[] = [
  {
    id: 'cnh',
    number: '01',
    title: 'CNH da IA para Servidores',
    tagline: 'Capacidade instalada',
    body: 'Certificação adaptada ao regime estatutário, com banca técnica e registro nacional.',
    bullets: [
      'Diagnóstico de maturidade institucional',
      'Formação por área e nível de atuação',
      'Manutenção contínua semestral',
    ],
    color: 'var(--color-va-green-vivid)',
    colorSoft: 'rgba(0, 200, 150, 0.10)',
    icon: GraduationCap,
  },
  {
    id: 'deep',
    number: '02',
    title: 'Diagnóstico DEEP Process Gov',
    tagline: 'Imersão presencial',
    body: 'Mergulho nos processos reais do ente público para encontrar onde a IA gera valor mensurável.',
    bullets: [
      'Mapeamento de fluxos AS-IS / TO-BE',
      'Catálogo priorizado de casos de uso',
      'Estimativa de ROI por trilha',
    ],
    color: 'var(--color-va-blue-electric)',
    colorSoft: 'rgba(32, 70, 234, 0.14)',
    icon: Search,
  },
  {
    id: 'politica',
    number: '03',
    title: 'Política Institucional de IA',
    tagline: 'Documento completo',
    body: 'Política conforme LGPD, Marco Civil e diretrizes do CPSI — pronta para publicação.',
    bullets: [
      'Termo de referência modelo',
      'Pareceres jurídicos de suporte',
      'Plano de comunicação interna',
    ],
    color: 'var(--color-va-gold)',
    colorSoft: 'rgba(201, 166, 107, 0.12)',
    icon: FileText,
  },
  {
    id: 'houselake',
    number: '04',
    title: 'House Lake Governamental',
    tagline: 'Dados soberanos',
    body: 'Lakehouse com camada ouro auditável, dados em residência brasileira e linhagem completa.',
    bullets: [
      'Residência de dados em território nacional',
      'Catálogo de dados governamentais',
      'Auditoria e linhagem rastreável',
    ],
    color: 'var(--color-va-blue-deep)',
    colorSoft: 'rgba(11, 26, 62, 0.12)',
    icon: Database,
  },
  {
    id: 'agentes',
    number: '05',
    title: 'Agentes IPC e Automação',
    tagline: 'Trabalhadores digitais',
    body: 'Agentes auditáveis para triagem documental, atendimento e backoffice — com humano no loop.',
    bullets: [
      'Triagem documental assistida',
      'Atendimento ao cidadão com IA',
      'Trilha de auditoria por decisão',
    ],
    color: 'var(--color-va-orange-vivid)',
    colorSoft: 'rgba(255, 107, 26, 0.10)',
    icon: Bot,
  },
  {
    id: 'os',
    number: '06',
    title: 'ICIA.GOV OS',
    tagline: 'Sistema nervoso',
    body: 'Orquestrador multi-modelo para a administração pública — observabilidade, custo e qualidade.',
    bullets: [
      'Orquestração multi-modelo',
      'Observabilidade de custo e qualidade',
      'Governança board institucional',
    ],
    color: 'var(--color-va-gold)',
    colorSoft: 'rgba(201, 166, 107, 0.12)',
    icon: Cpu,
  },
]

export default function ProgramasICIAgov() {
  return (
    <section
      id="programas-gov"
      aria-labelledby="programas-gov-headline"
      className="bg-va-cream text-va-black py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-16 lg:mb-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-4"
          >
            04 · Arquitetura ICIA.GOV
          </motion.p>
          <motion.h2
            id="programas-gov-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            A CNH da IA abre a porta.
            <br />
            <span className="text-va-gray-500">
              A arquitetura ICIA.GOV constrói a casa.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 max-w-2xl text-va-gray-700 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Seis programas integrados — contratáveis individualmente — desenhados
            para o regime jurídico brasileiro e a realidade da administração
            pública.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PROGRAMAS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="bg-white rounded-2xl border border-va-gray-200 overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: p.color,
                  minHeight: 320,
                }}
              >
                <div className="px-7 pt-7 pb-5">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
                      style={{
                        background: p.colorSoft,
                        color: p.color,
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{ color: p.color }}
                    >
                      {p.number} · {p.tagline}
                    </span>
                  </div>
                  <h3
                    className="font-display font-extrabold tracking-[-0.02em] text-va-black leading-tight text-balance"
                    style={{ fontSize: 'clamp(20px, 2.2vw, 24px)' }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-va-gray-700 leading-relaxed">
                    {p.body}
                  </p>
                </div>
                <ul
                  className="px-7 py-5 mt-auto border-t border-va-gray-200/70 space-y-2"
                  style={{ background: p.colorSoft }}
                >
                  {p.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs text-va-gray-900 leading-snug"
                    >
                      <span
                        className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 lg:mt-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700"
        >
          Cada programa é contratável individualmente · todos integráveis em
          fases
        </motion.p>
      </div>
    </section>
  )
}
