import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Pencil, Star, ExternalLink } from "lucide-react";

export function AdminSidebar() {
  const navigate = useNavigate();

  const navItems = [
    { to: "/admin/home", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blog", label: "Blog", icon: Pencil },
    { to: "/admin/cases", label: "Cases de Sucesso", icon: Star },
  ];

  function handleViewSite() {
    navigate("/");
  }

  return (
    <aside className="w-64 shrink-0 bg-d3-navy border-r border-d3-purple/20 flex flex-col h-screen sticky top-0">
      <div className="px-6 py-7">
        <h1 className="font-bold text-lg text-white">D3TECH</h1>
        <p className="text-xs text-white/50 mt-0.5">Painel Administrativo</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-d3-purple text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}

        <button
          onClick={handleViewSite}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          Ver site
        </button>
      </nav>
    </aside>
  );
}
