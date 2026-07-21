import { useState, useEffect } from "react";
import { getPublishedCases } from "../api/getCases";
import { CasesHero } from "../components/CasesHero";
import { CasesCTA } from "../components/CasesCTA";
import { CaseCard } from "../components/CaseCard";
import { SectionHeading } from "@/shared/components/SectionHeading";
import type { CaseStudy } from "../types";

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
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((item) => (
              <CaseCard key={item.id} caseItem={item} />
            ))}
          </div>
        )}
      </div>

      <CasesCTA />
    </div>
  );
}
