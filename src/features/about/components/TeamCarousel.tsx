import { SectionHeading } from "@/shared/components/SectionHeading";
import { Carousel } from "@/shared/components/Carousel";
import teamData from "@/mocks/team.json";
import { User } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
};

export function TeamCarousel() {
  const team = teamData as TeamMember[];

  return (
    <section className="border-t border-border/50 bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeading align="center" title="Conheça nossa equipe" />

        <div className="mt-12">
          <Carousel
            items={team}
            itemsPerView={{ base: 1, md: 3 }}
            renderItem={(member) => (
              <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-background p-8 text-center shadow-sm transition-all duration-300 hover:border-d3-purple/20 hover:shadow-md">
                <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-d3-purple/20 to-d3-navy/10 text-d3-purple">
                  {/* TODO: imagem real da equipe */}
                  <User className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-d3-purple">
                  {member.role}
                </p>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
