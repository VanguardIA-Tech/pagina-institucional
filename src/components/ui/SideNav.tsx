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
        className="hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-30 flex-col gap-3 pointer-events-none"
      >
        <ul className="flex flex-col gap-2 pointer-events-auto">
          {sections.map((s, idx) => {
            const isActive = s.id === active
            const accent = s.accent ?? fallback
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => onClick(e, s.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative flex items-center gap-3 py-1.5"
                >
                  <span
                    aria-hidden="true"
                    className="relative inline-flex items-center justify-center shrink-0"
                    style={{ width: 18, height: 18 }}
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 10 : 6,
                        height: isActive ? 10 : 6,
                        background: isActive ? accent : 'rgba(255,255,255,0.45)',
                        boxShadow: isActive ? `0 0 14px ${accent}` : 'none',
                        outline: isActive
                          ? 'none'
                          : '1px solid rgba(0,0,0,0.18)',
                      }}
                    />
                  </span>
                  {isActive && (
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-300 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-va-black/85 backdrop-blur-md border border-white/10 text-white shadow-lg"
                    >
                      {idx > 0 && (
                        <span className="text-va-gray-500">
                          {String(idx).padStart(2, '0')}
                        </span>
                      )}
                      {s.label}
                    </span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>    </>
  )
}
