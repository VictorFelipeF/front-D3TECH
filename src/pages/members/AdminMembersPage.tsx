import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Shield, Check, X } from "lucide-react";
import { getAllMembers, createMember, updateMember, deleteMember, type MemberPayload } from "@/services/members.service";
import type { MemberBackend } from "@/services/members.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { toast } from "sonner";
import { MemberFormModal } from "./components/MemberFormModal";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR");
}

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberBackend[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<MemberBackend | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MemberBackend | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setMembers(await getAllMembers()); } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(data: MemberPayload) {
    try {
      if (editing) {
        await updateMember(editing.id, data.password ? data : { nome: data.nome, email: data.email, password: "", role: data.role });
        toast.success("Membro atualizado!");
      } else {
        await createMember(data);
        toast.success("Membro criado!");
      }
    } catch { toast.error("Erro ao salvar."); }
    setModalOpen(false); setEditing(null); await load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMember(deleteTarget.id);
    toast.success("Excluido!");
    setDeleteTarget(null); await load();
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy dark:text-white">Membros</h1>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-1">Gerencie os membros da equipe</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
          + Novo membro
        </button>
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>}
        {!loading && members.length === 0 && <p className="text-sm text-gray-400 py-10 text-center">Nenhum membro cadastrado.</p>}
        {members.map(m => (
            <div key={m.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-none hover:border-d3-purple/30 transition-all px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-d3-purple/10 text-d3-purple rounded-none">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-semibold text-d3-navy dark:text-white block">{m.nome}</span>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{m.email}</span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">{m.emailVerified ? <Check className="w-3 h-3 text-emerald-500 inline" /> : <X className="w-3 h-3 text-red-400 inline" />} {m.emailVerified ? "Verificado" : "Nao verificado"}</span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">Criado {fmtDate(m.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditing(m); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(m)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        }
      </div>

      <MemberFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} initialData={editing} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir membro" message={"Excluir \"" + deleteTarget?.nome + "\"?"} />
    </div>
  );
}
