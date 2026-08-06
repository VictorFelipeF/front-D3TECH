import { useState, useEffect, useCallback } from "react";
import { Trash2, Check, X } from "lucide-react";
import { getAllUsers, deleteUser, type UserBackend } from "@/services/users.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("pt-BR");
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserBackend[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<UserBackend | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setUsers(await getAllUsers()); } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteUser(deleteTarget.id);
    toast.success("Excluido!"); setDeleteTarget(null); await load();
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-d3-navy dark:text-white">Usuarios</h1>
        <p className="text-base text-gray-400 dark:text-gray-500 mt-1">Lista de todos os usuarios cadastrados</p>
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>}
        {!loading && users.length === 0 && <p className="text-sm text-gray-400 py-10 text-center">Nenhum usuario encontrado.</p>}
        {users.map(u => (
          <div key={u.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-none px-5 py-4 flex items-center justify-between hover:border-d3-purple/30 transition-all">
            <div>
              <span className="text-base font-semibold text-d3-navy dark:text-white block">{u.nome}</span>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-400 dark:text-gray-500">{u.email}</span>
                <span className="text-xs text-gray-300">{u.emailVerified ? <Check className="w-3 h-3 text-emerald-500 inline" /> : <X className="w-3 h-3 text-red-400 inline" />} {u.emailVerified ? "Verificado" : "Nao verificado"}</span>
                <span className="text-xs text-gray-300">Criado {fmtDate(u.createdAt)}</span>
              </div>
            </div>
            <button onClick={() => setDeleteTarget(u)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir usuario" message={"Excluir \"" + deleteTarget?.nome + "\"?"} />
    </div>
  );
}
