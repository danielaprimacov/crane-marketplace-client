import { motion } from "framer-motion";

import CranePromoCard from "../cranes/cards/CranePromoCard";

import { getCraneId } from "../../utils/craneHelpers.js";

function LastAddedCranes({ recentCranes = [] }) {
  const lastCranesContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const lastCranesItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const displayedCranes = Array.isArray(recentCranes)
    ? recentCranes.slice(0, 4)
    : [];

  return (
    <motion.div
      className="m-2 px-4 py-6 sm:p-5 lg:px-8"
      variants={lastCranesContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        className="text-2xl uppercase font-medium tracking-widest text-center my-6 sm:my-10 sm:text-3xl"
        variants={lastCranesItem}
      >
        Last Added Cranes
      </motion.h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {displayedCranes.map((crane) => (
          <motion.div key={getCraneId(crane)} variants={lastCranesItem}>
            <CranePromoCard crane={crane} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default LastAddedCranes;
