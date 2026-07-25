import { http } from "./api";

export type ServiceBackend = {
  id: number;
  nome: string;
  descricaoCurta: string;
  descricaoDetalhada: string;
  problemasQueResolve: string;
  beneficios: string;
  icone: string;
  ctaTexto: string;
  ctaLink: string;
  createdAt: string;
};

export type ServicePayload = {
  nome: string;
  descricaoCurta: string;
  descricaoDetalhada: string;
  problemasQueResolve?: string;
  beneficios?: string;
  icone?: string;
  ctaTexto?: string;
  ctaLink?: string;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export async function getServices() {
  const res = await http.get<ServiceBackend[]>("/services");
  return res.data;
}

export async function getAllServices(page = 0, size = 10) {
  const res = await http.get<Page<ServiceBackend>>("/admin/services", { params: { page, size } });
  return res.data;
}

export async function createService(data: ServicePayload) {
  const res = await http.post<ServiceBackend>("/admin/services", data);
  return res.data;
}

export async function updateService(id: number, data: ServicePayload) {
  const res = await http.put<ServiceBackend>(`/admin/services/${id}`, data);
  return res.data;
}

export async function deleteService(id: number) {
  await http.delete(`/admin/services/${id}`);
}
