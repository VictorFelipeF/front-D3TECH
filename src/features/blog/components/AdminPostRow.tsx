import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { BlogPost } from "../types";

interface Props {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function AdminPostRow({ post, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3.5 hover:bg-white/15 transition-colors">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            post.status === "published"
              ? "bg-emerald-400/20 text-emerald-200"
              : "bg-amber-400/20 text-amber-200"
          }`}
        >
          {post.status === "published" ? "Publicado" : "Rascunho"}
        </span>
        <span className="text-sm font-medium text-white">{post.title}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-white/50">
          {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
        </span>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Excluir?</span>
            <button onClick={() => onDelete(post.id)} aria-label="Confirmar exclusão">
              <Check className="w-4 h-4 text-red-300" />
            </button>
            <button onClick={() => setConfirming(false)} aria-label="Cancelar">
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => onEdit(post)} aria-label="Editar">
              <Pencil className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
            </button>
            <button onClick={() => setConfirming(true)} aria-label="Excluir">
              <Trash2 className="w-4 h-4 text-white/50 hover:text-red-300 transition-colors" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}