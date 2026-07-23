import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/types/cases";

export function CaseCard({
  caseItem,
  index,
}: {
  caseItem: CaseStudy;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <article className="group flex flex-col gap-6 transition-transform hover:-translate-y-1 md:grid md:grid-cols-2 md:items-center md:gap-10">
      <div
        className={`flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-muted ring-1 ring-foreground/10 ${
          isReversed ? "md:order-2" : ""
        }`}
      >
        {caseItem.coverUrl ? (
          <img
            src={caseItem.coverUrl}
            alt={caseItem.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-muted-foreground/60">Sem capa</span>
        )}
      </div>

      <div
        className={`flex flex-col gap-3 ${isReversed ? "md:order-1" : ""}`}
      >
        <Badge className="w-fit bg-d3-purple text-white">
          {caseItem.tag}
        </Badge>
        <h3 className="text-2xl font-bold tracking-tight text-d3-navy md:text-3xl">
          {caseItem.title}
        </h3>
        <p className="text-sm font-medium text-muted-foreground">
          {caseItem.client}
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          {caseItem.excerpt}
        </p>
      </div>
    </article>
  );
}
