import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import ROLES from "../../constants/roles";

import RouteLoading from "./RouteLoading";

function AdminRoute({ redirectTo = "/" }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <RouteLoading />;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
