import type { BlogPost } from "@/types/blog";
import { getStore } from "@/mocks/blogStore";

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const post = getStore().find((p) => p.slug === slug && p.status === "published");
  if (!post) throw new Error("Post não encontrado");
  return post;
}
