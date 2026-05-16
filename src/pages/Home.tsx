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
import Depoimentos from '../components/sections/Depoimentos'
import DoItHub from '../components/sections/DoItHub'
import Parcerias from '../components/sections/Parcerias'
import ManifestoCTA from '../components/sections/ManifestoCTA'
import Footer from '../components/sections/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <NavBar />
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
        <Depoimentos />
        <DoItHub />
        <Parcerias />
        <ManifestoCTA />
      </main>
      <Footer />
    </>
  )
}
