import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const PRIVATE_LINKS = [
  { label: 'Tese', href: '#tese' },
  { label: 'Arquitetura', href: '#arquitetura' },
  { label: 'CNH da IA', href: '#cnh' },
  { label: 'ICIA OS', href: '#escada' },
  { label: 'Do It Hub', href: '#do-it-hub' },
  { label: 'Clientes', href: '#clientes' },
]

const GOV_LINKS = [
  { label: 'Tese', href: '#tese-gov' },
  { label: 'CNH para Servidores', href: '#cnh-gov' },
  { label: 'ICIA.GOV', href: '#programas-gov' },
  { label: 'Conformidade', href: '#conformidade' },
  { label: 'Cases', href: '#depoimentos-gov' },
  { label: 'COP-30', href: '#cop30' },
]

const CTA_PRIVATE = 'https://wa.me/5591983012908?text=Quero%20falar%20com%20a%20VanguardIA'
const CTA_GOV = 'https://wa.me/5591983012908?text=Quero%20falar%20com%20a%20VanguardIA%20Gov'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isGov = pathname.startsWith('/icia-gov')

  const links = isGov ? GOV_LINKS : PRIVATE_LINKS
  const ctaUrl = isGov ? CTA_GOV : CTA_PRIVATE
  const ctaLabel = isGov ? 'Falar com a VanguardIA Gov' : 'Falar com a VanguardIA'
  const ctaBgColor = isGov ? 'bg-va-orange-vivid hover:bg-va-orange-glow' : 'bg-va-blue-electric hover:bg-va-blue-glow'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Ir para conteúdo principal
      </a>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? 'rgba(10, 10, 15, 0.9)'
            : 'rgba(10, 10, 15, 0)',
          backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
          borderBottomColor: scrolled
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      >
        <nav
          aria-label="Navegação principal"
          className="max-w-7xl mx-auto px-5 sm:px-8 h-16 lg:h-20 flex items-center justify-between gap-6"
        >
          {/* Logo */}
          <NavLink
            to="/"
            aria-label="Grupo VanguardIA - Início"
            className="flex items-center gap-2 shrink-0"
          >
            <img
              src="/logos/vanguardia-horizontal.png"
              alt="Grupo VanguardIA"
              loading="eager"
              width={140}
              height={32}
              className="w-[120px] lg:w-[140px] h-auto"
              style={{
                filter: 'brightness(0) invert(1)',
              }}
            />
            {isGov && (
              <span className="text-va-orange-vivid font-mono text-[10px] sm:text-xs font-bold tracking-wider ml-1">
                · GOV
              </span>
            )}
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-va-gray-200 hover:text-white transition-colors duration-200 focus-visible:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: switcher + CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <div
              role="tablist"
              aria-label="Selecionar segmento"
              className="flex bg-white/5 border border-white/10 rounded-full p-1"
            >
              <NavLink
                to="/"
                role="tab"
                aria-current={!isGov ? 'page' : undefined}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors ${
                    isActive && !isGov
                      ? 'bg-va-blue-electric text-white'
                      : 'text-va-gray-200 hover:text-white'
                  }`
                }
              >
                Empresas
              </NavLink>
              <NavLink
                to="/icia-gov"
                role="tab"
                aria-current={isGov ? 'page' : undefined}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-colors ${
                    isActive
                      ? 'bg-va-orange-vivid text-white'
                      : 'text-va-gray-200 hover:text-white'
                  }`
                }
              >
                Setor Público
              </NavLink>
            </div>

            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 ${ctaBgColor} transition-colors text-white font-semibold text-xs px-5 py-2.5 rounded-full`}
            >
              {ctaLabel}
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-va-black lg:hidden pt-20 pb-10 px-6 overflow-y-auto"
          >
            <ul className="flex flex-col gap-2 mb-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-2xl font-display font-bold text-white border-b border-white/10"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex bg-white/5 border border-white/10 rounded-full p-1 mb-6">
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex-1 text-center px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full ${
                    isActive && !isGov
                      ? 'bg-va-blue-electric text-white'
                      : 'text-va-gray-200'
                  }`
                }
              >
                Empresas
              </NavLink>
              <NavLink
                to="/icia-gov"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex-1 text-center px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full ${
                    isActive
                      ? 'bg-va-orange-vivid text-white'
                      : 'text-va-gray-200'
                  }`
                }
              >
                Setor Público
              </NavLink>
            </div>

            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 ${ctaBgColor} text-white font-semibold text-base px-5 py-4 rounded-full w-full`}
            >
              {ctaLabel}
              <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
