import { http } from "./api";

export type CaseBackend = {
  id: number;
  nomeProjeto: string;
  cliente: string;
  descricao: string;
  imagemCapa: string;
  depoimento: string;
  tags: { id: number; nome: string }[];
  exibirAoPublico: boolean;
  featured?: boolean; // ainda não existe no backend. Quando existir, tirar o "?"
  createdAt: string;
  updatedAt: string;
};

export type CasePayload = {
  nomeProjeto: string;
  cliente?: string;
  descricao: string;
  imagemCapa?: string;
  depoimento?: string;
  tagIds?: number[];
  exibirAoPublico: boolean;
  featured?: boolean;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

const toPayload = (c: CasePayload) => ({
  nomeProjeto: c.nomeProjeto,
  cliente: c.cliente ?? "",
  descricao: c.descricao,
  imagemCapa: c.imagemCapa ?? "",
  depoimento: c.depoimento ?? "",
  tagIds: c.tagIds ?? [],
  exibirAoPublico: c.exibirAoPublico,
  featured: c.featured ?? false,
});

/* Public */
export async function getPublishedCases(page = 0, size = 9) {
  const res = await http.get<Page<CaseBackend>>("/cases", { params: { page, size } });
  return res.data;
}

export async function getFeaturedCases() {
  const res = await http.get<Page<CaseBackend>>("/cases", {
    params: { page: 0, size: 50 },
  });

  return res.data.content.filter((c) => c.featured);
}

/* Admin */
export async function getAllCases(page = 0, size = 10) {
  const res = await http.get<Page<CaseBackend>>("/admin/cases", { params: { page, size } });
  return res.data;
}

export async function createCase(data: CasePayload) {
  const res = await http.post<CaseBackend>("/admin/cases", toPayload(data));
  return res.data;
}

export async function updateCase(id: number, data: CasePayload) {
  const res = await http.put<CaseBackend>(`/admin/cases/${id}`, toPayload(data));
  return res.data;
}

export async function deleteCase(id: number) {
  await http.delete(`/admin/cases/${id}`);
}