import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Pencil, Star, ExternalLink, Mail, Briefcase, Building2, BarChart3, Users } from "lucide-react";

export function AdminSidebar() {
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin/home", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blog", label: "Blog", icon: Pencil },
    { to: "/admin/cases", label: "Cases de Sucesso", icon: Star },
    { to: "/admin/services", label: "Servicos", icon: Briefcase },
    { to: "/admin/members", label: "Membros", icon: Users },
    { to: "/admin/partners", label: "Parceiros", icon: Building2 },
    { to: "/admin/indicadores", label: "Indicadores", icon: BarChart3 },
    { to: "/admin/contacts", label: "Contatos", icon: Mail },
  ];

  function handleViewSite() {
    navigate("/");
  }

  return (
    <aside className="w-64 shrink-0 bg-d3-navy border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-7 border-b border-white/5">
        <h1 className="font-bold text-lg text-white tracking-tight">D3TECH</h1>
        <p className="text-[11px] text-white/30 mt-0.5">Painel Administrativo</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-d3-purple to-d3-purple-dark text-white shadow-md shadow-d3-purple/30"
                  : "text-white/40 hover:bg-white/5 hover:text-white/80"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}

        <button
          onClick={handleViewSite}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-none text-sm font-medium text-white/40 hover:bg-white/5 hover:text-white/80 transition-all mt-4"
        >
          <ExternalLink className="w-4 h-4" />
          Ver site
        </button>
      </nav>
    </aside>
  );
}
