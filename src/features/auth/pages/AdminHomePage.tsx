import { useState, useEffect } from "react";
import { Pencil, FileText, Star, FileEdit } from "lucide-react";
import { PostFormModal } from "@/features/blog/components/PostFormModal";
import { CaseFormModal } from "@/features/cases/components/CaseFormModal";
import { createPost, getPostsSummary } from "@/features/blog/api/adminPosts";
import { createCase, getCasesSummary } from "@/features/cases/api/adminCases";
import type { BlogPost } from "@/features/blog/types";
import type { CaseStudy } from "@/features/cases/types";

export default function AdminHomePage() {
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [blogSummary, setBlogSummary] = useState({ published: 0, draft: 0 });
  const [casesSummary, setCasesSummary] = useState({ published: 0, draft: 0 });

  useEffect(() => {
    loadSummaries();
  }, []);

  async function loadSummaries() {
    const [blog, cases] = await Promise.all([getPostsSummary(), getCasesSummary()]);
    setBlogSummary(blog);
    setCasesSummary(cases);
  }

  async function handleSaveBlogPost(
    data: Omit<BlogPost, "id">,
    _status: "draft" | "published"
  ) {
    await createPost(data);
    await loadSummaries();
  }

  async function handleSaveCase(
    data: Omit<CaseStudy, "id">,
    _status: "draft" | "published"
  ) {
    await createCase(data);
    await loadSummaries();
  }

  const stats = [
    { label: "Posts publicados", value: blogSummary.published, icon: Pencil },
    { label: "Posts em rascunho", value: blogSummary.draft, icon: FileEdit },
    { label: "Cases publicados", value: casesSummary.published, icon: Star },
    { label: "Cases em rascunho", value: casesSummary.draft, icon: FileText },
  ];

  return (
    <div className="px-10 py-12 max-w-6xl">
      <h1 className="text-2xl font-semibold text-d3-navy">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Visão geral do conteúdo administrativo
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-d3-purple rounded-2xl p-5"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-white/80 mb-1">{stat.label}</p>
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-d3-purple rounded-2xl p-7">
            <h2 className="font-semibold text-white mb-1">Blog</h2>
            <p className="text-sm text-white/80 mb-5">
              Gerencie publicações e rascunhos
            </p>
            <button
              onClick={() => setBlogModalOpen(true)}
              className="bg-white text-d3-purple hover:bg-white/90 transition-colors text-sm font-medium rounded-lg px-4 py-2.5"
            >
              + Novo post
            </button>
          </div>

        <div className="bg-d3-purple rounded-2xl p-7">
          <h2 className="font-semibold text-white mb-1">Cases de sucesso</h2>
          <p className="text-sm text-white/80 mb-5">
            Gerencie projetos e resultados
          </p>
          <button
            onClick={() => setCaseModalOpen(true)}
            className="bg-white text-d3-purple hover:bg-white/90 transition-colors text-sm font-medium rounded-lg px-4 py-2.5"
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
      <CaseFormModal
        isOpen={caseModalOpen}
        onClose={() => setCaseModalOpen(false)}
        onSave={handleSaveCase}
        initialData={null}
      />
    </div>
  );
}