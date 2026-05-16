import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import installationPhoto from "../../assets/images/installation.jpg";
import transportPhoto from "../../assets/images/transport.jpeg";
import salePhoto from "../../assets/images/sale.png";

import { slugify } from "../../utils/helpers";

const MotionLink = motion.create(Link);

const SERVICES = [
  {
    src: transportPhoto,
    alt: "Crane Transportation",
    label: "Transportation",
  },
  { src: salePhoto, alt: "Crane Sales", label: "Sale / Rent" },
  {
    src: installationPhoto,
    alt: "Crane Installation",
    label: "Installation / Disassembly",
  },
];

const servicesContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const servicesItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

function Services() {
  return (
    <div className="m-2 px-4 py-6 sm:p-5 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-medium tracking-widest text-center mb-8 sm:mb-10">
        Our Services
      </h1>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
        variants={servicesContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map(({ src, alt, label }) => (
          <MotionLink
            to={`/services#${encodeURIComponent(slugify(label))}`}
            key={label}
            variants={servicesItem}
            className="flex flex-col overflow-hidden border border-gray-200 transition duration-300 hover:shadow-md"
          >
            <div className="flex items-center justify-center">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="h-56 w-full object-cover sm:h-64 lg:h-72"
              />
            </div>
            <div className="flex min-h-[120px] items-center justify-center px-4 py-8 sm:min-h-[140px] sm:py-10">
              <p className="text-black text-lg text-center sm:text-xl">
                {label}
              </p>
            </div>
          </MotionLink>
        ))}
      </motion.div>
    </div>
  );
}

export default Services;
