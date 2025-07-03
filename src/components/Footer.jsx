import { Link } from "react-router-dom";

import instagramIcon from "../assets/icons/instagram.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import facebookIcon from "../assets/icons/facebook.png";
import xIcon from "../assets/icons/twitter-alt-circle.png";

function Footer() {
  return (
    <div id="footer" className="p-12 mt-10 bg-black/20 flex justify-between">
      {/* Company Information */}
      <div>
        <h3 className="text-black/40 uppercase mb-3">Address</h3>
        <p>123456, Muster</p>
        <p>Musterstrasse 12</p>
        <p>+49 123 456789</p>
      </div>
      {/* Links */}
      <div className="flex gap-2 justify-between">
        <ul className="pr-6">
          <h3 className="text-black/40 uppercase mb-3">Discover</h3>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Transporting Cranes
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Crane Sales
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Instaling <br />& disassembling Cranes
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Who we are
            </Link>
          </li>
        </ul>
        <ul className="pr-6">
          <h3 className="text-black/40 uppercase mb-3">Get in Touch</h3>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Contact
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Revocation <br />& Claim
            </Link>
          </li>
        </ul>
        <ul className="pl-6">
          <h3 className="text-black/40 uppercase mb-3">Information</h3>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Terms
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Imprint
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li className="mb-2">
            <Link to="" className="hover:text-red-700 hover:underline">
              Cookies Settings
            </Link>
          </li>
        </ul>
      </div>
      {/* Newsletter and Social Media */}
      <div>
        <p className="text-black/40 mb-2">Newsletter</p>
        <div className="flex flex-col items-center">
          <p className="pb-6">
            Be part of the KranHub community and subscribe to the newsletter
            now!
          </p>
          <button className="px-10 py-2 rounded-md bg-black text-white cursor-pointer hover:bg-red-700 transform transition duration-300 ease-out">
            Newsletter
          </button>
        </div>
        <p className="text-black/40 mb-5">Social media</p>
        <div className="flex justify-between px-6">
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
          <Link to="https://x.com" target="_blank" rel="noopener noreferrer">
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
  );
}

export default Footer;
