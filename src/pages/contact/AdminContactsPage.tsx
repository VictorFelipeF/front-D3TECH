import { useState, useEffect, useCallback } from "react";
import { getContacts, deleteContact, type ContactMessage } from "@/services/contacts.service";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { Mail, Phone, Building2, MapPin, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

function fmtDate(d: string) {
  return new Date(d).toLocaleString("pt-BR");
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const carregar = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const data = await getContacts(p, 10);
      setContacts(data.content);
      setTotalPages(data.totalPages || 1);
    } catch { /* */ }
    setLoading(false);
  }, []);

  useEffect(() => { carregar(page); }, [page, carregar]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    await deleteContact(deleteTarget.id);
    toast.success("Mensagem excluida com sucesso!");
    setDeleteTarget(null);
    await carregar(page);
  }

  return (
    <div className="px-10 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-d3-navy">Mensagens de contato</h1>
        <p className="text-base text-gray-400 mt-1">Mensagens recebidas pelo formulario do site</p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-gray-400 py-10 text-center">Carregando...</p>
        ) : contacts.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">Nenhuma mensagem recebida.</p>
        ) : (
          contacts.map((msg) => (
            <div key={msg.id} className="bg-white border border-gray-100 rounded-none hover:border-d3-purple/30 transition-all">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-d3-navy">{msg.nome}</span>
                    <span className="text-sm text-gray-400">{msg.email}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-none">{msg.assunto}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</span>
                    {msg.telefone && <span className="text-[11px] text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.telefone}</span>}
                    {msg.empresa && <span className="text-[11px] text-gray-400 flex items-center gap-1"><Building2 className="w-3 h-3" /> {msg.empresa}</span>}
                    {msg.endereco && <span className="text-[11px] text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {msg.endereco}</span>}
                    <span className="text-[11px] text-gray-300 ml-auto">{fmtDate(msg.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-4 shrink-0">
                  <button onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-d3-purple hover:bg-d3-purple/5 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteTarget(msg)} className="flex h-8 w-8 items-center justify-center rounded-none text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {expandedId === msg.id && (
                <div className="px-5 pb-4 border-t border-gray-50">
                  <p className="text-sm text-gray-600 mt-3 whitespace-pre-wrap">{msg.mensagem}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`w-9 h-9 flex items-center justify-center rounded-none text-sm font-medium ${page === i ? "bg-d3-purple text-white" : "text-gray-500 hover:bg-gray-100"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={confirmDelete} title="Excluir mensagem" message={"Tem certeza que deseja excluir a mensagem de " + deleteTarget?.nome + "?"} />
    </div>
  );
}
