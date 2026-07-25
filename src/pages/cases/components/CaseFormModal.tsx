import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextEditor } from "@/components/shared/TextEditor";
import { ImageIcon, Package, FileText, MessageSquareQuote, Eye, Save, Upload, X, Tag } from "lucide-react";
import { uploadImage } from "@/services/images.service";
import { fileUrl } from "@/services/api";
import { http } from "@/services/api";
import { TagSelector } from "@/components/shared/TagSelector";
import type { CasePayload } from "@/services/cases.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CasePayload) => void;
  initialData?: CasePayload | null;
}

const emptyForm: CasePayload = {
  nomeProjeto: "",
  cliente: "",
  imagemCapa: "",
  descricao: "",
  depoimento: "",
  exibirAoPublico: false,
  tagIds: [],
};

export function CaseFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<CasePayload>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<{ id: number; nome: string }[]>([]);

  function loadTags() {
    http.get<{ id: number; nome: string }[]>("/admin/tags").then(res => setTags(res.data)).catch(() => {});
  }

  useEffect(() => {
    if (isOpen) {
      loadTags();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }
    const c = initialData as CasePayload & { tags?: { id: number; nome: string }[]; imagemCapa?: string };
    setForm({
      nomeProjeto: c.nomeProjeto ?? "",
      cliente: c.cliente ?? "",
      imagemCapa: c.imagemCapa ?? "",
      descricao: c.descricao ?? "",
      depoimento: c.depoimento ?? "",
      exibirAoPublico: c.exibirAoPublico ?? false,
      tagIds: c.tags?.map((t) => t.id) ?? c.tagIds ?? [],
    });
  }, [initialData, isOpen]);

  function handleChange(field: keyof CasePayload, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      handleChange("imagemCapa", url);
    } catch { /* */ }
    setUploading(false);
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar case" : "Novo case"} width="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Capa */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-d3-purple" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Imagem de capa</span>
            </div>
            {form.imagemCapa && (
              <button type="button" onClick={() => handleChange("imagemCapa", "")} className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <X className="w-3 h-3" /> Remover
              </button>
            )}
          </div>
          <input type="file" accept="image/*" hidden id="case-cover-upload" onChange={handleUpload} />
          <label
            htmlFor="case-cover-upload"
            className="relative border-2 border-dashed border-gray-200 hover:border-d3-purple/40 rounded-none h-44 flex flex-col items-center justify-center gap-3 text-sm text-gray-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-d3-purple/[0.03] block overflow-hidden"
          >
            {form.imagemCapa ? (
              <>
                <img src={fileUrl(form.imagemCapa)} alt="Capa" className="absolute inset-0 w-full h-full object-cover rounded-none" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 hover:opacity-100 transition-opacity text-sm font-medium flex items-center gap-1.5">
                    <Upload className="w-4 h-4" /> Trocar
                  </span>
                </div>
              </>
            ) : uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-d3-purple border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-d3-purple">Enviando...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-none bg-d3-purple/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-d3-purple" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Clique para fazer upload</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG ou WebP</p>
                </div>
              </>
            )}
          </label>
        </div>

        {/* Nome do Projeto */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="nomeProjeto" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome do projeto</Label>
          </div>
          <Input id="nomeProjeto" value={form.nomeProjeto} onChange={(e) => handleChange("nomeProjeto", e.target.value)} className="h-11" placeholder="Nome do case" />
        </div>

        {/* Cliente */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="cliente" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cliente</Label>
          </div>
          <Input id="cliente" value={form.cliente ?? ""} onChange={(e) => handleChange("cliente", e.target.value)} className="h-11" placeholder="Nome do cliente ou instituicao" />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tags</span>
          </div>
          <TagSelector
            tags={tags}
            selectedIds={form.tagIds ?? []}
            onChange={(ids) => handleChange("tagIds", ids)}
            onTagCreated={loadTags}
          />
        </div>

        {/* Descricao */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Descricao</span>
          </div>
          <TextEditor value={form.descricao} onChange={(html) => handleChange("descricao", html)} />
        </div>

        {/* Depoimento */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquareQuote className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Depoimento (opcional)</span>
          </div>
          <TextEditor value={form.depoimento ?? ""} onChange={(html) => handleChange("depoimento", html)} />
        </div>

        {/* Exibir ao publico */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 border border-gray-200 rounded-none px-4 h-11 bg-gray-50/50">
            <Checkbox id="casePublico" checked={form.exibirAoPublico} onCheckedChange={(c) => handleChange("exibirAoPublico", !!c)} />
            <Label htmlFor="casePublico" className="text-sm cursor-pointer text-d3-navy">
              <Eye className="w-4 h-4 inline mr-1.5 text-d3-purple" />
              Exibir ao publico
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={handleSubmit} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none">
          <Save className="w-4 h-4" /> Salvar
        </Button>
      </div>
    </Modal>
  );
}
