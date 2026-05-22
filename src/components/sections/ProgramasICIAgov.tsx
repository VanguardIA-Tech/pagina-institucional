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
    title: 'CNH DA IA PARA SERVIDORES',
    tagline: 'Faixa verde',
    body: 'Certificação corporativa adaptada ao regime estatutário. Forma, avalia e certifica servidores por cargo, nível e função.',
    bullets: [
      'Diagnóstico inicial por cargo',
      'Formação modular EAD/presencial',
      'Certificação institucional'
    ],
    color: 'var(--color-va-green-vivid, #00C896)',
    colorSoft: 'rgba(0, 200, 150, 0.10)',
    icon: GraduationCap,
  },
  {
    id: 'deep',
    number: '02',
    title: 'DIAGNÓSTICO DEEP PROCESS GOV',
    tagline: 'Faixa azul',
    body: 'Mergulho presencial nos processos reais da administração. Mapa de tarefas repetitivas, oportunidades de modernização e matriz de prioridade.',
    bullets: [
      'Mapeamento de processos reais',
      'Matriz de priorização',
      'Catálogo de tarefas repetitivas'
    ],
    color: 'var(--color-va-blue-glow, #4A7BFF)',
    colorSoft: 'rgba(74, 123, 255, 0.10)',
    icon: Search,
  },
  {
    id: 'politica',
    number: '03',
    title: 'POLÍTICA INSTITUCIONAL DE IA',
    tagline: 'Faixa dourada',
    body: 'Documento institucional completo: princípios, classificação de risco, regras de uso, governança, controles e fluxo de responsabilização. Conforme LGPD e Marco Civil.',
    bullets: [
      'Princípios de uso e governança',
      'Conformidade LGPD e Marco Civil',
      'Fluxo de responsabilização'
    ],
    color: 'var(--va-gold, #C9A66B)',
    colorSoft: 'rgba(201, 166, 107, 0.12)',
    icon: FileText,
  },
  {
    id: 'houselake',
    number: '04',
    title: 'HOUSE LAKE GOVERNAMENTAL',
    tagline: 'Faixa azul profundo',
    body: 'Infraestrutura de dados soberana. Lakehouse construído sobre dados da administração, com camada ouro governada e auditável.',
    bullets: [
      'Infraestrutura soberana',
      'Camada ouro governada',
      'Rastreabilidade total'
    ],
    color: 'var(--color-va-blue-deep, #0B1A3E)',
    colorSoft: 'rgba(11, 26, 62, 0.12)',
    icon: Database,
  },
  {
    id: 'agentes',
    number: '05',
    title: 'AGENTES IPC E AUTOMAÇÃO PÚBLICA',
    tagline: 'Faixa laranja',
    body: 'Trabalhadores digitais aplicados a tarefas específicas: triagem de documentos, análise de processos, atendimento, suporte à decisão. Sempre auditáveis.',
    bullets: [
      'Triagem documental automatizada',
      'Atendimento e suporte à decisão',
      'Agentes 100% auditáveis'
    ],
    color: 'var(--color-va-orange-vivid, #FF6B1A)',
    colorSoft: 'rgba(255, 107, 26, 0.10)',
    icon: Bot,
  },
  {
    id: 'os',
    number: '06',
    title: 'ICIA.GOV OS',
    tagline: 'Faixa dourada',
    body: 'Sistema nervoso da administração. Conecta sistemas legados, dados, servidores capacitados, políticas e agentes em uma camada permanente. Para grandes órgãos e estados.',
    bullets: [
      'Integração de sistemas legados',
      'Camada de orquestração permanente',
      'Governança centralizada'
    ],
    color: 'var(--va-gold, #C9A66B)',
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
            className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-4 font-semibold"
          >
            03 · ALÉM DA EDUCAÇÃO
          </motion.p>
          <motion.h2
            id="programas-gov-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-va-black"
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
            Depois que servidores e gestores operam com critério, a VanguardIA entrega as próximas camadas — na ordem certa, com governança pública, em ciclos contratáveis individualmente.
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
                      className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="font-editorial italic text-va-gray-700 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            "Cada programa é contratável individualmente. Cada um abre a porta para o próximo. Nenhum exige os outros como pré-requisito."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
