import { useState } from "react";
import { Plus } from "lucide-react";
import { http } from "@/services/api";

interface TagOption {
  id: number;
  nome: string;
}

interface Props {
  tags: TagOption[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  onTagCreated?: () => void;
}

export function TagSelector({ tags, selectedIds, onChange, onTagCreated }: Props) {
  const [newTag, setNewTag] = useState("");

  async function createTag() {
    const nome = newTag.trim();
    if (!nome) return;
    try {
      await http.post("/admin/tags", { nome });
      setNewTag("");
      onTagCreated?.();
    } catch { /* */ }
  }

  function toggle(id: number) {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((t) => t !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {tags.length === 0 && (
          <span className="text-xs text-gray-400">Nenhuma tag disponivel</span>
        )}
        {tags.map((tag) => {
          const active = selectedIds.includes(tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
              className={`text-xs px-3 py-1.5 rounded-none border transition-colors font-medium ${
                active
                  ? "bg-d3-purple text-white border-d3-purple shadow-sm"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-d3-purple/50 hover:text-d3-purple"
              }`}
            >
              {tag.nome}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && createTag()}
          placeholder="Nova tag..."
          className="h-8 text-xs border border-gray-200 rounded-none px-2.5 w-36 focus:outline-none focus:border-d3-purple/40"
        />
        <button
          type="button"
          onClick={createTag}
          className="flex h-8 w-8 items-center justify-center rounded-none bg-d3-purple text-white hover:bg-d3-purple-dark transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
