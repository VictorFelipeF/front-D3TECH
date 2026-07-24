import { http } from "./api";

export type PostBackend = {
  id: number;
  titulo: string;
  slug: string;
  autor: string;
  imagemCapa: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  status: "RASCUNHO" | "PUBLICADO";
  dataPublicacao: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PostPayload = {
  titulo: string;
  autor: string;
  imagemCapa?: string;
  resumo: string;
  conteudo: string;
  categoria?: string;
};

const asPayload = (p: PostPayload) => ({
  titulo: p.titulo,
  autor: p.autor,
  imagemCapa: p.imagemCapa ?? "",
  resumo: p.resumo,
  conteudo: p.conteudo,
  categoria: p.categoria ?? "",
});

/* Public */
export async function getPublishedPosts() {
  const res = await http.get<PostBackend[]>("/posts");
  return res.data;
}

export async function getPostBySlug(slug: string) {
  const res = await http.get<PostBackend>(`/posts/${slug}`);
  return res.data;
}

/* Admin */
export async function createPost(data: PostPayload) {
  const res = await http.post<PostBackend>("/admin/posts", asPayload(data));
  return res.data;
}

export async function updatePost(id: number, data: PostPayload) {
  const res = await http.put<PostBackend>(`/admin/posts/${id}`, asPayload(data));
  return res.data;
}

export async function publishPost(id: number) {
  const res = await http.patch<PostBackend>(`/admin/posts/${id}/publish`);
  return res.data;
}

export async function unpublishPost(id: number) {
  const res = await http.patch<PostBackend>(`/admin/posts/${id}/unpublish`);
  return res.data;
}

export async function deletePost(id: number) {
  await http.delete(`/admin/posts/${id}`);
}
