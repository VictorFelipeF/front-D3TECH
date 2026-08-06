import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, User, Mail, Lock, Shield } from "lucide-react";
import type { MemberPayload } from "@/services/members.service";

const ROLES = ["BASIC", "ADMIN"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberPayload) => void;
  initialData?: { nome?: string; email?: string } | null;
}

const empty: MemberPayload = { nome: "", email: "", password: "", role: "BASIC" };

export function MemberFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [f, setF] = useState<MemberPayload>(empty);

  useEffect(() => {
    setF(initialData ? { nome: initialData.nome ?? "", email: initialData.email ?? "", password: "", role: "BASIC" } : empty);
  }, [initialData, isOpen]);

  function h(field: keyof MemberPayload, v: string) { setF(p => ({ ...p, [field]: v })); }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar membro" : "Novo membro"} width="lg">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2"><User className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Nome *</Label></div>
          <Input value={f.nome} onChange={e => h("nome", e.target.value)} className="h-11 rounded-none" placeholder="Nome completo" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Mail className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">E-mail *</Label></div>
          <Input value={f.email} onChange={e => h("email", e.target.value)} className="h-11 rounded-none" placeholder="email@exemplo.com" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Lock className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{initialData ? "Nova senha (deixe vazio para manter)" : "Senha *"}</Label></div>
          <Input type="password" value={f.password} onChange={e => h("password", e.target.value)} className="h-11 rounded-none" placeholder="Senha" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Role</Label></div>
          <select value={f.role} onChange={e => h("role", e.target.value)} className="w-full h-11 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-none px-3 text-sm text-d3-navy dark:text-gray-200">
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100 dark:border-gray-800">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={() => { onSave(f); onClose(); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none"><Save className="w-4 h-4" /> Salvar</Button>
      </div>
    </Modal>
  );
}
