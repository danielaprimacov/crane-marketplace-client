import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../ui/Modal";
import ContactForm from "../forms/contact/ContactForm";
import CookieForm from "../forms/contact/CookieForm";
import NewsletterForm from "../forms/contact/NewsletterForm";

import {
  MODAL_MODE,
  DISCOVER_LINKS,
  INFO_LINKS,
  SOCIAL_LINKS,
  footerLinkClass,
} from "../../constants/footer";

function FooterLinkList({ title, links }) {
  return (
    <div>
      <h3 className="mb-3 uppercase text-black/40">{title}</h3>

      <ul>
        {links.map((link) => (
          <li key={link.to} className="mb-2">
            <Link to={link.to} className={footerLinkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const [modalMode, setModalMode] = useState(null);

  const closeModal = () => setModalMode(null);

  const openContactModal = () => {
    setModalMode(MODAL_MODE.CONTACT);
  };

  const openCookieModal = () => {
    setModalMode(MODAL_MODE.COOKIES);
  };

  const openNewsletterModal = () => {
    setModalMode(MODAL_MODE.NEWSLETTER);
  };

  const isNewsletterModal = modalMode === MODAL_MODE.NEWSLETTER;

  return (
    <>
      <footer
        id="footer"
        className="mt-10 bg-gradient-to-b from-transparent via-gray-300/40 to-gray-500 px-4 py-10 sm:px-6 lg:px-12"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr_1.2fr]">
          {/* Company Information */}
          <section>
            <h3 className="text-black/40 uppercase mb-3">Address</h3>
            <address className="not-italic">
              <p>123456, Muster</p>
              <p>Musterstrasse 12</p>
              <p>+49 123 456789</p>
            </address>
          </section>
          {/* Links */}
          <section className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FooterLinkList title="Discover" links={DISCOVER_LINKS} />

            <div>
              <h3 className="text-black/40 uppercase mb-3">Get in Touch</h3>
              <ul>
                <li className="mb-2">
                  <button
                    type="button"
                    className={footerLinkClass}
                    onClick={openContactModal}
                  >
                    Contact
                  </button>
                </li>
                <li className="mb-2">
                  <Link to="/revocation-claim" className={footerLinkClass}>
                    Revocation & Claim
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <FooterLinkList title="Information" links={INFO_LINKS} />

              <button
                type="button"
                className={`${footerLinkClass} mt-2`}
                onClick={openCookieModal}
              >
                Cookies Settings
              </button>
            </div>
          </section>

          {/* Newsletter and Social Media */}
          <section>
            <p className="text-black/40 mb-2">Newsletter</p>
            <div className="mb-8 flex flex-col items-center sm:items-start gap-4">
              <p>
                Be part of the KranHub community and subscribe to the newsletter
                now!
              </p>
              <button
                type="button"
                className="px-8 py-2 w-full rounded-md bg-black text-white hover:bg-red-700 transform transition duration-300 ease-out"
                onClick={openNewsletterModal}
              >
                Newsletter
              </button>
            </div>
            <h3 className="text-black/40 mb-5">Social media</h3>
            <div className="flex justify-between gap-4 sm:gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition hover:scale-105"
                >
                  <img
                    src={social.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </section>
        </div>
      </footer>

      <Modal
        isOpen={modalMode !== null}
        onClose={closeModal}
        widthClass={
          isNewsletterModal
            ? "w-[92vw] max-w-[56rem]"
            : "w-[92vw] max-w-[38rem]"
        }
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        {modalMode === MODAL_MODE.CONTACT && (
          <ContactForm onClose={closeModal} />
        )}
        {modalMode === MODAL_MODE.COOKIES && (
          <CookieForm
            onClose={closeModal}
            onSave={(preferences) => {
              console.log("Cookie preferences:", preferences);
            }}
          />
        )}
        {modalMode === MODAL_MODE.NEWSLETTER && (
          <NewsletterForm onClose={closeModal} />
        )}
      </Modal>
    </>
  );
}

export default Footer;
