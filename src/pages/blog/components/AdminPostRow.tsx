import { Pencil, Trash2 } from "lucide-react";
import { fileUrl } from "@/services/api";
import type { PostBackend } from "@/services/posts.service";

interface Props {
  post: PostBackend;
  onEdit: (post: PostBackend) => void;
  onDelete: (post: PostBackend) => void;
}

function fmtDate(d: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function AdminPostRow({ post, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between px-5 py-4">
        <div className="flex gap-4 min-w-0 flex-1">
          {post.imagemCapa && (
            <img src={fileUrl(post.imagemCapa)} alt="" className="w-16 h-16 object-cover rounded-none shrink-0 border border-gray-100" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-semibold text-d3-navy truncate">{post.titulo}</span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-none shrink-0 ${
                  post.exibirAoPublico
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {post.exibirAoPublico ? "Publicado" : "Rascunho"}
              </span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-1">
              {post.descricao.replace(/<[^>]*>/g, "")}
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[11px] text-gray-400">{post.autor}</span>
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
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-none">
                      {tag.nome}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-4">
          <button onClick={() => onEdit(post)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors" aria-label="Editar">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(post)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="Excluir">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
