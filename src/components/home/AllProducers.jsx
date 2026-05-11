import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/helpers";

const SCROLL_STEP = 2;
const EDGE_ZONE = 0.28; // 28% left and right zones, middle stays still

function AllProducers({ allProducers = [] }) {
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
    const clampedScrollLeft = Math.max(
      0,
      Math.min(nextScrollLeft, maxScrollLeft)
    );

    element.scrollLeft = clampedScrollLeft;

    const reachedLeftEnd = clampedScrollLeft === 0 && direction < 0;
    const reachedRightEnd =
      clampedScrollLeft === maxScrollLeft && direction > 0;

    if (reachedLeftEnd || reachedRightEnd) {
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

  const safeProducers = Array.isArray(allProducers) ? allProducers : [];

  if (safeProducers.length === 0) {
    return null;
  }

  return (
    <section className="relative z-30 py-8 sm:py-10">
      <div
        ref={scrollRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={stopScroll}
        className="hide-scrollbar flex w-full gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-6 lg:px-8"
        style={{
          scrollBehavior: "smooth",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
        }}
      >
        {safeProducers.map((prod) => {
          const producerName = String(prod || "").trim();

          if (!producerName) return null;

          const slug = encodeURIComponent(slugify(producerName));

          return (
            <Link
              key={prod}
              to={`/cranes/producers/${slug}`}
              className="flex-none rounded px-4 py-4 text-sm bg-white uppercase text-center font-bold tracking-widest transition hover:shadow-lg sm:w-[18rem] sm:text-base lg:w-[20rem]"
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
