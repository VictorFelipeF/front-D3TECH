import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

export function Modal({ isOpen, onClose, children, title, width = "xl" }: ModalProps) {

  const widthClass = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
  }[width];
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-none shadow-2xl shadow-d3-purple/20 w-full ${widthClass} max-h-[90vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-d3-navy to-d3-navy-dark rounded-t-none border-b border-d3-purple/20">
          <h2 className="font-semibold text-xl text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-8 w-8 items-center justify-center rounded-none text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
