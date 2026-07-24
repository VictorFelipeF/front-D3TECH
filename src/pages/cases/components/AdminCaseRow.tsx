import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { CaseStudy } from "@/types/cases";

interface Props {
  caseItem: CaseStudy;
  onEdit: (item: CaseStudy) => void;
  onDelete: (id: string) => void;
}

export function AdminCaseRow({ caseItem, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="group flex items-center justify-between bg-white border border-gray-100 rounded-none px-5 py-4 hover:border-d3-purple/30 hover:shadow-md hover:shadow-d3-purple/5 transition-all">
      <div className="flex items-center gap-4">
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-none ${
            caseItem.status === "published"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {caseItem.status === "published" ? "Publicado" : "Rascunho"}
        </span>
        <div>
          <span className="text-sm font-semibold text-d3-navy block">{caseItem.title}</span>
          <span className="text-[11px] text-gray-400">{caseItem.client}</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <span className="text-xs text-gray-400">
          {new Date(caseItem.publishedAt).toLocaleDateString("pt-BR")}
        </span>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {confirming ? (
            <>
              <span className="text-xs text-gray-400 mr-1">Excluir?</span>
              <button
                onClick={() => onDelete(caseItem.id)}
                className="flex h-8 w-8 items-center justify-center rounded-none bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                aria-label="Confirmar exclusao"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="flex h-8 w-8 items-center justify-center rounded-none bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors"
                aria-label="Cancelar"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onEdit(caseItem)}
                className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors"
                aria-label="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => setConfirming(true)}
                className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                aria-label="Excluir"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
