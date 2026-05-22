import { useLocation, Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'

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

function LinkedInIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function Footer() {
  const location = useLocation()
  const isGov = location.pathname === '/icia-gov'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      aria-label="Rodapé"
      className="bg-va-gray-900 border-t border-white/5 text-va-gray-500 py-16 lg:py-20 text-sm"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/5">
          
          {/* Coluna 1 — Marca */}
          <div className="space-y-4">
            <img
              src="/logos/vanguardia-horizontal.png"
              alt="Grupo VanguardIA"
              width={140}
              height={32}
              className="w-[140px] h-auto brightness-0 invert"
            />
            <p className="text-xs text-va-gray-200/80 leading-relaxed max-w-[240px]">
              A arquitetura aplicada da Nova Era. Da Amazônia para o Mundo.
            </p>
            <p className="font-mono text-[10px] tracking-wider uppercase text-va-gray-500">
              Idioma: PT-BR | EN (em breve)
            </p>
          </div>

          {/* Coluna 2 — Sistema / ICIA.GOV */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              {isGov ? 'ICIA.GOV' : 'Sistema'}
            </h4>
            <ul className="space-y-2 text-xs">
              {isGov ? (
                <>
                  <li><a href="#tese-gov" className="hover:text-white transition-colors">A Tese Gov</a></li>
                  <li><a href="#cnh-gov" className="hover:text-white transition-colors">CNH para Servidores</a></li>
                  <li><a href="#programas-gov" className="hover:text-white transition-colors">Programas ICIA.GOV</a></li>
                  <li><a href="#conformidade" className="hover:text-white transition-colors">Conformidade</a></li>
                  <li><a href="#cop30" className="hover:text-white transition-colors">COP-30 e Legado</a></li>
                </>
              ) : (
                <>
                  <li><a href="#tese" className="hover:text-white transition-colors">A Tese</a></li>
                  <li><a href="#arquitetura" className="hover:text-white transition-colors">Arquitetura ICIA</a></li>
                  <li><a href="#escada" className="hover:text-white transition-colors">Três Níveis</a></li>
                  <li><a href="#acessorios" className="hover:text-white transition-colors">Acessórios</a></li>
                  <li><a href="#cnh" className="hover:text-white transition-colors">CNH da IA</a></li>
                  <li><a href="#escada" className="hover:text-white transition-colors">ICIA OS</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Coluna 3 — Movimento */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Movimento
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#do-it-hub" className="hover:text-white transition-colors">AI Night</a></li>
              <li><a href="#do-it-hub" className="hover:text-white transition-colors">AI On Hands</a></li>
              <li><a href="#do-it-hub" className="hover:text-white transition-colors">Conselho ICIA</a></li>
              <li><a href="#do-it-hub" className="hover:text-white transition-colors">Do It Hub</a></li>
              <li><a href="#clientes" className="hover:text-white transition-colors">Clientes</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          {/* Coluna 4 — Contato */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Contato
            </h4>
            <p className="text-xs text-va-gray-200/80 leading-relaxed">
              Tv. Avertano Rocha, 192<br />
              Belém · Pará · Brasil<br />
              Sede no Do It Hub
            </p>
            <div className="flex gap-4 pt-1">
              <a
                href="https://www.instagram.com/grupovanguard.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/grupo-vanguardia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
            
            {/* Link discreto para trocar de contexto */}
            <div className="pt-2">
              {isGov ? (
                <Link to="/" className="inline-block text-xs text-va-orange-glow hover:text-white underline underline-offset-4 transition-colors font-mono">
                  → Voltar para Empresas Privadas
                </Link>
              ) : (
                <Link to="/icia-gov" className="inline-block text-xs text-va-blue-glow hover:text-white underline underline-offset-4 transition-colors font-mono">
                  → /icia-gov (Setor Público)
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs text-va-gray-600">
          <div className="space-y-2 text-center md:text-left">
            <p>
              &copy; 2026 Grupo VanguardIA · Todos os direitos reservados
            </p>
            {isGov && (
              <p className="font-mono text-[10px] text-va-gray-500">
                Conformidade: Lei 14.133/21 · LC 182/2021 · LGPD · Marco Civil
              </p>
            )}
          </div>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider group"
            type="button"
          >
            <span>Voltar ao início</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
