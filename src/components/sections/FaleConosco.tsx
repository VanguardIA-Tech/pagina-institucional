import { motion, useReducedMotion } from 'framer-motion'
import { Phone, MessageSquare, ArrowRight, ScanLine } from 'lucide-react'
import RevealSection, { revealItemVariants } from '../ui/RevealSection'
import { whatsappLink } from '../../lib/whatsapp'

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function FaleConosco() {
  const reduce = useReducedMotion()

  return (
    <section
      id="fale-conosco"
      aria-labelledby="fale-conosco-headline"
      className="relative bg-va-black text-white py-24 lg:py-32 overflow-hidden border-t border-white/5"
    >
      {/* Radial violet glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[500px] pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, var(--color-va-violet-glow) 0%, transparent 70%)',
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
            12 · FALE CONOSCO
          </p>
          <div className="h-px bg-white/10 max-w-[120px]" />
        </RevealSection>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Direct Links & Text */}
          <div className="lg:col-span-7 space-y-8">
            <motion.h2
              id="fale-conosco-headline"
              variants={revealItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display font-extrabold tracking-[-0.025em] leading-[1.05] text-balance"
              style={{ fontSize: 'var(--text-display-l)' }}
            >
              Construa o futuro da sua
              <br />
              <span className="text-va-blue-glow">empresa conosco.</span>
            </motion.h2>

            <motion.p
              variants={revealItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-va-gray-200 leading-relaxed text-balance"
              style={{ fontSize: 'var(--text-body-l)' }}
            >
              Entre em contato diretamente com o nosso time de especialistas. Seja para estruturar uma Tese de IA, capacitar sua equipe com a CNH da IA ou implementar o ICIA OS.
            </motion.p>

            {/* CTA list */}
            <div className="space-y-4 pt-4">
              <motion.div
                variants={revealItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a
                  href={whatsappLink('Quero falar com a VanguardIA')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-va-blue-electric hover:bg-va-blue-glow text-white font-semibold px-8 py-4 rounded-full transition-colors text-base group shadow-lg"
                >
                  <MessageSquare size={18} className="text-white/80" />
                  Iniciar Conversa no WhatsApp
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              <motion.div
                variants={revealItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-4 items-center"
              >
                <a
                  href="https://www.instagram.com/grupovanguard.ia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-sm font-medium text-va-gray-200 hover:text-white"
                >
                  <InstagramIcon size={16} className="text-va-gray-400" />
                  Siga-nos no Instagram
                </a>

                <div className="inline-flex items-center gap-2 text-va-gray-200 font-mono text-sm">
                  <Phone size={14} />
                  +55 (91) 98762-4620
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: QR Code Visualizer */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md max-w-sm w-full text-center"
            >
              {/* Scan indicator line */}
              <motion.div
                animate={reduce ? {} : { y: [0, 200, 0] }}
                transition={reduce ? {} : { repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute left-8 right-8 h-px bg-va-blue-glow/40 pointer-events-none z-10"
                style={{ top: '32px' }}
              />

              <div className="relative inline-block p-4 bg-white rounded-xl mb-6 shadow-2xl overflow-hidden group">
                <img
                  src="/fale-conosco-qr.jpg"
                  alt="QR Code WhatsApp Fale Conosco"
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-contain block transition-transform group-hover:scale-105 duration-300"
                />
              </div>

              <h3 className="font-display font-semibold text-white text-lg flex items-center justify-center gap-2 mb-2">
                <ScanLine size={18} className="text-va-blue-glow" />
                Escaneie o QR Code
              </h3>
              <p className="text-sm text-va-gray-200 leading-relaxed max-w-[240px] mx-auto">
                Use a câmera do seu smartphone para abrir o chat de WhatsApp e falar conosco imediatamente.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
