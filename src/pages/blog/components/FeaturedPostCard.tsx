import { Link } from "react-router-dom";
import { fileUrl } from "@/services/api";
import type { PostBackend } from "@/services/posts.service";

export function FeaturedPostCard({ post }: { post: PostBackend }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="grid md:grid-cols-2 overflow-hidden bg-white border border-gray-100 hover:border-d3-purple/30 transition-colors">
        {post.imagemCapa ? (
          <img src={fileUrl(post.imagemCapa)} alt={post.titulo} className="aspect-video md:aspect-auto object-cover w-full h-full md:h-80" />
        ) : (
          <div className="aspect-video md:aspect-auto md:h-80 bg-gray-50 flex items-center justify-center text-gray-300 text-sm">Sem capa</div>
        )}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {post.categoria && (
            <span className="text-xs font-semibold text-d3-purple uppercase tracking-wider mb-3">
              {post.categoria.nome}
            </span>
          )}
          <h2 className="text-2xl font-bold text-d3-navy group-hover:text-d3-purple transition-colors leading-tight">
            {post.titulo}
          </h2>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-400">
            <span>{post.autor}</span>
            <span>·</span>
            <span>{post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}</span>
          </div>
          <div className="text-sm text-gray-500 mt-4 line-clamp-3 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post.descricao }} />
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {post.tags.map(tag => (
                <span key={tag.id} className="text-[10px] bg-d3-purple/5 text-d3-purple px-2 py-0.5 border border-d3-purple/10">
                  {tag.nome}
                </span>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-1 text-sm text-d3-purple font-medium mt-5 group-hover:gap-2 transition-all">
            Ler artigo
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
