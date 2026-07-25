import { http } from "./api";

export type ContactPayload = {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  endereco?: string;
  assunto: string;
  mensagem: string;
  website?: string;
};

export async function sendContactMessage(data: ContactPayload) {
  const res = await http.post("/contact/sendMail", data);
  return res.data;
}
