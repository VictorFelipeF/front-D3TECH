import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LinkIcon,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export function TextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  function toggleLink() {
    const url = window.prompt("URL do link:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/30">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} icon={Undo2} label="Desfazer" />
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} icon={Redo2} label="Refazer" />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          icon={Bold}
          label="Negrito"
          active={editor.isActive("bold")}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          icon={Italic}
          label="Itálico"
          active={editor.isActive("italic")}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          icon={UnderlineIcon}
          label="Sublinhado"
          active={editor.isActive("underline")}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          icon={Strikethrough}
          label="Riscado"
          active={editor.isActive("strike")}
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={List}
          label="Lista"
          active={editor.isActive("bulletList")}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          icon={ListOrdered}
          label="Lista numerada"
          active={editor.isActive("orderedList")}
        />
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          icon={AlignLeft}
          label="Alinhar à esquerda"
          active={editor.isActive({ textAlign: "left" })}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          icon={AlignCenter}
          label="Centralizar"
          active={editor.isActive({ textAlign: "center" })}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          icon={AlignRight}
          label="Alinhar à direita"
          active={editor.isActive({ textAlign: "right" })}
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          icon={AlignJustify}
          label="Justificar"
          active={editor.isActive({ textAlign: "justify" })}
        />
        <Divider />
        <ToolbarButton onClick={toggleLink} icon={LinkIcon} label="Link" active={editor.isActive("link")} />
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none [&_.ProseMirror]:min-h-[180px] [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-1" />;
}

function ToolbarButton({
  onClick,
  icon: Icon,
  label,
  active,
}: {
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-8 h-8 flex items-center justify-center rounded text-sm hover:bg-muted transition-colors ${
        active ? "bg-d3-purple/15 text-d3-purple" : "text-muted-foreground"
      }`}
    >
      {Icon ? <Icon className="w-4 h-4" /> : label}
    </button>
  );
}