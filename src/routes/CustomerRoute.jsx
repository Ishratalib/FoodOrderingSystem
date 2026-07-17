import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const CustomerRoute = () => {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default CustomerRoute;
