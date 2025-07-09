import { useRef } from "react";
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

  const needsScroll = allProducers.length > VISIBLE;

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
  const containerWidth = VISIBLE * CARD_WIDTH + (VISIBLE - 1) * GAP;

  return (
    <div className="relative z-30 px-5 py-10" onMouseLeave={stopScroll}>
      {/* viewport */}
      <div className="overflow-hidden" style={{ width: containerWidth }}>
        {/* scrollable list */}
        <div
          ref={scrollRef}
          className="flex gap-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {allProducers.map((prod) => {
            const slug = encodeURIComponent(slugify(prod));
            return (
              <Link
                key={prod}
                to={`/cranes/producers/${slug}`}
                className="
                  flex-none w-[20rem] p-4 border border-gray-200 rounded 
                  bg-white uppercase text-center font-medium tracking-wide 
                  hover:shadow-lg transition
                "
              >
                {prod}
              </Link>
            );
          })}
        </div>
      </div>

      {/* hover-scroll arrow */}
      {needsScroll && (
        <button
          onMouseEnter={startScroll}
          className="
            absolute right-2 top-1/2 -translate-y-1/2  z-40
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
