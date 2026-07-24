import { useState, useEffect } from "react";
import { Pencil, FileText, Star, FileEdit } from "lucide-react";
import { PostFormModal } from "@/pages/blog/components/PostFormModal";
import { getAllPosts, createPost } from "@/services/posts.service";
import type { PostPayload } from "@/services/posts.service";

export default function AdminHomePage() {
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [blogSummary, setBlogSummary] = useState({ published: 0, draft: 0 });

  useEffect(() => {
    loadSummaries();
  }, []);

  async function loadSummaries() {
    try {
      const posts = await getAllPosts();
      const published = posts.filter((p) => p.exibirAoPublico).length;
      const draft = posts.filter((p) => !p.exibirAoPublico).length;
      setBlogSummary({ published, draft });
    } catch { /* offline */ }
  }

  async function handleSaveBlogPost(data: PostPayload) {
    await createPost(data);
    await loadSummaries();
  }

  const cards = [
    {
      label: "Posts publicados",
      value: blogSummary.published,
      icon: Pencil,
      gradient: "from-emerald-500 to-emerald-600",
      iconBg: "bg-emerald-400/30",
    },
    {
      label: "Rascunhos",
      value: blogSummary.draft,
      icon: FileEdit,
      gradient: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-400/30",
    },
    {
      label: "Cases publicados",
      value: 0,
      icon: Star,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-400/30",
    },
    {
      label: "Cases em rascunho",
      value: 0,
      icon: FileText,
      gradient: "from-gray-500 to-gray-600",
      iconBg: "bg-gray-400/30",
    },
  ];

  return (
    <div className="px-10 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-d3-navy">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Visao geral do conteudo administrativo</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-none bg-gradient-to-br ${card.gradient} p-5 shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className={`w-10 h-10 rounded-none ${card.iconBg} flex items-center justify-center mb-4`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-[11px] font-medium text-white/70 uppercase tracking-wider">{card.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white rounded-none p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-d3-purple/20 transition-all">
          <h2 className="font-semibold text-lg text-d3-navy mb-1">Blog</h2>
          <p className="text-sm text-gray-400 mb-6">Gerencie publicacoes e rascunhos</p>
          <button
            onClick={() => setBlogModalOpen(true)}
            className="bg-d3-purple hover:bg-d3-purple-dark transition-colors text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20"
          >
            + Novo post
          </button>
        </div>

        <div className="bg-white rounded-none p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-d3-purple/20 transition-all">
          <h2 className="font-semibold text-lg text-d3-navy mb-1">Cases de sucesso</h2>
          <p className="text-sm text-gray-400 mb-6">Gerencie projetos e resultados</p>
          <button
            onClick={() => {}}
            className="bg-d3-purple hover:bg-d3-purple-dark transition-colors text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20"
          >
            + Novo case
          </button>
        </div>
      </div>

      <PostFormModal
        isOpen={blogModalOpen}
        onClose={() => setBlogModalOpen(false)}
        onSave={handleSaveBlogPost}
        initialData={null}
      />
    </div>
  );
}
