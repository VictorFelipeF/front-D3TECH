import { HeroHome } from "./components/HeroHome";
import { IndicadoresSection } from "./components/IndicadoresSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <IndicadoresSection />
      <AboutSection />
      <ServicesSection />
    </div>
  );
}