import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import CountUp from '../ui/CountUp'

const PASSOS = [
  {
    n: '01',
    title: 'Diagnóstico',
    body: 'Maturidade individual e setorial em 24h',
  },
  {
    n: '02',
    title: 'Imersão',
    body: 'Aula-conceito + casos brasileiros reais',
  },
  {
    n: '03',
    title: 'Lab guiado',
    body: 'Praticar nas ferramentas com mentor',
  },
  {
    n: '04',
    title: 'Caso aplicado',
    body: 'Aluno entrega caso da própria operação',
  },
  {
    n: '05',
    title: 'Banca',
    body: 'Avaliação técnica e ética por especialistas',
  },
  {
    n: '06',
    title: 'Certificação',
    body: 'CNH da IA + cadastro no registro nacional',
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
              className="font-mono text-xs uppercase tracking-[0.18em] text-white/80 mb-5"
            >
              06 · CNH da IA
            </motion.p>

            <motion.h2
              id="cnh-headline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold tracking-[-0.025em] leading-[1] text-white text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              Não se dirige IA sem habilitação.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-white/90 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              A CNH da IA é o programa de certificação que formou mais de 8.000
              executivos, servidores e operadores no Brasil. Conteúdo
              brasileiro, banca técnica e registro nacional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
              className="mt-12 mb-10"
            >
              <div
                className="font-display font-extrabold tracking-[-0.05em] leading-[0.85] text-white"
                style={{ fontSize: 'clamp(110px, 17vw, 220px)' }}
              >
                <CountUp to={8000} prefix="+" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/80 mt-3">
                Pessoas habilitadas · turmas 1 a 47
              </p>
            </motion.div>

            <motion.a
              href="https://wa.me/559132233355?text=Quero%20a%20CNH%20da%20IA"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-va-orange-deep transition-colors text-white font-semibold px-7 py-4 rounded-full"
            >
              Inscrever minha turma
              <ArrowRight size={16} />
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
            src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1400&q=80"
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
              Turma 48 · Belém
            </p>
            <p className="font-display font-bold text-white text-base leading-snug">
              Inscrições abertas · início em 12.06
            </p>
          </motion.div>
        </div>
      </div>

      {/* 6-step horizontal process */}
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
