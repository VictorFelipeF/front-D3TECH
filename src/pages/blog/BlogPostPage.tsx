import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost } from "@/hooks/usePosts";
import { PageLoader } from "@/components/shared/PageLoader";
import { fileUrl } from "@/services/api";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = usePost(slug ?? "");

  if (isLoading) return <PageLoader />;
  if (!post) return <PageLoader />;

  const readTime = estimateReadTime(post.descricao ?? "");

  return (
    <article className="min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-d3-purple/[0.06] rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-d3-purple/[0.05] rounded-full blur-3xl" />

        <div className="absolute top-0 left-0 h-full w-px bg-d3-purple/15" style={{ left: 80 }} />
        <div className="absolute top-[15%] h-3 w-3 bg-d3-purple/30 -translate-x-1/2" style={{ left: 80 }} />
        <div className="absolute top-[45%] h-2 w-2 bg-d3-purple/25 -translate-x-1/2" style={{ left: 80 }} />
        <div className="absolute top-[75%] h-3 w-3 bg-d3-purple/30 -translate-x-1/2" style={{ left: 80 }} />
        <div className="absolute top-[30%] h-px bg-d3-purple/15" style={{ left: 0, width: 80 }} />
        <div className="absolute top-[60%] h-px bg-d3-purple/15" style={{ left: 0, width: 80 }} />

        <div className="absolute top-0 left-0 h-full w-px bg-d3-purple/8" style={{ left: 100 }} />
        <div className="absolute top-[10%] h-2 w-2 bg-d3-purple/15 -translate-x-1/2" style={{ left: 100 }} />
        <div className="absolute top-[55%] h-2 w-2 bg-d3-purple/15 -translate-x-1/2" style={{ left: 100 }} />
        <div className="absolute top-[85%] h-1.5 w-1.5 bg-d3-purple/12 -translate-x-1/2" style={{ left: 100 }} />

        <div className="absolute top-0 right-0 h-full w-px bg-d3-purple/15" style={{ right: 80 }} />
        <div className="absolute top-[20%] h-2.5 w-2.5 bg-d3-purple/30 -translate-x-1/2" style={{ right: 80 }} />
        <div className="absolute top-[50%] h-3 w-3 bg-d3-purple/25 -translate-x-1/2" style={{ right: 80 }} />
        <div className="absolute top-[85%] h-2 w-2 bg-d3-purple/30 -translate-x-1/2" style={{ right: 80 }} />
        <div className="absolute top-[25%] h-px bg-d3-purple/15" style={{ right: 0, width: 80 }} />
        <div className="absolute top-[70%] h-px bg-d3-purple/15" style={{ right: 0, width: 80 }} />

        <div className="absolute top-0 right-0 h-full w-px bg-d3-purple/8" style={{ right: 100 }} />
        <div className="absolute top-[12%] h-2 w-2 bg-d3-purple/15 -translate-x-1/2" style={{ right: 100 }} />
        <div className="absolute top-[65%] h-1.5 w-1.5 bg-d3-purple/12 -translate-x-1/2" style={{ right: 100 }} />
        <div className="absolute top-[90%] h-2 w-2 bg-d3-purple/15 -translate-x-1/2" style={{ right: 100 }} />
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl relative">
        <button
          onClick={() => navigate("/blog")}
          className="group inline-flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-d3-purple transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar
        </button>

        {post.categoria && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-d3-purple uppercase tracking-wider bg-d3-purple/5 border border-d3-purple/10 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-d3-purple" />
            {post.categoria.nome}
          </span>
        )}

        <h1 className="text-3xl md:text-5xl font-bold text-d3-navy dark:text-white mt-4 mb-5 leading-tight tracking-tight">
          {post.titulo}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400 dark:text-gray-500 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
          <span className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-d3-purple/10 text-d3-purple">
              <User className="w-3.5 h-3.5" />
            </span>
            {post.autor}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.dataPublicacao
              ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
              : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {readTime} min de leitura
          </span>
        </div>

        {post.imagemCapa && (
          <div className="relative mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-br from-d3-purple/20 to-d3-purple/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={fileUrl(post.imagemCapa)}
              alt={post.titulo}
              className="relative w-full rounded-xl object-cover shadow-sm"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-d3-navy dark:prose-headings:text-white prose-headings:font-bold prose-a:text-d3-purple prose-a:no-underline hover:prose-a:underline prose-strong:text-d3-navy dark:prose-strong:text-white prose-blockquote:border-l-d3-purple prose-blockquote:text-gray-500 dark:prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: post.descricao }}
        />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs font-medium bg-d3-purple/5 text-d3-purple px-3 py-1.5 rounded-full border border-d3-purple/10 hover:border-d3-purple/30 hover:bg-d3-purple/10 transition-colors cursor-default"
              >
                #{tag.nome}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-1.5 text-sm text-d3-purple hover:text-d3-purple-dark font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Ver mais publicacoes
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="w-8 h-px bg-d3-purple/20" />
            D3TECH
            <span className="w-8 h-px bg-d3-purple/20" />
          </div>
        </div>
      </div>
    </article>
  );
}