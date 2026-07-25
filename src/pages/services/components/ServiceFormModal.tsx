import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TextEditor } from "@/components/shared/TextEditor";
import { Package, FileText, Lightbulb, Star, ImageIcon, Link, Save } from "lucide-react";
import { iconOptions, getIcon } from "@/utils/icons";
import type { ServicePayload } from "@/services/services.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ServicePayload) => void;
  initialData?: ServicePayload | null;
}

const emptyForm: ServicePayload = {
  nome: "",
  descricaoCurta: "",
  descricaoDetalhada: "",
  problemasQueResolve: "",
  beneficios: "",
  icone: "",
  ctaTexto: "Fale conosco",
  ctaLink: "/contato",
};

export function ServiceFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<ServicePayload>(emptyForm);

  useEffect(() => {
    setForm(initialData ?? emptyForm);
  }, [initialData, isOpen]);

  function handleChange(field: keyof ServicePayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar serviço" : "Novo serviço"} width="3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nome */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="nome" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome *</Label>
          </div>
          <Input id="nome" value={form.nome} onChange={(e) => handleChange("nome", e.target.value)} className="h-11" placeholder="Nome do serviço" />
        </div>

        {/* Ícone */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ícone</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5 max-h-40 overflow-y-auto border border-gray-200 rounded-none p-2">
            <button
              type="button"
              onClick={() => handleChange("icone", "")}
              className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-none text-xs transition-colors ${
                !form.icone ? "bg-d3-purple text-white" : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              Nenhum
            </button>
            {iconOptions.map((name) => {
              const IconComp = getIcon(name)!;
              const active = form.icone === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleChange("icone", name)}
                  className={`flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-none text-xs transition-colors ${
                    active ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-50 hover:text-d3-purple"
                  }`}
                  title={name}
                >
                  <IconComp className="w-5 h-5" />
                  <span className="truncate w-full text-center">{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Descrição curta */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="descricaoCurta" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Descrição curta *</Label>
          </div>
          <Textarea id="descricaoCurta" value={form.descricaoCurta} onChange={(e) => handleChange("descricaoCurta", e.target.value)} className="rounded-none border-gray-200" rows={2} placeholder="Resumo do serviço (ate 300 caracteres)" />
        </div>

        {/* Descrição detalhada */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Descrição detalhada *</span>
          </div>
          <TextEditor value={form.descricaoDetalhada} onChange={(html) => handleChange("descricaoDetalhada", html)} />
        </div>

        {/* Problemas que resolve */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Problemas que resolve</span>
          </div>
          <TextEditor value={form.problemasQueResolve ?? ""} onChange={(html) => handleChange("problemasQueResolve", html)} />
        </div>

        {/* Benefícios */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Benefícios</span>
          </div>
          <TextEditor value={form.beneficios ?? ""} onChange={(html) => handleChange("beneficios", html)} />
        </div>

        {/* CTA */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="ctaTexto" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Texto do botao</Label>
          </div>
          <Input id="ctaTexto" value={form.ctaTexto ?? ""} onChange={(e) => handleChange("ctaTexto", e.target.value)} className="h-11" placeholder="Fale conosco" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="ctaLink" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Link do botao</Label>
          </div>
          <Input id="ctaLink" value={form.ctaLink ?? ""} onChange={(e) => handleChange("ctaLink", e.target.value)} className="h-11" placeholder="/contato" />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={handleSubmit} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none"><Save className="w-4 h-4" /> Salvar</Button>
      </div>
    </Modal>
  );
}
