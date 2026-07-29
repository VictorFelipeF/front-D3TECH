import { useState, useEffect, useCallback } from "react";
import { AdminPostRow } from "@/pages/blog/components/AdminPostRow";
import { PostFormModal } from "@/pages/blog/components/PostFormModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllPosts, createPost, updatePost, deletePost, type PostPayload } from "@/services/posts.service";
import type { PostBackend } from "@/services/posts.service";
import { http } from "@/services/api";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { toast } from "sonner";

type CategoriaType = { id: number; nome: string; slug: string };

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostBackend[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostBackend | null>(null);
  const [loading, setLoading] = useState(false);

  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [editandoCat, setEditandoCat] = useState<number | null>(null);
  const [editNomeCat, setEditNomeCat] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PostBackend | null>(null);

  const carregarPosts = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAllPosts(p, 10);
      setPosts(data.content);
      setTotalPages(data.totalPages || 1);
    } catch { /* offline */ }
    setLoading(false);
  }, []);

  const carregarCategorias = useCallback(async () => {
    try {
      const res = await http.get<CategoriaType[]>("/categorias");
      setCategorias(res.data);
    } catch { /* offline */ }
  }, []);

  useEffect(() => {
    carregarPosts(page);
    carregarCategorias();
  }, [page, carregarPosts, carregarCategorias]);

  async function handleSave(data: PostPayload) {
    try {
      if (editingPost) {
        await updatePost(editingPost.id, data);
        toast.success("Post atualizado com sucesso!");
      } else {
        await createPost(data);
        toast.success("Post criado com sucesso!");
      }
    } catch {
      toast.error("Erro ao salvar post.");
    }
    setModalOpen(false);
    setEditingPost(null);
    await carregarPosts(page);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deletePost(deleteTarget.id);
    toast.success("Post excluido com sucesso!");
    setDeleteTarget(null);
    await carregarPosts(page);
  }

  async function criarCategoria() {
    if (!novaCategoria.trim()) return;
    await http.post("/admin/categorias", { nome: novaCategoria.trim() });
    setNovaCategoria("");
    await carregarCategorias();
  }

  async function salvarEdicaoCategoria(id: number) {
    if (!editNomeCat.trim()) return;
    await http.put(`/admin/categorias/${id}`, { nome: editNomeCat.trim() });
    setEditandoCat(null);
    await carregarCategorias();
  }

  async function excluirCategoria(id: number) {
    await http.delete(`/admin/categorias/${id}`);
    await carregarCategorias();
  }

  function openNewPost() {
    setEditingPost(null);
    setModalOpen(true);
  }

  function openEditPost(post: PostBackend) {
    setEditingPost(post);
    setModalOpen(true);
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy dark:text-white">Publicações</h1>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-1">Gerencie os posts do blog</p>
        </div>
        <button
          onClick={openNewPost}
          className="bg-d3-purple hover:bg-d3-purple-dark text-white transition-colors text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20 hover:shadow-lg hover:shadow-d3-purple/30"
        >
          + Novo post
        </button>
      </div>

      {/* Lista de Posts */}
      <div className="space-y-2 min-h-[200px]">
        {loading ? (
          <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">Nenhum post encontrado.</p>
        ) : (
          posts.map((post) => (
            <AdminPostRow
              key={post.id}
              post={post}
              onEdit={openEditPost}
              onDelete={setDeleteTarget}
            />
          ))
        )}
      </div>

      {/* Paginacao */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium transition-colors ${
                page === i
                  ? "bg-d3-purple text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Categorias */}
      <div className="mt-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-none p-5">
        <h2 className="text-sm font-semibold text-d3-navy uppercase tracking-wider mb-4">Categorias</h2>

        <div className="flex items-center gap-2 mb-4">
          <Input
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && criarCategoria()}
            placeholder="Nova categoria..."
            className="h-9 text-sm"
          />
          <Button
            onClick={criarCategoria}
            className="bg-d3-purple hover:bg-d3-purple-dark text-white h-9 rounded-none"
            size="sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categorias.length === 0 && (
            <p className="text-sm text-gray-400">Nenhuma categoria cadastrada.</p>
          )}
          {categorias.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-none px-3 py-1.5 text-sm">
              {editandoCat === cat.id ? (
                <>
                  <Input
                    value={editNomeCat}
                    onChange={(e) => setEditNomeCat(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && salvarEdicaoCategoria(cat.id)}
                    className="h-7 w-28 text-xs"
                    autoFocus
                  />
                  <button onClick={() => salvarEdicaoCategoria(cat.id)} className="text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setEditandoCat(null)} className="text-gray-400">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="text-d3-navy">{cat.nome}</span>
                  <button
                    onClick={() => { setEditandoCat(cat.id); setEditNomeCat(cat.nome); }}
                    className="text-gray-400 hover:text-d3-purple transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => excluirCategoria(cat.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <PostFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingPost(null); }}
        onSave={handleSave}
        initialData={editingPost}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Excluir post"
        message={`Tem certeza que deseja excluir "${deleteTarget?.titulo}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  );
}
