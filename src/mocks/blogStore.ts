import initialPosts from "./posts.json";
import type { BlogPost } from "@/features/blog/types";

// simula um banco de dados
// remover quando o backend for linkado
let posts: BlogPost[] = [...(initialPosts as BlogPost[])];

export function getStore() {
  return posts;
}

export function setStore(newPosts: BlogPost[]) {
  posts = newPosts;
}
