import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const SELOS = [
  {
    sigla: 'Lei 14.133/21',
    nome: 'Nova Lei de Licitações',
    body: 'Inexigibilidade aplicada — Art. 74. Caderno técnico completo entregue.',
  },
  {
    sigla: 'LC 182/2021',
    nome: 'Marco Legal das Startups',
    body: 'Contratação de inovação com base em metodologia proprietária.',
  },
  {
    sigla: 'LGPD',
    nome: 'Lei Geral de Proteção de Dados',
    body: 'Dados em residência brasileira, governança documentada e DPO designado.',
  },
  {
    sigla: 'Marco Civil',
    nome: 'Marco Civil da Internet',
    body: 'Princípios de neutralidade, privacidade e responsabilidade observados.',
  },
  {
    sigla: 'CPSI',
    nome: 'Comitê de Política de Segurança da Informação',
    body: 'Aderência às diretrizes de segurança da informação no setor público.',
  },
  {
    sigla: 'Controle Externo',
    nome: 'TCU e Tribunais de Contas',
    body: 'Estrutura auditável por linhagem, custos e decisões automatizadas.',
  },
]

export default function Conformidade() {
  return (
    <section
      id="conformidade"
      aria-labelledby="conformidade-headline"
      className="bg-va-cream text-va-black py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="mb-14 lg:mb-20 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700 mb-4"
          >
            07 · Conformidade
          </motion.p>
          <motion.h2
            id="conformidade-headline"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
            style={{ fontSize: 'var(--text-display-l)' }}
          >
            Trabalhamos onde o{' '}
            <span className="text-va-orange-vivid">direito público</span>{' '}
            define o contorno.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl text-va-gray-700 leading-relaxed"
            style={{ fontSize: 'var(--text-body-l)' }}
          >
            Cada programa é desenhado com assessoria jurídica especializada em
            contratos públicos. Os marcos abaixo estruturam a contratação,
            execução e auditoria.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {SELOS.map((s, i) => (
            <motion.article
              key={s.sigla}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="bg-white rounded-2xl border border-va-gray-200 px-6 py-7 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg"
                  style={{
                    background: 'rgba(0,86,63,0.10)',
                    color: 'var(--color-va-green-deep)',
                  }}
                  aria-hidden="true"
                >
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: 'var(--color-va-green-deep)' }}
                  >
                    {s.sigla}
                  </p>
                  <h3 className="font-display font-bold text-va-black text-base mt-1 leading-tight">
                    {s.nome}
                  </h3>
                  <p className="mt-3 text-sm text-va-gray-700 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 lg:mt-16 text-center font-mono text-xs uppercase tracking-[0.18em] text-va-gray-700"
        >
          Pareceres jurídicos fornecidos sob solicitação
        </motion.p>
      </div>
    </section>
  )
}
