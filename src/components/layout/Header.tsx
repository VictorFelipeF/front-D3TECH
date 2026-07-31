import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const { user, logout } = useAuth();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith("/admin") && location.pathname !== "/admin";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/sobre-nos", label: "Sobre nós" },
    { to: "/servicos", label: "Serviços" },
    { to: "/cases", label: "Cases de sucesso" },
    { to: "/blog", label: "Publicações" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-d3-purple/10 dark:border-white/[0.03] bg-[#0F046C]/98 dark:bg-[#0a0a0a]/98 backdrop-blur-xl">
      <div className="pointer-events-none absolute -top-24 left-1/4 w-72 h-72 bg-[#7c3aed]/15 rounded-full blur-[80px]" />
      <div className="pointer-events-none absolute -top-24 right-1/4 w-72 h-72 bg-[#4d1c99]/15 rounded-full blur-[80px]" />

      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.2]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="12%" y1="0" x2="12%" y2="100%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="12%" cy="100%" r="2.5" fill="#a78bfa" />
        <line x1="88%" y1="0" x2="88%" y2="100%" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="88%" cy="0" r="2.5" fill="#a78bfa" />
      </svg>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent" />

      <div className="relative container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          to={isAdminArea ? "/admin/home" : "/"}
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 group"
        >
          <img src="/logoHeader.svg" alt="D3TECH" className="h-7 transition-transform group-hover:scale-105" />
        </Link>

        <nav className="hidden items-center md:flex">
          {!isAdminArea && navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-white" : "text-white/50 hover:text-white/90"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}

          {!isAdminArea && (
            <Link
              to="/contato"
              className="ml-4 relative inline-flex h-9 items-center justify-center bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-5 text-sm font-semibold text-white shadow-lg shadow-[#7c3aed]/30 transition-all hover:shadow-[#7c3aed]/50 hover:brightness-110"
            >
              Fale conosco
            </Link>
          )}

          {user && (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
              <Link to="/admin/home" className="flex items-center gap-2.5 py-1 px-2 -mr-2 hover:bg-white/5 transition-colors group">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-[#7c3aed]/30 group-hover:border-[#7c3aed] transition-colors">
                  <User className="h-3.5 w-3.5 text-[#a78bfa]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-white leading-none">{user?.name || "Admin"}</p>
                  <p className="text-[10px] text-white/40 leading-none mt-1">{user?.email || ""}</p>
                </div>
              </Link>
              <button
                onClick={logout}
                className="flex h-7 w-7 items-center justify-center text-white/40 hover:text-red-300 hover:bg-white/5 transition-colors"
                title="Sair"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-10 w-10 text-white/50 hover:text-white transition-colors"
            title={isDark ? "Modo claro" : "Modo escuro"}
            aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden flex items-center justify-center h-10 w-10 text-white/70 hover:text-white transition-colors"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-d3-purple/10 dark:border-white/[0.03] bg-[#2e1065] dark:bg-[#0a0a0a] relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 right-10 w-40 h-40 bg-[#7c3aed]/15 rounded-full blur-[80px]" />
          <nav className="relative flex flex-col px-4 py-4 space-y-0.5">
            {!isAdminArea && navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#7c3aed]/10 text-[#c4b5fd] border-l-2 border-[#a78bfa]"
                      : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {!user && !isAdminArea && (
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex h-11 w-full items-center justify-center bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-sm font-semibold text-white shadow-lg shadow-[#7c3aed]/30"
              >
                Fale conosco
              </Link>
            )}

            {user && (
              <div className="mt-2 pt-4 border-t border-white/10 px-2">
                <Link
                  to="/admin/home"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 mb-3 py-1.5 hover:bg-white/5 -mx-2 px-2 transition-colors"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-[#7c3aed]/30">
                    <User className="h-4 w-4 text-[#a78bfa]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.name || "Admin"}</p>
                    <p className="text-xs text-white/40">{user?.email || ""}</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-white/50 hover:text-red-300 border border-white/10"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}