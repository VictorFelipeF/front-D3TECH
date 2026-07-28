import { useFeaturedCases } from "@/hooks/useCases";
import { FeaturedCaseCard } from "@/pages/cases/components/FeaturedCaseCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function FeaturedCases() {
  const { data: featuredCases, isLoading } = useFeaturedCases();

  if (isLoading || !featuredCases || featuredCases.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Destaques"
          title="Cases de sucesso"
          subtitle="Os projetos que mais geraram resultado para os nossos clientes."
        />

        <div className="mt-12">
            <FeaturedCaseCard caseItem={featuredCases[0]} />    
        </div>
      </div>
    </div>
  );
}