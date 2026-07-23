import { HeroAbout } from "@/pages/about/components/HeroAbout";
import { HistorySection } from "@/pages/about/components/HistorySection";
import { MissionVisionValues } from "@/pages/about/components/MissionVisionValues";
import { DifferentiatorsGrid } from "@/pages/about/components/DifferentiatorsGrid";
import { TeamCarousel } from "@/pages/about/components/TeamCarousel";

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
