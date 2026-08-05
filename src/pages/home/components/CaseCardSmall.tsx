import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fileUrl } from "@/services/api";
import { cn } from "@/lib/utils";
import type { CaseBackend } from "@/services/cases.service";

type CaseCardSmallProps = {
  caseItem: CaseBackend;
  index?: number;
};

export function CaseCardSmall({ caseItem }: CaseCardSmallProps) {
  return (
    <Card className={cn(
      "group flex h-full flex-col gap-0 overflow-hidden rounded-none border-0 bg-card p-0 ring-1 ring-border/60 transition-all duration-300",
      "hover:-translate-y-1 hover:shadow-xl hover:shadow-d3-purple/10 hover:ring-d3-purple/40"
    )}>
      <div className="flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100">
        {caseItem.imagemCapa ? (
          <img
            src={fileUrl(caseItem.imagemCapa)}
            alt={caseItem.nomeProjeto}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="text-xs text-gray-400">Sem capa</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        {caseItem.tags?.[0] && (
          <Badge className="w-fit rounded-none bg-d3-purple text-white">
            {caseItem.tags[0].nome}
          </Badge>
        )}

        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {caseItem.nomeProjeto}
        </h3>

        {caseItem.cliente && (
          <p className="text-sm font-medium text-muted-foreground">
            {caseItem.cliente}
          </p>
        )}

        <div
          className="prose prose-sm max-w-none text-sm leading-relaxed text-muted-foreground line-clamp-3"
          dangerouslySetInnerHTML={{ __html: caseItem.descricao }}
        />
      </div>
    </Card>
  );
}