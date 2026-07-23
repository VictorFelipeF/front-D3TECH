import { Link } from "react-router-dom";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/admin/home" className="font-bold">LOGO</Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link to="/sobre-nos">sobre nós</Link>
          <Link to="/servicos">Serviços</Link>
          <Link to="/cases">Cases</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
}
