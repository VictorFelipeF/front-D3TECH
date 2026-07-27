import { useState, useEffect } from "react";
import { Pencil, FileText, Star, FileEdit } from "lucide-react";
import { PostFormModal } from "@/pages/blog/components/PostFormModal";
import { CaseFormModal } from "@/pages/cases/components/CaseFormModal";
import { createPost } from "@/services/posts.service";
import { createCase } from "@/services/cases.service";
import { http } from "@/services/api";
import type { PostPayload } from "@/services/posts.service";
import type { CasePayload } from "@/services/cases.service";

type DashboardStats = {
  postsPublicados: number;
  postsRascunho: number;
  casesPublicados: number;
  casesRascunho: number;
};

export default function AdminHomePage() {
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    postsPublicados: 0, postsRascunho: 0, casesPublicados: 0, casesRascunho: 0,
  });

  async function loadStats() {
    try {
      const res = await http.get<DashboardStats>("/admin/dashboard");
      setStats(res.data);
    } catch { /* */ }
  }

  useEffect(() => { loadStats(); }, []);

  async function handleSaveBlogPost(data: PostPayload) {
    await createPost(data);
    await loadStats();
  }

  async function handleSaveCase(data: CasePayload) {
    await createCase(data);
    await loadStats();
  }

  const cards = [
    { label: "Posts publicados", value: stats.postsPublicados, icon: Pencil, gradient: "from-emerald-500 to-emerald-600", iconBg: "bg-emerald-400/30" },
    { label: "Rascunhos", value: stats.postsRascunho, icon: FileEdit, gradient: "from-amber-500 to-amber-600", iconBg: "bg-amber-400/30" },
    { label: "Cases publicados", value: stats.casesPublicados, icon: Star, gradient: "from-blue-500 to-blue-600", iconBg: "bg-blue-400/30" },
    { label: "Cases em rascunho", value: stats.casesRascunho, icon: FileText, gradient: "from-gray-500 to-gray-600", iconBg: "bg-gray-400/30" },
  ];

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-d3-navy">Dashboard</h1>
        <p className="text-base text-gray-400 mt-1">Visao geral do conteudo administrativo</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className={`relative overflow-hidden rounded-none bg-gradient-to-br ${card.gradient} p-5 shadow-lg hover:shadow-xl transition-shadow`}>
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
          <button onClick={() => setBlogModalOpen(true)} className="bg-d3-purple hover:bg-d3-purple-dark transition-colors text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
            + Novo post
          </button>
        </div>

        <div className="bg-white rounded-none p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-d3-purple/20 transition-all">
          <h2 className="font-semibold text-lg text-d3-navy mb-1">Cases de sucesso</h2>
          <p className="text-sm text-gray-400 mb-6">Gerencie projetos e resultados</p>
          <button onClick={() => setCaseModalOpen(true)} className="bg-d3-purple hover:bg-d3-purple-dark transition-colors text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
            + Novo case
          </button>
        </div>
      </div>

      <PostFormModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} onSave={handleSaveBlogPost} initialData={null} />
      <CaseFormModal isOpen={caseModalOpen} onClose={() => setCaseModalOpen(false)} onSave={handleSaveCase} initialData={null} />
    </div>
  );
}