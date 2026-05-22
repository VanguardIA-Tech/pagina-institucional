import { motion } from 'framer-motion'
import { ArrowRight, Check, Scale, Zap } from 'lucide-react'

const BENEFITS = [
  'Diagnóstico inicial por cargo, nível e setor',
  'Formação modular (presencial e/ou EAD)',
  'Avaliação individual com selo de aproveitamento',
  'Certificação institucional VanguardIA',
  'Manutenção contínua + biblioteca de prompts e POPs',
  'Política institucional de uso de IA entregue ao final',
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
    title: 'DIAGNÓSTICO',
    body: 'o que cada cargo precisa saber',
  },
  {
    n: '02',
    title: 'FORMAÇÃO',
    body: 'treinamento por cargo e função',
  },
  {
    n: '03',
    title: 'AVALIAÇÃO',
    body: 'quem opera, quem só assiste',
  },
  {
    n: '04',
    title: 'CERTIFICAÇÃO',
    body: 'selo oficial VanguardIA',
  },
  {
    n: '05',
    title: 'CULTURA',
    body: 'IA vira hábito da operação',
  },
  {
    n: '06',
    title: 'CONTINUIDADE',
    body: 'recertificação contínua',
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
        {/* LEFT — orange 60% (gov explosive variant) */}
        <div
          className="relative lg:col-span-3 px-6 sm:px-10 lg:px-16 py-20 lg:py-28 overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, #FF4500 0%, var(--color-va-orange-vivid) 50%, var(--color-va-orange-deep) 100%)',
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
              02 · POR ONDE COMEÇAR
            </motion.p>

            <motion.h2
              id="cnh-gov-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="font-editorial italic tracking-[-0.025em] leading-[1] text-white text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              CNH da IA para Servidores Públicos.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display font-extrabold text-white text-balance"
              style={{ fontSize: 'var(--text-display-m)' }}
            >
              A porta de entrada de maior valor entregue e menor atrito para modernizar uma administração pública agora.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-white/90 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              Compreensão. Navegação. Habilitação.
              <br />
              Metodologia de pilotagem da IA aplicada ao serviço público — desenhada por cargo, nível e função. Cada servidor é diagnosticado, formado, avaliado e certificado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 rounded-xl p-6 border border-white/20"
              style={{ background: 'rgba(10, 10, 15, 0.35)', backdropFilter: 'blur(4px)' }}
            >
              <p className="text-sm font-semibold text-white">
                8.000+ profissionais já habilitados no setor privado.
              </p>
              <p className="mt-2 text-xs text-white/80 leading-relaxed">
                Agora estruturada para servidores públicos, com adaptações ao regime estatutário, conformidade LGPD e linguagem jurídico-administrativa.
              </p>
            </motion.div>

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
                  <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-va-green-vivid text-va-black">
                    <Check size={12} strokeWidth={3.5} />
                  </span>
                  <span className="text-sm">{b}</span>
                </motion.li>
              ))}
            </motion.ul>

            <div className="mt-10">
              <motion.a
                href={CTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-va-black hover:bg-va-gray-900 transition-colors text-white font-semibold px-7 py-4 rounded-full border border-white/20"
              >
                Começar pela CNH da IA
                <ArrowRight size={16} />
              </motion.a>
            </div>
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
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg ring-1"
                style={{
                  background: 'rgba(255, 69, 0, 0.14)',
                  color: '#FF6B1A',
                  boxShadow: 'inset 0 0 0 1px rgba(255, 69, 0, 0.4)',
                }}
                aria-hidden="true"
              >
                <Scale size={20} strokeWidth={2.2} />
              </span>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-va-orange-glow"
              >
                ⚖️ CONTRATAÇÃO POR INEXIGIBILIDADE
              </p>
            </div>

            <p
              className="text-sm text-va-gray-200 leading-relaxed mb-4"
            >
              A CNH da IA é metodologia proprietária da VanguardIA, com registro, marca própria e singularidade de objeto.
            </p>
            <p
              className="text-sm text-va-gray-200 leading-relaxed mb-6"
            >
              Não existe concorrente direto no Brasil ofertando a mesma certificação corporativa de Inteligência Aplicada para o setor público.
            </p>

            <div
              className="mt-6 rounded-xl px-5 py-4 border mb-6"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,69,0,0.14) 0%, rgba(255,107,26,0.04) 100%)',
                borderColor: 'rgba(255, 69, 0, 0.4)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap
                  size={14}
                  className="text-va-orange-vivid"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-va-orange-vivid"
                >
                  Inexigibilidade de licitação
                </p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/90">
                Lei nº 14.133/21, Art. 74
              </p>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.16em] mb-4 text-va-orange-glow">
              Fundamentos aplicáveis:
            </p>
            <ul className="mt-2 space-y-4">
              {FUNDAMENTOS.map((f) => (
                <li key={f.label}>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1 font-semibold text-white"
                  >
                    • {f.label}
                  </p>
                  <p className="text-sm text-va-gray-300 leading-relaxed ml-2">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-7 pt-6 border-t border-white/10 text-xs text-va-gray-400 leading-relaxed">
              A VanguardIA entrega o caderno técnico completo para instrução do processo: justificativa técnica, comprovação de singularidade, atestados de capacidade técnica e parecer de razoabilidade do preço.
            </p>
            <p className="mt-4 text-xs text-va-gray-400 leading-relaxed border-t border-white/5 pt-4">
              Com acompanhamento de assessoria jurídica especializada em contratos públicos.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 6 steps method */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,107,26,0.22)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <p
            className="font-mono text-xs uppercase tracking-[0.18em] mb-8"
            style={{ color: 'var(--color-va-orange-glow)' }}
          >
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
                className="relative lg:px-4 py-4 lg:border-r last:border-r-0"
                style={{ borderColor: 'rgba(255,107,26,0.18)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: '#FF4500',
                      background: 'rgba(255,69,0,0.14)',
                    }}
                  >
                    {p.n}
                  </span>
                  <div
                    aria-hidden="true"
                    className="h-px flex-1"
                    style={{ background: 'rgba(255,107,26,0.22)' }}
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
