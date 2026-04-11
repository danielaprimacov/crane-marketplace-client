import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";
import ProducersNav from "./ProducersNav";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

import menuIcon from "../assets/icons/menu-burger.png";
import closeIcon from "../assets/icons/cross.png";
import userIcon from "../assets/icons/circle-user.png";
import logOutIcon from "../assets/icons/leave.png";
import craneIcon from "../assets/icons/crane.png";
import inboxLogo from "../assets/icons/envelope.png";
import logo from "../assets/icons/shipping.png"; // temporary

const API_URL = import.meta.env.VITE_API_URL;

const services = [
  { label: "Transportation", to: "/services#transportation" },
  { label: "Sale / Rent", to: "/services#sale-rent" },
  {
    label: "Installation / Disassembly",
    to: "/services#installation-disassembly",
  },
];

function Navbar({ openLogin, menuOpen, setMenuOpen }) {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [myCranesCount, setMyCranesCount] = useState(0);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);

  const [openSubnav, setOpenSubnav] = useState(null);
  const closeTimer = useRef(null);

  const lastScrollY = useRef(0);

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const isRevocation = location.pathname === "/revocation-claim";
  const isTerms = location.pathname === "/terms";
  const isImprint = location.pathname === "/imprint";
  const isPrivacy = location.pathname === "/privacy-policy";
  const isCranes = location.pathname.startsWith("/cranes");
  const isServices = location.pathname.startsWith("/services");
  const isNewCrane = location.pathname === "/cranes/new";
  const isProfile = location.pathname.startsWith("/profile");

  const shouldShowDrawerMenuButton =
    isHome || isAbout || isRevocation || isTerms || isImprint || isPrivacy;

  const serviceLinkClass = `
  relative inline-block
  transition-colors duration-200
  after:content-['']
  after:absolute after:left-0 after:-bottom-1
  after:h-[1.5px] after:w-0
  after:bg-red-600
  after:transition-all after:duration-300 after:ease-out
  hover:after:w-full
`;

  const servicesCloseTimer = useRef(null);

  const openServicesMenu = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenu = () => {
    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (servicesCloseTimer.current) {
        clearTimeout(servicesCloseTimer.current);
      }
    };
  }, []);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setModalOpen(false);
        setServicesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    // only for admins
    if (!isLoggedIn || user?.role !== "admin") {
      setMessagesCount(0);
      return;
    }
    const fetchMessagesCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessagesCount(data.length);
      } catch (err) {
        console.error("Failed to fetch message count", err);
      }
    };

    fetchMessagesCount();
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
    <>
      <nav
        className={`fixed inset-x-0 h-16 z-50 transition-all duration-700 ease-out overflow-visible 
      ${showNavbar ? "top-0" : "-top-16"} ${
          isCranes ? "bg-white" : "bg-transparent"
        }
    `}
      >
        <div className="flex items-center h-full px-4 w-full">
          <div className="flex items-center flex-none">
            {shouldShowDrawerMenuButton && (
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="p-2 mr-4 cursor-pointer"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-drawer-menu"
              >
                <img
                  src={menuOpen ? closeIcon : menuIcon}
                  alt={menuOpen ? "Close" : "Menu"}
                  className="w-6 h-6"
                />
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
            {isProfile ||
              (isServices && (
                <Link to="/">
                  <img src={logo} alt="Logo" className="w-[36px]" />
                </Link>
              ))}
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
                          onClick={() => navigate("/admin/inquiries")}
                          className="cursor-pointer p-1"
                        >
                          <img
                            src={inboxLogo}
                            alt="Inbox logo"
                            className="w-5"
                          />
                          {(inquiriesCount > 0 || messagesCount > 0) && (
                            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {inquiriesCount + messagesCount}
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

      {menuOpen && (
        <>
          {/* blurred backdrop */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setMenuOpen(false)}
          />

          {/* side drawer */}
          <aside
            id="mobile-drawer-menu"
            className="fixed top-0 left-0 h-full w-84 bg-white shadow-lg z-50 p-6 overflow-auto"
          >
            {/* Close button inside too */}
            <button
              onClick={() => setMenuOpen(false)}
              className="
                absolute top-4 right-4
                flex items-center justify-center
                w-10 h-10 rounded-full cursor-pointer
                transition-all duration-300 ease-out
                hover:bg-black/5 hover:scale-110
                active:scale-95
                animate-[menuCloseIn_280ms_ease-out]
              "
              aria-label="Close menu"
            >
              <img
                src={closeIcon}
                alt="Close"
                className="
                  w-5 h-5
                  transition-transform duration-300 ease-out
                  hover:rotate-90
                  "
              />
            </button>

            <nav className="mt-16 space-y-4">
              {!isHome && (
                <Link
                  to="/"
                  className="block text-2xl font-medium hover:text-red-600"
                >
                  Home
                </Link>
              )}
              <Link
                to="/about"
                className="block text-2xl font-medium hover:text-red-600"
              >
                About Us
              </Link>

              <button
                onClick={() => setModalOpen(true)}
                className="block text-2xl font-medium hover:text-red-600 cursor-pointer"
              >
                Contact
              </button>
              <div
                className="pb-3"
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenu}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  aria-expanded={servicesOpen}
                  aria-controls="services-submenu"
                  className="flex w-full items-center justify-between text-left text-2xl font-medium cursor-pointer hover:text-red-600 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 rounded-sm"
                >
                  <span>Our Services</span>
                </button>

                <div
                  id="services-submenu"
                  className={`grid transition-all duration-300 ease-out ${
                    servicesOpen
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="pl-4 pb-2 space-y-2">
                      {services.map((service) => (
                        <li key={service.to}>
                          <Link
                            to={service.to}
                            className={serviceLinkClass}
                            onClick={() => {
                              setMenuOpen(false);
                              setServicesOpen(false);
                            }}
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </aside>
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ContactForm onClose={() => setModalOpen(false)} />
          </Modal>
        </>
      )}
    </>
  );
}

export default Navbar;
