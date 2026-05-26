import { motion } from 'framer-motion'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'

const FILMES = [
  {
    title: 'FILME 1',
    body: 'Contratou consultoria de processos. Ganhou um Notion bonito que ninguém abriu.',
  },
  {
    title: 'FILME 2',
    body: 'Implantou um sistema caro. O time continuou na planilha do Drive.',
  },
  {
    title: 'FILME 3',
    body: 'Colocou ChatGPT na operação. Cada um virou um especialista em prompt no escuro. Sem padrão. Sem memória. Sem método.',
  },
]

const ORDEM = [
  {
    n: '01',
    title: 'PESSOAS',
    body: 'Habilitar',
    color: 'var(--color-va-teal)',
  },
  {
    n: '02',
    title: 'PROCESSOS',
    body: 'Diagnosticar',
    color: 'var(--color-va-blue-glow)',
  },
  {
    n: '03',
    title: 'TECNOLOGIA',
    body: 'Personalizar',
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
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-va-orange-vivid mb-3">
            01  ·  A TESE
          </p>
          <div className="h-px bg-white/10 max-w-[120px]" />
        </RevealSection>

        {/* 12-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <div className="lg:col-span-5">
            <h2
              id="tese-headline"
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-balance text-white"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              A maioria das empresas não tem um problema de IA.
            </h2>

            <p
              className="mt-10 font-editorial italic text-va-orange-vivid leading-[1.15] text-balance"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              Tem um problema de organização que a IA expôs.
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
                className="relative border border-white/10 bg-white/[0.02] rounded-xl flex overflow-hidden hover:border-red-500/25 transition-all duration-300 group shadow-lg shadow-black/40"
              >
                {/* Vintage VHS Dark Spine Left Edge */}
                <div className="w-8 shrink-0 bg-neutral-950 border-r border-white/5 flex flex-col justify-around py-3 items-center min-h-full select-none relative">
                  <div className="w-3.5 h-2 bg-black rounded-[1px] border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                  <div className="w-3.5 h-2 bg-black rounded-[1px] border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                  
                  {/* Subtle red indicator inside a black notch */}
                  <div className="w-3.5 h-2 bg-black rounded-[1px] border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>

                  <div className="w-3.5 h-2 bg-black rounded-[1px] border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                  <div className="w-3.5 h-2 bg-black rounded-[1px] border border-white/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
                </div>

                {/* Content */}
                <div className="p-6 lg:p-7 flex-1 flex flex-col justify-center bg-transparent">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[10px] font-mono text-red-500 font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/25 animate-pulse select-none">
                      PLAY ◀
                    </span>
                    <h3 className="font-display font-bold text-lg text-white">
                      ❌ {f.title}
                    </h3>
                  </div>
                  <p className="text-sm text-va-gray-200 leading-relaxed">
                    {f.body}
                  </p>
                </div>

                {/* Subtle cassette tape window background on hover */}
                <div className="absolute right-4 bottom-4 w-12 h-8 border border-white/5 rounded opacity-10 group-hover:opacity-30 transition-opacity bg-gradient-to-t from-neutral-950 to-neutral-900 flex items-center justify-around px-1 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full border border-dashed border-white/40 animate-spin" style={{ animationDuration: '6s' }} />
                  <div className="w-2.5 h-2.5 rounded-full border border-dashed border-white/40 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Anchor banner — premium dark with gold accent */}
        <RevealSection as="div" className="mb-20 lg:mb-24">
          <div
            className="relative rounded-2xl px-8 py-12 lg:px-16 lg:py-16 text-center border border-white/10 overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(32,70,234,0.18) 0%, rgba(10,10,15,0.95) 70%)',
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.05] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <p className="relative font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.28em] text-va-gold mb-5">
              A tese, em uma linha
            </p>
            <p
              className="relative font-display font-extrabold text-white leading-[1.05] tracking-[-0.02em] text-balance max-w-4xl mx-auto"
              style={{ fontSize: 'clamp(28px, 3.6vw, 48px)' }}
            >
              O problema não foi a ferramenta.{' '}
              <span style={{ color: 'var(--color-va-gold)' }}>Foi a ordem.</span>
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
              className="bg-va-black p-8 lg:p-10 relative group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="font-mono text-xs uppercase tracking-[0.22em] font-medium"
                  style={{ color: step.color }}
                >
                  {step.n}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1"
                  style={{ background: `${step.color}55` }}
                />
              </div>
              <h3
                className="font-display font-extrabold tracking-[-0.02em] text-white mb-3 leading-none"
                style={{ fontSize: 'clamp(26px, 2.8vw, 36px)' }}
              >
                {step.title}
              </h3>
              <p
                className="font-editorial italic text-va-gray-200 leading-snug"
                style={{ fontSize: 'clamp(15px, 1.4vw, 17px)' }}
              >
                {step.body}
              </p>
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-12 group-hover:w-24 transition-all duration-500"
                style={{ background: step.color }}
              />
            </motion.div>
          ))}
        </RevealSection>

        {/* Gold closing phrase */}
        <RevealSection as="div" className="mt-20 lg:mt-28 text-center">
          <p
            className="font-editorial italic text-va-gold leading-[1.15] max-w-3xl mx-auto text-balance"
            style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
          >
            "Antes de tecnologia, falta clareza. Antes de agente, falta processo. Antes de processo, falta pessoa habilitada para operar."
          </p>
        </RevealSection>
      </div>
    </section>
  )
}
