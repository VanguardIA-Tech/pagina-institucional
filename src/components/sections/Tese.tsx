import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'

const FILMES = [
  {
    title: 'O Copilot da diretoria',
    body: 'R$ 480k em licenças anuais para 1.200 cadeiras. Adoção real: 9%. Ninguém ousa cancelar — virou status, não ferramenta.',
  },
  {
    title: 'O RAG do jurídico',
    body: 'Seis meses de PoC, dois fornecedores, três jurídicos diferentes consultados. O modelo responde rápido. As respostas estão erradas em 4 de 10 casos.',
  },
  {
    title: 'O agente de atendimento',
    body: 'Promessa: reduzir 40% do volume humano. Realidade: o agente devolve para o humano em 73% dos contatos — e o cliente já chega irritado.',
  },
]

const ORDEM = [
  {
    n: '01',
    title: 'Pessoas',
    body: 'Quem decide precisa entender o que está decidindo. Sem CNH, o piloto é cego.',
    color: 'var(--color-va-blue-glow)',
  },
  {
    n: '02',
    title: 'Processos',
    body: 'IA sem processo é improviso caro. Mapeamos onde o método sustenta a tecnologia.',
    color: 'var(--color-va-blue-electric)',
  },
  {
    n: '03',
    title: 'Tecnologia',
    body: 'Só agora a stack. E só a stack que cabe no problema — não a que está em alta no LinkedIn.',
    color: 'var(--color-va-orange-vivid)',
  },
]

export default function Tese() {
  return (
    <section
      id="tese"
      aria-labelledby="tese-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Label */}
        <RevealSection as="div" className="mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-gray-500 mb-3">
            01 · A Tese
          </p>
          <div className="h-px bg-white/10 max-w-[120px]" />
        </RevealSection>

        {/* 12-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <div className="lg:col-span-5">
            <h2
              id="tese-headline"
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              A maioria dos projetos de IA do Brasil
              <br />
              <span className="text-va-gray-500">vai falhar.</span>
            </h2>

            <p
              className="mt-8 max-w-md text-va-gray-200 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              Não por falta de modelo. Não por falta de orçamento. Por
              ignorarem a ordem.
            </p>

            <p
              className="mt-10 font-editorial italic text-va-orange-vivid leading-[1.15] text-balance"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              "Compraram a ferramenta antes de aprender a dirigir."
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {FILMES.map((f) => (
              <motion.article
                key={f.title}
                variants={revealItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="border border-white/10 bg-white/[0.02] rounded-xl p-6 lg:p-7 hover:border-red-500/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                    <X size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-va-gray-200 leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Blue anchor banner */}
        <RevealSection as="div" className="mb-16">
          <div
            className="rounded-2xl px-8 py-10 lg:px-14 lg:py-14 border border-va-blue-electric/30"
            style={{
              background:
                'linear-gradient(135deg, var(--color-va-blue-deep) 0%, rgba(32, 70, 234, 0.18) 100%)',
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-va-blue-glow mb-4">
              O diagnóstico real
            </p>
            <p
              className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.02em] text-balance"
              style={{ fontSize: 'var(--text-display-m)' }}
            >
              O problema não foi a ferramenta.
              <br />
              <span className="text-va-blue-glow">Foi a ordem.</span>
            </p>
          </div>
        </RevealSection>

        {/* 3 ordered steps */}
        <RevealSection
          as="div"
          stagger
          staggerAmount={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
        >
          {ORDEM.map((step) => (
            <motion.div
              key={step.n}
              variants={revealItemVariants}
              className="bg-va-black p-8 lg:p-10 relative"
            >
              <div
                className="font-mono text-xs uppercase tracking-[0.18em] mb-6"
                style={{ color: step.color }}
              >
                {step.n}
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-white mb-4"
                style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
              >
                {step.title}
              </h3>
              <p className="text-va-gray-200 text-sm leading-relaxed">
                {step.body}
              </p>
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-12"
                style={{ background: step.color }}
              />
            </motion.div>
          ))}
        </RevealSection>

        {/* Gold closing phrase */}
        <RevealSection as="div" className="mt-20 lg:mt-28 text-center">
          <p
            className="font-editorial italic text-va-gold leading-[1.15] max-w-3xl mx-auto text-balance"
            style={{ fontSize: 'clamp(24px, 3.2vw, 40px)' }}
          >
            Primeiro a cultura. Depois o método.
            <br />
            Só então a máquina aprende a trabalhar.
          </p>
        </RevealSection>
      </div>
    </section>
  )
}
