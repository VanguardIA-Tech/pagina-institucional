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
