import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CaseStudy } from "../types";

export function CaseCard({ caseItem }: { caseItem: CaseStudy }) {
  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-transform">
      <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
        {caseItem.coverUrl ? (
          <img
            src={caseItem.coverUrl}
            alt={caseItem.title}
            className="h-full w-full object-cover"
          />
        ) : (
          /* placeholder quando não houver capa */
          <span className="text-xs text-muted-foreground/60">Sem capa</span>
        )}
      </div>
      <CardContent className="p-4">
        <Badge className="bg-d3-purple text-white mb-2">{caseItem.tag}</Badge>
        <h3 className="font-semibold text-lg">{caseItem.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{caseItem.client}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {caseItem.excerpt}
        </p>
        <span className="text-xs text-muted-foreground mt-3 inline-block">
          {new Date(caseItem.publishedAt).toLocaleDateString("pt-BR")}
        </span>
      </CardContent>
    </Card>
  );
}
