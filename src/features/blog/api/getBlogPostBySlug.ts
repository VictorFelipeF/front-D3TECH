import type { BlogPost } from "../types";
import mockPosts from "@/mocks/posts.json";

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const post = mockPosts.find((p) => p.slug === slug);
  if (!post) throw new Error("Post não encontrado");
  return post as BlogPost;
}