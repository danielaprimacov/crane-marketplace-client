import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProducersNav from "../ProducersNav";

import menuIcon from "../../assets/icons/menu-burger.png";
import menuClose from "../../assets/icons/cross.png";
import logo from "../../assets/icons/shipping.png";

function NavbarBrandArea({
  shouldShowDrawerMenuButton,
  menuOpen,
  setMenuOpen,
  isCranes,
  isProfile,
  isServices,
}) {
  const [openSubnav, setOpenSubnav] = useState(null);
  const closeTimer = useRef(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleMouseEnter = (producer) => {
    if (menuOpen) return;

    cancelClose();

    if (producer) {
      setOpenSubnav(producer);
    }
  };

  const handleMouseLeave = () => {
    if (menuOpen) return;

    closeTimer.current = window.setTimeout(() => {
      setOpenSubnav(null);
      closeTimer.current = null;
    }, 100);
  };

  useEffect(() => {
    if (menuOpen) {
      cancelClose();
      setOpenSubnav(null);
    }
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center flex-none">
      {shouldShowDrawerMenuButton && !isCranes && (
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="p-2 mr-4 cursor-pointer"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer-menu"
        >
          <img
            src={menuOpen ? menuClose : menuIcon}
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
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="py-4 mr-3 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer-menu"
          >
            <img
              src={menuOpen ? menuClose : menuIcon}
              alt={menuOpen ? "Close" : "Menu"}
              className="w-[24px]"
            />
          </button>
          <ProducersNav
            openSubnav={openSubnav}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            menuOpen={menuOpen}
          />
        </div>
      )}
      {(isProfile || isServices) && (
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[36px]" />
        </Link>
      )}
    </div>
  );
}

export default NavbarBrandArea;
