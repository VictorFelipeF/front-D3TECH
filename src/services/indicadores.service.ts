import { http } from "./api";

export type IndicadorBackend = { id: number; nome: string; valor: string; descricao: string; createdAt: string; updatedAt: string; };
export type IndicadorPayload = { nome: string; valor: string; descricao?: string; };
export type Page<T> = { content: T[]; totalPages: number; totalElements: number; number: number; size: number; };

export async function getIndicadores() { return (await http.get<IndicadorBackend[]>("/indicadores")).data; }
export async function getAllIndicadores(p = 0, s = 10) { return (await http.get<Page<IndicadorBackend>>("/admin/indicadores", { params: { page: p, size: s } })).data; }
export async function createIndicador(d: IndicadorPayload) { return (await http.post<IndicadorBackend>("/admin/indicadores", d)).data; }
export async function updateIndicador(id: number, d: IndicadorPayload) { return (await http.put<IndicadorBackend>(`/admin/indicadores/${id}`, d)).data; }
export async function deleteIndicador(id: number) { await http.delete(`/admin/indicadores/${id}`); }
