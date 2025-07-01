import { useContext, useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

import menuIcon from "../assets/icons/menu-burger.png";
import userIcon from "../assets/icons/circle-user.png";
import logOutIcon from "../assets/icons/leave.png";
import logo from "../assets/icons/shipping.png"; // temporary

const API_URL = "http://localhost:5005";

function Navbar({ openLogin }) {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);

  const [producers, setProducers] = useState([]);

  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCranes = location.pathname === "/cranes";

  const getAllProducers = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/cranes`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      // extract the producers
      const allProducers = response.data.map(({ producer }) => producer);
      setProducers(allProducers);
    } catch (error) {
      console.error("Failed to fetch cranes:", error);
    }
  };

  const uniqueProducers = useMemo(
    () => producers.filter((p, i, arr) => p && arr.indexOf(p) === i),
    [producers]
  );

  useEffect(() => {
    getAllProducers();
  }, []);

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
      {isHome && (
        <>
          <div className="flex items-center gap-2 ">
            <img src={menuIcon} alt="Menu Icon" className="w-6" />
            <span className="text-sm uppercase">Menu</span>
          </div>
          <Link to="/">
            <div>
              <img src={logo} alt="Logo" className="w-[36px]" />
            </div>
          </Link>
        </>
      )}

      {!isHome && (
        <div className="flex items-center gap-6">
          <Link to="/">
            <div>
              <img src={logo} alt="Logo" className="w-[36px]" />
            </div>
          </Link>
          {uniqueProducers.length > 0 && (
            <nav>
              <ul className="flex items-center gap-4">
                {uniqueProducers.map((producer) => (
                  <li key={producer}>
                    <Link
                      to=""
                      className="text-sm uppercase font-medium text-gray-700 hover:text-red-600 whitespace-nowrap"
                    >
                      {producer}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}

      {isLoggedIn && (
        <div className="flex gap-5 items-center">
          {user?.role !== "admin" ? (
            <Link to="/profile" className="cursor-pointer">
              <img className="w-5" src={userIcon} alt="User Icon" />
            </Link>
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
          <button onClick={openLogin} className="p-2">
            <img src={userIcon} alt="Login" className="w-6" />
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
