import { lazy, Suspense } from 'react'
import NavBar from '../components/sections/NavBar'
import Hero from '../components/sections/Hero'
import LogoBar from '../components/sections/LogoBar'
import Tese from '../components/sections/Tese'
import ArquiteturaICIA from '../components/sections/ArquiteturaICIA'
import EscadaICIA from '../components/sections/EscadaICIA'
import Acessorios from '../components/sections/Acessorios'
import Impacto from '../components/sections/Impacto'
import CNHdaIA from '../components/sections/CNHdaIA'
import Clientes from '../components/sections/Clientes'
import DoItHub from '../components/sections/DoItHub'
import Parcerias from '../components/sections/Parcerias'
import ManifestoCTA from '../components/sections/ManifestoCTA'
import FaleConosco from '../components/sections/FaleConosco'
import Footer from '../components/sections/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'
import SideNav, { type SideNavSection } from '../components/ui/SideNav'

const OrbVoiceAgent = lazy(() => import('../components/ui/OrbVoiceAgent'))

const SECTIONS: SideNavSection[] = [
  { id: 'hero', label: 'Início' },
  { id: 'tese', label: 'Tese' },
  { id: 'arquitetura', label: 'Arquitetura' },
  { id: 'escada', label: 'ICIA OS' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'impacto', label: 'Impacto' },
  { id: 'cnh', label: 'CNH da IA' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'do-it-hub', label: 'Do It Hub' },
  { id: 'parcerias', label: 'Parcerias' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'fale-conosco', label: 'Fale Conosco' },
]

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
      <SideNav sections={SECTIONS} variant="home" />
      <main id="main-content">
        <Hero />
        <LogoBar />
        <Tese />
        <ArquiteturaICIA />
        <EscadaICIA />
        <Acessorios />
        <Impacto />
        <CNHdaIA />
        <Clientes />
        <DoItHub />
        <Parcerias />
        <ManifestoCTA />
        <FaleConosco />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <OrbVoiceAgent />
      </Suspense>
    </>
  )
}
