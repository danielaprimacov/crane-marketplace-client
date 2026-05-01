import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

import RouteLoading from "./RouteLoading";

function AdminRoute({ redirectTo = "/login" }) {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <RouteLoading />;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (!user) {
    return <RouteLoading />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;
