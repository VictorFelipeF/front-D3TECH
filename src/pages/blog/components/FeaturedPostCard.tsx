import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { PostBackend } from "@/services/posts.service";

export function FeaturedPostCard({ post }: { post: PostBackend }) {
  return (
    <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden border bg-d3-purple/5">
      <div className="aspect-video md:aspect-auto bg-muted flex items-center justify-center" />
      <div className="p-6 flex flex-col justify-center">
            <Badge className="bg-d3-purple text-white w-fit mb-3">{post.categoria?.nome}</Badge>
            <h2 className="text-xl font-bold">{post.titulo}</h2>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <span>{post.autor}</span>
            <span>{post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
          {post.descricao.replace(/<[^>]*>/g, "")}
        </p>
        <span className="text-xs text-muted-foreground mt-2">
          {post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}
        </span>
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm text-d3-purple font-medium mt-4"
        >
          Ler artigo
        </Link>
      </div>
    </div>
  );
}
