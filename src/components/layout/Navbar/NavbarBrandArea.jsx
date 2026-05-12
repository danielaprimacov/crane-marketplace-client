import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProducersNav from "../../cranes/ProducersNav";

import menuIcon from "../../../assets/icons/menu-burger.png";
import menuClose from "../../../assets/icons/cross.png";
import logo from "../../../assets/icons/shipping.png";

const SUBNAV_CLOSE_DELAY = 100;

function NavbarBrandArea({
  shouldShowDrawerMenuButton,
  menuOpen,
  setMenuOpen,
  isCranes,
  isProfile,
  isServices,
}) {
  const [openSubnav, setOpenSubnav] = useState(null);
  const closeTimerRef = useRef(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeSubnav = useCallback(() => {
    cancelClose();
    setOpenSubnav(null);
  }, [cancelClose]);

  const handleMouseEnter = useCallback(
    (producer) => {
      if (menuOpen) return;

      cancelClose();

      if (producer) {
        setOpenSubnav(producer);
      }
    },
    [menuOpen, cancelClose]
  );

  const handleMouseLeave = useCallback(() => {
    if (menuOpen) return;

    closeTimerRef.current = window.setTimeout(() => {
      setOpenSubnav(null);
      closeTimerRef.current = null;
    }, SUBNAV_CLOSE_DELAY);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      closeSubnav();
    }
  }, [menuOpen, closeSubnav]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center flex-none">
      {shouldShowDrawerMenuButton && !isCranes && (
        <button
          type="button"
          onClick={toggleMenu}
          className="p-2 mr-4 cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer-menu"
        >
          <img
            src={menuOpen ? menuClose : menuIcon}
            alt=""
            aria-hidden="true"
            className="w-6 h-6"
          />
        </button>
      )}
      {isCranes && (
        <>
          <div className="flex items-center lg:hidden">
            <Link to="/">
              <img src={logo} alt="KranHub Logo" className="w-[36px]" />
            </Link>
          </div>
          <div
            className="hidden lg:flex items-center"
            onMouseEnter={cancelClose}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={toggleMenu}
              className="py-4 mr-3 cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer-menu"
            >
              <img
                src={menuOpen ? menuClose : menuIcon}
                alt=""
                aria-hidden="true"
                className="w-[24px]"
              />
            </button>
            <ProducersNav
              openSubnav={openSubnav}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              closeSubnav={closeSubnav}
              menuOpen={menuOpen}
            />
          </div>
        </>
      )}
      {(isProfile || isServices) && (
        <Link to="/" aria-label="Go to homepage">
          <img src={logo} alt="KranHub Logo" className="w-[36px]" />
        </Link>
      )}
    </div>
  );
}

export default NavbarBrandArea;
