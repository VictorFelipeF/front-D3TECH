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
    <div className="relative overflow-hidden">
      <svg className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.08]" viewBox="0 0 500 500" aria-hidden="true">
        <defs><linearGradient id="csGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient></defs>
        <circle cx="420" cy="60" r="60" fill="url(#csGrad)"/>
        <rect x="350" y="130" width="50" height="50" fill="url(#csGrad)" transform="rotate(45 375 155)"/>
        <polygon points="400,0 440,80 420,80 460,160 400,110 420,110 370,0" fill="url(#csGrad)" opacity="0.5"/>
        <polygon points="180,80 200,130 190,130 210,170 180,145 192,145 170,80" fill="url(#csGrad)" opacity="0.4"/>
        <polygon points="80,320 110,380 95,380 125,450 80,400 100,400 60,320" fill="url(#csGrad)" opacity="0.3"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.08]" viewBox="0 0 400 400" aria-hidden="true">
        <defs><linearGradient id="csGrad2" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#4d1c99"/></linearGradient></defs>
        <circle cx="60" cy="340" r="50" fill="url(#csGrad2)"/>
        <polygon points="200,180 220,240 210,240 230,290 200,250 215,250 180,180" fill="url(#csGrad2)" opacity="0.5"/>
        <polygon points="300,80 320,120 312,120 330,160 300,130 315,130 285,80" fill="url(#csGrad2)" opacity="0.4"/>
        <line x1="0" y1="400" x2="400" y2="0" stroke="#7c3aed" strokeWidth="0.5"/>
      </svg>

      <CasesHero />

      <div className="container mx-auto px-4 py-16 relative">
        <SectionHeading
          eyebrow="Portfolio"
          title="Todos os cases"
          subtitle="Uma selecao dos projetos que desenvolvemos junto aos nossos clientes."
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