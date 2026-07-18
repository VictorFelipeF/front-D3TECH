// src/features/cases/components/CaseFormModal.tsx
import { useState, useEffect } from "react";
import { Modal } from "@/shared/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/shared/components/TextEditor";
import type { CaseStudy } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<CaseStudy, "id">, status: "draft" | "published") => void;
  initialData?: CaseStudy | null;
}

const emptyForm = {
  title: "",
  client: "",
  tag: "",
  excerpt: "",
  content: "",
  publishedAt: new Date().toISOString(),
  slug: "",
  status: "draft" as const,
};

export function CaseFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(status: "draft" | "published") {
    const slug = form.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    onSave({ ...form, slug, status }, status);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar case" : "Novo case"}>
      <div className="space-y-3">
        <div className="border-2 border-dashed rounded-md h-32 flex items-center justify-center text-sm text-muted-foreground">
          Upload da imagem de capa
        </div>

        <div>
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="client">Cliente</Label>
          <Input id="client" value={form.client} onChange={(e) => handleChange("client", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="tag">Tag</Label>
          <Input id="tag" value={form.tag} onChange={(e) => handleChange("tag", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="excerpt">Resumo</Label>
          <Input id="excerpt" value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} />
        </div>

        <div>
          <Label>Conteúdo</Label>
          <TextEditor
            value={form.content}
            onChange={(html) => handleChange("content", html)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={() => handleSubmit("draft")}>
            Salvar Rascunho
          </Button>
          <Button onClick={() => handleSubmit("published")}>Publicar</Button>
        </div>
      </div>
    </Modal>
  );
}