import { BaseCard } from "@/shared/components/BaseCard";
import { SectionHeading } from "@/shared/components/SectionHeading";
import { Target, Eye, Heart } from "lucide-react";

export function MissionVisionValues() {
  return (
    <section className="border-y border-border/50 bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
       <SectionHeading align="center" title="O que nos move" subtitle="Os pilares que guiam nossas ações e decisões" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* TODO: conteúdo institucional real pendente */}
          <BaseCard
            icon={<Target className="h-6 w-6" />}
            title="Missão"
            description="Entregar soluções tecnológicas de alta qualidade que impulsionem os negócios dos nossos clientes, enquanto formamos profissionais de excelência."
            className="h-full bg-background"
          />
          <BaseCard
            icon={<Eye className="h-6 w-6" />}
            title="Visão"
            description="Ser referência em desenvolvimento de software no mercado regional, reconhecida pela inovação e pelo impacto positivo dos nossos projetos."
            className="h-full bg-background"
          />
          <BaseCard
            icon={<Heart className="h-6 w-6" />}
            title="Valores"
            description="Trabalho em equipe, ética, inovação constante, foco no resultado e compromisso com o aprendizado contínuo."
            className="h-full bg-background"
          />
        </div>
      </div>
    </section>
  );
}
