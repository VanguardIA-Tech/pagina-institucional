import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { proofReferenceLabel, publicProof } from '../src/content/publicProof'
import { getVoiceErrorFeedback } from '../src/lib/voiceErrors'

const root = process.cwd()
const read = (path: string) => readFileSync(`${root}/${path}`, 'utf8')

describe('public proof contract', () => {
  it('keeps the canonical date and headline metrics', () => {
    expect(publicProof.asOf).toBe('2026-07-06')
    expect(proofReferenceLabel).toBe('6 de julho de 2026')
    expect(publicProof.metrics.map(({ display }) => display)).toEqual([
      '700+',
      '22',
      '7.500+',
      '1.000+',
    ])
  })

  it('keeps the promised outcomes and cases', () => {
    expect(publicProof.outcomes.map(({ beforeDisplay, afterDisplay }) => [
      beforeDisplay,
      afterDisplay,
    ])).toEqual([
      ['25 dias', '3 dias'],
      ['6 horas', '1 hora'],
      ['3 horas', '15 min'],
      ['base 1×', '6×'],
    ])
    expect(publicProof.cases.map(({ organization }) => organization)).toEqual([
      'Athias Soriano',
      'Nevoni',
      'Do It Hub',
    ])
    for (const caseStudy of publicProof.cases) {
      expect(caseStudy.summary.trim().split(/\s+/).length).toBeLessThanOrEqual(50)
    }
  })

  it('publishes the complete client and testimonial sets', () => {
    expect(publicProof.clients).toHaveLength(22)
    expect(publicProof.testimonials).toHaveLength(7)
    expect(publicProof.testimonials.filter(({ featured }) => featured)).toHaveLength(3)

    for (const client of publicProof.clients) {
      expect(existsSync(`${root}/public/logos/${client.slug}.png`)
        || existsSync(`${root}/public/logos/${client.slug}.jpg`)).toBe(true)
    }

    expect(
      publicProof.clients
        .filter(({ logoTreatment }) => logoTreatment === 'light')
        .map(({ slug }) => slug),
    ).toEqual([
      'paraferro',
      'cf-distribuidora',
      'supermercado-economico',
      'prime-equipaments',
    ])
    expect(
      publicProof.clients.find(({ slug }) => slug === 'unineuro')?.logoTreatment,
    ).toBe('paper-wide')
  })

  it('ships the declared media manifest', () => {
    expect(publicProof.mediaManifest.portalPreviews).toHaveLength(5)
    expect(
      publicProof.mediaManifest.portalPreviews.filter(({ priority }) => priority),
    ).toHaveLength(1)

    for (const portal of publicProof.mediaManifest.portalPreviews) {
      for (const format of portal.formats) {
        expect(existsSync(`${root}/public${portal.base}.${format}`)).toBe(true)
      }
    }

    for (const image of publicProof.mediaManifest.featureImages) {
      expect(existsSync(`${root}/public${image.fallback}`)).toBe(true)
      for (const format of image.formats) {
        expect(existsSync(`${root}/public${image.base}.${format}`)).toBe(true)
      }
    }
  })
})

describe('home editorial contract', () => {
  const home = read('src/pages/Home.tsx')
  const sections = read('src/components/portfolio/PortfolioSections.tsx')
  const styles = read('src/portfolio.css')

  it('renders exactly the seven planned sections in order', () => {
    const renderedSections = Array.from(
      home.matchAll(
        /<(PortfolioHero|ProductSystem|Outcomes|CaseStudies|ClientPortfolio|Testimonials|DoItHubClose)\b/g,
      ),
      (match) => match[1],
    )

    expect(renderedSections).toEqual([
      'PortfolioHero',
      'ProductSystem',
      'Outcomes',
      'CaseStudies',
      'ClientPortfolio',
      'Testimonials',
      'DoItHubClose',
    ])
  })

  it('preserves Pessoas, Processos, Tecnologia as the product order', () => {
    const positions = ['product-people', 'product-process', 'product-technology'].map(
      (className) => sections.indexOf(className),
    )

    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })

  it('preserves complete portal screens and the two-line hero at every breakpoint', () => {
    expect(sections).toContain('case-media case-media--portal')
    expect(styles).toMatch(/\.case-media--portal\s*\{[^}]*aspect-ratio:\s*8\s*\/\s*5/s)
    expect(styles).toMatch(/\.case-media--portal img\s*\{[^}]*object-fit:\s*contain/s)
    expect(styles).toContain('font-size: min(9.25vw, 71px)')
  })

  it('keeps the content target focusable for the skip link', () => {
    const entry = read('src/main.tsx')

    expect(home).toContain('<main id="main-content" tabIndex={-1}>')
    expect(entry).toContain("'.skip-link[href=\"#main-content\"]'")
    expect(entry).toContain("document.getElementById('main-content')?.focus")
  })

  it('renders the site footer as a sibling after the main landmark', () => {
    expect(home.indexOf('</main>')).toBeLessThan(home.indexOf('<PortfolioFooter />'))
  })
})

describe('testimonial media contract', () => {
  const testimonials = read('src/components/portfolio/Testimonials.tsx')

  it('keeps video opt-in and never declares autoplay', () => {
    expect(testimonials).toContain('playingId === active.id ?')
    expect(testimonials).toContain('preload="none"')
    expect(testimonials).toContain('playsInline')
    expect(testimonials).toContain('kind="captions"')
    expect(testimonials).not.toMatch(/<video[^>]*autoPlay/)
  })

  it('moves focus into playback and returns it to the poster', () => {
    expect(testimonials).toContain('video.focus({ preventScroll: true })')
    expect(testimonials).toContain('posterButtonRef.current?.focus({ preventScroll: true })')
  })

  it('ships local responsive posters and Portuguese captions', () => {
    for (const testimonial of publicProof.testimonials) {
      for (const extension of ['jpg', 'webp', 'avif']) {
        expect(existsSync(`${root}/public${testimonial.posterBase}.${extension}`)).toBe(true)
      }
      const captionPath = `${root}/public${testimonial.captionSrc}`
      expect(existsSync(captionPath)).toBe(true)
      expect(readFileSync(captionPath, 'utf8')).toMatch(/^WEBVTT/)
    }
  })
})

describe('voice fallback contract', () => {
  it('hands keyboard focus from the lazy loader to the inline agent', () => {
    const voiceDemo = read('src/components/portfolio/VoiceDemo.tsx')
    const agent = read('src/components/ui/OrbVoiceAgent.tsx')

    expect(voiceDemo).toContain('role="status" tabIndex={-1}')
    expect(voiceDemo).toContain('<OrbVoiceAgent variant="inline" autoFocus />')
    expect(agent).toContain('controlRef.current?.focus({ preventScroll: true })')
  })

  it.each([
    [new DOMException('Permission denied', 'NotAllowedError'), 'denied'],
    [new Error('Microphone API not available'), 'unavailable'],
    [new Error('429 rate limit'), 'limit'],
    [new Error('Failed to fetch realtime session'), 'network'],
    [new Error('Unexpected failure'), 'unknown'],
  ])('maps %s to a visible public fallback', (error, kind) => {
    const feedback = getVoiceErrorFeedback(error)

    expect(feedback.kind).toBe(kind)
    expect(feedback.message.length).toBeGreaterThan(30)
  })
})
