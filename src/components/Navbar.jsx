import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import ProducersNav from "./ProducersNav";

import menuIcon from "../assets/icons/menu-burger.png";
import userIcon from "../assets/icons/circle-user.png";
import logOutIcon from "../assets/icons/leave.png";
import craneIcon from "../assets/icons/crane.png";
import inboxLogo from "../assets/icons/envelope.png";
import logo from "../assets/icons/shipping.png"; // temporary

const API_URL = "http://localhost:5005";

function Navbar({ openLogin }) {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);

  const [myCranesCount, setMyCranesCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);

  const [openSubnav, setOpenSubnav] = useState(null);
  const closeTimer = useRef(null);

  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCranes = location.pathname.startsWith("/cranes");
  const isNewCrane = location.pathname === "/cranes/new";
  const isProfile = location.pathname.startsWith("/profile");

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Called when pointer enters the LI or the fly-out itself:
  const handleMouseEnter = (producer) => {
    cancelClose();
    if (producer) {
      setOpenSubnav(producer);
    }
  };

  // Called when pointer leaves the LI or the fly-out itself:
  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => {
      setOpenSubnav(null);
      closeTimer.current = null;
    }, 200);
  };

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      setMyCranesCount(0);
      return;
    }

    const fetchMyCranesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data: allCranes } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // replace `owner` with whatever field your backend sets:
        const mine = allCranes.filter((c) => c.owner === user._id);
        setMyCranesCount(mine.length);
      } catch (err) {
        console.error("Could not fetch cranes:", err);
      }
    };

    fetchMyCranesCount();
  }, [isLoggedIn, user?._id, location.pathname]);

  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") {
      setInquiriesCount(0);
      return;
    }

    const fetchInquiriesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data: allInquiries } = await axios.get(`${API_URL}/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInquiriesCount(allInquiries.length);
      } catch (err) {
        console.error("Could not fetch inquiries:", err);
      }
    };

    fetchInquiriesCount();
  }, [isLoggedIn, user?.role, location.pathname]);

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
      className={`fixed inset-x-0 h-16 z-50 transition-all duration-800 ease-out overflow-visible 
      ${showNavbar ? "top-0" : "-top-16"} ${
        isCranes ? "bg-white" : "bg-transparent"
      }
    `}
    >
      <div className="flex items-center h-full px-4 w-full">
        <div className="flex items-center flex-none">
          {isHome && (
            <button className="flex items-center gap-2 cursor-pointer">
              <img src={menuIcon} alt="Menu" className="w-6" />
              <span className="text-sm uppercase">Menu</span>
            </button>
          )}
          {isCranes && (
            <div
              className="flex items-center"
              onMouseEnter={cancelClose}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/" className="py-4">
                <img src={logo} alt="Logo" className="w-[36px]" />
              </Link>
              <ProducersNav
                openSubnav={openSubnav}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
            </div>
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
                <>
                  {isCranes && !isNewCrane && (
                    <Link
                      to="/cranes/new"
                      className="mr-5 bg-red-600 text-white px-4 py-1 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                    >
                      Add a new crane
                    </Link>
                  )}
                  <div className="flex gap-5 items-center">
                    <div className="relative">
                      <button
                        onClick={() => navigate("/admin")}
                        className="cursor-pointer p-1"
                      >
                        <img src={inboxLogo} alt="Inbox logo" className="w-5" />
                        {inquiriesCount > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {inquiriesCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {isCranes && !isNewCrane && (
                    <Link
                      to="/cranes/new"
                      className="mr-10 bg-red-600 text-white px-4 py-1 rounded hover:shadow-lg hover:scale-101 transition-all duration-200"
                    >
                      Add a new crane
                    </Link>
                  )}
                  <div className="flex gap-5 items-center">
                    <div className="relative">
                      <Link to="/cranes/my-cranes">
                        <img
                          src={craneIcon}
                          alt="Your Cranes"
                          className="w-5"
                        />
                        {myCranesCount > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {myCranesCount}
                          </span>
                        )}
                      </Link>
                    </div>
                    <Link to="/profile">
                      <img src={userIcon} alt="Profile" className="w-5" />
                    </Link>
                  </div>
                </>
              )}
              <button onClick={logOutUser} className="cursor-pointer">
                <img src={logOutIcon} alt="Logout" className="w-5" />
              </button>
            </>
          ) : (
            <>
              <button onClick={openLogin} className="p-2 cursor-pointer">
                <img src={userIcon} alt="Login" className="w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
