import { useState, useEffect } from "react";
import { BlogPostCard } from "@/pages/blog/components/BlogPostCard";
import { FeaturedPostCard } from "@/pages/blog/components/FeaturedPostCard";
import { usePublishedPosts } from "@/hooks/usePosts";
import { http } from "@/services/api";
import { Search, X } from "lucide-react";

type Filter = { id: number; nome: string };

export default function BlogPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [categoriaId, setCategoriaId] = useState<number | undefined>();
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [categorias, setCategorias] = useState<Filter[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  const { data, isLoading } = usePublishedPosts(page, 9, search || undefined, categoriaId, tagIds.length ? tagIds : undefined);
  const posts = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;
  const hasFilters = search || categoriaId || tagIds.length > 0;
  const featured = !hasFilters && posts.length > 0 ? posts[0] : null;
  const isEmpty = !isLoading && posts.length === 0;

  useEffect(() => {
    http.get<Filter[]>("/categorias").then(r => setCategorias(r.data)).catch(() => {});
    http.get<Filter[]>("/tags").then(r => setTags(r.data)).catch(() => {});
  }, []);

  function toggleTag(id: number) {
    setTagIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
    setPage(0);
  }

  function clearFilters() {
    setSearch("");
    setCategoriaId(undefined);
    setTagIds([]);
    setPage(0);
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Elementos graficos decorativos */}
      <svg className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.12]" viewBox="0 0 600 600" aria-hidden="true">
        <defs>
          <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <circle cx="500" cy="100" r="80" fill="url(#blogGrad)" />
        <circle cx="550" cy="250" r="40" fill="url(#blogGrad)" />
        <rect x="420" y="180" width="60" height="60" rx="0" fill="url(#blogGrad)" transform="rotate(45 450 210)" />
        <line x1="0" y1="0" x2="600" y2="600" stroke="#7c3aed" strokeWidth="1" />
        <line x1="200" y1="0" x2="600" y2="400" stroke="#7c3aed" strokeWidth="0.5" />
        <line x1="400" y1="0" x2="600" y2="200" stroke="#6d28d9" strokeWidth="0.5" />
        <polygon points="500,0 550,30 530,80 500,60 470,80 450,30" fill="url(#blogGrad)" opacity="0.5" />
        <polygon points="100,50 130,120 110,120 150,200 100,140 120,140 80,50" fill="url(#blogGrad)" opacity="0.6" />
        <polygon points="300,150 315,195 308,195 330,230 300,200 312,200 285,150" fill="url(#blogGrad)" opacity="0.4" />
        <polygon points="60,300 80,345 72,345 90,380 60,350 70,350 50,300" fill="url(#blogGrad)" opacity="0.35" />
        <polygon points="450,350 480,420 460,420 500,480 445,430 460,430 420,350" fill="url(#blogGrad)" opacity="0.25" />
      </svg>

      <svg className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.12]" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <linearGradient id="blogGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#4d1c99" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="350" r="60" fill="url(#blogGrad2)" />
        <rect x="20" y="200" width="80" height="80" rx="0" fill="url(#blogGrad2)" transform="rotate(30 60 240)" />
        <line x1="0" y1="400" x2="400" y2="0" stroke="#7c3aed" strokeWidth="1" />
        <line x1="0" y1="300" x2="300" y2="0" stroke="#7c3aed" strokeWidth="0.5" />
        <polygon points="0,50 30,20 50,60 20,70" fill="url(#blogGrad2)" />
        <polygon points="300,250 320,300 310,300 340,350 300,310 315,310 280,250" fill="url(#blogGrad2)" opacity="0.4" />
        <polygon points="150,100 170,150 160,150 180,190 150,165 162,165 140,100" fill="url(#blogGrad2)" opacity="0.35" />
      </svg>

      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-0 w-px h-32 bg-d3-purple/15 hidden lg:block" />
      <div className="pointer-events-none absolute top-1/3 right-4 w-1.5 h-1.5 bg-d3-purple/30 hidden lg:block" />
      <div className="pointer-events-none absolute bottom-1/3 right-8 w-2 h-2 bg-d3-purple/25 hidden lg:block" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        <div className="mb-8">
          <p className="text-sm font-semibold text-d3-purple uppercase tracking-wider mb-2">Blog</p>
          <h1 className="text-3xl md:text-4xl font-bold text-d3-navy">Publicações</h1>
          <p className="text-gray-400 mt-2">Artigos, novidades e conhecimento da D3TECH</p>
        </div>

        {/* Filtros full-width */}
        <div className="bg-gray-50/50 border border-gray-100 p-6 mb-10">
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                  placeholder="Buscar por título ou descrição..."
                  className="w-full h-11 pl-9 pr-3 text-sm border border-gray-200 bg-white focus:outline-none focus:border-d3-purple/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Categoria</label>
              <select
                value={categoriaId ?? ""}
                onChange={(e) => { setCategoriaId(e.target.value ? Number(e.target.value) : undefined); setPage(0); }}
                className="h-11 px-3 text-sm border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-d3-purple/40 min-w-[180px]"
              >
                <option value="">Todas</option>
                {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>

            {hasFilters && (
              <button onClick={clearFilters} className="h-11 px-4 text-sm text-gray-400 hover:text-d3-purple border border-gray-200 hover:border-d3-purple/40 transition-colors flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Limpar filtros
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {tags.map(tag => {
                const active = tagIds.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`text-xs px-3 py-1.5 border transition-colors font-medium ${
                      active
                        ? "bg-d3-purple text-white border-d3-purple"
                        : "bg-white text-gray-500 border-gray-200 hover:border-d3-purple/40"
                    }`}
                  >
                    {tag.nome}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isEmpty ? (
          <p className="text-center text-gray-400 py-20">
            {hasFilters ? "Nenhum post encontrado com esses filtros." : "Ainda não há posts publicados."}
          </p>
        ) : (
          <>
            {featured && <FeaturedPostCard post={featured} />}

            <div className="flex flex-col gap-6 mt-12">
              {posts.slice(featured ? 1 : 0).map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i)} className={`w-10 h-10 flex items-center justify-center text-sm font-medium transition-colors ${page === i ? "bg-d3-navy text-white" : "text-gray-400 hover:text-d3-navy hover:bg-gray-50"}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
