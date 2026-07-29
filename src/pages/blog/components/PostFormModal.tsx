import { useState, useEffect, useRef } from "react";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextEditor } from "@/components/shared/TextEditor";
import { ImageIcon, Heading, User, FileText, Eye, Save, Layers, Upload, X, Tag } from "lucide-react";
import { http } from "@/services/api";
import { uploadImage } from "@/services/images.service";
import { fileUrl } from "@/services/api";
import { TagSelector } from "@/components/shared/TagSelector";
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
type TagOption = { id: number; nome: string };

export function PostFormModal({ isOpen, onClose, onSave, initialData }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<PostPayload>(emptyForm);
  const [categorias, setCategorias] = useState<CategoriaType[]>([]);
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<TagOption[]>([]);

  function loadTags() {
    http.get<TagOption[]>("/admin/tags").then(res => setTags(res.data)).catch(() => {});
  }

  useEffect(() => {
    if (isOpen) {
      http.get<CategoriaType[]>("/categorias").then(res => setCategorias(res.data)).catch(() => {});
      loadTags();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!initialData) {
      setForm(emptyForm);
      return;
    }
    const post = initialData as PostPayload & { categoria?: CategoriaType; tags?: { id: number; nome: string }[] };
    setForm({
      titulo: post.titulo ?? "",
      autor: post.autor ?? "Equipe D3TECH",
      imagemCapa: post.imagemCapa ?? "",
      descricao: post.descricao ?? "",
      exibirAoPublico: post.exibirAoPublico ?? false,
      categoriaId: post.categoria?.id ?? post.categoriaId ?? null,
      tagIds: post.tags?.map((t) => t.id) ?? post.tagIds ?? [],
    });
  }, [initialData, isOpen]);

  function handleChange(field: keyof PostPayload, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      handleChange("imagemCapa", url);
    } catch {
      // silencioso
    }
    setUploading(false);
  }

  function handleSubmit() {
    onSave(form);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar post" : "Novo post"} width="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Capa - full width */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Imagem de capa
              </span>
            </div>
            {form.imagemCapa && (
              <button
                type="button"
                onClick={() => handleChange("imagemCapa", "")}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Remover capa
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleUpload}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-200 hover:border-d3-purple/40 rounded-none h-44 flex flex-col items-center justify-center gap-3 text-sm text-gray-400 transition-colors cursor-pointer bg-gray-50/50 hover:bg-d3-purple/[0.03] group overflow-hidden"
          >
            {form.imagemCapa ? (
              <>
                <img src={fileUrl(form.imagemCapa)} alt="Capa" className="absolute inset-0 w-full h-full object-cover rounded-none" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    Trocar imagem
                  </span>
                </div>
              </>
            ) : uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-d3-purple border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-d3-purple">Enviando...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-none bg-d3-purple/10 flex items-center justify-center group-hover:bg-d3-purple/20 transition-colors">
                  <Upload className="w-6 h-6 text-d3-purple" />
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
            <Label htmlFor="titulo" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
            <Label htmlFor="autor" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
            <Label htmlFor="categoriaId" className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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

        {/* Tags */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Tags
            </span>
          </div>
          <TagSelector
            tags={tags}
            selectedIds={form.tagIds ?? []}
            onChange={(ids) => handleChange("tagIds", ids)}
            onTagCreated={loadTags}
          />
        </div>

        {/* Exibir ao público */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-d3-purple" />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
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
