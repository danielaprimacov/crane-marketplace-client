import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

import { useProducers } from "../../hooks/useProducers";
import {
  getCraneId,
  getImageUrl,
  getCraneModel,
} from "../../utils/craneHelpers";

import ArrowIcon from "../ui/ArrowIcon";

function ProducersNav({
  openSubnav,
  handleMouseEnter,
  handleMouseLeave,
  closeSubnav,
  menuOpen,
}) {
  const { producers = [] } = useProducers();
  const [needsScroll, setNeedsScroll] = useState(false);

  const scrollRef = useRef(null);
  const rafRef = useRef(null);

  const activeProducer = useMemo(
    () => producers.find((producer) => producer.slug === openSubnav),
    [producers, openSubnav]
  );

  const featuredModels = activeProducer?.models?.slice(0, 4) ?? [];

  const stopScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

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

  useEffect(() => {
    return () => {
      stopScroll();
    };
  }, [stopScroll]);

  const startScroll = () => {
    if (menuOpen || rafRef.current) return;

    const step = () => {
      const element = scrollRef.current;
      if (!element) {
        rafRef.current = null;
        return;
      }

      const maxScrollLeft = element.scrollWidth - element.clientWidth;

      if (element.scrollLeft < maxScrollLeft) {
        element.scrollLeft += 1;
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <div
      className={`relative hidden lg:flex items-center w-full lg:ml-4 ${
        menuOpen ? "pointer-events-none" : ""
      }`}
      onMouseLeave={stopScroll}
    >
      <div className="min-w-0 overflow-hidden flex-1 pr-12 lg:pr-14">
        <ul
          ref={scrollRef}
          className="flex gap-6 whitespace-nowrap overflow-x-auto hide-scrollbar"
          style={{
            // hide scrollbar
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {producers.map(({ name, slug }) => (
            <li
              key={slug}
              className={`group inline-block py-4 border-b-2 border-transparent transition-colors duration-200 ${
                menuOpen ? "" : "hover:border-red-600"
              }`}
              onMouseEnter={() => handleMouseEnter(slug)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={`/cranes/producers/${encodeURIComponent(slug)}`}
                onClick={closeSubnav}
                className={`text-xs lg:text-sm uppercase tracking-wide font-medium transition-colors duration-200 ${
                  menuOpen
                    ? "text-black cursor-default"
                    : "text-black cursor-pointer group-hover:text-red-600"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {needsScroll && !menuOpen && (
        <button
          type="button"
          onMouseEnter={startScroll}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
        >
          <ArrowIcon className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {openSubnav && !menuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-white/30 backdrop-blur-sm z-30">
          <div
            className="bg-white shadow-lg"
            onMouseEnter={() => handleMouseEnter(openSubnav)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full pr-4 pl-12 py-5 lg:pl-18 lg:pr-8">
              <div className="space-y-4 mb-8 mt-2">
                <div className="py-2">
                  <Link
                    to={`/cranes/producers/${encodeURIComponent(openSubnav)}`}
                    onClick={closeSubnav}
                    className="inline-flex items-center gap-2 text-gray-500 text-sm hover:text-red-600 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <span>All Cranes </span>
                      <ArrowIcon className="w-2 pt-0.5" />
                    </div>
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {featuredModels.map((crane) => {
                    const craneId = getCraneId(crane);
                    const model = getCraneModel(crane);
                    const firstImageUrl = getImageUrl(crane);

                    if (!craneId) return null;

                    return (
                      <Link
                        to={`/cranes/${craneId}`}
                        onClick={closeSubnav}
                        key={craneId}
                        className="group flex gap-3 items-start"
                      >
                        <div className="w-32 h-24 shrink-0 rounded overflow-hidden">
                          {firstImageUrl ? (
                            <img
                              src={firstImageUrl}
                              alt={model}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 text-sm">
                          <p className="truncate font-medium text-black group-hover:text-red-600">
                            {model || "Model not set"}
                          </p>
                          <span className="block truncate text-gray-500">
                            {crane.title || "Untitled crane"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProducersNav;
