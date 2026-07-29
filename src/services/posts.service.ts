import { http } from "./api";

export type PostBackend = {
  id: number;
  titulo: string;
  slug: string;
  autor: string;
  imagemCapa: string;
  descricao: string;
  categoria: { id: number; nome: string; slug: string } | null;
  tags: { id: number; nome: string }[];
  exibirAoPublico: boolean;
  dataPublicacao: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PostPayload = {
  titulo: string;
  autor: string;
  imagemCapa?: string;
  descricao: string;
  categoriaId?: number | null;
  tagIds?: number[];
  exibirAoPublico: boolean;
};

export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
};

const toPayload = (p: PostPayload) => ({
  titulo: p.titulo,
  autor: p.autor,
  imagemCapa: p.imagemCapa ?? "",
  descricao: p.descricao,
  categoriaId: p.categoriaId ?? null,
  tagIds: p.tagIds ?? [],
  exibirAoPublico: p.exibirAoPublico,
});

/* Public */
export async function getPublishedPosts(page = 0, size = 9, search?: string, categoriaId?: number, tagIds?: number[]) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("size", String(size));
  if (search) searchParams.set("search", search);
  if (categoriaId) searchParams.set("categoriaId", String(categoriaId));
  if (tagIds?.length) tagIds.forEach(id => searchParams.append("tagIds", String(id)));
  const res = await http.get<Page<PostBackend>>(`/posts?${searchParams.toString()}`);
  return res.data;
}

export async function getPostBySlug(slug: string) {
  const res = await http.get<PostBackend>(`/posts/${slug}`);
  return res.data;
}

/* Admin */
export async function getAllPosts(page = 0, size = 10) {
  const res = await http.get<Page<PostBackend>>("/admin/posts", { params: { page, size } });
  return res.data;
}

export async function createPost(data: PostPayload) {
  const res = await http.post<PostBackend>("/admin/posts", toPayload(data));
  return res.data;
}

export async function updatePost(id: number, data: PostPayload) {
  const res = await http.put<PostBackend>(`/admin/posts/${id}`, toPayload(data));
  return res.data;
}

export async function deletePost(id: number) {
  await http.delete(`/admin/posts/${id}`);
}
