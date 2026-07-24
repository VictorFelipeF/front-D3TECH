import { useState, useEffect, type ChangeEvent } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/components/shared/TextEditor";
import { ImageIcon, Building2, Package, FileText, Lightbulb, Trophy, Save } from "lucide-react";

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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar case" : "Novo case"} width="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Capa - full width */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Imagem de capa
            </span>
          </div>
          <div className="relative border-2 border-dashed border-gray-200 hover:border-d3-purple/40 rounded-none h-44 flex flex-col items-center justify-center gap-3 text-sm text-gray-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-d3-purple/[0.03]">
            {form.imagemCapa ? (
              <img src={form.imagemCapa} alt="Capa" className="absolute inset-0 w-full h-full object-cover rounded-none" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-none bg-d3-purple/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-d3-purple" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Clique para fazer upload</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG ou WebP</p>
                </div>
              </>
            )}
          </div>
          <label className="mt-2 inline-flex items-center gap-1.5 text-sm text-d3-purple hover:text-d3-purple-dark cursor-pointer font-medium transition-colors">
            {form.imagemCapa ? "Trocar imagem" : "Selecionar imagem"}
            <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
          </label>
        </div>

        {/* Nome do Projeto */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="nomeProjeto" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nome do Projeto
            </Label>
          </div>
          <Input id="nomeProjeto" value={form.nomeProjeto} onChange={(e) => handleChange("nomeProjeto", e.target.value)} className="h-11" />
        </div>

        {/* Cliente */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="cliente" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Cliente
            </Label>
          </div>
          <Input id="cliente" value={form.cliente} onChange={(e) => handleChange("cliente", e.target.value)} className="h-11" />
        </div>

        {/* Contexto */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Contexto / Problema
            </span>
          </div>
          <TextEditor value={form.contextoProblema} onChange={(html) => handleChange("contextoProblema", html)} />
        </div>

        {/* Solucao */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Solucao Desenvolvida
            </span>
          </div>
          <TextEditor value={form.solucaoDesenvolvida} onChange={(html) => handleChange("solucaoDesenvolvida", html)} />
        </div>

        {/* Resultado */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Resultado Obtido
            </span>
          </div>
          <TextEditor value={form.resultadoObtido} onChange={(html) => handleChange("resultadoObtido", html)} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <Button variant="secondary" onClick={() => handleSubmit("draft")} className="text-gray-500">
          Salvar Rascunho
        </Button>
        <Button onClick={() => handleSubmit("published")} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2">
          <Save className="w-4 h-4" />
          Publicar
        </Button>
      </div>
    </Modal>
  );
}
