import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-d3-navy to-d3-purple-dark">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}