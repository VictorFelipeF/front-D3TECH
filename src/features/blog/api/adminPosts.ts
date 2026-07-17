import type { BlogPost } from "../types";
import { getStore, setStore } from "@/mocks/blogStore";

export async function getAllPosts(
  page = 1,
  perPage = 5,
  search = ""
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  let all = getStore();

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    all = all.filter((p) => p.title.toLowerCase().includes(term));
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    posts: all.slice(start, end),
    total: all.length,
    totalPages: Math.ceil(all.length / perPage),
  };
}

// se o novo/editado post for marcado como destaque, remove o destaque dos outros
function enforceSingleFeatured(posts: BlogPost[], featuredId: string): BlogPost[] {
  return posts.map((p) =>
    p.id === featuredId ? p : { ...p, featured: false }
  );
}

export async function createPost(data: Omit<BlogPost, "id">): Promise<BlogPost> {
  const newPost: BlogPost = { ...data, id: crypto.randomUUID() };
  let updated = [newPost, ...getStore()];
  if (newPost.featured) updated = enforceSingleFeatured(updated, newPost.id);
  setStore(updated);
  return newPost;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  let updated = getStore().map((p) => (p.id === id ? { ...p, ...data } : p));
  if (data.featured) updated = enforceSingleFeatured(updated, id);
  setStore(updated);
  return updated.find((p) => p.id === id)!;
}

export async function deletePost(id: string): Promise<void> {
  setStore(getStore().filter((p) => p.id !== id));
}

export async function getPostsSummary(): Promise<{
  published: number;
  draft: number;
}> {
  const all = getStore();
  return {
    published: all.filter((p) => p.status === "published").length,
    draft: all.filter((p) => p.status === "draft").length,
  };
}