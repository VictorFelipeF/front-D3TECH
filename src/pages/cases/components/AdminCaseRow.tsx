import { Pencil, Trash2 } from "lucide-react";
import { fileUrl } from "@/services/api";
import type { CaseBackend } from "@/services/cases.service";

interface Props {
  caseItem: CaseBackend;
  onEdit: (item: CaseBackend) => void;
  onDelete: (item: CaseBackend) => void;
}

function fmtDate(d: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function AdminCaseRow({ caseItem, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-none hover:border-d3-purple/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between px-5 py-4">
        <div className="flex gap-4 min-w-0 flex-1">
          {caseItem.imagemCapa && (
            <img src={fileUrl(caseItem.imagemCapa)} alt="" className="w-16 h-16 object-cover rounded-none shrink-0 border border-gray-100" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-base font-semibold text-d3-navy dark:text-white truncate">{caseItem.nomeProjeto}</span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-none shrink-0 ${
                  caseItem.exibirAoPublico
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {caseItem.exibirAoPublico ? "Publicado" : "Rascunho"}
              </span>
            </div>
            <div className="text-sm text-gray-500 line-clamp-2 mb-1.5 prose max-w-none" dangerouslySetInnerHTML={{ __html: caseItem.descricao }} />
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-xs text-gray-400">{caseItem.cliente || "Sem cliente"}</span>
              <span className="text-xs text-gray-400">
                Criado {fmtDate(caseItem.createdAt)}
              </span>
              {caseItem.updatedAt && (
                <span className="text-xs text-gray-400">
                  Atualizado {fmtDate(caseItem.updatedAt)}
                </span>
              )}
              {caseItem.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {caseItem.tags.map((tag) => (
                    <span key={tag.id} className="text-xs bg-d3-purple/10 text-d3-purple font-medium px-2 py-0.5 rounded-none border border-d3-purple/20">
                      {tag.nome}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-4">
          <button onClick={() => onEdit(caseItem)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors" aria-label="Editar">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(caseItem)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Excluir">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
