import { useState, useEffect, useCallback } from "react";
import { AdminCaseRow } from "@/pages/cases/components/AdminCaseRow";
import { Input } from "@/components/ui/input";
import { getAllCases, createCase, updateCase, deleteCase, type CasePayload } from "@/services/cases.service";
import type { CaseBackend } from "@/services/cases.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { CaseFormModal } from "@/pages/cases/components/CaseFormModal";

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseBackend[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseBackend | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<CaseBackend | null>(null);

  const carregarCases = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getAllCases(p, 10);
      setCases(data.content);
      setTotalPages(data.totalPages || 1);
    } catch { /* offline */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    carregarCases(page);
  }, [page, carregarCases]);

  async function handleSave(data: CasePayload) {
    if (editingCase) {
      await updateCase(editingCase.id, data);
    } else {
      await createCase(data);
    }
    setModalOpen(false);
    setEditingCase(null);
    await carregarCases(page);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteCase(deleteTarget.id);
    setDeleteTarget(null);
    await carregarCases(page);
  }

  function openNewCase() {
    setEditingCase(null);
    setModalOpen(true);
  }

  function openEditCase(item: CaseBackend) {
    setEditingCase(item);
    setModalOpen(true);
  }

  const filtered = cases.filter((c) =>
    !search || c.nomeProjeto.toLowerCase().includes(search.toLowerCase()) ||
    (c.cliente && c.cliente.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-d3-navy">Cases de sucesso</h1>
          <p className="text-sm text-gray-400 mt-0.5">Gerencie os projetos e resultados</p>
        </div>
        <button
          onClick={openNewCase}
          className="bg-d3-purple hover:bg-d3-purple-dark text-white transition-colors text-sm font-semibold rounded-none px-5 py-2.5 shadow-md shadow-d3-purple/20 hover:shadow-lg hover:shadow-d3-purple/30"
        >
          + Novo case
        </button>
      </div>

      <div className="mb-5">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou cliente..."
          className="h-10 rounded-none"
        />
      </div>

      <div className="space-y-2 min-h-[200px]">
        {loading ? (
          <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">Nenhum case encontrado.</p>
        ) : (
          filtered.map((item) => (
            <AdminCaseRow
              key={item.id}
              caseItem={item}
              onEdit={openEditCase}
              onDelete={setDeleteTarget}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium transition-colors ${
                page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <CaseFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCase(null); }}
        onSave={handleSave}
        initialData={editingCase}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Excluir case"
        message={`Tem certeza que deseja excluir "${deleteTarget?.nomeProjeto}"?`}
      />
    </div>
  );
}
