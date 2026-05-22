import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'

const DIAGNOSTICO = [
  {
    title: 'DIAGNÓSTICO 1',
    body: 'Sistemas legados acumulam décadas de dados. A administração não consegue transformar esses dados em decisão pública.',
  },
  {
    title: 'DIAGNÓSTICO 2',
    body: 'Servidores usam IA generativa sem método, sem política, sem governança. O risco jurídico cresce. A produtividade não.',
  },
  {
    title: 'DIAGNÓSTICO 3',
    body: 'Consultorias entregam relatórios. Software vendors entregam licenças. Ninguém entrega capacidade real de operar.',
  },
]

const PASSOS = [
  {
    n: '01',
    title: 'HABILITAR',
    body: 'servidores e gestores',
    color: 'var(--color-va-orange-vivid)',
  },
  {
    n: '02',
    title: 'DIAGNOSTICAR',
    body: 'processos reais',
    color: 'var(--color-va-blue-glow)',
  },
  {
    n: '03',
    title: 'MODERNIZAR',
    body: 'com governança e tecnologia',
    color: 'var(--color-va-gold)',
  },
]

export default function TeseGov() {
  return (
    <section
      id="tese-gov"
      aria-labelledby="tese-gov-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden"
    >
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
        <RevealSection as="div" className="mb-14 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-3">
            01 · A TESE GOV
          </p>
          <div className="h-px bg-white/10 max-w-[120px]" />
        </RevealSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <div className="lg:col-span-5">
            <h2
              id="tese-gov-headline"
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-white"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              A administração pública brasileira
              <br />
              não tem um problema de tecnologia.
            </h2>

            <p
              className="mt-10 font-editorial italic text-va-orange-vivid leading-[1.15] text-balance"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              Tem um problema de capacidade instalada para operar a tecnologia que já tem.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {DIAGNOSTICO.map((d) => (
              <motion.article
                key={d.title}
                variants={revealItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="border border-white/10 bg-white/[0.02] rounded-xl p-6 lg:p-7 hover:border-red-500/30 transition-colors"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/70 mb-3">
                  Diagnóstico
                </p>
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-500/15 text-red-400 ring-1 ring-red-500/30">
                    <X size={16} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base lg:text-lg text-white mb-2 leading-tight">
                      {d.title}
                    </h3>
                    <p className="text-sm text-va-gray-200 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Green anchor banner */}
        <RevealSection as="div" className="mb-16">
          <div
            className="rounded-2xl px-8 py-10 lg:px-14 lg:py-14 border border-va-green-deep/30"
            style={{
              background:
                'linear-gradient(135deg, var(--color-va-green-deep, #00563F) 0%, rgba(0, 200, 150, 0.15) 100%)',
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-va-green-vivid mb-4">
              O método VanguardIA
            </p>
            <p
              className="font-display font-extrabold text-white leading-[1.05] tracking-[-0.02em] text-balance"
              style={{ fontSize: 'var(--text-display-m)' }}
            >
              Pelo método VanguardIA, capacidade vem primeiro.
              <br />
              <span className="text-va-green-vivid">Tecnologia vem depois.</span>
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
          {PASSOS.map((step) => (
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
                style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}
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

        <RevealSection as="div" className="mt-20 lg:mt-28 text-center">
          <p
            className="font-editorial italic text-va-gold leading-[1.15] max-w-3xl mx-auto text-balance"
            style={{ fontSize: 'clamp(22px, 2.8vw, 36px)' }}
          >
            A IA na administração pública só gera valor depois que existe gente
            preparada para operá-la com responsabilidade pública.
          </p>
        </RevealSection>
      </div>
    </section>
  )
}
