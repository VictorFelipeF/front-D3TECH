import { http } from "./api";

export type ContactMessage = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  endereco: string;
  assunto: string;
  mensagem: string;
  createdAt: string;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

export async function getContacts(page = 0, size = 10) {
  const res = await http.get<Page<ContactMessage>>("/admin/contacts", { params: { page, size } });
  return res.data;
}

export async function deleteContact(id: number) {
  await http.delete(`/admin/contacts/${id}`);
}
