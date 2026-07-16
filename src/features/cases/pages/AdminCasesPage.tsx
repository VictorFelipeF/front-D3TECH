import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminCaseRow } from "../components/AdminCaseRow";
import { CaseFormModal } from "../components/CaseFormModal";
import { Pagination } from "@/shared/components/Pagination";
import { getAllCases, createCase, updateCase, deleteCase } from "../api/adminCases";
import type { CaseStudy } from "../types";

export default function AdminCasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<CaseStudy | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadCases(page);
  }, [page]);

  useEffect(() => {
    if (searchParams.get("new") === "true") {
      openNewCase();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams]);

  async function loadCases(p: number) {
    const { cases, totalPages } = await getAllCases(p);
    setCases(cases);
    setTotalPages(totalPages);
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
    await loadCases(page);
  }

  async function handleDelete(id: string) {
    await deleteCase(id);
    await loadCases(page);
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Cases de Sucesso</h1>
        <Button onClick={openNewCase}>+ Novo Case</Button>
      </div>

      <div className="space-y-2">
        {cases.map((item) => (
          <AdminCaseRow
            key={item.id}
            caseItem={item}
            onEdit={openEditCase}
            onDelete={handleDelete}
          />
        ))}
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