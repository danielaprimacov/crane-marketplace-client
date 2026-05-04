import { useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../ui/Modal";
import ContactForm from "../forms/contact/ContactForm";
import CookieForm from "../forms/contact/CookieForm";
import NewsletterForm from "../forms/contact/NewsletterForm";

import instagramIcon from "../../assets/icons/instagram.png";
import whatsappIcon from "../../assets/icons/whatsapp.png";
import facebookIcon from "../../assets/icons/facebook.png";
import xIcon from "../../assets/icons/twitter-alt-circle.png";

function Footer() {
  const [modalMode, setModalMode] = useState(null);

  const closeModal = () => setModalMode(null);

  return (
    <>
      <footer
        id="footer"
        className="mt-10 px-4 py-10 sm:px-6 lg:px-12 bg-black/20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr_1.2fr]">
          {/* Company Information */}
          <div>
            <h3 className="text-black/40 uppercase mb-3">Address</h3>
            <p>123456, Muster</p>
            <p>Musterstrasse 12</p>
            <p>+49 123 456789</p>
          </div>
          {/* Links */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <ul>
              <h3 className="text-black/40 uppercase mb-3">Discover</h3>
              <li className="mb-2">
                <Link
                  to="/services#transport"
                  className="hover:text-red-700 hover:underline"
                >
                  Transporting Cranes
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services#sale-rent"
                  className="hover:text-red-700 hover:underline"
                >
                  Crane Sales / Rent
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/services#installation-disassembly"
                  className="hover:text-red-700 hover:underline"
                >
                  Instaling <br />& disassembling Cranes
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/cranes"
                  className="hover:text-red-700 hover:underline"
                >
                  Advices
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/about"
                  className="hover:text-red-700 hover:underline"
                >
                  Who we are
                </Link>
              </li>
            </ul>
            <ul>
              <h3 className="text-black/40 uppercase mb-3">Get in Touch</h3>
              <li className="mb-2">
                <button
                  className="hover:text-red-700 hover:underline cursor-pointer"
                  onClick={() => setModalMode("contact")}
                >
                  Contact
                </button>
              </li>
              <li className="mb-2">
                <Link
                  to="/revocation-claim"
                  className="hover:text-red-700 hover:underline"
                >
                  Revocation <br />& Claim
                </Link>
              </li>
            </ul>
            <ul>
              <h3 className="text-black/40 uppercase mb-3">Information</h3>
              <li className="mb-2">
                <Link
                  to="/terms"
                  className="hover:text-red-700 hover:underline"
                >
                  Terms
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/imprint"
                  className="hover:text-red-700 hover:underline"
                >
                  Imprint
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="hover:text-red-700 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <button
                  className="hover:text-red-700 hover:underline cursor-pointer"
                  onClick={() => setModalMode("cookies")}
                >
                  Cookies Settings
                </button>
              </li>
            </ul>
          </div>
          {/* Newsletter and Social Media */}
          <div>
            <p className="text-black/40 mb-2">Newsletter</p>
            <div className="mb-8 flex flex-col items-center sm:items-start gap-4">
              <p>
                Be part of the KranHub community and subscribe to the newsletter
                now!
              </p>
              <button
                className="px-8 py-2 w-full rounded-md bg-black text-white hover:bg-red-700 transform transition duration-300 ease-out"
                onClick={() => setModalMode("newsletter")}
              >
                Newsletter
              </button>
            </div>
            <p className="text-black/40 mb-5">Social media</p>
            <div className="flex justify-between gap-4 sm:gap-5">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebookIcon} alt="Facebook Icon" />
              </Link>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="Instagram Icon" />
              </Link>
              <Link
                to="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={xIcon} alt="X (Twitter) Icon" />
              </Link>
              <Link
                to="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsappIcon} alt="WhatsApp Icon" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <Modal
        isOpen={modalMode !== null}
        onClose={closeModal}
        widthClass={
          modalMode === "newsletter"
            ? "w-[92vw] max-w-[60rem]"
            : "w-[92vw] max-w-[38rem]"
        }
        panelClass="max-h-[92dvh] overflow-y-auto"
        contentClass="p-0"
      >
        {modalMode === "contact" && <ContactForm onClose={closeModal} />}
        {modalMode === "cookies" && (
          <CookieForm
            onClose={closeModal}
            onSave={(preferences) => {
              console.log("Cookie preferences:", preferences);
            }}
          />
        )}
        {modalMode === "newsletter" && <NewsletterForm onClose={closeModal} />}
      </Modal>
    </>
  );
}

export default Footer;
