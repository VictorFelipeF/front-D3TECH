import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, User, Mail, Lock, Shield, Briefcase, Link2, Camera, Upload, X, AlertCircle, Eye } from "lucide-react";
import { uploadImage } from "@/services/images.service";
import { fileUrl } from "@/services/api";
import type { MemberPayload } from "@/services/members.service";

const ROLES = ["BASIC", "ADMIN"];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemberPayload) => void;
  initialData?: { usuario?: { nome?: string; email?: string }; cargo?: string; instagram?: string; github?: string; linkedin?: string; fotoPerfil?: string } | null;
}

const empty: MemberPayload = { nome: "", email: "", password: "", role: "BASIC", cargo: "", instagram: "", github: "", linkedin: "", fotoPerfil: "", exibirAoPublico: false };

export function MemberFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [f, setF] = useState<MemberPayload>(empty);
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setErrors({});
    if (!initialData) { setF(empty); return; }
    setF({
      nome: initialData.usuario?.nome ?? "",
      email: initialData.usuario?.email ?? "",
      password: "",
      role: "BASIC",
      cargo: initialData.cargo ?? "",
      instagram: initialData.instagram ?? "",
      github: initialData.github ?? "",
      linkedin: initialData.linkedin ?? "",
      fotoPerfil: initialData.fotoPerfil ?? "",
      exibirAoPublico: (initialData as any).exibirAoPublico ?? false,
    });
  }, [initialData, isOpen]);

  function h(field: keyof MemberPayload, v: string) {
    setF(p => ({ ...p, [field]: v }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!f.nome.trim()) e.nome = "Nome obrigatorio";
    if (!f.email.trim()) e.email = "Email obrigatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Email invalido";
    if (!initialData && !f.password) e.password = "Senha obrigatoria";
    else if (f.password && f.password.length < 6) e.password = "Minimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSave(f);
    onClose();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { h("fotoPerfil", await uploadImage(file)); } catch { /* */ }
    setUploading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar membro" : "Novo membro"} width="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Foto */}
        <div className="md:col-span-2 flex flex-col items-center">
          <div className="relative">
            <input type="file" accept="image/*" hidden id="member-foto" onChange={handleUpload} />
            <label htmlFor="member-foto" className="cursor-pointer block">
              {f.fotoPerfil ? (
                <div className="relative group">
                  <img src={fileUrl(f.fotoPerfil)} alt="Foto" className="w-24 h-24 object-cover rounded-none border" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </div>
              ) : (
                <div className="w-24 h-24 border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-300 dark:text-gray-600 hover:border-d3-purple/40 transition-colors">
                  {uploading ? <div className="w-5 h-5 border-2 border-d3-purple border-t-transparent rounded-full animate-spin" /> : <Camera className="w-8 h-8" />}
                </div>
              )}
            </label>
            {f.fotoPerfil && (
              <button type="button" onClick={() => h("fotoPerfil", "")} className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-0.5 text-gray-400 hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-2">Clique para upload da foto</span>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2"><User className="w-4 h-4 text-d3-purple" />          <Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome *</Label></div>
          <Input value={f.nome} onChange={e => h("nome", e.target.value)} className={`h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ${errors.nome ? "border-red-400" : ""}`} />
          {errors.nome && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nome}</p>}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Mail className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">E-mail *</Label></div>
          <Input value={f.email} onChange={e => h("email", e.target.value)} className={`h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ${errors.email ? "border-red-400" : ""}`} />
          {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Lock className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{initialData ? "Nova senha" : "Senha *"}</Label></div>
          <Input type="password" value={f.password} onChange={e => h("password", e.target.value)} className={`h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 ${errors.password ? "border-red-400" : ""}`} placeholder={initialData ? "Manter atual" : ""} />
          {errors.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</Label></div>
          <select value={f.role} onChange={e => h("role", e.target.value)} className="w-full h-11 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-none px-3 text-sm">
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Eye className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visibilidade</Label></div>
          <div className="flex items-center gap-2 h-11 px-3 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <Checkbox id="exibirAoPublico" checked={f.exibirAoPublico ?? false} onCheckedChange={(c) => setF(p => ({ ...p, exibirAoPublico: !!c }))} />
            <Label htmlFor="exibirAoPublico" className="text-sm cursor-pointer text-d3-navy dark:text-gray-200">Exibir ao público</Label>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Briefcase className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cargo</Label></div>
          <Input value={f.cargo ?? ""} onChange={e => h("cargo", e.target.value)} className="h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="Ex: Desenvolvedor Fullstack" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Link2 className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Instagram (@)</Label></div>
          <Input value={f.instagram ?? ""} onChange={e => h("instagram", e.target.value)} className="h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="@usuario" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Link2 className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">GitHub</Label></div>
          <Input value={f.github ?? ""} onChange={e => h("github", e.target.value)} className="h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="github.com/usuario" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2"><Link2 className="w-4 h-4 text-d3-purple" /><Label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">LinkedIn</Label></div>
          <Input value={f.linkedin ?? ""} onChange={e => h("linkedin", e.target.value)} className="h-11 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200" placeholder="linkedin.com/in/usuario" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100 dark:border-gray-800">
        <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">Cancelar</Button>
        <Button onClick={handleSubmit} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none"><Save className="w-4 h-4" /> Salvar</Button>
      </div>
    </Modal>
  );
}
