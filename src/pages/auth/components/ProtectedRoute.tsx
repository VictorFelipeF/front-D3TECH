import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "@/services/api";

export function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}
