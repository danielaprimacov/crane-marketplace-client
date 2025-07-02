import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import menuIcon from "../assets/icons/menu-burger.png";
import userIcon from "../assets/icons/circle-user.png";
import logOutIcon from "../assets/icons/leave.png";
import logo from "../assets/icons/shipping.png"; // temporary
import ProducersNav from "./ProducersNav";

function Navbar({ openLogin }) {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCranes = location.pathname === "/cranes";
  const isProfile = location.pathname === "/profile";

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
      className={`fixed inset-x-0 h-16 z-50 bg-transparent transition-all duration-800 ease-out overflow-visible 
      ${showNavbar ? "top-0" : "-top-16"}
    `}
    >
      <div className="flex items-center h-full px-4 w-full">
        <div className="flex items-center flex-none">
          {isHome && (
            <button className="flex items-center gap-2">
              <img src={menuIcon} alt="Menu" className="w-6" />
              <span className="text-sm uppercase">Menu</span>
            </button>
          )}
          {isCranes && (
            <>
              <Link to="/" className="py-4">
                <img src={logo} alt="Logo" className="w-[36px]" />
              </Link>
              <ProducersNav />
            </>
          )}
          {isProfile && (
            <Link to="/">
              <img src={logo} alt="Logo" className="w-[36px]" />
            </Link>
          )}
        </div>

        <div className="flex-1 flex justify-center">
          {isHome && (
            <Link to="/" className="inline-block">
              <img src={logo} alt="Logo" className="w-[36px]" />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-5 flex-none">
          {isLoggedIn ? (
            <>
              {user?.role === "admin" ? (
                <button onClick={() => navigate("/admin")}>Dashboard</button>
              ) : (
                <Link to="/profile">
                  <img src={userIcon} alt="Profile" className="w-5" />
                </Link>
              )}
              <button onClick={logOutUser}>
                <img src={logOutIcon} alt="Logout" className="w-5" />
              </button>
            </>
          ) : (
            <button onClick={openLogin} className="p-2">
              <img src={userIcon} alt="Login" className="w-6" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
