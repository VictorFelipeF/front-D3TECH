import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost } from "@/hooks/usePosts";
import { PageLoader } from "@/components/shared/PageLoader";
import { fileUrl } from "@/services/api";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = usePost(slug ?? "");

  if (isLoading) return <PageLoader />;
  if (!post) return <PageLoader />;

  return (
    <article className="min-h-screen bg-white relative overflow-hidden">
      <svg className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.08]" viewBox="0 0 500 500" aria-hidden="true">
        <defs><linearGradient id="bpGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient></defs>
        <circle cx="400" cy="80" r="50" fill="url(#bpGrad)"/>
        <rect x="350" y="150" width="40" height="40" fill="url(#bpGrad)" transform="rotate(45 370 170)"/>
        <polygon points="380,0 420,80 400,80 440,150 380,100 400,100 350,0" fill="url(#bpGrad)" opacity="0.5"/>
        <polygon points="200,50 220,100 212,100 230,140 200,115 210,115 190,50" fill="url(#bpGrad)" opacity="0.4"/>
        <polygon points="100,300 130,360 115,360 145,420 100,375 118,375 80,300" fill="url(#bpGrad)" opacity="0.3"/>
        <line x1="0" y1="0" x2="500" y2="500" stroke="#7c3aed" strokeWidth="0.5"/>
      </svg>
      <svg className="pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] opacity-[0.08]" viewBox="0 0 300 300" aria-hidden="true">
        <defs><linearGradient id="bpGrad2" x1="100%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#4d1c99"/></linearGradient></defs>
        <circle cx="40" cy="260" r="40" fill="url(#bpGrad2)"/>
        <polygon points="200,200 220,250 210,250 230,290 200,260 212,260 190,200" fill="url(#bpGrad2)" opacity="0.5"/>
        <polygon points="80,20 100,60 93,60 108,90 80,70 90,70 70,20" fill="url(#bpGrad2)" opacity="0.4"/>
        <line x1="0" y1="300" x2="300" y2="0" stroke="#7c3aed" strokeWidth="0.5"/>
      </svg>
      <div className="container mx-auto px-4 py-12 max-w-3xl relative">
        <button onClick={() => navigate("/blog")} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-d3-purple transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        {post.categoria && (
          <span className="text-xs font-semibold text-d3-purple uppercase tracking-wider">
            {post.categoria.nome}
          </span>
        )}

        <h1 className="text-3xl md:text-4xl font-bold text-d3-navy mt-3 mb-4 leading-tight">
          {post.titulo}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-100">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {post.autor}</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) : ""}
          </span>
        </div>

        {post.imagemCapa && (
          <img src={fileUrl(post.imagemCapa)} alt={post.titulo} className="w-full mb-10 object-cover" />
        )}

        <div className="prose prose-lg max-w-none prose-headings:text-d3-navy prose-a:text-d3-purple" dangerouslySetInnerHTML={{ __html: post.descricao }} />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span key={tag.id} className="text-xs bg-d3-purple/5 text-d3-purple px-3 py-1.5 border border-d3-purple/10">
                {tag.nome}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-d3-purple hover:text-d3-purple-dark font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Ver mais publicações
          </Link>
        </div>
      </div>
    </article>
  );
}
