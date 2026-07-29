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
      <svg className="pointer-events-none absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.12]" viewBox="0 0 700 700" aria-hidden="true">
        <defs><linearGradient id="csGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient></defs>
        <circle cx="580" cy="120" r="100" fill="url(#csGrad)" opacity="0.3"/>
        <rect x="450" y="220" width="80" height="80" fill="url(#csGrad)" opacity="0.3" transform="rotate(45 490 260)"/>
        <polygon points="560,0 630,80 600,80 670,200 560,130 595,130 500,0" fill="url(#csGrad)" opacity="0.12"/>
        <polygon points="150,120 220,260 180,260 270,400 150,310 185,310 100,120" fill="url(#csGrad)" opacity="0.12"/>
        <polygon points="380,450 430,590 400,590 460,700 370,610 405,610 320,450" fill="url(#csGrad)" opacity="0.12"/>
        <polygon points="250,300 300,420 275,420 330,530 245,450 275,450 200,300" fill="url(#csGrad)" opacity="0.12"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.12]" viewBox="0 0 500 500" aria-hidden="true">
        <defs><linearGradient id="csGrad2" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#4d1c99"/></linearGradient></defs>
        <circle cx="80" cy="420" r="80" fill="url(#csGrad2)" opacity="0.3"/>
        <polygon points="280,220 330,360 300,360 360,480 270,380 305,380 220,220" fill="url(#csGrad2)" opacity="0.12"/>
        <polygon points="100,60 150,180 125,180 170,280 95,200 125,200 60,60" fill="url(#csGrad2)" opacity="0.12"/>
        <polygon points="380,100 430,220 405,220 460,340 370,250 405,250 320,100" fill="url(#csGrad2)" opacity="0.12"/>
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