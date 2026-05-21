import { MessageSquare } from 'lucide-react'

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

export default function Footer() {
  return (
    <footer
      aria-label="Rodapé"
      className="bg-va-black border-t border-white/5 text-va-gray-500 py-16 text-sm"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <img
              src="/logos/vanguardia-horizontal.png"
              alt="Grupo VanguardIA"
              width={130}
              height={30}
              className="w-[120px] lg:w-[130px] h-auto brightness-0 invert"
            />
            <p className="text-xs text-va-gray-500 max-w-[280px]">
              O método e o sistema operacional que transformam inteligência artificial em resultado prático.
            </p>
          </div>

          {/* Socials & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/grupovanguard.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200"
              aria-label="Siga-nos no Instagram"
            >
              <InstagramIcon size={16} />
              <span>Instagram</span>
            </a>
            <a
              href="https://wa.me/5591983012908?text=Quero%20falar%20com%20a%20VanguardIA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200"
              aria-label="Fale conosco no WhatsApp"
            >
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Address and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs">
          <p className="text-center md:text-left text-va-gray-600">
            Grupo VanguardIA · Tv. Avertano Rocha, 192 · Belém · Pará · Brasil
          </p>
          <p className="text-center md:text-right text-va-gray-600">
            &copy; {new Date().getFullYear()} Grupo VanguardIA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
