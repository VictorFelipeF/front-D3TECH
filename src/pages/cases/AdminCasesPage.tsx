import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AdminCaseRow } from "@/components/cases/AdminCaseRow";
import { CaseFormModal } from "@/components/cases/CaseFormModal";
import { Pagination } from "@/components/shared/Pagination";
import { SearchInput } from "@/components/shared/SearchInput";
import { getAllCases, createCase, updateCase, deleteCase } from "@/api/cases/adminCases";
import type { CaseStudy } from "@/types/cases";

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    const { cases, totalPages } = await getAllCases(p, 5, term);
    setCases(cases);
    setTotalPages(totalPages);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function openNewCase() {
    setEditingCase(null);
    setModalOpen(true);
  }

  function openEditCase(item: CaseStudy) {
    setEditingCase(item);
    setModalOpen(true);
  }

  async function handleSave(
    data: Omit<CaseStudy, "id">,
    _status: "draft" | "published"
  ) {
    if (editingCase) {
      await updateCase(editingCase.id, data);
    } else {
      await createCase(data);
    }
    await loadCases(page, search);
  }

  async function handleDelete(id: string) {
    await deleteCase(id);
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
