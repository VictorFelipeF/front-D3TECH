import { useState, useEffect, type ChangeEvent } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/components/shared/TextEditor";
import { TagSelect } from "@/components/shared/TagSelect";
import { getCaseTags, addCaseTag, renameCaseTag, deleteCaseTag } from "@/mocks/tagsStore";
import type { CaseStudy } from "@/types/cases";

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
  coverUrl: "",
};

export function CaseFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<Omit<CaseStudy, "id">>(emptyForm);
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  useEffect(() => {
    setTagOptions(getCaseTags());
  }, [isOpen]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddNewTag(tag: string) {
    addCaseTag(tag);
    setTagOptions(getCaseTags());
  }

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: fazer upload real do arquivo pro backend/storage quando linkado
      handleChange("coverUrl", URL.createObjectURL(file));
    }
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
        <div>
          <Label>Imagem de capa</Label>
          <div className="border-2 border-dashed rounded-md h-32 flex items-center justify-center overflow-hidden bg-muted/40 relative">
            {form.coverUrl ? (
              <img
                src={form.coverUrl}
                alt="Prévia da capa"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-muted-foreground">
                Nenhuma imagem selecionada
              </span>
            )}
          </div>
          <label className="mt-2 inline-block text-sm text-d3-purple cursor-pointer">
            {form.coverUrl ? "Trocar imagem" : "Selecionar imagem"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleCoverChange}
            />
          </label>
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
          <TagSelect
            value={form.tag}
            onChange={(tag) => handleChange("tag", tag)}
            options={tagOptions}
            onAddNewTag={handleAddNewTag}
            onRenameTag={(oldName, newName) => {
              renameCaseTag(oldName, newName);
              setTagOptions(getCaseTags());
              if (form.tag === oldName) handleChange("tag", newName);
            }}
            onDeleteTag={(name) => {
              deleteCaseTag(name);
              setTagOptions(getCaseTags());
              if (form.tag === name) handleChange("tag", "");
            }}
          />
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
