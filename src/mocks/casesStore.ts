import type { CaseStudy } from "@/features/cases/types";

const initialCases: CaseStudy[] = [
  {
    id: "1",
    slug: "sistema-gestao-clinica-x",
    title: "Sistema de gestão para clínica X",
    client: "Clínica X",
    excerpt: "Sistema completo de agendamento e prontuário eletrônico.",
    content: "<p>Conteúdo completo do case aqui...</p>",
    tag: "Sistema Web",
    publishedAt: "2026-05-10",
    status: "published" as CaseStudy['status'],
  },
  {
    id: "2",
    slug: "app-delivery-local",
    title: "App de delivery local",
    client: "Delivery Local",
    excerpt: "Aplicativo mobile conectando restaurantes e clientes da região.",
    content: "<p>Conteúdo completo do case aqui...</p>",
    tag: "Mobile",
    publishedAt: "2026-04-28",
    status: "draft" as CaseStudy['status'],
  },
];

// remover quando o backend for linkado
let cases: CaseStudy[] = [...initialCases];

export function getCasesStore() {
  return cases;
}

export function setCasesStore(newCases: CaseStudy[]) {
  cases = newCases;
}