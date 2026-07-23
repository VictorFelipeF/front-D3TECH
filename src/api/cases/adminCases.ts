import type { CaseStudy } from "@/types/cases";
import { getCasesStore, setCasesStore } from "@/mocks/casesStore";

export async function getAllCases(
  page = 1,
  perPage = 5,
  search = ""
): Promise<{ cases: CaseStudy[]; total: number; totalPages: number }> {
  let all = getCasesStore();

  if (search.trim()) {
    const term = search.trim().toLowerCase();
    all = all.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.client.toLowerCase().includes(term)
    );
  }

  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    cases: all.slice(start, end),
    total: all.length,
    totalPages: Math.ceil(all.length / perPage),
  };
}

export async function getCasesSummary(): Promise<{
  published: number;
  draft: number;
}> {
  const all = getCasesStore();
  return {
    published: all.filter((c) => c.status === "published").length,
    draft: all.filter((c) => c.status === "draft").length,
  };
}

export async function createCase(data: Omit<CaseStudy, "id">): Promise<CaseStudy> {
  const newCase: CaseStudy = { ...data, id: crypto.randomUUID() };
  setCasesStore([newCase, ...getCasesStore()]);
  return newCase;
}

export async function updateCase(id: string, data: Partial<CaseStudy>): Promise<CaseStudy> {
  const updated = getCasesStore().map((c) => c.id === id ? { ...c, ...data } : c);
  setCasesStore(updated);
  return updated.find((c) => c.id === id)!;
}

export async function deleteCase(id: string): Promise<void> {
  setCasesStore(getCasesStore().filter((c) => c.id !== id));
}
