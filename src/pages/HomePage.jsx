import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import VideoIntro from "../components/VideoIntro";

import installationPhoto from "../assets/images/installation.jpg";
import transportPhoto from "../assets/images/transport.jpeg";
import salePhoto from "../assets/images/sale.png";

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
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const lastCranesItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
            <button className="m-5 h-15 w-50 bg-white/50 cursor-pointer text-xl uppercase text-center rounded hover:bg-black/30 hover:text-white transition duration-400 ease-in-out">
              Learn more
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
            {recentCranes.map((crane) => (
              <MotionLink
                to={`/cranes/${crane._id}`}
                variants={lastCranesItem}
                className="w-70 h-80 flex justify-center border-gray-200 hover:shadow-md transition duration-300 transform"
                style={{
                  backgroundImage: `url(${crane.images?.[0] || ""})`,
                }}
              >
                <div className="flex flex-col justify-center items-center gap-40">
                  <div className="uppercase font-medium">{crane.status}</div>
                  <button className="py-2 px-4 bg-green-300 text-gray rounded-lg hover:text-black/80 hover:scale-105 transition duration-300 transform">
                    <Link to={`/cranes/${crane._id}/new-inquiry`}>
                      Send an inquiry
                    </Link>
                  </button>
                </div>
              </MotionLink>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
}

export default HomePage;
