import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { services, serviceLinkClass } from "../../constants/navbar";

function ServicesAccordion({ servicesOpen, setServicesOpen, onLinkClick }) {
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

  return (
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
                  onClick={onLinkClick}
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServicesAccordion;
