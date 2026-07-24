import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminPostRow } from "@/pages/blog/components/AdminPostRow";
import { PostFormModal } from "@/pages/blog/components/PostFormModal";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { getAllPosts, createPost, updatePost, deletePost } from "@/services/posts.service";
import type { PostBackend, PostPayload } from "@/services/posts.service";

const PAGE_SIZE = 5;

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<PostBackend[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostBackend | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadPosts(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      openNewPost();
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function loadPosts(p: number, term: string) {
    const all = await getAllPosts();
    const filtered = term ? all.filter((post) => post.titulo.toLowerCase().includes(term.toLowerCase())) : all;
    const total = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE);
    setPosts(paginated);
    setTotalPages(total || 1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function openNewPost() {
    setEditingPost(null);
    setModalOpen(true);
  }

  function openEditPost(post: PostBackend) {
    setEditingPost(post);
    setModalOpen(true);
  }

  async function handleSave(data: PostPayload) {
    if (editingPost) {
      await updatePost(editingPost.id, data);
    } else {
      await createPost(data);
    }
    await loadPosts(page, search);
  }

  async function handleDelete(id: number) {
    await deletePost(id);
    await loadPosts(page, search);
  }

  return (
    <div className="px-10 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-d3-navy">Publicações</h1>
        <button
          onClick={openNewPost}
          className="bg-white text-d3-purple border border-d3-purple hover:bg-d3-purple/5 transition-colors text-sm font-medium rounded-lg px-4 py-2.5"
        >
          + Novo post
        </button>
      </div>

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por título..."
        />
      </div>

      <div className="space-y-2.5">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            Nenhum post encontrado.
          </p>
        ) : (
          posts.map((post) => (
            <AdminPostRow
              key={post.id}
              post={post}
              onEdit={openEditPost}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <PostFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingPost}
      />
    </div>
  );
}
