import { useFeaturedCases } from "@/hooks/useCases";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { CaseCardSmall } from "./CaseCardSmall";

export function CasesSection() {
  const { data: featuredCases, isLoading } = useFeaturedCases();
  const cases = (featuredCases ?? []).slice(0, 3);

  if (!isLoading && cases.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Cases em destaque"
        title="Projetos que geraram resultado"
        subtitle="Uma amostra dos nossos cases de sucesso. Veja o portfólio completo na página de cases."
      />

      {isLoading ? (
        <p className="text-center text-muted-foreground">Carregando...</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem, index) => (
            <CaseCardSmall key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <CTAButton to="/cases" variant="primary">
          Ver todos os cases
        </CTAButton>
      </div>
    </section>
  );
}