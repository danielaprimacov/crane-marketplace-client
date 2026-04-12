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
    cancelClose();
    if (producer) {
      setOpenSubnav(producer);
    }
  };

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => {
      setOpenSubnav(null);
      closeTimer.current = null;
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  return (
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
      {(isProfile || isServices) && (
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[36px]" />
        </Link>
      )}
    </div>
  );
}

export default NavbarBrandArea;
