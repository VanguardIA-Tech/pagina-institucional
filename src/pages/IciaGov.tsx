import { useEffect } from 'react'
import NavBar from '../components/sections/NavBar'
import ScrollProgress from '../components/ui/ScrollProgress'
import HeroGov from '../components/sections/HeroGov'
import TeseGov from '../components/sections/TeseGov'
import CNHdaIAServidores from '../components/sections/CNHdaIAServidores'
import ProgramasICIAgov from '../components/sections/ProgramasICIAgov'
import PorQueCNH from '../components/sections/PorQueCNH'
import GraficosContexto from '../components/sections/GraficosContexto'
import Conformidade from '../components/sections/Conformidade'
import COP30 from '../components/sections/COP30'
import DepoimentosGov from '../components/sections/DepoimentosGov'
import ManifestoCTAGov from '../components/sections/ManifestoCTAGov'
import Footer from '../components/sections/Footer'

const TITLE =
  'ICIA.GOV · Inteligência Aplicada para o Setor Público · Grupo VanguardIA'
const DESCRIPTION =
  'A primeira arquitetura brasileira de Inteligência Aplicada desenhada para o setor público. CNH da IA para servidores, inexigibilidade conforme Lei 14.133/21 e governança soberana.'
const URL = 'https://vanguardia.com.br/icia-gov'

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

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentService',
  name: 'ICIA.GOV — Inteligência Aplicada para o Setor Público',
  provider: {
    '@type': 'Organization',
    name: 'Grupo VanguardIA',
    url: 'https://vanguardia.com.br',
  },
  serviceType:
    'Capacitação, governança e arquitetura de IA para administração pública',
  areaServed: { '@type': 'Country', name: 'Brasil' },
  termsOfService:
    'Contratação por inexigibilidade — Lei nº 14.133/21, Art. 74',
  url: URL,
}

function useDocumentHead() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = TITLE

    const created: HTMLElement[] = []

    META.forEach((m) => {
      const selector = m.name
        ? `meta[name="${m.name}"]`
        : `meta[property="${m.property}"]`
      let tag = document.head.querySelector<HTMLMetaElement>(selector)
      if (!tag) {
        tag = document.createElement('meta')
        if (m.name) tag.setAttribute('name', m.name)
        if (m.property) tag.setAttribute('property', m.property)
        document.head.appendChild(tag)
        created.push(tag)
      }
      tag.setAttribute('content', m.content)
    })

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    )
    let createdCanonical = false
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
      createdCanonical = true
    }
    const previousCanonical = canonical.getAttribute('href')
    canonical.setAttribute('href', URL)

    const ld = document.createElement('script')
    ld.setAttribute('type', 'application/ld+json')
    ld.textContent = JSON.stringify(JSON_LD)
    document.head.appendChild(ld)

    return () => {
      document.title = previousTitle
      created.forEach((el) => el.remove())
      if (createdCanonical) {
        canonical?.remove()
      } else if (previousCanonical) {
        canonical?.setAttribute('href', previousCanonical)
      }
      ld.remove()
    }
  }, [])
}

export default function IciaGov() {
  useDocumentHead()

  return (
    <>
      <ScrollProgress />
      <NavBar />
      <main id="main-content">
        <HeroGov />
        <TeseGov />
        <CNHdaIAServidores />
        <ProgramasICIAgov />
        <PorQueCNH />
        <GraficosContexto />
        <Conformidade />
        <COP30 />
        <DepoimentosGov />
        <ManifestoCTAGov />
      </main>
      <Footer />
    </>
  )
}
