import Hero from "@/components/Hero";
import Origem from "@/components/Origem";
import Tese from "@/components/Tese";
import ICIA from "@/components/ICIA";
import Tiers from "@/components/Tiers";
import DoItHub from "@/components/DoItHub";
import Numeros from "@/components/Numeros";
import Parcerias from "@/components/Parcerias";
import Depoimentos from "@/components/Depoimentos";
import Manifesto from "@/components/Manifesto";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ClientOrb from "@/components/ClientOrb";

export default function Home() {
  return (
    <main className="relative pt-16">
      <Hero />
      <Origem />
      <Tese />
      <ICIA />
      <Tiers />
      <DoItHub />
      <Numeros />
      <Parcerias />
      <Depoimentos />
      <Manifesto />
      <CTA />
      <Footer />
      <ClientOrb />
    </main>
  );
}
