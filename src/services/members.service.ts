import { http } from "./api";

export type MemberBackend = {
  id: number;
  usuario: { id: number; nome: string; email: string; emailVerified: boolean; createdAt: string };
  cargo: string;
  instagram: string;
  github: string;
  linkedin: string;
  fotoPerfil: string;
  exibirAoPublico: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MemberPayload = {
  nome: string;
  email: string;
  password: string;
  role: string;
  cargo?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
  fotoPerfil?: string;
  exibirAoPublico?: boolean;
};

export async function getAllMembers() {
  return (await http.get<MemberBackend[]>("/admin/members")).data;
}

export async function createMember(data: MemberPayload) {
  return (await http.post<MemberBackend>("/admin/members", data)).data;
}

export async function updateMember(id: number, data: Partial<MemberPayload>) {
  return (await http.put<MemberBackend>(`/admin/members/${id}`, data)).data;
}

export async function deleteMember(id: number) {
  await http.delete(`/admin/members/${id}`);
}
