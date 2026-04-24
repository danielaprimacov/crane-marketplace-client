import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ChevronDown } from "lucide-react";

function ProducersSidebar({ producers, activeSlug }) {
  const navigate = useNavigate();

  const sorted = useMemo(
    () =>
      [...producers].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      ),
    [producers]
  );

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const currentSlug = activeSlug || sorted[0]?.slug || "";
  const activeProducer = sorted.find((producer) => producer.slug === currentSlug);


  const selectProducer = (slug) => {
    if (window.innerWidth < 1024) {
      setIsMobileOpen(false);
    }

    if (slug !== currentSlug) {
      navigate(`/cranes/producers/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <aside className="overflow-hidden bg-white">
      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-b-black/10 px-4 py-4 lg:hidden">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">
            Producer
          </p>
          <p className="truncate text-sm font-medium text-black">
            {activeProducer?.name || "Select producer"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="ml-4 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 text-black transition hover:bg-gray-50"
          aria-label={isMobileOpen ? "Hide producers" : "Show producers"}
          aria-expanded={isMobileOpen}
        >
          <ChevronDown
            className={`h-5 w-5 transition-all duration-300 ease-out ${
              isMobileOpen ? "rotate-180 scale-105" : "rotate-0 scale-100"
            }`}
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className={`${isMobileOpen ? "block" : "hidden"} lg:block`}>
        <ul className="max-h-[75vh] overflow-y-auto p-4 sm:p-5 lg:max-h-[calc(100vh-2rem)] lg:p-0">
          {sorted.map(({ name, slug, models = [] }) => {
            const isActive = currentSlug === slug;

            return (
              <li
                key={slug}
                className={`border-b border-black/10 last:border-b-0 ${
                  isActive ? "bg-red-50/50" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectProducer(slug)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left cursor-pointer transition hover:bg-gray-50 lg:px-6"
                >
                  <span
                    className={`text-sm uppercase tracking-wide transition sm:text-base ${
                      isActive ? "font-semibold text-red-600" : "text-black"
                    }`}
                  >
                    {name}
                    <span className="ml-2 text-black/50">
                      ({models.length})
                    </span>
                  </span>

                  <span
                    className={`hidden lg:inline shrink-0 text-lg leading-none transition ${
                      isActive ? "text-red-600" : "text-black/60"
                    }`}
                  >
                    {isActive ? "–" : "+"}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 lg:px-6">
                      <ul className="space-y-3 border-l border-black/10 pl-4">
                        {(models || []).filter(Boolean).map((model, index) => {
                          const craneId = model?.id || model?._id;
                          const label = model?.label || `Model ${index + 1}`;

                          return (
                            <li key={craneId || `${slug}-${index}`}>
                              {craneId ? (
                                <Link
                                  to={`/cranes/${craneId}`}
                                  className="block text-sm text-black/70 transition hover:text-red-600"
                                >
                                  {label}
                                </Link>
                              ) : (
                                <span className="block text-sm text-black/50">
                                  {label}
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default ProducersSidebar;
