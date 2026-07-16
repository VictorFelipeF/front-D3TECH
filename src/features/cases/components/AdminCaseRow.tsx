import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "../types";

interface Props {
  caseItem: CaseStudy;
  onEdit: (item: CaseStudy) => void;
  onDelete: (id: string) => void;
}

export function AdminCaseRow({ caseItem, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex items-center justify-between border rounded-md px-4 py-3">
      <div className="flex items-center gap-3">
        <Badge
          className={
            caseItem.status === "published"
              ? "bg-green-500 text-white"
              : "bg-yellow-400 text-black"
          }
        >
          {caseItem.status === "published" ? "Publicado" : "Rascunho"}
        </Badge>
        <div>
          <span className="font-medium block">{caseItem.title}</span>
          <span className="text-xs text-muted-foreground">{caseItem.client}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {new Date(caseItem.publishedAt).toLocaleDateString("pt-BR")}
        </span>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Excluir?</span>
            <button onClick={() => onDelete(caseItem.id)} aria-label="Confirmar exclusão">
              <Check className="w-4 h-4 text-red-500" />
            </button>
            <button onClick={() => setConfirming(false)} aria-label="Cancelar">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => onEdit(caseItem)} aria-label="Editar">
              <Pencil className="w-4 h-4 text-muted-foreground hover:text-d3-purple" />
            </button>
            <button onClick={() => setConfirming(true)} aria-label="Excluir">
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}