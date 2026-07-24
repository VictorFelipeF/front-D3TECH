import { useQuery } from "@tanstack/react-query";
import { getPublishedCases } from "@/services/cases.service";

export function usePublishedCases() {
  return useQuery({
    queryKey: ["cases", "published"],
    queryFn: getPublishedCases,
  });
}
