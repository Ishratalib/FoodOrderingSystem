import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { accessToken, user } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (user?.is_admin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}