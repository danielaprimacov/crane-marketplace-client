import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import ContactForm from "../ContactForm";
import ServicesAccordion from "./ServicesAccordion";

import closeIcon from "../../assets/icons/cross.png";

function MobileDrawerMenu({ isHome, setMenuOpen }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleClick = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  return (
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

          <Link
            to="/cranes"
            className="block text-2xl font-medium hover:text-red-600"
          >
            Advices
          </Link>

          <button
            onClick={() => setModalOpen(true)}
            className="block text-2xl font-medium hover:text-red-600 cursor-pointer"
          >
            Contact
          </button>
          <ServicesAccordion
            servicesOpen={servicesOpen}
            setServicesOpen={setServicesOpen}
            onLinkClick={handleClick}
          />
        </nav>
      </aside>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ContactForm onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}

export default MobileDrawerMenu;
