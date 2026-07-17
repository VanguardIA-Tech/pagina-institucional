import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { classifyInteraction, trackEvent } from '../lib/tracking'

const SCROLL_MARKS = [25, 50, 75, 90]

export default function AnalyticsTracker() {
  const location = useLocation()
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`
    if (previousPath.current !== pagePath) {
      trackEvent('virtual_page_view', {
        previous_path: previousPath.current || undefined,
      })
      previousPath.current = pagePath
    }
  }, [location.pathname, location.search])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return
      const interaction = classifyInteraction(event.target)
      if (interaction) trackEvent(interaction.event, interaction.payload)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  useEffect(() => {
    const viewed = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = entry.target as HTMLElement
          if (!entry.isIntersecting || viewed.has(section.id)) return
          viewed.add(section.id)
          trackEvent('section_view', { section_id: section.id })
        })
      },
      { threshold: 0.45 },
    )

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const sent = new Set<number>()
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percentage = Math.round((window.scrollY / scrollable) * 100)
      SCROLL_MARKS.forEach((mark) => {
        if (percentage >= mark && !sent.has(mark)) {
          sent.add(mark)
          trackEvent('scroll_depth', { percent_scrolled: mark })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  return null
}

