import { Badge } from "@/components/ui/badge";
import { fileUrl } from "@/services/api";
import type { CaseBackend } from "@/services/cases.service";

export function CaseCard({
  caseItem,
  index,
}: {
  caseItem: CaseBackend;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <article className="group flex flex-col gap-6 transition-transform hover:-translate-y-1 md:grid md:grid-cols-2 md:items-center md:gap-10">
      <div
        className={`flex aspect-video w-full items-center justify-center overflow-hidden rounded-none bg-gray-100 ${
          isReversed ? "md:order-2" : ""
        }`}
      >
        {caseItem.imagemCapa ? (
          <img
            src={fileUrl(caseItem.imagemCapa)}
            alt={caseItem.nomeProjeto}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">Sem capa</span>
        )}
      </div>

      <div className={`flex flex-col gap-3 ${isReversed ? "md:order-1" : ""}`}>
        <h3 className="text-2xl font-bold tracking-tight text-d3-navy md:text-3xl">
          {caseItem.nomeProjeto}
        </h3>
        {caseItem.cliente && (
          <p className="text-sm font-medium text-gray-500">{caseItem.cliente}</p>
        )}
        <p className="text-base leading-relaxed text-gray-600 line-clamp-3">
          {caseItem.descricao.replace(/<[^>]*>/g, "")}
        </p>
        {caseItem.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {caseItem.tags.map((tag) => (
              <Badge key={tag.id} className="bg-d3-purple text-white rounded-none">{tag.nome}</Badge>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
