import type { BlogPost } from "../types";
import mockPosts from "@/mocks/posts.json";

const gridPosts = mockPosts.slice(1);

export async function getBlogPosts(
  page = 1,
  perPage = 6
): Promise<{ posts: BlogPost[]; hasMore: boolean }> {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const posts = gridPosts.slice(start, end) as BlogPost[];
  const hasMore = end < gridPosts.length;

  return { posts, hasMore };
}