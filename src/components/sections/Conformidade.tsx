import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const SELOS = [
  {
    sigla: 'LEI 14.133/21',
    nome: 'Licitações e Contratos',
    body: 'Nova Lei de Licitações e Contratos.',
  },
  {
    sigla: 'LC 182/2021',
    nome: 'Marco Legal das Startups',
    body: 'Marco Legal das Startups · ETE.',
  },
  {
    sigla: 'LGPD',
    nome: 'Proteção de Dados',
    body: 'Lei Geral de Proteção de Dados.',
  },
  {
    sigla: 'MARCO CIVIL',
    nome: 'Marco Civil da Internet',
    body: 'Princípios e governança.',
  },
  {
    sigla: 'CPSI',
    nome: 'Contratação Pública de Inovação',
    body: 'Contratação Pública de Soluções de Inovação.',
  },
  {
    sigla: 'CONTROLE EXTERNO',
    nome: 'TCU, TCE e Controladorias',
    body: 'TCU, TCE e controladorias internas.',
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
            06 · CONFORMIDADE
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
            A VanguardIA opera com acompanhamento de assessoria jurídica especializada em contratos públicos. Cada entrega é desenhada para passar pelo crivo de controladorias, tribunais de contas e procuradorias.
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
                    background: 'rgba(0,135,90,0.10)',
                    color: 'var(--color-va-teal)',
                  }}
                  aria-hidden="true"
                >
                  <ShieldCheck size={22} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: 'var(--color-va-teal)' }}
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
          Pareceres jurídicos, atestados de capacidade técnica e caderno completo de instrução processual fornecidos sob solicitação.
        </motion.p>
      </div>
    </section>
  )
}
