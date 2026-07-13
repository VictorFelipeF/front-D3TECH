import type { BlogPost } from "../types";
import mockPosts from "@/mocks/posts.json";

// trocar por chamadas reais quando o backend for linkado
let posts: BlogPost[] = [...(mockPosts as BlogPost[])];

export async function getAllPosts(
  page = 1,
  perPage = 5
): Promise<{ posts: BlogPost[]; total: number; totalPages: number }> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = posts.slice(start, end);
  return {
    posts: paginated,
    total: posts.length,
    totalPages: Math.ceil(posts.length / perPage),
  };
}

export async function createPost(data: Omit<BlogPost, "id">): Promise<BlogPost> {
  const newPost: BlogPost = { ...data, id: crypto.randomUUID() };
  posts = [newPost, ...posts];
  return newPost;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  posts = posts.map((p) => (p.id === id ? { ...p, ...data } : p));
  return posts.find((p) => p.id === id)!;
}

export async function deletePost(id: string): Promise<void> {
  posts = posts.filter((p) => p.id !== id);
}
