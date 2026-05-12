import instagramIcon from "../assets/icons/instagram.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import facebookIcon from "../assets/icons/facebook.png";
import xIcon from "../assets/icons/twitter-alt-circle.png";

export const MODAL_MODE = {
  CONTACT: "contact",
  COOKIES: "cookies",
  NEWSLETTER: "newsletter",
};

export const DISCOVER_LINKS = [
  {
    to: "/services#transport",
    label: "Transporting Cranes",
  },
  {
    to: "/services#sale-rent",
    label: "Crane Sales / Rent",
  },
  {
    to: "/services#installation-disassembly",
    label: "Installing & Disassembling Cranes",
  },
  {
    to: "/cranes",
    label: "Crane Guide",
  },
  {
    to: "/about",
    label: "Who we are",
  },
];

export const INFO_LINKS = [
  {
    to: "/terms",
    label: "Terms",
  },
  {
    to: "/imprint",
    label: "Imprint",
  },
  {
    to: "/privacy-policy",
    label: "Privacy Policy",
  },
];

export const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com",
    label: "Facebook",
    icon: facebookIcon,
  },
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    icon: instagramIcon,
  },
  {
    href: "https://x.com",
    label: "X",
    icon: xIcon,
  },
  {
    href: "https://whatsapp.com",
    label: "WhatsApp",
    icon: whatsappIcon,
  },
];

export const footerLinkClass = "hover:text-red-700 hover:underline";
