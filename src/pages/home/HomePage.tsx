import { HeroHome } from "./components/HeroHome";
import { IndicadoresSection } from "./components/IndicadoresSection";
import { AboutSection } from "./components/AboutSection";

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <IndicadoresSection />
      <AboutSection />
    </div>
  );
}