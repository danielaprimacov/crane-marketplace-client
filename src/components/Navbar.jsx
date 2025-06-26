import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import menuIcon from "../assets/icons/menu-burger.png";
import userIcon from "../assets/icons/circle-user.png";
import logo from "../assets/icons/shipping.png"; // temporary

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav
      className="fixed inset-x-0 top-0 h-16 z-50 bg-transparent flex justify-between items-center px-4 border-b border-b-[rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 ">
        <img src={menuIcon} alt="Menu Icon" className="w-6" />
        <span className="text-sm uppercase">Menu</span>
      </div>
      <Link to="/">
        <div>
          <img src={logo} alt="Logo" className="w-[36px]" />
        </div>
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
          <Link to="/login">
            <div className="flex items-center">
              <img src={userIcon} alt="User Icon" className="w-6" />
            </div>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
