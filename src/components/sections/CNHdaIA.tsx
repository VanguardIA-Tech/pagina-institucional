import { motion } from 'framer-motion'
import CountUp from '../ui/CountUp'
import { whatsappLink } from '../../lib/whatsapp'

const PASSOS = [
  {
    n: '01',
    title: 'DIAGNÓSTICO',
    body: 'Mapeamento de gaps e maturidade por setor.',
  },
  {
    n: '02',
    title: 'FORMAÇÃO',
    body: 'Conteúdo desenhado para cada cargo e nível.',
  },
  {
    n: '03',
    title: 'AVALIAÇÃO',
    body: 'Testes práticos de aplicação real de prompts.',
  },
  {
    n: '04',
    title: 'CERTIFICAÇÃO',
    body: 'Selo oficial de habilitação e registro nacional.',
  },
  {
    n: '05',
    title: 'CULTURA',
    body: 'Instalação de hábitos de IA na rotina diária.',
  },
  {
    n: '06',
    title: 'CONTINUIDADE',
    body: 'Reciclagem e manutenção da curva de aprendizado.',
  },
]

export default function CNHdaIA() {
  return (
    <section
      id="cnh"
      aria-labelledby="cnh-headline"
      className="bg-va-black text-white"
    >
      {/* Split 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT — orange */}
        <div
          className="relative px-6 sm:px-10 lg:px-16 py-20 lg:py-28 overflow-hidden"
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
          <div className="relative max-w-xl ml-auto lg:ml-0 lg:mr-0">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              className="font-mono text-xs uppercase tracking-[0.22em] text-white/85 mb-5"
            >
              06 · CERTIFICAÇÃO
            </motion.p>

            <motion.h2
              id="cnh-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="font-editorial italic text-white text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              CNH da IA.
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-extrabold text-white text-balance mt-3"
              style={{ fontSize: 'var(--text-display-m)' }}
            >
              A única certificação corporativa de Inteligência Aplicada do Brasil.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-white/90 leading-relaxed text-balance"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              Compreensão. Navegação. Habilitação. Não é treinamento. É metodologia de pilotagem. Cada cargo, cada nível, cada função recebe formação desenhada — e é avaliado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="mt-12 mb-10"
            >
              <div
                className="font-display font-black tracking-[-0.05em] leading-[0.85] text-white"
                style={{ fontSize: 'clamp(90px, 15vw, 180px)' }}
              >
                <CountUp to={8000} prefix="+" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/80 mt-3">
                profissionais habilitados em 3 anos
              </p>
            </motion.div>

            <motion.a
              href={whatsappLink('Quero a CNH da IA')}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-va-orange-deep transition-colors font-semibold px-6 py-3.5 rounded-full text-sm shadow-lg shadow-black/20"
            >
              Conhecer a CNH da IA →
            </motion.a>
          </div>
        </div>

        {/* RIGHT — black photo placeholder */}
        <div className="relative bg-va-black min-h-[400px] lg:min-h-full overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(32,70,234,0.28), transparent 55%), radial-gradient(circle at 80% 70%, rgba(255,107,26,0.18), transparent 55%), #0A0A0F',
            }}
          />
          <img
            src="/images/cnh-habilitados-final.jpg"
            alt="Turma da CNH da IA em sessão presencial em Belém"
            loading="lazy"
            width={1400}
            height={1600}
            className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(0deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.1) 60%, rgba(10,10,15,0.4) 100%)',
            }}
          />

          {/* Floating chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-sm bg-va-black/80 backdrop-blur-md border border-white/15 rounded-xl p-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-va-orange-vivid mb-1">
              WORKSHOP · LOTUS · MAR 2026
            </p>
          </motion.div>
        </div>
      </div>

      {/* 6-step horizontal process */}
      <div className="border-t border-white/10 bg-va-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-va-gray-500 mb-10">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-va-gray-500 align-middle mr-3" />
            O método em 6 passos
          </p>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-2 gap-y-8">
            {PASSOS.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="relative lg:px-5 py-1 lg:border-r border-white/10 last:border-r-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wider"
                    style={{
                      color: 'var(--color-va-teal)',
                      background: 'rgba(0,135,90,0.14)',
                      border: '1px solid rgba(0,135,90,0.3)',
                    }}
                  >
                    {p.n}
                  </span>
                  <div
                    aria-hidden="true"
                    className="h-px flex-1 bg-white/10"
                  />
                </div>
                <h3 className="font-display font-bold text-white text-[15px] leading-tight tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[12.5px] text-va-gray-400 leading-snug">
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
