import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import type { PostBackend } from "@/services/posts.service";

interface Props {
  post: PostBackend;
  onEdit: (post: PostBackend) => void;
  onDelete: (id: number) => void;
}

export function AdminPostRow({ post, onEdit, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex items-center justify-between bg-muted/40 border border-d3-purple/10 rounded-xl px-4 py-3.5 hover:bg-d3-purple/5 transition-colors">
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            post.exibirAoPublico
              ? "bg-emerald-500/10 text-emerald-700"
              : "bg-amber-500/10 text-amber-700"
          }`}
        >
          {post.exibirAoPublico ? "Publicado" : "Rascunho"}
        </span>
        <span className="text-sm font-medium text-d3-navy">{post.titulo}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          {post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}
        </span>

        {confirming ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Excluir?</span>
            <button onClick={() => onDelete(post.id)} aria-label="Confirmar exclusão">
              <Check className="w-4 h-4 text-red-600" />
            </button>
            <button onClick={() => setConfirming(false)} aria-label="Cancelar">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => onEdit(post)} aria-label="Editar">
              <Pencil className="w-4 h-4 text-muted-foreground hover:text-d3-navy transition-colors" />
            </button>
            <button onClick={() => setConfirming(true)} aria-label="Excluir">
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-600 transition-colors" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
