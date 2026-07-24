import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export function ConfirmModal({ isOpen, onClose, onConfirm, title = "Confirmar", message = "Tem certeza que deseja excluir?" }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center py-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="rounded-none text-gray-500">
            Cancelar
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white rounded-none">
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
