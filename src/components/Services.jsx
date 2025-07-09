import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import installationPhoto from "../assets/images/installation.jpg";
import transportPhoto from "../assets/images/transport.jpeg";
import salePhoto from "../assets/images/sale.png";

import { slugify } from "../utils/helpers";

const MotionLink = motion.create(Link);

function Services() {
  const servicesContainer = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const servicesItem = {
    hidden: { opacity: 0, x: 0 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
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

  return (
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
            to={`/services#${encodeURIComponent(slugify(label))}`}
            key={label}
            variants={servicesItem}
            className="flex-1 flex flex-col border border-gray-200 hover:shadow-md transition duration-300 transform"
          >
            <div className="flex items-center justify-center">
              <img src={src} alt={alt} className="h-70 w-full object-cover" />
            </div>
            <div className="py-15 flex items-center justify-center">
              <p className="text-black-700 text-xl">{label}</p>
            </div>
          </MotionLink>
        ))}
      </motion.div>
    </div>
  );
}

export default Services;
