import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { whatsappLink } from '../../lib/whatsapp'

const LINKS = [
  { label: 'Produto', href: '#produto' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Hub', href: '#do-it-hub' },
]

const CONTACT_URL = whatsappLink('Quero falar com a VanguardIA')

export default function PortfolioNav() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const main = document.getElementById('main-content')
    document.body.style.overflow = open ? 'hidden' : ''

    if (open) {
      main?.setAttribute('inert', '')
      menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    } else {
      main?.removeAttribute('inert')
      if (wasOpenRef.current) triggerRef.current?.focus()
    }
    wasOpenRef.current = open

    return () => {
      document.body.style.overflow = ''
      main?.removeAttribute('inert')
    }
  }, [open])

  useEffect(() => {
    const handleMenuKeys = (event: KeyboardEvent) => {
      if (!open) return
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = [
        triggerRef.current,
        ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
      ].filter(
        (element): element is HTMLButtonElement | HTMLAnchorElement => Boolean(element),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    window.addEventListener('keydown', handleMenuKeys)
    return () => window.removeEventListener('keydown', handleMenuKeys)
  }, [open])

  return (
    <>
      <header className="portfolio-nav-shell">
        <nav className="portfolio-nav" aria-label="Navegação principal">
          <a href="#inicio" className="portfolio-nav-brand" aria-label="VanguardIA, início">
            <img
              src="/logos/vanguardia-horizontal.png"
              alt="VanguardIA"
              width={140}
              height={32}
            />
          </a>

          <ul className="portfolio-nav-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="portfolio-nav-actions">
            <NavLink to="/icia-gov" className="portfolio-nav-gov">
              Setor público
            </NavLink>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-nav-contact"
            >
              Falar com a VanguardIA
            </a>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="portfolio-menu-trigger"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="portfolio-mobile-menu"
            onClick={() => setOpen((current) => !current)}
          >
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="portfolio-mobile-menu"
        className="portfolio-mobile-menu"
        data-open={open ? 'true' : 'false'}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Navegação mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <NavLink to="/icia-gov" onClick={() => setOpen(false)}>
            Setor público
          </NavLink>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Falar com a VanguardIA
          </a>
        </nav>
      </div>
    </>
  )
}
