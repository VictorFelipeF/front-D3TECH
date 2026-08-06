import { http } from "./api";

export type UserBackend = {
  id: number;
  nome: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getAllUsers() {
  return (await http.get<UserBackend[]>("/admin/users")).data;
}

export async function deleteUser(id: number) {
  await http.delete(`/admin/users/${id}`);
}
