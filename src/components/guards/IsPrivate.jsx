import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate, useLocation } from "react-router-dom";

import RouteLoading from "./RouteLoading";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();

  // If the authentication is still loading
  if (isLoading) return <RouteLoading />;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children ?? <Outlet />;
}

export default IsPrivate;
