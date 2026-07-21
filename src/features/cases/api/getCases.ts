import type { CaseStudy } from "../types";
import { getCasesStore } from "@/mocks/casesStore";

export async function getPublishedCases(): Promise<CaseStudy[]> {
  const published = getCasesStore().filter((c) => c.status === "published");
  return [...published].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
