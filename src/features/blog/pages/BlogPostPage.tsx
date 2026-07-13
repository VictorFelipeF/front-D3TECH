import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogPostBySlug } from "../api/getBlogPostBySlug";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "../types";
import { PageLoader } from "@/shared/components/PageLoader";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) getBlogPostBySlug(slug).then(setPost);
  }, [slug]);

  if (!post) return <PageLoader />;

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <button
        onClick={() => navigate("/blog")}
        className="text-sm text-d3-purple mb-4 block ml-auto"
      >
        ← Voltar
      </button>

      <div className="aspect-video bg-muted rounded-lg mb-4" />

      <Badge className="bg-d3-purple text-white mb-2">{post.tag}</Badge>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 mb-6">
        <span>{post.author}</span>
        <span>•</span>
        <span>{new Date(post.publishedAt).toLocaleDateString("pt-BR")}</span>
      </div>

      <div
        className="border rounded-md p-6 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

