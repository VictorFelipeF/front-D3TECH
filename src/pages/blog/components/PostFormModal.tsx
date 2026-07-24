import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextEditor } from "@/components/shared/TextEditor";
import { ImageIcon, Heading, User, FileText, Eye, Save, Layers } from "lucide-react";
import { http } from "@/services/api";
import type { PostPayload } from "@/services/posts.service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PostPayload) => void;
  initialData?: PostPayload | null;
}

const emptyForm: PostPayload = {
  titulo: "",
  autor: "Equipe D3TECH",
  imagemCapa: "",
  descricao: "",
  exibirAoPublico: false,
  categoriaId: null,
  tagIds: [],
};

type CategoriaType = { id: number; nome: string; slug: string };

export function PostFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [form, setForm] = useState<PostPayload>(emptyForm);
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);

  useEffect(() => {
    if (isOpen) {
      http.get<CategoriaType[]>("/categorias").then(res => setCategorias(res.data)).catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }
    const post = initialData as PostPayload & { categoria?: CategoriaType };
    setForm({
      titulo: post.titulo ?? "",
      autor: post.autor ?? "Equipe D3TECH",
      imagemCapa: post.imagemCapa ?? "",
      descricao: post.descricao ?? "",
      exibirAoPublico: post.exibirAoPublico ?? false,
      categoriaId: post.categoria?.id ?? post.categoriaId ?? null,
      tagIds: post.tagIds ?? [],
    });
  }, [initialData, isOpen]);

  function handleChange(field: keyof PostPayload, value: string | boolean | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar post" : "Novo post"} width="2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Capa - full width */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Imagem de capa
            </span>
          </div>
          <div className="relative border-2 border-dashed border-gray-200 hover:border-d3-purple/40 rounded-none h-44 flex flex-col items-center justify-center gap-3 text-sm text-gray-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-d3-purple/[0.03] group">
            {form.imagemCapa ? (
              <>
                <img src={form.imagemCapa} alt="Capa" className="absolute inset-0 w-full h-full object-cover rounded-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Trocar imagem
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-none bg-d3-purple/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-d3-purple" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Clique para fazer upload</p>
                  <p className="text-xs text-gray-400 mt-0.5">PNG, JPG ou WebP</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Titulo */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Heading className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="titulo" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
Título
            </Label>
          </div>
          <Input
            id="titulo"
            value={form.titulo}
            onChange={(e) => handleChange("titulo", e.target.value)}
            placeholder="Digite o título do post"
            className="h-11"
          />
        </div>

        {/* Autor */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="autor" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Autor
            </Label>
          </div>
          <Input
            id="autor"
            value={form.autor}
            onChange={(e) => handleChange("autor", e.target.value)}
            className="h-11"
          />
        </div>

        {/* Categoria */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-d3-purple" />
            <Label htmlFor="categoriaId" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categoria
            </Label>
          </div>
          <select
            id="categoriaId"
            value={form.categoriaId ?? ""}
            onChange={(e) => handleChange("categoriaId", e.target.value ? Number(e.target.value) : null)}
            className="w-full h-11 border border-gray-200 rounded-none px-3 text-sm text-d3-navy bg-white focus:outline-none focus:ring-2 focus:ring-d3-purple/30 focus:border-d3-purple/40"
          >
            <option value="">Sem categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>

        {/* Exibir ao público */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Publicação
            </span>
          </div>
          <div className="flex items-center gap-2 border border-gray-200 rounded-none px-4 h-11 bg-gray-50/50">
            <Checkbox
              id="exibirAoPublico"
              checked={form.exibirAoPublico}
              onCheckedChange={(checked) => handleChange("exibirAoPublico", !!checked)}
            />
            <Label htmlFor="exibirAoPublico" className="text-sm cursor-pointer text-d3-navy">
              Exibir ao público
            </Label>
          </div>
        </div>

        {/* Descricao - full width */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-d3-purple" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
Descrição
            </span>
          </div>
          <TextEditor
            value={form.descricao}
            onChange={(html) => handleChange("descricao", html)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-gray-100">
          <Button variant="secondary" onClick={onClose} className="text-gray-500 rounded-none">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-d3-purple hover:bg-d3-purple-dark text-white gap-2 rounded-none">
          <Save className="w-4 h-4" />
          Salvar
        </Button>
      </div>
    </Modal>
  );
}
