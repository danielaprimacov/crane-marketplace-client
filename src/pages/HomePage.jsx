import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import VideoIntro from "../components/VideoIntro";

import installationPhoto from "../assets/images/installation.jpg";
import transportPhoto from "../assets/images/transport.jpeg";
import salePhoto from "../assets/images/sale.png";
import teamPhoto from "../assets/images/team.jpg";

import instagramIcon from "../assets/icons/instagram.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import facebookIcon from "../assets/icons/facebook.png";
import xIcon from "../assets/icons/twitter-alt-circle.png";

const API_URL = "http://localhost:5005";
const MotionLink = motion(Link);

function HomePage() {
  const [cranes, setCranes] = useState([]);
  const [recentCranes, setRecentCranes] = useState([]);

  const servicesContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const lastCranesContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const servicesItem = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  const lastCranesItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const services = [
    {
      src: transportPhoto,
      alt: "Crane Transportation",
      label: "Transportation",
    },
    { src: salePhoto, alt: "Crane Sales", label: "Sale" },
    {
      src: installationPhoto,
      alt: "Crane Installation",
      label: "Installation / Disassembly",
    },
  ];

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // sort newest first
        const recent = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setCranes(data);
        setRecentCranes(recent);
      } catch (err) {
        console.error("Failed to load cranes", err);
      }
    };
    fetchCranes();
  }, []);

  const topProducers = useMemo(() => {
    const counts = cranes.reduce((acc, { producer }) => {
      if (!producer) return acc;
      acc[producer] = (acc[producer] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .slice(0, 4)
      .map(([prod]) => prod);
  }, [cranes]);

  return (
    <>
      <div className="relative w-full h-auto overflow-hidden ">
        <VideoIntro />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <p className="text-white uppercase text-2xl md:text-4xl lg:text-5xl tracking-tighter [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
            KranHub presents
          </p>
          <p className="mt-2 text-white uppercase text-center text-4xl md:text-6xl lg:text-7xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
            The Art of Precision Lifting
          </p>
          <Link to="">
            <button className="m-5 h-15 w-50 bg-white cursor-pointer text-xl uppercase text-center rounded hover:bg-red-700 hover:text-white transition duration-400 ease-in-out">
              Discover more
            </button>
          </Link>
        </div>
      </div>
      <main className="relative z-20 bg-white">
        {/* Producers */}
        <div className="flex p-4 justify-evenly items-center">
          {topProducers.map((prod) => (
            <Link
              to=""
              key={prod}
              className="
              px-4 py-2 w-[20rem] border border-gray-200 rounded bg-white text-m font-medium uppercase text-center tracking-wide whitespace-nowrap
              cursor-pointer transition duration-300 transform hover:text-black/200 hover:scale-105 

            "
            >
              {prod}
            </Link>
          ))}
        </div>
        {/* Services */}
        <div className="p-5 m-2">
          <h1 className="text-4xl uppercase font-medium tracking-widest text-center mb-8">
            Our Services
          </h1>
          <motion.div
            className="flex justify-evenly items-center p-6 gap-7"
            variants={servicesContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map(({ src, alt, label }) => (
              <MotionLink
                to=""
                key={label}
                variants={servicesItem}
                className="flex-1 flex flex-col border border-gray-200 hover:shadow-md transition duration-300 transform"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={src}
                    alt={alt}
                    className="h-70 w-full object-cover"
                  />
                </div>
                <div className="py-15 flex items-center justify-center">
                  <p className="text-black-700 text-xl">{label}</p>
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
        {/* Last Added Cranes */}
        <motion.div
          className="p-5 m-2"
          variants={lastCranesContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="text-2xl uppercase font-medium tracking-widest text-center mb-3"
            variants={lastCranesItem}
          >
            Last Added Cranes
          </motion.h1>
          <div className="flex flex-1 justify-between items-center p-6">
            {recentCranes.map((crane) => {
              const imageUrl = crane.images?.[0];
              return (
                <MotionLink
                  key={crane._id}
                  to={`/cranes/${crane._id}`}
                  variants={lastCranesItem}
                  style={{
                    ...(imageUrl && {
                      backgroundImage: `url("${imageUrl}")`,
                    }),
                  }}
                  className="group w-[18rem] h-[20rem] relative overflow-hidden flex justify-center border-gray-200 rounded bg-no-repeat bg-cover bg-center hover:shadow-md transition duration-300"
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col justify-center items-center gap-40">
                    <div className="uppercase font-medium text-2xl text-white tracking-wider transform transition-transform duration-300 ease-out group-hover:-translate-y-2">
                      {crane.status}
                    </div>
                    <button className="py-2 px-4 bg-green-300 text-gray rounded-lg hover:text-black/80 hover:scale-105 transition duration-300 transform">
                      <Link to={`/cranes/${crane._id}/new-inquiry`}>
                        Send an inquiry
                      </Link>
                    </button>
                  </div>
                </MotionLink>
              );
            })}
          </div>
        </motion.div>
        {/* Information Section */}
        <div className="p-5 m-2">
          <div className="px-6 mt-4 flex justify-between items-center gap-10">
            <img
              src={teamPhoto}
              alt="Team Members"
              className="h-[25rem] rounded-md shadow-sm"
            />
            <section className="px-5 flex flex-col justify-center items-center gap-4 text-center">
              <p className="text-xl text-black/70">
                KranHub is the premier B2B marketplace for crane
                solutions—offering a curated fleet of tower, mobile, and crawler
                cranes for sale or rent. Our full-service company manages every
                step of the process—from precision assembly and secure transport
                to safe disassembly your project stays on schedule and within
                budget. Backed by certified technicians, transparent pricing,
                and 24/7 support, KranHub delivers reliable heavy-lifting
                expertise you can trust.{" "}
                <p className="mt-2 text-red-700">
                  Ready to discuss your next project?
                </p>
              </p>
              <Link
                to=""
                className="px-8 py-4 mt-5 bg-black text-white rounded-lg hover:bg-red-700 transform transition duration-300 ease-out"
              >
                <button className="cursor-pointer">Contact Us</button>
              </Link>
            </section>
          </div>
        </div>
        {/* Footer */}
        <div className="p-12 mt-10 bg-black/20 flex justify-between">
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
      </main>
    </>
  );
}

export default HomePage;
