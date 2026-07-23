import { useState, useRef, useEffect } from "react";
import { ChevronDown, Pencil, Trash2, Check, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  onAddNewTag?: (tag: string) => void;
  onRenameTag?: (oldName: string, newName: string) => void;
  onDeleteTag?: (name: string) => void;
}

export function TagSelect({
  value,
  onChange,
  options,
  onAddNewTag,
  onRenameTag,
  onDeleteTag,
}: Props) {
  const [open, setOpen] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        resetInlineStates();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function resetInlineStates() {
    setAddingNew(false);
    setNewTag("");
    setEditingTag(null);
    setEditValue("");
    setConfirmingDelete(null);
  }

  function handleSelect(tag: string) {
    onChange(tag);
    setOpen(false);
    resetInlineStates();
  }

  function handleConfirmNewTag() {
    const trimmed = newTag.trim();
    if (trimmed) {
      onChange(trimmed);
      onAddNewTag?.(trimmed);
    }
    setAddingNew(false);
    setNewTag("");
    setOpen(false);
  }

  function startEditing(tag: string, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingTag(tag);
    setEditValue(tag);
  }

  function handleConfirmEdit(oldName: string) {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== oldName) {
      onRenameTag?.(oldName, trimmed);
      if (value === oldName) {
        onChange(trimmed);
      }
    }
    setEditingTag(null);
    setEditValue("");
  }

  function handleDeleteClick(tag: string, e: React.MouseEvent) {
    e.stopPropagation();
    setConfirmingDelete(tag);
  }

  function handleConfirmDelete(tag: string) {
    onDeleteTag?.(tag);
    if (value === tag) {
      onChange("");
    }
    setConfirmingDelete(null);
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm flex items-center justify-between"
      >
        <span className={value ? "" : "text-muted-foreground"}>
          {value || "Selecione uma tag"}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-background border rounded-md shadow-lg max-h-64 overflow-y-auto">
          {options.map((tag) => (
            <div
              key={tag}
              className="flex items-center justify-between px-3 py-2 hover:bg-muted text-sm"
            >
              {editingTag === tag ? (
                <div className="flex items-center gap-1 w-full">
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleConfirmEdit(tag);
                    }}
                    className="flex-1 h-7 px-2 rounded border text-sm"
                  />
                  <button onClick={() => handleConfirmEdit(tag)} aria-label="Confirmar">
                    <Check className="w-4 h-4 text-green-600" />
                  </button>
                  <button onClick={() => setEditingTag(null)} aria-label="Cancelar">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ) : confirmingDelete === tag ? (
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-muted-foreground">Excluir "{tag}"?</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleConfirmDelete(tag)} aria-label="Confirmar exclusão">
                      <Check className="w-4 h-4 text-red-500" />
                    </button>
                    <button onClick={() => setConfirmingDelete(null)} aria-label="Cancelar">
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleSelect(tag)}
                    className={`flex-1 text-left ${tag === value ? "font-medium text-d3-purple" : ""}`}
                  >
                    {tag}
                  </button>
                  <div className="flex items-center gap-2 ml-2">
                    <button onClick={(e) => startEditing(tag, e)} aria-label="Editar tag">
                      <Pencil className="w-3.5 h-3.5 text-muted-foreground hover:text-d3-purple" />
                    </button>
                    <button onClick={(e) => handleDeleteClick(tag, e)} aria-label="Excluir tag">
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          <div className="border-t">
            {addingNew ? (
              <div className="flex items-center gap-1 px-3 py-2">
                <input
                  autoFocus
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleConfirmNewTag();
                  }}
                  placeholder="Nome da nova tag"
                  className="flex-1 h-7 px-2 rounded border text-sm"
                />
                <button onClick={handleConfirmNewTag} aria-label="Confirmar">
                  <Check className="w-4 h-4 text-green-600" />
                </button>
                <button onClick={() => setAddingNew(false)} aria-label="Cancelar">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingNew(true)}
                className="w-full text-left px-3 py-2 text-sm text-d3-purple hover:bg-muted"
              >
                + Adicionar nova tag
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}