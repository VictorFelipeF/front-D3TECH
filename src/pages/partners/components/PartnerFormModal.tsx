import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Link, Save, Upload, ImageIcon, X } from "lucide-react";
import { uploadImage } from "@/services/images.service";
import { fileUrl } from "@/services/api";
import type { PartnerPayload } from "@/services/partners.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PartnerPayload) => void;
  initialData?: PartnerPayload | null;
}

const emptyForm: PartnerPayload = {
  nome: "",
  logo: "",
  link: "",
  tipo: "CLIENTE",
  ativo: true,
  autorizacaoExibicao: false,
};

const tipos = [
  { value: "CLIENTE", label: "Cliente" },
  { value: "PARCEIRO", label: "Parceiro" },
  { value: "INSTITUICAO", label: "Instituição" },
];

export function PartnerFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PartnerPayload>(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: keyof PartnerPayload, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      handleChange("logo", url);
    } catch { /* */ }
    setUploading(false);
  }

  function handleSubmit() { onSave(form); onClose(); }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar parceiro" : "Novo parceiro"} width="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="nome" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome *</Label>
          </div>
          <Input id="nome" value={form.nome} onChange={(e) => handleChange("nome", e.target.value)} className="h-11" placeholder="Nome do parceiro" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-d3-purple" />
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Logo</span>
            </div>
            {form.logo && (
              <button type="button" onClick={() => handleChange("logo", "")} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" /> Remover
              </button>
            )}
          </div>
          <input type="file" accept="image/*" hidden id="partner-logo" onChange={handleUpload} />
          <label
            htmlFor="partner-logo"
            className="relative border-2 border-dashed border-gray-200 hover:border-d3-purple/40 rounded-none h-32 flex flex-col items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer bg-gray-50/50 hover:bg-d3-purple/[0.03] block overflow-hidden"
          >
            {form.logo ? (
              <>
                <img src={fileUrl(form.logo)} alt="Logo" className="absolute inset-0 w-full h-full object-contain p-2" />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 hover:opacity-100 text-xs font-medium flex items-center gap-1"><Upload className="w-3 h-3" /> Trocar</span>
                </div>
              </>
            ) : uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-d3-purple border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-d3-purple">Enviando...</span>
              </div>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span className="text-xs">Clique para upload da logo</span>
              </>
            )}
          </label>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="link" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Link externo</Label>
          </div>
          <Input id="link" value={form.link ?? ""} onChange={(e) => handleChange("link", e.target.value)} className="h-11" placeholder="https://..." />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="tipo" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Tipo</Label>
          </div>
          <select id="tipo" value={form.tipo} onChange={(e) => handleChange("tipo", e.target.value)} className="w-full h-11 border border-gray-200 rounded-none px-3 text-sm text-d3-navy bg-white focus:outline-none focus:ring-2 focus:ring-d3-purple/30">
            {tipos.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="ativo" checked={form.ativo} onCheckedChange={(c) => handleChange("ativo", !!c)} />
            <Label htmlFor="ativo" className="text-sm cursor-pointer">Ativo</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="autorizacao" checked={form.autorizacaoExibicao} onCheckedChange={(c) => handleChange("autorizacaoExibicao", !!c)} />
            <Label htmlFor="autorizacao" className="text-sm cursor-pointer">Autorização de exibição</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={handleSubmit} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none"><Save className="w-4 h-4" /> Salvar</Button>
      </div>
    </Modal>
  );
}
