import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/components/shared/TextEditor";
import type { PostPayload } from "@/services/posts.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PostPayload, status: "draft" | "published") => void;
  initialData?: PostPayload | null;
}

const emptyForm: PostPayload = {
  titulo: "",
  autor: "Equipe D3TECH",
  resumo: "",
  conteudo: "",
  categoria: "",
};

export function PostFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PostPayload>(emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: keyof PostPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(status: "draft" | "published") {
    onSave(form, status);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar post" : "Novo post"}>
      <div className="space-y-3">
        <div className="border-2 border-dashed rounded-md h-32 flex items-center justify-center text-sm text-muted-foreground">
          Upload da imagem da capa
        </div>

        <div>
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            value={form.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="categoria">Categoria</Label>
          <Input
            id="categoria"
            value={form.categoria ?? ""}
            onChange={(e) => handleChange("categoria", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="resumo">Resumo</Label>
          <Input
            id="resumo"
            value={form.resumo}
            onChange={(e) => handleChange("resumo", e.target.value)}
          />
        </div>

        <div>
          <Label>Conteúdo</Label>
          <TextEditor
            value={form.conteudo}
            onChange={(html) => handleChange("conteudo", html)}
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
