import type { BlogPost } from "@/types/blog";
import { getStore } from "@/mocks/blogStore";

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const published = getStore().filter((p) => p.status === "published");
  return published.find((p) => p.featured) ?? null;
}
