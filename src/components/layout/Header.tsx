import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { getCurrentUser, updateCurrentUser } from "@/stores/authStore";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith("/admin") && location.pathname !== "/admin";
  const user = isAdminArea ? getCurrentUser() : null;

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: "/sobre-nos", label: "Sobre nós" },
    { to: "/servicos", label: "Serviços" },
    { to: "/cases", label: "Cases" },
    { to: "/blog", label: "Blog" },
  ];

  function handleSaveProfile(data: { username: string; avatarUrl: string }) {
    updateCurrentUser(data);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-d3-navy/95 text-white backdrop-blur-md shadow-lg shadow-d3-navy-dark/20">
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
          {navLinks.map((link) => (
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

          {isAdminArea && user ? (
            <button
              onClick={() => setProfileOpen(true)}
              className="h-9 w-9 rounded-full bg-d3-purple/30 overflow-hidden flex items-center justify-center border border-white/20"
              aria-label="Abrir perfil"
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm">👤</span>
              )}
            </button>
          ) : (
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
            {navLinks.map((link) => (
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

            {isAdminArea && user ? (
              <button
                onClick={() => {
                  setProfileOpen(true);
                  closeMenu();
                }}
                className="mt-3 flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
              >
                <span className="h-6 w-6 rounded-full bg-d3-purple/30 overflow-hidden flex items-center justify-center">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    "👤"
                  )}
                </span>
                Meu perfil
              </button>
            ) : (
              <Link
                to="/contato"
                onClick={closeMenu}
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg bg-d3-purple px-4 py-2 text-sm font-semibold text-white shadow-md shadow-d3-purple/25 transition-all duration-200 hover:bg-d3-purple-light"
              >
                Fale conosco
              </Link>
            )}
          </nav>
        </div>
      )}

      {isAdminArea && user && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          onSave={handleSaveProfile}
          currentUser={user}
        />
      )}
    </header>
  );
}