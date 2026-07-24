import { useState, useEffect, type ChangeEvent } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/components/shared/TextEditor";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, string>, status: "draft" | "published") => void;
  initialData?: Record<string, string> | null;
}

const emptyForm: Record<string, string> = {
  nomeProjeto: "",
  cliente: "",
  contextoProblema: "",
  solucaoDesenvolvida: "",
  resultadoObtido: "",
  imagemCapa: "",
};

export function CaseFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<Record<string, string>>(emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("imagemCapa", URL.createObjectURL(file));
    }
  }

  function handleSubmit(status: "draft" | "published") {
    onSave(form, status);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar case" : "Novo case"}>
      <div className="space-y-3">
        <div>
          <Label>Imagem de capa</Label>
          <div className="border-2 border-dashed rounded-md h-32 flex items-center justify-center overflow-hidden bg-muted/40 relative">
            {form.imagemCapa ? (
              <img src={form.imagemCapa} alt="Prévia da capa" className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm text-muted-foreground">Nenhuma imagem selecionada</span>
            )}
          </div>
          <label className="mt-2 inline-block text-sm text-d3-purple cursor-pointer">
            {form.imagemCapa ? "Trocar imagem" : "Selecionar imagem"}
            <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
          </label>
        </div>

        <div>
          <Label htmlFor="nomeProjeto">Nome do Projeto</Label>
          <Input id="nomeProjeto" value={form.nomeProjeto} onChange={(e) => handleChange("nomeProjeto", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input id="cliente" value={form.cliente} onChange={(e) => handleChange("cliente", e.target.value)} />
        </div>

        <div>
          <Label htmlFor="contextoProblema">Contexto / Problema</Label>
          <TextEditor value={form.contextoProblema} onChange={(html) => handleChange("contextoProblema", html)} />
        </div>

        <div>
          <Label htmlFor="solucaoDesenvolvida">Solução Desenvolvida</Label>
          <TextEditor value={form.solucaoDesenvolvida} onChange={(html) => handleChange("solucaoDesenvolvida", html)} />
        </div>

        <div>
          <Label htmlFor="resultadoObtido">Resultado Obtido</Label>
          <TextEditor value={form.resultadoObtido} onChange={(html) => handleChange("resultadoObtido", html)} />
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
