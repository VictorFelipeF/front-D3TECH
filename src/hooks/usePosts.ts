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

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["posts", "published"],
    queryFn: getPublishedPosts,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: getAllPosts,
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
