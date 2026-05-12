import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../ui/Modal";
import ContactForm from "../../forms/contact/ContactForm";
import ServicesAccordion from "./ServicesAccordion";

import closeIcon from "../../../assets/icons/cross.png";

function MobileDrawerMenu({ isHome, setMenuOpen }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setServicesOpen(false);
    setMenuOpen(false);
  };

  const openContactModal = () => {
    setServicesOpen(false);
    setMenuOpen(false);
    setModalOpen(true);
  };

  const closeContactModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* blurred backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* side drawer */}
      <aside
        id="mobile-drawer-menu"
        className="fixed top-0 left-0 h-full z-50 w-[85vw] max-w-[22rem] bg-white shadow-lg p-5 sm:p-6 overflow-auto"
      >
        {/* Close button inside too */}
        <button
          type="button"
          onClick={closeMenu}
          className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-300 ease-out hover:scale-110 hover:bg-black/5 active:scale-95 animate-[menuCloseIn_280ms_ease-out]"
          aria-label="Close menu"
        >
          <img
            src={closeIcon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 transition-transform duration-300 ease-out hover:rotate-90"
          />
        </button>

        <nav className="mt-14 space-y-4 sm:mt-16">
          {!isHome && (
            <Link
              to="/"
              onClick={closeMenu}
              className="block text-xl sm:text-2xl font-medium hover:text-red-600"
            >
              Home
            </Link>
          )}
          <Link
            to="/about"
            onClick={closeMenu}
            className="block text-xl sm:text-2xl font-medium hover:text-red-600"
          >
            About Us
          </Link>

          <Link
            to="/cranes"
            onClick={closeMenu}
            className="block text-xl sm:text-2xl font-medium hover:text-red-600"
          >
            Crane Guide
          </Link>

          <button
            type="button"
            onClick={openContactModal}
            className="block text-xl sm:text-2xl font-medium hover:text-red-600 cursor-pointer"
          >
            Contact
          </button>
          <ServicesAccordion
            servicesOpen={servicesOpen}
            setServicesOpen={setServicesOpen}
            onLinkClick={closeMenu}
          />
        </nav>
      </aside>
      <Modal
        isOpen={isModalOpen}
        onClose={closeContactModal}
        widthClass="w-[92vw] max-w-[38rem]"
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        <ContactForm onClose={closeContactModal} />
      </Modal>
    </>
  );
}

export default MobileDrawerMenu;
