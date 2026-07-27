import { HeroHome } from "./components/HeroHome";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <AboutSection />
      <ServicesSection />
    </div>
  );
}