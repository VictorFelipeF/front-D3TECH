import { HeroHome } from "./components/HeroHome";
import { IndicadoresSection } from "./components/IndicadoresSection";
import { PartnersSection } from "./components/PartnersSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { CasesSection } from "./components/CasesSection";

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <IndicadoresSection />
      <PartnersSection />
      <AboutSection />
      <ServicesSection />
      <CasesSection />
    </div>
  );
}