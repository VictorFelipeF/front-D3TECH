import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "./authStore";

export function ProtectedRoute() {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
