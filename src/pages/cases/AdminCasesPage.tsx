import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminCaseRow } from "@/pages/cases/components/AdminCaseRow";
import { CaseFormModal } from "@/pages/cases/components/CaseFormModal";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { getPublishedCases } from "@/services/cases.service";
import type { CaseBackend } from "@/services/cases.service";

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseBackend[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseBackend | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE_SIZE = 5;

  useEffect(() => {
    loadCases(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      openNewCase();
      setSearchParams({}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function loadCases(p: number, term: string) {
    const all = await getPublishedCases();
    const filtered = term
      ? all.filter((c) => c.nomeProjeto.toLowerCase().includes(term.toLowerCase()) || c.cliente.toLowerCase().includes(term.toLowerCase()))
      : all;
    const total = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated = filtered.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE);
    setCases(paginated);
    setTotalPages(total || 1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function openNewCase() {
    setEditingCase(null);
    setModalOpen(true);
  }

  function openEditCase(item: CaseBackend) {
    setEditingCase(item);
    setModalOpen(true);
  }

  async function handleSave(
    _data: unknown,
    _status: "draft" | "published"
  ) {
    // TODO: implementar CRUD de cases no backend
    await loadCases(page, search);
  }

  async function handleDelete(_id: number) {
    // TODO: implementar CRUD de cases no backend
    await loadCases(page, search);
  }

  return (
    <div className="px-10 py-12 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-d3-navy">Cases de sucesso</h1>
        <button
          onClick={openNewCase}
          className="bg-white text-d3-purple border border-d3-purple hover:bg-d3-purple/5 transition-colors text-sm font-medium rounded-lg px-4 py-2.5"
        >
          + Novo case
        </button>
      </div>

      <div className="mb-5">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por título ou cliente..."
        />
      </div>

      <div className="space-y-2.5">
        {cases.length === 0 ? (
          <p className="text-sm text-muted-foreground py-10 text-center">
            Nenhum case encontrado.
          </p>
        ) : (
          cases.map((item) => (
            <AdminCaseRow
              key={item.id}
              caseItem={item}
              onEdit={openEditCase}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <CaseFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingCase}
      />
    </div>
  );
}
