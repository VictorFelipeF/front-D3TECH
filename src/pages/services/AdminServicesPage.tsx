import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllServices, createService, updateService, deleteService, type ServicePayload } from "@/services/services.service";
import type { ServiceBackend } from "@/services/services.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { getIcon } from "@/utils/icons";
import { toast } from "sonner";
import { ServiceFormModal } from "./components/ServiceFormModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceBackend[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceBackend | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ServiceBackend | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAllServices(p, 10);
      setServices(data.content);
      setTotalPages(data.totalPages || 1);
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  async function handleSave(data: ServicePayload) {
    try {
      if (editingService) {
        await updateService(editingService.id, data);
        toast.success("Serviço atualizado!");
      } else {
        await createService(data);
        toast.success("Serviço criado!");
      }
    } catch {
      toast.error("Erro ao salvar serviço.");
    }
    setModalOpen(false);
    setEditingService(null);
    await load(page);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteService(deleteTarget.id);
    toast.success("Serviço excluido!");
    setDeleteTarget(null);
    await load(page);
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy">Serviços</h1>
          <p className="text-base text-gray-400 mt-1">Gerencie os serviços da D3TEC</p>
        </div>
        <button onClick={() => { setEditingService(null); setModalOpen(true); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white transition-colors text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
          + Novo serviço
        </button>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {loading ? (
          <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>
        ) : services.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">Nenhum serviço cadastrado.</p>
        ) : (
          services.map((svc) => (
            <div key={svc.id} className="bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 transition-all px-5 py-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {svc.icone && getIcon(svc.icone) && (() => { const I = getIcon(svc.icone)!; return <I className="w-5 h-5 text-d3-purple shrink-0" />; })()}
                  <span className="text-base font-semibold text-d3-navy">{svc.nome}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">{svc.descricaoCurta}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button onClick={() => { setEditingService(svc); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => setDeleteTarget(svc)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium ${page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"}`}>{i + 1}</button>
          ))}
        </div>
      )}

      <ServiceFormModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditingService(null); }} onSave={handleSave} initialData={editingService} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir serviço" message={"Excluir \"" + deleteTarget?.nome + "\"?"} />
    </div>
  );
}
