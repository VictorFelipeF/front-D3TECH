import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Shield, Check, X, Link2 } from "lucide-react";
import { getAllMembers, createMember, updateMember, deleteMember, type MemberPayload } from "@/services/members.service";
import type { MemberBackend } from "@/services/members.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { fileUrl } from "@/services/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { MemberFormModal } from "./components/MemberFormModal";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR");
}

export default function AdminMembersPage() {
  const { isAdmin } = useAuth();
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
        const payload: Record<string, unknown> = { nome: data.nome, email: data.email, role: data.role, cargo: data.cargo, instagram: data.instagram, github: data.github, linkedin: data.linkedin, fotoPerfil: data.fotoPerfil, exibirAoPublico: data.exibirAoPublico };
        if (data.password) payload.password = data.password;
        await updateMember(editing.id, payload as MemberPayload);
        toast.success("Membro atualizado!");
      } else {
        await createMember(data);
        toast.success("Membro criado!");
      }
      setModalOpen(false); setEditing(null);
      await load();
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Erro ao salvar. Verifique os dados.";
      toast.error(msg);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteMember(deleteTarget.id);
    toast.success("Excluido!"); setDeleteTarget(null); await load();
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy dark:text-white">Membros</h1>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-1">Gerencie os membros da equipe</p>
        </div>
        {isAdmin && (
          <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
            + Novo membro
          </button>
        )}
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>}
        {!loading && members.length === 0 && <p className="text-sm text-gray-400 py-10 text-center">Nenhum membro cadastrado.</p>}
        {members.map(m => (
            <div key={m.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-none hover:border-d3-purple/30 transition-all px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {m.fotoPerfil ? (
                  <img src={fileUrl(m.fotoPerfil)} alt="" className="w-12 h-12 object-cover rounded-none border" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center bg-d3-purple/10 text-d3-purple rounded-none">
                    <Shield className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-d3-navy dark:text-white">{m.usuario.nome}</span>
                    {m.cargo && <span className="text-xs bg-d3-purple/10 text-d3-purple px-2 py-0.5">{m.cargo}</span>}
                    {m.exibirAoPublico && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{m.usuario.email}</span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">{m.usuario.emailVerified ? <Check className="w-3 h-3 text-emerald-500 inline" /> : <X className="w-3 h-3 text-red-400 inline" />} {m.usuario.emailVerified ? "Verificado" : "Nao verificado"}</span>
                    <span className="text-xs text-gray-300 dark:text-gray-600">Criado {fmtDate(m.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {m.instagram && <a href={`https://instagram.com/${m.instagram}`} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-d3-purple flex items-center gap-0.5"><Link2 className="w-3 h-3" /> IG</a>}
                    {m.github && <a href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-d3-purple flex items-center gap-0.5"><Link2 className="w-3 h-3" /> GH</a>}
                    {m.linkedin && <a href={`https://linkedin.com/in/${m.linkedin}`} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:text-d3-purple flex items-center gap-0.5"><Link2 className="w-3 h-3" /> IN</a>}
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <button onClick={() => { setEditing(m); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => setDeleteTarget(m)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            </div>
          ))
        }
      </div>

      <MemberFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} initialData={editing} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir membro" message={"Excluir \"" + deleteTarget?.usuario.nome + "\"?"} />
    </div>
  );
}
