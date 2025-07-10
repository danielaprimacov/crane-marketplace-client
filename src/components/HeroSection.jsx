import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import VideoComponent from "./VideoComponent";

import introWebm from "../assets/video/video-intro.webm";
import introMp4 from "../assets/video/video-intro.mp4";
import videoPoster from "../assets/images/poster-home-page.png";

const textVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [showAlternate, setShowAlternate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlternate((prev) => !prev), 8000);
    return () => clearTimeout(timer);
  }, [showAlternate]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <VideoComponent
        introWebm={introWebm}
        introMp4={introMp4}
        poster={videoPoster}
        muted={muted}
        setMuted={setMuted}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {!showAlternate ? (
            <motion.div
              key="primary"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-2 text-center"
            >
              <p className="text-white uppercase text-2xl md:text-4xl lg:text-5xl tracking-tighter [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
                KranHub presents
              </p>
              <p className="mt-2 text-white uppercase text-center text-4xl md:text-6xl lg:text-7xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
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
              className="mt-15 px-50 text-white uppercase text-center text-xl md:text-2xl lg:text-3xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide"
            >
              If you have your own crane and want to sell or to give it to rent,
              then register and add it on our marketplace.
            </motion.p>
          )}
        </AnimatePresence>

        <Link to="/cranes">
          <button className="m-5 h-15 w-50 bg-white cursor-pointer text-xl uppercase text-center rounded hover:bg-red-700 hover:text-white transition duration-400 ease-in-out">
            Discover more
          </button>
        </Link>
      </div>
    </div>
  );
}
export default HeroSection;
