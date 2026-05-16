import { useEffect, useState } from 'react'

export type SideNavSection = {
  id: string
  label: string
  /** Optional accent color for active dot — defaults to blue. */
  accent?: string
}

type Props = {
  sections: SideNavSection[]
  /** Used to drive accent fallback color (e.g. orange on gov). */
  variant?: 'home' | 'gov'
}

function defaultAccent(variant: 'home' | 'gov') {
  return variant === 'gov'
    ? 'var(--color-va-orange-vivid)'
    : 'var(--color-va-blue-electric)'
}

export default function SideNav({ sections, variant = 'home' }: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    if (sections.length === 0) return
    const observed: Element[] = []
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) {
        observer.observe(el)
        observed.push(el)
      }
    })

    return () => {
      observed.forEach((el) => observer.unobserve(el))
      observer.disconnect()
    }
  }, [sections])

  const fallback = defaultAccent(variant)

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <>
      {/* Desktop: fixed left rail */}
      <nav
        aria-label="Navegação por seção"
        className="hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 pointer-events-none"
      >
        <ul className="flex flex-col gap-1.5 pointer-events-auto">
          {sections.map((s, idx) => {
            const isActive = s.id === active
            const accent = s.accent ?? fallback
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onClick(e, s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative flex items-center gap-3 py-1.5 pr-2"
                >
                  <span
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center"
                    style={{ width: 18, height: 18 }}
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 10 : 6,
                        height: isActive ? 10 : 6,
                        background: isActive ? accent : 'rgba(255,255,255,0.3)',
                        boxShadow: isActive ? `0 0 14px ${accent}` : 'none',
                      }}
                    />
                  </span>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300"
                    style={{
                      color: isActive
                        ? 'var(--color-va-white)'
                        : 'rgba(255,255,255,0.45)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                    }}
                  >
                    <span className="text-va-gray-500 mr-2">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {s.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile: horizontal bottom bar (above the orb on mobile) */}
      <nav
        aria-label="Navegação por seção"
        className="lg:hidden fixed left-0 right-0 z-30 pointer-events-none"
        style={{ bottom: 154 }}
      >
        <div className="mx-auto max-w-fit pointer-events-auto">
          <ul
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 backdrop-blur-md"
            style={{ background: 'rgba(10,10,15,0.7)' }}
          >
            {sections.map((s) => {
              const isActive = s.id === active
              const accent = s.accent ?? fallback
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => onClick(e, s.id)}
                    aria-label={s.label}
                    aria-current={isActive ? 'true' : undefined}
                    className="inline-flex items-center justify-center"
                    style={{ width: 18, height: 18 }}
                  >
                    <span
                      aria-hidden="true"
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 10 : 6,
                        height: isActive ? 10 : 6,
                        background: isActive ? accent : 'rgba(255,255,255,0.35)',
                        boxShadow: isActive ? `0 0 10px ${accent}` : 'none',
                      }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
