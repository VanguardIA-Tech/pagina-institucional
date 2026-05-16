import { motion } from 'framer-motion'
import { ArrowRight, Check, Scale, Zap } from 'lucide-react'

const BENEFITS = [
  'Diagnóstico de maturidade individual e institucional',
  'Formação técnica e ética por área de atuação',
  'Avaliação por banca com critérios objetivos',
  'Certificação registrada com QR-code público',
  'Manutenção contínua — atualização semestral',
  'Política institucional de IA pronta para publicação',
]

const FUNDAMENTOS = [
  {
    label: 'Objeto singular',
    body: 'Metodologia proprietária registrada — não há equivalente substituível no mercado.',
  },
  {
    label: 'Notória especialização',
    body: 'Mais de 8.000 profissionais formados, banca técnica reconhecida e produção editorial pública.',
  },
  {
    label: 'Inviabilidade de competição',
    body: 'O caderno técnico, a banca e o registro nacional pertencem exclusivamente à VanguardIA.',
  },
]

const PASSOS = [
  {
    n: '01',
    title: 'Diagnóstico',
    body: 'Maturidade individual e institucional em até 24h',
  },
  {
    n: '02',
    title: 'Formação',
    body: 'Imersão presencial + casos reais do setor público',
  },
  {
    n: '03',
    title: 'Avaliação',
    body: 'Banca técnica e ética por especialistas',
  },
  {
    n: '04',
    title: 'Certificação',
    body: 'CNH da IA + cadastro no registro nacional',
  },
  {
    n: '05',
    title: 'Cultura',
    body: 'Política institucional de IA e comunicação interna',
  },
  {
    n: '06',
    title: 'Continuidade',
    body: 'Manutenção semestral e atualização normativa',
  },
]

const CTA_URL =
  'https://wa.me/559132233355?text=Quero%20a%20CNH%20da%20IA%20para%20servidores%20da%20minha%20instituição'

export default function CNHdaIAServidores() {
  return (
    <section
      id="cnh-gov"
      aria-labelledby="cnh-gov-headline"
      className="bg-va-black text-white"
    >
      {/* Split 60/40 */}
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* LEFT — orange 60% */}
        <div
          className="relative lg:col-span-3 px-6 sm:px-10 lg:px-16 py-20 lg:py-28 overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, var(--color-va-orange-vivid) 0%, var(--color-va-orange-deep) 100%)',
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="relative max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="font-mono text-xs uppercase tracking-[0.18em] text-white/90 mb-5"
            >
              02 · Por onde começar
            </motion.p>

            <motion.h2
              id="cnh-gov-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-white text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              CNH da IA para
              <br />
              <span className="font-editorial italic font-normal">
                Servidores Públicos.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-white/90 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              A porta de entrada de maior valor entregue e menor atrito —
              educação institucional não altera sistemas críticos e habilita o
              servidor a operar IA com responsabilidade pública.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {BENEFITS.map((b) => (
                <motion.li
                  key={b}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  className="flex items-start gap-3 text-white/95 leading-snug"
                >
                  <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-va-blue-electric text-white">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span className="text-sm">{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="mt-10 inline-flex items-center gap-2 bg-va-black hover:bg-va-gray-900 transition-colors text-white font-semibold px-7 py-4 rounded-full"
            >
              Começar pela CNH da IA
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>

        {/* RIGHT — black 40% with legal card */}
        <div className="relative lg:col-span-2 bg-va-black px-6 sm:px-10 lg:px-12 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="border border-white/15 bg-white/[0.03] rounded-2xl p-7 lg:p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-va-orange-vivid/12 text-va-orange-vivid ring-1 ring-va-orange-vivid/30"
                aria-hidden="true"
              >
                <Scale size={20} strokeWidth={2.2} />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-orange-vivid">
                Contratação por inexigibilidade
              </p>
            </div>

            <p
              className="font-display font-extrabold tracking-[-0.02em] text-white leading-tight text-balance"
              style={{ fontSize: 'clamp(20px, 2.4vw, 28px)' }}
            >
              A CNH da IA é metodologia proprietária.
            </p>

            <div
              className="mt-6 rounded-xl px-5 py-4 border border-va-orange-vivid/30"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,107,26,0.10) 0%, rgba(255,107,26,0.03) 100%)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap
                  size={14}
                  className="text-va-orange-vivid"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-va-orange-vivid font-semibold">
                  Inexigibilidade de licitação
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/90">
                Lei nº 14.133/21, Art. 74
              </p>
            </div>

            <ul className="mt-7 space-y-4">
              {FUNDAMENTOS.map((f) => (
                <li key={f.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-va-blue-glow mb-1">
                    {f.label}
                  </p>
                  <p className="text-sm text-va-gray-200 leading-relaxed">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-7 pt-6 border-t border-white/10 text-xs text-va-gray-500 leading-relaxed">
              A VanguardIA entrega o caderno técnico completo — pareceres,
              referências jurídicas e modelo de termo de referência — para
              instruir o processo administrativo do ente público.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 6 steps method */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-8">
            O método em 6 passos
          </p>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-2">
            {PASSOS.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="relative lg:px-4 py-4 lg:border-r border-white/10 last:border-r-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: 'var(--color-va-orange-vivid)',
                      background: 'rgba(255,107,26,0.12)',
                    }}
                  >
                    {p.n}
                  </span>
                  <div
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/10"
                  />
                </div>
                <h3 className="font-display font-bold text-white text-lg leading-tight">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-va-gray-200 leading-snug">
                  {p.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
