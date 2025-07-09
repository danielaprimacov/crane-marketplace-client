import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion.create(Link);

function LastAddedCranes({ recentCranes }) {
  const lastCranesContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const lastCranesItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const saleCranes = recentCranes.filter((c) => c.status === "for sale");
  const rentCranes = recentCranes.filter((c) => c.status === "for rent");

  return (
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
        {saleCranes.map((crane) => {
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
      <div className="flex flex-1 justify-between items-center p-6">
        {rentCranes.map((crane) => {
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
  );
}

export default LastAddedCranes;
