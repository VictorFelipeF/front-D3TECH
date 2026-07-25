import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { getAllPartners, createPartner, updatePartner, deletePartner, type PartnerPayload } from "@/services/partners.service";
import type { PartnerBackend } from "@/services/partners.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { fileUrl } from "@/services/api";
import { toast } from "sonner";
import { PartnerFormModal } from "./components/PartnerFormModal";

const tipoLabels: Record<string, string> = {
  PARCEIRO: "Parceiro",
  CLIENTE: "Cliente",
  INSTITUICAO: "Instituição",
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerBackend[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PartnerBackend | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<PartnerBackend | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAllPartners(p, 10);
      setPartners(data.content);
      setTotalPages(data.totalPages || 1);
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  async function handleSave(data: PartnerPayload) {
    try {
      if (editing) { await updatePartner(editing.id, data); toast.success("Parceiro atualizado!"); }
      else { await createPartner(data); toast.success("Parceiro criado!"); }
    } catch { toast.error("Erro ao salvar."); }
    setModalOpen(false); setEditing(null);
    await load(page);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deletePartner(deleteTarget.id);
    toast.success("Excluído!");
    setDeleteTarget(null);
    await load(page);
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy">Parceiros e clientes</h1>
          <p className="text-base text-gray-400 mt-1">Gerencie os parceiros, clientes e instituicoes</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
          + Novo parceiro
        </button>
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>}
        {!loading && partners.length === 0 && <p className="text-sm text-gray-400 py-10 text-center">Nenhum parceiro cadastrado.</p>}
        {partners.map((p) => (
            <div key={p.id} className="bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 transition-all px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                {p.logo ? <img src={fileUrl(p.logo)} alt="" className="w-10 h-10 object-contain rounded-none border" /> : <div className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center text-xs text-gray-400">Logo</div>}
                <div>
                  <span className="text-base font-semibold text-d3-navy block">{p.nome}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs bg-d3-purple/10 text-d3-purple px-1.5 py-0.5 rounded-none">{tipoLabels[p.tipo] || p.tipo}</span>
                    {p.ativo ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-red-400" />}
                    <span className="text-xs text-gray-400">{p.autorizacaoExibicao ? "Exibição autorizada" : "Não autorizado"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => { setEditing(p); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(p)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        }
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium ${page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"}`}>{i + 1}</button>
          ))}
        </div>
      )}

      <PartnerFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} initialData={editing} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir parceiro" message={"Excluir \"" + deleteTarget?.nome + "\"?"} />
    </div>
  );
}
