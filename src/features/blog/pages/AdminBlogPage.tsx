import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminPostRow } from "../components/AdminPostRow";
import { PostFormModal } from "../components/PostFormModal";
import { Pagination } from "@/shared/components/Pagination";
import { SearchInput } from "@/shared/components/SearchInput";
import { getAllPosts, createPost, updatePost, deletePost } from "../api/adminPosts";
import type { BlogPost } from "../types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
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
    const { posts, totalPages } = await getAllPosts(p, 5, term);
    setPosts(posts);
    setTotalPages(totalPages);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function openNewPost() {
    setEditingPost(null);
    setModalOpen(true);
  }

  function openEditPost(post: BlogPost) {
    setEditingPost(post);
    setModalOpen(true);
  }

  async function handleSave(
    data: Omit<BlogPost, "id">,
    _status: "draft" | "published"
  ) {
    if (editingPost) {
      await updatePost(editingPost.id, data);
    } else {
      await createPost(data);
    }
    await loadPosts(page, search);
  }

  async function handleDelete(id: string) {
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