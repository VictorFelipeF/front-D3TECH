import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { usePost } from "@/hooks/usePosts";
import { PageLoader } from "@/components/shared/PageLoader";
import { fileUrl } from "@/services/api";

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
        className="text-sm text-d3-purple mb-6 block hover:underline"
      >
        &larr; Voltar
      </button>

      {post.imagemCapa && (
        <img
          src={fileUrl(post.imagemCapa)}
          alt={post.titulo}
          className="w-full rounded-lg mb-6 object-cover aspect-video"
        />
      )}

      {post.categoria && (
        <Badge className="bg-d3-purple text-white mb-3">{post.categoria.nome}</Badge>
      )}

      <h1 className="text-3xl font-bold text-d3-navy mb-2">{post.titulo}</h1>

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <span>{post.autor}</span>
        <span>&bull;</span>
        <span>
          {post.dataPublicacao
            ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR")
            : ""}
        </span>
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.descricao }}
      />

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">{tag.nome}</Badge>
          ))}
        </div>
      )}
    </article>
  );
}
