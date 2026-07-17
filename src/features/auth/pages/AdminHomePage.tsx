import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Star } from "lucide-react";
import { PostFormModal } from "@/features/blog/components/PostFormModal";
import { CaseFormModal } from "@/features/cases/components/CaseFormModal";
import { createPost, getPostsSummary } from "@/features/blog/api/adminPosts";
import { createCase, getCasesSummary } from "@/features/cases/api/adminCases";
import type { BlogPost } from "@/features/blog/types";
import type {CaseStudy} from "@/features/cases/types"

export default function AdminHomePage() {
  const navigate = useNavigate();
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [casesSummary, setCasesSummary] = useState({ published: 0, draft: 0 });
  const [summary, setSummary] = useState({ published: 0, draft: 0 });

  
  useEffect(() => {
    loadSummary();
    loadCasesSummary();
  }, []);

  async function loadSummary() {
    const data = await getPostsSummary(); 
    setSummary(data);
  }
  
async function loadCasesSummary() {
  const data = await getCasesSummary();
  setCasesSummary(data);
  }

  async function handleSaveBlogPost(
    data: Omit<BlogPost, "id">,
    _status: "draft" | "published"
  ) {
    await createPost(data);
    await loadSummary(); // atualiza os números na hora
  }

  async function handleSaveCase(
  data: Omit<CaseStudy, "id">,
  _status: "draft" | "published"
) {
  await createCase(data);
  await loadCasesSummary();
}

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-d3-navy via-d3-purple to-d3-purple-dark px-4 py-16">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
        <p className="text-sm text-white/80 mb-8">
          Gerencie o conteúdo da plataforma
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card Blog */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-1">
              <Pencil className="w-5 h-5 text-d3-purple" />
              <h2 className="font-semibold text-lg">Blog</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Publicações e rascunhos
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {summary.published} publicações · {summary.draft} rascunhos
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBlogModalOpen(true)}
                className="bg-d3-purple text-white text-sm rounded-md px-4 py-2"
              >
                Novo Post
              </button>
              <button
                onClick={() => navigate("/admin/blog")}
                className="bg-slate-600 text-white text-sm rounded-md px-4 py-2"
              >
                Ver Publicações
              </button>
            </div>
          </div>

          {/* Card Cases — contagens ainda fixas até a feature existir */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 text-d3-purple" />
              <h2 className="font-semibold text-lg">Cases de Sucesso</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Projetos e resultados
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {casesSummary.published} publicações · {casesSummary.draft} rascunhos
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCaseModalOpen(true)}
                className="bg-d3-purple text-white text-sm rounded-md px-4 py-2"
            >
              Novo Post
            </button>
              <button
                onClick={() => navigate("/admin/cases")}
                className="bg-slate-600 text-white text-sm rounded-md px-4 py-2"
              >
                Ver Publicações
              </button>
            </div>
          </div>
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