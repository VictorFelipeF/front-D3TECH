import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextEditor } from "@/components/shared/TextEditor";
import type { PostPayload } from "@/services/posts.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PostPayload) => void;
  initialData?: PostPayload | null;
}

const emptyForm: PostPayload = {
  titulo: "",
  autor: "Equipe D3TECH",
  imagemCapa: "",
  descricao: "",
  exibirAoPublico: false,
  categoriaId: null,
  tagIds: [],
};

export function PostFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PostPayload>(emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: keyof PostPayload, value: string | boolean | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar post" : "Novo post"}>
      <div className="space-y-4">
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
          <Label htmlFor="autor">Autor</Label>
          <Input
            id="autor"
            value={form.autor}
            onChange={(e) => handleChange("autor", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <TextEditor
            value={form.descricao}
            onChange={(html) => handleChange("descricao", html)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="exibirAoPublico"
            checked={form.exibirAoPublico}
            onCheckedChange={(checked) => handleChange("exibirAoPublico", !!checked)}
          />
          <Label htmlFor="exibirAoPublico" className="text-sm cursor-pointer">
            Exibir ao público
          </Label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </div>
      </div>
    </Modal>
  );
}
