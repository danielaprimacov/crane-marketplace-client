import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "./ArrowIcon";
import { slugify } from "../utils/helpers";

const SCROLL_STEP = 2; // px per frame
const FRAME_INTERVAL = 16; // ms per frame
const VISIBLE = 5; // how many cards are visible
const CARD_WIDTH = 320; // px — matches w-[20rem]
const GAP = 16;

function AllProducers({ allProducers }) {
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  const [needsScroll, setNeedsScroll] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (!el) return;
      setNeedsScroll(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [allProducers]);

  // start auto-scroll
  const startScroll = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      // stop at end
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) return;
      el.scrollLeft += SCROLL_STEP;
    }, FRAME_INTERVAL);
  };

  // stop & reset
  const stopScroll = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  // container width: 5 cards + 4 gaps
  const maxWidth = VISIBLE * CARD_WIDTH + (VISIBLE - 1) * GAP;

  return (
    <div className="z-30 py-10" onMouseLeave={stopScroll}>
      {/* scrollable list */}
      <div
        ref={scrollRef}
        className="relative flex gap-4 overflow-x-auto w-full max-w-[1664px]"
        style={{
          scrollBehavior: "smooth",
          // hide scrollbar
          msOverflowStyle: "none",
          scrollbarWidth: "none",
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

      {/* hover-scroll arrow */}
      {needsScroll && (
        <button
          onMouseEnter={startScroll}
          className="
            absolute right-2 top-17 -translate-y-1/2 z-40 cursor-pointer
            bg-white p-2 rounded-full shadow hover:bg-gray-100 transition
          "
        >
          <ArrowIcon className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}

export default AllProducers;
