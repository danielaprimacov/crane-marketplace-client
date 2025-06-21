import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          {user?.role !== "admin" ? (
            <button>Profile</button>
          ) : (
            <button onClick={() => navigate("/admin")}>Dashboard</button>
          )}

          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
