import { SectionHeading } from "@/shared/components/SectionHeading";
import { BaseCard } from "@/shared/components/BaseCard";
import { GraduationCap, Wallet, Lightbulb, PenTool } from "lucide-react";

export function DifferentiatorsGrid() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <SectionHeading align="center" title="Por que escolher a D3TEC?" />

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* TODO: conteúdo institucional real pendente */}
        <BaseCard
          icon={<GraduationCap className="h-6 w-6" />}
          title="Proximidade acadêmica"
          description="Acesso direto a pesquisadores e tecnologias de ponta dentro do ambiente universitário."
          className="h-full"
        />
        <BaseCard
          icon={<Wallet className="h-6 w-6" />}
          title="Custo-benefício"
          description="Preços competitivos com entregas de alto padrão para o desenvolvimento de soluções."
          className="h-full"
        />
        <BaseCard
          icon={<Lightbulb className="h-6 w-6" />}
          title="Foco em inovação"
          description="Buscamos constantemente novas formas de resolver problemas de forma criativa."
          className="h-full"
        />
        <BaseCard
          icon={<PenTool className="h-6 w-6" />}
          title="Formação prática"
          description="Nossos projetos preparam diretamente os alunos para os desafios do mercado."
          className="h-full"
        />
      </div>
    </section>
  );
}
