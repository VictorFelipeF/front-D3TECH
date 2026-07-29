import { Link } from "react-router-dom";
import { fileUrl } from "@/services/api";
import type { PostBackend } from "@/services/posts.service";

export function BlogPostCard({ post }: { post: PostBackend }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-d3-purple/30 transition-all hover:-translate-y-1 flex flex-col md:flex-row">
        {post.imagemCapa ? (
          <img src={fileUrl(post.imagemCapa)} alt={post.titulo} className="w-full md:w-64 aspect-video md:aspect-square object-cover shrink-0" />
        ) : (
          <div className="w-full md:w-64 aspect-video md:aspect-square bg-gray-50 flex items-center justify-center text-gray-300 text-sm shrink-0" />
        )}
        <div className="p-5 md:p-6 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            {post.categoria && (
              <span className="text-xs font-medium text-d3-purple uppercase tracking-wider">
                {post.categoria.nome}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-lg md:text-xl text-d3-navy dark:text-white group-hover:text-d3-purple transition-colors leading-snug">
            {post.titulo}
          </h3>
          <div className="text-sm text-gray-500 line-clamp-2 mt-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post.descricao }} />
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <div className="flex items-center gap-3">
              <span>{post.autor}</span>
              <span>{post.dataPublicacao ? new Date(post.dataPublicacao).toLocaleDateString("pt-BR") : ""}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag.id} className="text-[10px] bg-d3-purple/5 text-d3-purple px-2 py-0.5 border border-d3-purple/10">
                    {tag.nome}
                  </span>
                ))}
                {post.tags.length > 3 && <span className="text-[10px] text-gray-300">+{post.tags.length - 3}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
