import { useState } from "react";
import { usePublishedCases } from "@/hooks/useCases";
import { CasesHero } from "@/pages/cases/components/CasesHero";
import { CasesCTA } from "@/pages/cases/components/CasesCTA";
import { CaseCard } from "@/pages/cases/components/CaseCard";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function CasesPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = usePublishedCases(page, 6);
  const cases = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const isEmpty = !isLoading && cases.length === 0;

  return (
    <div>
      <CasesHero />

      <div className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Nossos cases"
          subtitle="Uma selecao dos projetos que desenvolvemos junto aos nossos clientes."
          align="center"
        />

        {isEmpty ? (
          <p className="text-center text-muted-foreground py-16">
            Ainda nao ha cases publicados.
          </p>
        ) : (
          <div className="flex flex-col gap-10 mt-12">
            {cases.map((item, i) => (
              <CaseCard key={item.id} caseItem={item} index={i} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium transition-colors ${
                  page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <CasesCTA />
    </div>
  );
}
