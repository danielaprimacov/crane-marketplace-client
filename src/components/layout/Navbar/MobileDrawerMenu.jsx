import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../ui/Modal";
import ContactForm from "../../forms/contact/ContactForm";
import ServicesAccordion from "./ServicesAccordion";

import closeIcon from "../../../assets/icons/cross.png";

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
        className="fixed top-0 left-0 h-full z-50 w-[85vw] max-w-[22rem] bg-white shadow-lg p-5 sm:p-6 overflow-auto"
      >
        {/* Close button inside too */}
        <button
          type="button"
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

        <nav className="mt-14 space-y-4 sm:mt-16">
          {!isHome && (
            <Link
              to="/"
              className="block text-xl sm:text-2xl font-medium hover:text-red-600"
            >
              Home
            </Link>
          )}
          <Link
            to="/about"
            className="block text-xl sm:text-2xl font-medium hover:text-red-600"
          >
            About Us
          </Link>

          <Link
            to="/cranes"
            className="block text-xl sm:text-2xl font-medium hover:text-red-600"
          >
            Advices
          </Link>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="block text-xl sm:text-2xl font-medium hover:text-red-600 cursor-pointer"
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        widthClass="w-[92vw] max-w-[38rem]"
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        <ContactForm onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}

export default MobileDrawerMenu;
