import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import RouteLoading from "./RouteLoading";

function IsPrivate({ children, redirectTo = "/" }) {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  // If the authentication is still loading
  if (isLoading) return <RouteLoading />;

  if (!isLoggedIn || !user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}

export default IsPrivate;
