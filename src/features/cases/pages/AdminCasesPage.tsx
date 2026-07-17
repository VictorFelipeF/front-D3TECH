import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminCaseRow } from "../components/AdminCaseRow";
import { CaseFormModal } from "../components/CaseFormModal";
import { Pagination } from "@/shared/components/Pagination";
import { SearchInput } from "@/shared/components/SearchInput";
import { getAllCases, createCase, updateCase, deleteCase } from "../api/adminCases";
import type { CaseStudy } from "../types";

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
  }, [page, search]);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      openNewCase();
      setSearchParams({}, { replace: true });
    }
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
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold">Cases de Sucesso</h1>
        <Button onClick={openNewCase}>+ Novo Case</Button>
      </div>

      <div className="mb-4">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por título ou cliente..."
        />
      </div>

      <div className="space-y-2">
        {cases.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
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