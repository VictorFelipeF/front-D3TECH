import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/usePosts";
import { PageLoader } from "@/components/shared/PageLoader";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = usePost(slug ?? "");

  if (isLoading) return <PageLoader />;
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

      <Badge className="bg-d3-purple text-white mb-2">{post.categoria}</Badge>
      <h1 className="text-2xl font-bold">{post.titulo}</h1>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 mb-6">
        <span>{post.autor}</span>
        <span>•</span>
        <span>{post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}</span>
      </div>

      <div
        className="border rounded-md p-6 min-h-[200px]"
        dangerouslySetInnerHTML={{ __html: post.conteudo }}
      />
    </article>
  );
}
