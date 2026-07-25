import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { fileUrl } from "@/services/api";
import type { PostBackend } from "@/services/posts.service";

export function BlogPostCard({ post }: { post: PostBackend }) {
  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-transform rounded-none">
      {post.imagemCapa ? (
        <img src={fileUrl(post.imagemCapa)} alt={post.titulo} className="aspect-video object-cover w-full" />
      ) : (
        <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-xs" />
      )}
      <CardContent className="p-4">
        <Badge className="bg-d3-purple text-white mb-2">{post.categoria?.nome}</Badge>
        <h3 className="font-semibold text-lg">{post.titulo}</h3>
        <div className="text-sm text-muted-foreground line-clamp-2 mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post.descricao }} />
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>{post.autor}</span>
          <span>{post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}</span>
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm text-d3-purple font-medium mt-2 inline-block"
        >
          Ler mais
        </Link>
      </CardContent>
    </Card>
  );
}
