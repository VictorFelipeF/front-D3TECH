import { http } from "./api";

export type PartnerBackend = {
  id: number;
  nome: string;
  logo: string;
  link: string;
  tipo: string;
  ativo: boolean;
  autorizacaoExibicao: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PartnerPayload = {
  nome: string;
  logo?: string;
  link?: string;
  tipo: string;
  ativo: boolean;
  autorizacaoExibicao: boolean;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export async function getPartners() {
  const res = await http.get<PartnerBackend[]>("/partners");
  return res.data;
}

export async function getAllPartners(page = 0, size = 10) {
  const res = await http.get<Page<PartnerBackend>>("/admin/partners", { params: { page, size } });
  return res.data;
}

export async function createPartner(data: PartnerPayload) {
  const res = await http.post<PartnerBackend>("/admin/partners", data);
  return res.data;
}

export async function updatePartner(id: number, data: PartnerPayload) {
  const res = await http.put<PartnerBackend>(`/admin/partners/${id}`, data);
  return res.data;
}

export async function deletePartner(id: number) {
  await http.delete(`/admin/partners/${id}`);
}
