import { useState, useEffect } from "react";
import { getPublishedCases } from "@/api/cases/getCases";
import { CasesHero } from "@/pages/cases/components/CasesHero";
import { CasesCTA } from "@/pages/cases/components/CasesCTA";
import { CaseCard } from "@/pages/cases/components/CaseCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CaseStudy } from "@/types/cases";

export default function CasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPublishedCases().then((data) => {
      setCases(data);
      setLoaded(true);
    });
  }, []);

  const isEmpty = loaded && cases.length === 0;

  return (
    <div>
      <CasesHero />

      <div className="container mx-auto px-4 py-16">
        <SectionHeading
          eyebrow="Portfólio"
          title="Nossos cases"
          subtitle="Uma seleção dos projetos que desenvolvemos junto aos nossos clientes."
        />

        {isEmpty ? (
          <p className="text-center text-muted-foreground py-16">
            Ainda não há cases publicados.
          </p>
        ) : (
          <div className="flex flex-col gap-10 mt-12">
            {cases.map((item, i) => (
              <CaseCard key={item.id} caseItem={item} index={i} />
            ))}
          </div>
        )}
      </div>

      <CasesCTA />
    </div>
  );
}
