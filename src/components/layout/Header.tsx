import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith("/admin") && location.pathname !== "/admin";

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/sobre-nos", label: "Sobre nós" },
    { to: "/servicos", label: "Serviços" },
    { to: "/cases", label: "Cases" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-d3-navy text-white backdrop-blur-md shadow-lg shadow-d3-navy-dark/20">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to={isAdminArea ? "/admin/home" : "/"}
          onClick={closeMenu}
          className="text-xl font-bold tracking-tight transition-colors hover:text-d3-purple-light"
        >
          D3TECH
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {!isAdminArea && navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-200 hover:text-white ${
                  isActive
                    ? "text-white after:absolute after:-bottom-[21px] after:left-0 after:h-[2px] after:w-full after:bg-d3-purple after:content-['']"
                    : "text-white/70"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
              <Link
                to="/admin/home"
                className="flex items-center gap-3 rounded-lg transition-colors hover:bg-white/5 px-2 py-1.5 -mx-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-d3-purple/20 text-d3-purple-light">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white leading-tight">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-[11px] text-white/50 leading-tight">
                    {user?.email || ""}
                  </p>
                </div>
              </Link>
              <button
                onClick={logout}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:text-red-400 hover:bg-white/5 transition-all"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : !isAdminArea && (
            <Link
              to="/contato"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-d3-purple px-5 py-2 text-sm font-semibold text-white shadow-md shadow-d3-purple/25 transition-all duration-200 hover:bg-d3-purple-light hover:shadow-lg hover:shadow-d3-purple/30 hover:-translate-y-px active:translate-y-0"
            >
              Fale conosco
            </Link>
          )}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            className="text-white hover:bg-white/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-d3-navy md:hidden">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {!isAdminArea && navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-d3-purple/15 text-d3-purple-light"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {!user && !isAdminArea && (
              <Link
                to="/contato"
                onClick={closeMenu}
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-d3-purple px-4 py-2 text-sm font-semibold text-white shadow-md shadow-d3-purple/25 transition-all duration-200 hover:bg-d3-purple-light"
              >
                Fale conosco
              </Link>
            )}

            {user && (
              <div className="px-2 py-4 border-t border-white/10 mt-2 pt-4">
                <Link
                  to="/admin/home"
                  onClick={closeMenu}
                  className="flex items-center gap-3 mb-3 rounded-lg transition-colors hover:bg-white/5 px-2 py-1.5 -mx-2"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-d3-purple/20 text-d3-purple-light">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user?.name || "Admin"}</p>
                    <p className="text-xs text-white/50">{user?.email || ""}</p>
                  </div>
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-red-400 transition-all border border-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
