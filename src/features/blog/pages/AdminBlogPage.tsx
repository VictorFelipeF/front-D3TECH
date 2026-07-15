// src/features/blog/pages/AdminBlogPage.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AdminPostRow } from "../components/AdminPostRow";
import { PostFormModal } from "../components/PostFormModal";
import { Pagination } from "@/shared/components/Pagination";
import { getAllPosts, createPost, updatePost, deletePost } from "../api/adminPosts";
import type { BlogPost } from "../types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function loadPosts(p: number) {
    const { posts, totalPages } = await getAllPosts(p);
    setPosts(posts);
    setTotalPages(totalPages);
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
    await loadPosts(page);
  }

  async function handleDelete(id: string) {
    await deletePost(id);
    await loadPosts(page);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Publicações</h1>
        <Button onClick={openNewPost}>+ Novo Post</Button>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <AdminPostRow
            key={post.id}
            post={post}
            onEdit={openEditPost}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <PostFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingPost}
      />
    </div>
  );
}