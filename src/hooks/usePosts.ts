import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPublishedPosts,
  getPostBySlug,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  type PostPayload,
} from "@/services/posts.service";

export function usePublishedPosts(page = 0, size = 9) {
  return useQuery({
    queryKey: ["posts", "published", page],
    queryFn: () => getPublishedPosts(page, size),
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useAllPosts(page = 0, size = 10) {
  return useQuery({
    queryKey: ["posts", "all", page],
    queryFn: () => getAllPosts(page, size),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PostPayload) => createPost(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpdatePost(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PostPayload) => updatePost(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}
