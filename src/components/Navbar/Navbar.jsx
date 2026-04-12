import { useContext, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import NavbarBrandArea from "./NavbarBrandArea";
import NavbarActions from "./NavbarActions";
import MobileDrawerMenu from "./MobileDrawerMenu";

import useNavbarVisibility from "../../hooks/useNavbarVisibility";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useEscapeClose from "../../hooks/useEscapeClose";
import useNavbarCounts from "../../hooks/useNavbarCounts";

import logo from "../../assets/icons/shipping.png";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar({ openLogin, menuOpen, setMenuOpen }) {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  const location = useLocation();

  const isHome = location.pathname === "/";
  const isCranes = location.pathname.startsWith("/cranes");
  const isServices = location.pathname.startsWith("/services");
  const isProfile = location.pathname.startsWith("/profile");
  const isNewCrane = location.pathname === "/cranes/new";

  const drawerRoutes = [
    "/",
    "/about",
    "/revocation-claim",
    "/terms",
    "/imprint",
    "/privacy-policy",
  ];
  const shouldShowDrawerMenuButton = drawerRoutes.includes(location.pathname);

  const showNavbar = useNavbarVisibility(isHome);

  useBodyScrollLock(menuOpen);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEscapeClose(closeMenu);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const { myCranesCount, inquiriesCount, messageCount } = useNavbarCounts({
    apiUrl: API_URL,
    isLoggedIn,
    user,
    pathname: location.pathname,
  });

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
          <NavbarBrandArea
            shouldShowDrawerMenuButton={shouldShowDrawerMenuButton}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            isCranes={isCranes}
            isProfile={isProfile}
            isServices={isServices}
          />

          <div className="flex-1 flex justify-center">
            {isHome && (
              <Link to="/" className="inline-block">
                <img src={logo} alt="Logo" className="w-[36px]" />
              </Link>
            )}
          </div>
          <NavbarActions
            isLoggedIn={isLoggedIn}
            user={user}
            logOutUser={logOutUser}
            openLogin={openLogin}
            isCranes={isCranes}
            isNewCrane={isNewCrane}
            myCranesCount={myCranesCount}
            inquiriesCount={inquiriesCount}
            messageCount={messageCount}
          />
        </div>
      </nav>
      {menuOpen && (
        <MobileDrawerMenu isHome={isHome} setMenuOpen={setMenuOpen} />
      )}
    </>
  );
}

export default Navbar;
