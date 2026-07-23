import { Link } from "react-router-dom";
import { useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { getCurrentUser, updateCurrentUser } from "@/stores/authStore";

export function AdminHeader() {
  const [profileOpen, setProfileOpen] = useState(false);
  const user = getCurrentUser();

  function handleSaveProfile(data: { username: string; avatarUrl: string }) {
    updateCurrentUser(data);
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/admin/home" className="font-bold">LOGO</Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/sobre-nos">sobre nós</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/cases">Cases</Link>
          <Link to="/blog">Blog</Link>

          <button
            onClick={() => setProfileOpen(true)}
            className="w-9 h-9 rounded-full bg-d3-purple/20 overflow-hidden flex items-center justify-center"
            aria-label="Abrir perfil"
          >
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm">👤</span>
            )}
          </button>
        </nav>
      </div>

      {user && (
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
