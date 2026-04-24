import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import VideoComponent from "./VideoComponent";

import introWebm from "../../assets/video/video-intro.webm";
import introMp4 from "../../assets/video/video-intro.mp4";
import videoPoster from "../../assets/images/poster-home-page.png";

const textVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

function HeroSection({ producers }) {
  const [muted, setMuted] = useState(true);
  const [showAlternate, setShowAlternate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlternate((prev) => !prev), 8000);
    return () => clearTimeout(timer);
  }, [showAlternate]);

  const firstProducerSlug = useMemo(() => {
    if (!producers.length) return null;

    return producers[0]?.slug || null;
  }, [producers]);

  const targetPath = firstProducerSlug
    ? `/cranes/producers/${firstProducerSlug}`
    : "/cranes";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoComponent
        introWebm={introWebm}
        introMp4={introMp4}
        poster={videoPoster}
        muted={muted}
        setMuted={setMuted}
        interactive={true}
        blurred={true}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!showAlternate ? (
            <motion.div
              key="primary"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3 text-center"
            >
              <p className="text-2xl uppercase tracking-tight text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl lg:text-5xl">
                KranHub presents
              </p>
              <p className="text-3xl uppercase tracking-wide text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] sm:text-5xl md:text-6xl lg:text-7xl">
                The Art of Precision Lifting
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="alternate"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-4xl px-2 text-center text-lg uppercase tracking-wide text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] sm:text-xl md:text-2xl lg:text-3xl"
            >
              If you have your own crane and want to sell or to give it to rent,
              then register and add it on our marketplace.
            </motion.p>
          )}
        </AnimatePresence>

        <Link to={targetPath} className="mt-6 sm:mt-8">
          <button className="inline-flex h-12 w-44 items-center justify-center rounded bg-white text-base uppercase transition duration-300 ease-in-out hover:bg-red-700 hover:text-white sm:h-14 sm:w-52 sm:text-lg">
            Discover more
          </button>
        </Link>
      </div>
    </div>
  );
}
export default HeroSection;
