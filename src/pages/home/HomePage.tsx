import { HeroHome } from "./components/HeroHome";
import { IndicadoresSection } from "./components/IndicadoresSection";
import { PartnersSection } from "./components/PartnersSection";
import { AboutSection } from "./components/AboutSection";

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <IndicadoresSection />
      <PartnersSection />
      <AboutSection />
    </div>
  );
}