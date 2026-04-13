import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/helpers";

const SCROLL_STEP = 2;
const EDGE_ZONE = 0.28; // 28% left and right zones, middle stays still

function AllProducers({ allProducers }) {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const directionRef = useRef(0); // -1 = left, 1 = right, 0 = stop

  const [needsScroll, setNeedsScroll] = useState(false);
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverMode = (e) => {
      setIsHoverDevice(e.matches);
    };

    setIsHoverDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateHoverMode);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverMode);
    };
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (!el) return;
      setNeedsScroll(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [allProducers]);

  const stopScroll = useCallback(() => {
    directionRef.current = 0;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const runScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      animationRef.current = null;
      return;
    }

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const direction = directionRef.current;

    if (direction === 0) {
      animationRef.current = null;
      return;
    }

    const nextScrollLeft = el.scrollLeft + direction * SCROLL_STEP;
    const clamped = Math.max(0, Math.min(nextScrollLeft, maxScrollLeft));

    el.scrollLeft = clamped;

    // stop only if is reached one end and keep trying to go further
    if (
      (clamped === 0 && direction < 0) ||
      (clamped === maxScrollLeft && direction > 0)
    ) {
      animationRef.current = null;
      return;
    }

    animationRef.current = requestAnimationFrame(runScroll);
  }, []);

  const ensureAnimation = useCallback(() => {
    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(runScroll);
    }
  }, [runScroll]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isHoverDevice || !needsScroll) return;

      const el = scrollRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;

      if (ratio < EDGE_ZONE) {
        directionRef.current = -1; // left
        ensureAnimation();
      } else if (ratio > 1 - EDGE_ZONE) {
        directionRef.current = 1; // right
        ensureAnimation();
      } else {
        stopScroll(); // middle zone
      }
    },
    [isHoverDevice, needsScroll, ensureAnimation, stopScroll]
  );

  useEffect(() => {
    return () => stopScroll();
  }, [stopScroll]);

  return (
    <section className="relative z-30 py-10">
      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
        className="flex gap-4 overflow-x-auto w-full max-w-[1664px] px-2"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {allProducers.map((prod) => {
          const slug = encodeURIComponent(slugify(prod));

          return (
            <Link
              key={prod}
              to={`/cranes/producers/${slug}`}
              className="flex-none w-[20rem] p-4 text-lg rounded bg-white uppercase text-center font-bold tracking-widest hover:shadow-lg transition"
            >
              {prod}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default AllProducers;
