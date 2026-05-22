import { motion } from 'framer-motion'

const CTA_URL =
  'https://wa.me/559132233355?text=Quero%20conversar%20sobre%20o%20legado%20COP-30'

export default function COP30() {
  return (
    <section
      id="cop30"
      aria-labelledby="cop30-headline"
      className="relative text-white py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #0B1A3E 0%, #2046EA 55%, #FF6B1A 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-va-white) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.18em] text-white/85 mb-5"
        >
          07 · CONTEXTO HISTÓRICO
        </motion.p>

        <motion.h2
          id="cop30-headline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="font-display font-extrabold tracking-[-0.025em] leading-[1.02] text-white text-balance max-w-5xl animate-breath"
          style={{ fontSize: 'var(--text-display-l)' }}
        >
          COP-30 em Belém.
          <br />
          <span className="text-white/85">
            O Pará é a vitrine. A administração pública pode ser parte do legado.
          </span>
        </motion.h2>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-va-black/40 backdrop-blur-sm border border-white/15 p-7 lg:p-9"
          >
            <p
              className="text-white/95 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              A escolha de Belém para sediar a COP-30 colocou a Amazônia no centro do mundo. Em 2026, delegações de mais de 190 países circularão por aqui. Imprensa internacional. Investidores institucionais. Fundos soberanos. Organismos multilaterais.
              <br /><br />
              Cada órgão público que estiver operando com Inteligência Aplicada, governança de IA instalada e servidores certificados estará contando uma história — a de uma administração pública amazônica madura, tecnicamente competente, integrada à fronteira da inovação.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-va-black/40 backdrop-blur-sm border border-white/15 p-7 lg:p-9"
          >
            <p
              className="text-white/95 leading-relaxed"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              A VanguardIA nasceu na Amazônia, opera na Amazônia e construiu sua arquitetura aqui por tese, não por limitação. Atendemos do Pará para o Brasil e para o mundo.
              <br /><br />
              Trabalhar com a VanguardIA é, também, escolher um parceiro que parte do mesmo solo institucional do gestor público amazônico — com a sofisticação técnica de quem atende empresas de R$ 1 bilhão de faturamento.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16 text-center lg:text-left"
        >
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white hover:bg-white hover:text-va-green-deep transition-colors text-white font-semibold px-7 py-4 rounded-full"
          >
            CONVERSAR SOBRE O LEGADO COP-30 →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
