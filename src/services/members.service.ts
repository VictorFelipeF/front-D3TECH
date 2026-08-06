import { http } from "./api";

export type MemberBackend = {
  id: number;
  email: string;
  nome: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profilePictureUrl: string;
};

export type MemberPayload = {
  nome: string;
  email: string;
  password: string;
  role: string;
};

export async function getAllMembers() {
  const res = await http.get<MemberBackend[]>("/admin/members");
  return res.data;
}

export async function createMember(data: MemberPayload) {
  const res = await http.post<MemberBackend>("/admin/members", data);
  return res.data;
}

export async function updateMember(id: number, data: Partial<MemberPayload>) {
  const res = await http.put<MemberBackend>(`/admin/members/${id}`, data);
  return res.data;
}

export async function deleteMember(id: number) {
  await http.delete(`/admin/members/${id}`);
}
