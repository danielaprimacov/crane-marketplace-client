import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useProducers } from "../hooks/useProducers";

const SCROLL_STEP = 1;
const FRAME_INTERVAL = 16;

import ArrowIcon from "./ArrowIcon";

function ProducersNav({ openSubnav, handleMouseEnter, handleMouseLeave }) {
  const { producers } = useProducers();
  const [needsScroll, setNeedsScroll] = useState(false);

  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (!el) return;
      setNeedsScroll(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [producers]);

  const startScroll = () => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) return;
      el.scrollLeft += SCROLL_STEP;
    }, FRAME_INTERVAL);
  };
  const stopScroll = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  return (
    <div
      className="relative flex items-center w-full ml-4"
      onMouseLeave={stopScroll}
    >
      <div className="overflow-hidden flex-1 pr-14">
        <ul
          ref={scrollRef}
          className="flex gap-6 whitespace-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{
            // hide scrollbar
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {producers.map(({ name, slug }) => (
            <li
              key={slug}
              className="group inline-block py-4 border-b-2 border-transparent hover:border-red-600 transition-colors duration-200"
              onMouseEnter={() => handleMouseEnter(slug)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-sm uppercase cursor-pointer font-medium text-black transition-colors duration-200 group-hover:text-red-600">
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {needsScroll && (
        <button
          onMouseEnter={startScroll}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ArrowIcon className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {openSubnav && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-white/30 backdrop-blur-sm z-30">
          <div
            className="w-full p-5 shadow-lg bg-white overflow-auto"
            onMouseEnter={() => handleMouseEnter(openSubnav)}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="space-y-4 mb-10 mt-2">
              <li className="pl-10 py-3">
                <Link
                  to={`/cranes/producers/${encodeURIComponent(openSubnav)}`}
                  className="text-gray-500 text-sm hover:text-red-600 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    {" "}
                    All Cranes <ArrowIcon className="w-2 pt-1" />
                  </div>
                </Link>
              </li>
              <div className="w-200 pl-10 grid grid-cols-2 gap-x-4 gap-y-8 justify-items-start">
                {producers
                  .find((p) => p.slug === openSubnav)
                  .models.slice(0, 4)
                  .map((crane) => {
                    const model = [
                      crane.seriesCode,
                      crane.capacityClassNumber,
                      crane.variantRevision,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    const firstImage = crane.images?.[0];

                    return (
                      <Link
                        to={`/cranes/${crane._id}`}
                        key={crane._id}
                        className="group flex gap-3 items-start"
                      >
                        <div className="w-32 h-24 overflow-hidden mb-2">
                          <img
                            src={firstImage}
                            alt={model}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-sm">
                          <p>{model}</p>
                          <span className="text-gray-500">{crane.title}</span>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProducersNav;
