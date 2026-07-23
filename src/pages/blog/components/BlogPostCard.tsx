import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-transform">
      <div className="aspect-video bg-muted flex items-center justify-center">
        {/* placeholder de imagem */}
      </div>
      <CardContent className="p-4">
        <Badge className="bg-d3-purple text-white mb-2">{post.tag}</Badge>
        <h3 className="font-semibold text-lg">{post.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString("pt-BR")}</span>
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
