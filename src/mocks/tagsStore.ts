import { getStore as getBlogStore, setStore as setBlogStore } from "./blogStore";
import { getCasesStore, setCasesStore } from "./casesStore";

const initialBlogTags = [
  "Tecnologia",
  "Institucional",
  "Negócios",
  "Tutorial",
  "Novidades",
  "Bastidores",
];

const initialCaseTags = [
  "Sistema Web",
  "Mobile",
  "Automação",
  "Consultoria",
  "MVP",
  "API",
  "Landing Page",
];

// substituir por chamadas reais à API quando o backend for linkado
let blogTags: string[] = [...initialBlogTags];
let caseTags: string[] = [...initialCaseTags];

export function getBlogTags(): string[] {
  return blogTags;
}

export function addBlogTag(tag: string): void {
  if (!blogTags.includes(tag)) {
    blogTags = [...blogTags, tag];
  }
}

export function renameBlogTag(oldName: string, newName: string): void {
  blogTags = blogTags.map((t) => (t === oldName ? newName : t));
  const updatedPosts = getBlogStore().map((p) =>
    p.tag === oldName ? { ...p, tag: newName } : p
  );
  setBlogStore(updatedPosts);
}

export function deleteBlogTag(name: string): void {
  blogTags = blogTags.filter((t) => t !== name);
  const updatedPosts = getBlogStore().map((p) =>
    p.tag === name ? { ...p, tag: "" } : p
  );
  setBlogStore(updatedPosts);
}

export function getCaseTags(): string[] {
  return caseTags;
}

export function addCaseTag(tag: string): void {
  if (!caseTags.includes(tag)) {
    caseTags = [...caseTags, tag];
  }
}

export function renameCaseTag(oldName: string, newName: string): void {
  caseTags = caseTags.map((t) => (t === oldName ? newName : t));
  const updatedCases = getCasesStore().map((c) =>
    c.tag === oldName ? { ...c, tag: newName } : c
  );
  setCasesStore(updatedCases);
}

export function deleteCaseTag(name: string): void {
  caseTags = caseTags.filter((t) => t !== name);
  const updatedCases = getCasesStore().map((c) =>
    c.tag === name ? { ...c, tag: "" } : c
  );
  setCasesStore(updatedCases);
}