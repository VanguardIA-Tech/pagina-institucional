import Hero from "@/components/Hero";
import Origem from "@/components/Origem";
import Tese from "@/components/Tese";
import ICIA from "@/components/ICIA";
import Tiers from "@/components/Tiers";
import DoItHub from "@/components/DoItHub";
import SocialProof from "@/components/SocialProof";
import Manifesto from "@/components/Manifesto";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ClientOrb from "@/components/ClientOrb";

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative pt-16 snap-y snap-proximity"
    >
      <div className="snap-start">
        <Hero />
      </div>
      <div className="snap-start">
        <Origem />
      </div>
      <div className="snap-start">
        <Tese />
      </div>
      <div className="snap-start">
        <ICIA />
      </div>
      <div className="snap-start">
        <Tiers />
      </div>
      <div className="snap-start">
        <DoItHub />
      </div>
      <SocialProof />
      <div className="snap-start">
        <Manifesto />
      </div>
      <div className="snap-start">
        <CTA />
      </div>
      <Footer />
      <ClientOrb />
    </main>
  );
}
