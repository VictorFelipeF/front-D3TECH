import type { BlogPost } from "../types";
import { getStore } from "@/mocks/blogStore";

export async function getBlogPosts(
  page = 1,
  perPage = 6
): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
  const published = getStore().filter((p) => p.status === "published");
  
  // exclui o post marcado como destaque, não importa a posição
  const gridPosts = published.filter((p) => !p.featured);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    posts: gridPosts.slice(start, end),
    hasMore: end < gridPosts.length,
  };
}