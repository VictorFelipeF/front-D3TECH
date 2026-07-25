import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart3, Hash, FileText, Save } from "lucide-react";
import type { IndicadorPayload } from "@/services/indicadores.service";

interface Props { isOpen: boolean; onClose: () => void; onSave: (d: IndicadorPayload) => void; initialData?: IndicadorPayload | null; }

const empty: IndicadorPayload = { nome: "", valor: "", descricao: "" };

export function IndicadorFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [f, setF] = useState<IndicadorPayload>(empty);
  useEffect(() => { setF(initialData ?? empty); }, [initialData, isOpen]);
  function h(field: keyof IndicadorPayload, v: string) { setF(p => ({ ...p, [field]: v })); }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar indicador" : "Novo indicador"} width="lg">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-d3-purple" />
            <Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome *</Label>
          </div>
          <Input value={f.nome} onChange={e => h("nome", e.target.value)} className="h-11 rounded-none" placeholder="Ex: Projetos entregues" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-d3-purple" />
            <Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Valor *</Label>
          </div>
          <Input value={f.valor} onChange={e => h("valor", e.target.value)} className="h-11 rounded-none" placeholder="Ex: 150+" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Descrição</Label>
          </div>
          <Input value={f.descricao ?? ""} onChange={e => h("descricao", e.target.value)} className="h-11 rounded-none" placeholder="Detalhe opcional do indicador" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={() => { onSave(f); onClose(); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none"><Save className="w-4 h-4" /> Salvar</Button>
      </div>
    </Modal>
  );
}
