import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "../types";

interface Props {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export function AdminPostRow({ post, onEdit, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between border rounded-md px-4 py-3">
      <div className="flex items-center gap-3">
        <Badge
          className={
            post.status === "published"
              ? "bg-green-500 text-white"
              : "bg-yellow-400 text-black"
          }
        >
          {post.status === "published" ? "Publicado" : "Rascunho"}
        </Badge>
        <span className="font-medium">{post.title}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
        </span>
        <button onClick={() => onEdit(post)} aria-label="Editar">
          <Pencil className="w-4 h-4 text-muted-foreground hover:text-d3-purple" />
        </button>
        <button onClick={() => onDelete(post.id)} aria-label="Excluir">
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}