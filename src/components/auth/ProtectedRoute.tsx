import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "@/stores/authStore";

export function ProtectedRoute() {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
