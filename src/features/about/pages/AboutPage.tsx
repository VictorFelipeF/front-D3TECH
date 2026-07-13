import { HeroAbout } from "../components/HeroAbout";
import { HistorySection } from "../components/HistorySection";
import { MissionVisionValues } from "../components/MissionVisionValues";
import { DifferentiatorsGrid } from "../components/DifferentiatorsGrid";
import { TeamCarousel } from "../components/TeamCarousel";

export default function AboutPage() {
  return (
    <div>
      <HeroAbout />
      <HistorySection />
      <MissionVisionValues />
      <DifferentiatorsGrid />
      <TeamCarousel />
    </div>
  );
}
