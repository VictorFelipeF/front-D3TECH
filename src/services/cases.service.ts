import { http } from "./api";

export type CaseBackend = {
  id: number;
  nomeProjeto: string;
  cliente: string;
  categoriaServico: string;
  contextoProblema: string;
  solucaoDesenvolvida: string;
  tecnologiasUtilizadas: string;
  resultadoObtido: string;
  imagemCapa: string;
  depoimento: string;
  publicado: boolean;
  createdAt: string;
};

export async function getPublishedCases() {
  const res = await http.get<CaseBackend[]>("/cases");
  return res.data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
