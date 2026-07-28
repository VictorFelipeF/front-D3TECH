import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPublishedCases,
  getAllCases,
  getFeaturedCases,
  createCase,
  updateCase,
  deleteCase,
  type CasePayload,
} from "@/services/cases.service";

export function usePublishedCases(page = 0, size = 9) {
  return useQuery({
    queryKey: ["cases", "published", page],
    queryFn: () => getPublishedCases(page, size),
  });
}

export function useFeaturedCases() {
  return useQuery({
    queryKey: ["cases", "featured"],
    queryFn: () => getFeaturedCases(),
  });
}

export function useAllCases(page = 0, size = 10) {
  return useQuery({
    queryKey: ["cases", "all", page],
    queryFn: () => getAllCases(page, size),
  });
}

export function useCreateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CasePayload) => createCase(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useUpdateCase(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CasePayload) => updateCase(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}

export function useDeleteCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCase(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cases"] }),
  });
}
