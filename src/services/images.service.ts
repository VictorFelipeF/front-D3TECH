import { http } from "./api";

export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await http.post<{ url: string }>("/admin/posts/upload-cover", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url;
}
