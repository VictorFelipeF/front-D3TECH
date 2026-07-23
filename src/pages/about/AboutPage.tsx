import { HeroAbout } from "@/components/about/HeroAbout";
import { HistorySection } from "@/components/about/HistorySection";
import { MissionVisionValues } from "@/components/about/MissionVisionValues";
import { DifferentiatorsGrid } from "@/components/about/DifferentiatorsGrid";
import { TeamCarousel } from "@/components/about/TeamCarousel";

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
