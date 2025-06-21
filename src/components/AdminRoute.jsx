import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AdminRoute({ redirectTo = "/login" }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading…</div>; 
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
