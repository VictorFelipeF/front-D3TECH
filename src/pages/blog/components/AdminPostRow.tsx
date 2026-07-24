import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { PostBackend } from "@/services/posts.service";

interface Props {
  post: PostBackend;
  onEdit: (post: PostBackend) => void;
  onDelete: (id: number) => void;
}

function fmtDate(d: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function AdminPostRow({ post, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-none shrink-0 ${
              post.exibirAoPublico
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {post.exibirAoPublico ? "Publicado" : "Rascunho"}
          </span>

          <div className="min-w-0 flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-d3-navy truncate">{post.titulo}</span>
              <span className="text-[11px] text-gray-400 shrink-0">{post.autor}</span>
            </div>
            <div className="flex items-center gap-4 mt-0.5">
              <span className="text-[11px] text-gray-400">
                {post.categoria?.nome || "Sem categoria"}
              </span>
              <span className="text-[11px] text-gray-300">
                Criado {fmtDate(post.createdAt)}
              </span>
              {post.updatedAt && (
                <span className="text-[11px] text-gray-300">
                  Atualizado {fmtDate(post.updatedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-4">
          {confirming ? (
            <>
              <span className="text-xs text-gray-400 mr-1">Excluir?</span>
              <button onClick={() => onDelete(post.id)} className="flex h-8 w-8 items-center justify-center rounded-none bg-red-50 text-red-600 hover:bg-red-100 transition-colors" aria-label="Confirmar">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => setConfirming(false)} className="flex h-8 w-8 items-center justify-center rounded-none bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors" aria-label="Cancelar">
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => onEdit(post)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors" aria-label="Editar">
                <Pencil className="w-4 h-4" />
              </button>
              <button onClick={() => setConfirming(true)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Excluir">
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-5 pb-4 border-t border-gray-50">
          <p className="text-sm text-gray-500 mt-3 line-clamp-2">
            {post.descricao.replace(/<[^>]*>/g, "")}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.map((tag) => (
                <span key={tag.id} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-none">
                  {tag.nome}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
