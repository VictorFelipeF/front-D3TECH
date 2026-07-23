import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Pencil, Star, LogOut, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getCurrentUser, updateCurrentUser, logout } from "@/stores/authStore";
import { ProfileModal } from "./ProfileModal";

export function AdminSidebar() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const user = getCurrentUser();

  const navItems = [
    { to: "/admin/home", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blog", label: "Blog", icon: Pencil },
    { to: "/admin/cases", label: "Cases de Sucesso", icon: Star },
  ];

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  function handleViewSite() {
    navigate("/");
  }

  function handleSaveProfile(data: { username: string; avatarUrl: string }) {
    updateCurrentUser(data);
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

      {user && (
        <div className="px-4 py-5 border-t border-white/10">
          <button
            onClick={() => setProfileOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-left transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden flex items-center justify-center shrink-0">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-white font-medium">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.username}</p>
              <p className="text-xs text-white/50 truncate">{user.email}</p>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      )}

      {user && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          onSave={handleSaveProfile}
          currentUser={user}
        />
      )}
    </aside>
  );
}
