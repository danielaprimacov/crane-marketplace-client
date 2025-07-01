import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import menuIcon from "../assets/icons/menu-burger.png";
import userIcon from "../assets/icons/circle-user.png";
import logOutIcon from "../assets/icons/leave.png";
import logo from "../assets/icons/shipping.png"; // temporary

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroBottom = window.innerHeight; // height of the hero on home

      // on home: always show while over hero
      if (isHome && currentY <= heroBottom) {
        setShowNavbar(true);
      } else {
        // otherwise (either scrolled past hero on home, or any scroll on other pages)
        if (currentY > lastScrollY.current) {
          // scrolled down
          setShowNavbar(false);
        } else {
          // scrolled up
          setShowNavbar(true);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
      className={`
        fixed inset-x-0 top-0 h-16 z-50 bg-transparent flex justify-between items-center px-4 transition-transform duration-800 ease-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
      `}
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
        <div className="flex gap-5 items-center">
          {user?.role !== "admin" ? (
            <button className="cursor-pointer">
              <img className="w-5" src={userIcon} alt="User Icon" />
            </button>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => navigate("/admin")}
            >
              Dashboard
            </button>
          )}

          <button className="cursor-pointer" onClick={logOutUser}>
            <img className="w-5" src={logOutIcon} alt="Logout Icon" />
          </button>
        </div>
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
