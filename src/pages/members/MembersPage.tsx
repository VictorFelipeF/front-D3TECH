import { useState, useEffect } from "react";
import { Link2 } from "lucide-react";
import { http } from "@/services/api";
import { fileUrl } from "@/services/api";
import { SectionHeading } from "@/components/shared/SectionHeading";

type MemberBackend = {
  id: number;
  usuario: { nome: string; email: string };
  cargo: string;
  fotoPerfil: string;
  instagram: string;
  github: string;
  linkedin: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<MemberBackend[]>([]);

  useEffect(() => {
    http.get<MemberBackend[]>("/members").then(r => setMembers(r.data)).catch(() => {});
  }, []);

  if (members.length === 0) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Equipe"
          title="Nosso time"
          subtitle="Conheca os profissionais que fazem a D3TEC acontecer."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {members.map(m => (
            <div key={m.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 text-center hover:border-d3-purple/30 transition-all">
              {m.fotoPerfil ? (
                <img src={fileUrl(m.fotoPerfil)} alt={m.usuario.nome} className="w-24 h-24 object-cover rounded-none mx-auto mb-4" />
              ) : (
                <div className="w-24 h-24 bg-d3-purple/10 flex items-center justify-center text-d3-purple text-2xl font-bold mx-auto mb-4 rounded-none">
                  {m.usuario.nome.charAt(0)}
                </div>
              )}
              <h3 className="font-semibold text-d3-navy dark:text-white">{m.usuario.nome}</h3>
              {m.cargo && <p className="text-sm text-d3-purple mt-0.5">{m.cargo}</p>}
              <div className="flex items-center justify-center gap-3 mt-3">
                {m.instagram && <a href={`https://instagram.com/${m.instagram}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-d3-purple"><Link2 className="w-4 h-4" /></a>}
                {m.github && <a href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-d3-purple"><Link2 className="w-4 h-4" /></a>}
                {m.linkedin && <a href={`https://linkedin.com/in/${m.linkedin}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-d3-purple"><Link2 className="w-4 h-4" /></a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
