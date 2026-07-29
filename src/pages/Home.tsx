import { useEffect } from 'react'
import PortfolioNav from '../components/portfolio/PortfolioNav'
import {
  CaseStudies,
  ClientPortfolio,
  DoItHubClose,
  Outcomes,
  PortfolioHero,
  ProductSystem,
} from '../components/portfolio/PortfolioSections'
import Testimonials from '../components/portfolio/Testimonials'
import { publicProof } from '../content/publicProof'
import '../portfolio.css'

const TITLE = 'VanguardIA | Inteligência Aplicada em produção'
const DESCRIPTION =
  'Pessoas, processos e tecnologia em produção. Conheça a arquitetura ICIA, os produtos, resultados, clientes e depoimentos da VanguardIA.'
const URL = 'https://vanguardia.com.br/'

const META: { name?: string; property?: string; content: string }[] = [
  { name: 'description', content: DESCRIPTION },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'pt_BR' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
]

function usePortfolioHead() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = TITLE

    const previousMeta = META.map((meta) => {
      const selector = meta.name
        ? `meta[name="${meta.name}"]`
        : `meta[property="${meta.property}"]`
      const element = document.head.querySelector<HTMLMetaElement>(selector)
      const previous = element?.getAttribute('content') ?? null
      element?.setAttribute('content', meta.content)
      return { element, previous }
    })

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? null
    canonical?.setAttribute('href', URL)

    return () => {
      document.title = previousTitle
      previousMeta.forEach(({ element, previous }) => {
        if (element && previous !== null) element.setAttribute('content', previous)
      })
      if (canonical && previousCanonical !== null) canonical.setAttribute('href', previousCanonical)
    }
  }, [])
}

export default function Home() {
  usePortfolioHead()
  const certifiedPeople = publicProof.metrics.find(
    (metric) => metric.id === 'certified-people',
  )
  const activeAccounts = publicProof.metrics.find(
    (metric) => metric.id === 'active-accounts',
  )
  const doItOutcome = publicProof.outcomes.find(
    (outcome) => outcome.id === 'do-it-ticket',
  )
  const trainingImage = publicProof.mediaManifest.featureImages.find(
    (image) => image.id === 'cnh-training',
  )
  const doItImage = publicProof.mediaManifest.featureImages.find(
    (image) => image.id === 'do-it-hub',
  )
  const technologyPortal = publicProof.mediaManifest.portalPreviews.find(
    (portal) => portal.id === 'nativa-uniformes',
  )

  if (
    !certifiedPeople ||
    !activeAccounts ||
    !doItOutcome ||
    !trainingImage ||
    !doItImage ||
    !technologyPortal
  ) {
    throw new Error('A prova pública obrigatória da Home está incompleta.')
  }

  return (
    <div className="portfolio-home">
      <PortfolioNav />
      <main id="main-content">
        <PortfolioHero
          metrics={publicProof.metrics}
          portals={publicProof.mediaManifest.portalPreviews}
        />
        <ProductSystem
          certifiedPeople={certifiedPeople}
          trainingImage={trainingImage}
          technologyPortal={technologyPortal}
        />
        <Outcomes outcomes={publicProof.outcomes} />
        <CaseStudies cases={publicProof.cases} doItImage={doItImage} />
        <ClientPortfolio clients={publicProof.clients} activeAccounts={activeAccounts} />
        <Testimonials items={publicProof.testimonials} />
        <DoItHubClose outcome={doItOutcome} image={doItImage} />
      </main>
    </div>
  )
}
