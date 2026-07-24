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

export async function getServices() {
  const res = await http.get<ServiceBackend[]>("/services");
  return res.data;
}

export async function getServiceById(id: number) {
  const res = await http.get<ServiceBackend>(`/services/${id}`);
  return res.data;
}
