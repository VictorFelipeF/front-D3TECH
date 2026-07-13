import type { BlogPost } from "../types";
import mockPosts from "@/mocks/posts.json";

export async function getFeaturedPost(): Promise<BlogPost> {
  return mockPosts[0] as BlogPost;
}