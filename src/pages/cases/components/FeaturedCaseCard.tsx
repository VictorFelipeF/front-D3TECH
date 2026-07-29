import { Badge } from "@/components/ui/badge";
import { fileUrl } from "@/services/api";
import type { CaseBackend } from "@/services/cases.service";

export function FeaturedCaseCard({ caseItem }: { caseItem: CaseBackend }) {
  return (
    <div className="grid md:grid-cols-2 gap-0 rounded-none overflow-hidden border bg-d3-purple/5">
      {caseItem.imagemCapa ? (
        <img
          src={fileUrl(caseItem.imagemCapa)}
          alt={caseItem.nomeProjeto}
          className="aspect-video md:aspect-auto object-cover w-full h-full"
        />
      ) : (
        <div className="aspect-video md:aspect-auto bg-gray-100 flex items-center justify-center text-gray-400 text-xs" />
      )}

      <div className="p-6 flex flex-col justify-center">
        {caseItem.tags?.[0] && (
          <Badge className="bg-d3-purple text-white w-fit mb-3">
            {caseItem.tags[0].nome}
          </Badge>
        )}

        <h2 className="text-xl font-bold">{caseItem.nomeProjeto}</h2>

        {caseItem.cliente && (
          <span className="text-xs text-muted-foreground mt-2">{caseItem.cliente}</span>
        )}

        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
          {caseItem.descricao}
        </p>

        {caseItem.depoimento && (
          <p className="text-sm italic text-d3-purple mt-4 line-clamp-2">
            "{caseItem.depoimento}"
          </p>
        )}
      </div>
    </div>
  );
}