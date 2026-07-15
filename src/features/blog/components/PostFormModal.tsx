import { useState, useEffect } from "react";
import { Modal } from "@/shared/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { BlogPost } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<BlogPost, "id">, status: "draft" | "published") => void;
  initialData?: BlogPost | null;
}

const emptyForm = {
  title: "",
  tag: "",
  excerpt: "",
  content: "",
  author: "Equipe D3TECH",
  publishedAt: new Date().toISOString(),
  slug: "",
  status: "draft" as const,
  featured: false,
};

export function PostFormModal({ isOpen, onClose, onSave, initialData }: Props) {
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar post" : "Novo post"}>
      <div className="space-y-3">
        <div className="border-2 border-dashed rounded-md h-32 flex items-center justify-center text-sm text-muted-foreground">
          Upload da imagem da capa
        </div>

        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="tag">Tag</Label>
          <Input
            id="tag"
            value={form.tag}
            onChange={(e) => handleChange("tag", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="excerpt">Resumo</Label>
          <Input
            id="excerpt"
            value={form.excerpt}
            onChange={(e) => handleChange("excerpt", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            rows={6}
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="featured"
            checked={form.featured}
            onCheckedChange={(checked) =>
              setForm((prev) => ({ ...prev, featured: !!checked }))
            }
          />
          <Label htmlFor="featured">Definir como post em destaque</Label>
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