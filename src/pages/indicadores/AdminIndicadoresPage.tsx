import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getAllIndicadores, createIndicador, updateIndicador, deleteIndicador, type IndicadorPayload } from "@/services/indicadores.service";
import type { IndicadorBackend } from "@/services/indicadores.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { toast } from "sonner";
import { IndicadorFormModal } from "./components/IndicadorFormModal";

export default function AdminIndicadoresPage() {
  const [data, setData] = useState<IndicadorBackend[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IndicadorBackend | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<IndicadorBackend | null>(null);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    try { const d = await getAllIndicadores(p); setData(d.content); setTotalPages(d.totalPages || 1); } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  async function handleSave(d: IndicadorPayload) {
    try {
      if (editing) { await updateIndicador(editing.id, d); toast.success("Atualizado!"); }
      else { await createIndicador(d); toast.success("Criado!"); }
    } catch { toast.error("Erro ao salvar."); }
    setModalOpen(false); setEditing(null); await load(page);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteIndicador(deleteTarget.id); toast.success("Excluído!"); setDeleteTarget(null); await load(page);
  }

  return (
    <div className="px-10 py-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-d3-navy">Indicadores</h1>
          <p className="text-base text-gray-400 mt-1">Métricas e números institucionais</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }} className="bg-d3-purple hover:bg-d3-purple-dark text-white text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20">
          + Novo indicador
        </button>
      </div>

      <div className="space-y-3">
        {loading && <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>}
        {!loading && data.length === 0 && <p className="text-sm text-gray-400 py-10 text-center">Nenhum indicador cadastrado.</p>}
        {data.map((i) => (
            <div key={i.id} className="group bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 hover:shadow-sm transition-all px-5 py-5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-16 h-16 bg-d3-purple/5 rounded-none shrink-0">
                  <span className="text-xl font-bold text-d3-purple">{i.valor}</span>
                </div>
                <div>
                  <span className="text-base font-semibold text-d3-navy block">{i.nome}</span>
                  {i.descricao && <p className="text-sm text-gray-400 mt-0.5">{i.descricao}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(i); setModalOpen(true); }} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => setDeleteTarget(i)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
      </div>

      {totalPages > 1 && (<div className="flex justify-center gap-2 mt-6">{Array.from({length:totalPages},(_,i)=><button key={i} onClick={()=>setPage(i)} className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium ${page===i?"bg-d3-purple text-white":"text-gray-500 hover:bg-gray-100"}`}>{i+1}</button>)}</div>)}

      <IndicadorFormModal isOpen={modalOpen} onClose={()=>{setModalOpen(false);setEditing(null);}} onSave={handleSave} initialData={editing} />
      <ConfirmModal isOpen={!!deleteTarget} onClose={()=>setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir" message={"Excluir \""+deleteTarget?.nome+"\"?"} />
    </div>
  );
}
