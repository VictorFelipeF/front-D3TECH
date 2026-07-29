import { Link } from "react-router-dom";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { to: "/", label: "Home" },
    { to: "/sobre-nos", label: "Sobre nós" },
    { to: "/servicos", label: "Serviços" },
    { to: "/cases", label: "Cases de sucesso" },
    { to: "/blog", label: "Publicações" },
    { to: "/contato", label: "Contato" },
    { to: "/politica-de-privacidade", label: "Política de Privacidade" },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[600px] bg-[#7c3aed]/8 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#4d1c99]/10 rounded-full blur-[100px]" />

      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.08]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="5%" y1="0" x2="5%" y2="100%" stroke="#7c3aed" strokeWidth="1" />
        <line x1="0" y1="30%" x2="15%" y2="30%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="5%" cy="30%" r="3" fill="#a78bfa" />
        <line x1="95%" y1="0" x2="95%" y2="100%" stroke="#7c3aed" strokeWidth="1" />
        <line x1="85%" y1="65%" x2="100%" y2="65%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="95%" cy="65%" r="3" fill="#a78bfa" />
        <line x1="35%" y1="0" x2="35%" y2="12%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="35%" cy="0" r="2.5" fill="#a78bfa" />
        <line x1="70%" y1="88%" x2="70%" y2="100%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="70%" cy="100%" r="2.5" fill="#a78bfa" />
      </svg>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <img src="/logoFooter.svg" alt="D3TECH" className="h-7" />
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Transformando conhecimento acadêmico em soluções tecnológicas reais.
            </p>
            <div className="inline-flex items-center gap-1.5 pt-1 bg-white/5 backdrop-blur border border-[#7c3aed]/30 rounded-full px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a78bfa] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c4b5fd]" />
              </span>
              <span className="text-[11px] text-white/60 tracking-wide">Disponível para novos projetos</span>
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a78bfa] mb-5">
              <span className="w-3 h-px bg-[#7c3aed]" />
              Navegação
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors w-fit"
                >
                  {l.label}
                  <ArrowUpRight className="w-3 h-3 text-[#a78bfa] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a78bfa] mb-5">
              <span className="w-3 h-px bg-[#7c3aed]" />
              Contato
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contato@d3tech.com.br"
                className="group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/5 border border-[#7c3aed]/30 group-hover:border-[#7c3aed] group-hover:bg-[#7c3aed]/15 transition-colors">
                  <Mail className="h-3.5 w-3.5 text-[#a78bfa]" />
                </span>
                contato@d3tech.com.br
              </a>
              <a
                href="tel:+5500000000000"
                className="group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors"
              >
                <span className="flex items-center justify-center w-8 h-8 bg-white/5 border border-[#7c3aed]/30 group-hover:border-[#7c3aed] group-hover:bg-[#7c3aed]/15 transition-colors">
                  <Phone className="h-3.5 w-3.5 text-[#a78bfa]" />
                </span>
                +55 (00) 00000-0000
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">&copy; {currentYear} D3TECH. Todos os direitos reservados.</p>
          <p className="text-[10px] text-white/20 tracking-wide">Tecnologia que transforma.</p>
        </div>
      </div>
    </footer>
  );
}