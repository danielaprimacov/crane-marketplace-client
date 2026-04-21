import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProducersSidebar({ producers, activeSlug }) {
  const [openSlug, setOpenSlug] = useState(
    activeSlug || producers[0]?.slug || ""
  );

  const navigate = useNavigate();

  const sorted = useMemo(
    () =>
      [...producers].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      ),
    [producers]
  );

  useEffect(() => {
    if (activeSlug) {
      setOpenSlug(activeSlug);
      return;
    }

    if (!activeSlug && sorted.length > 0 && !openSlug) {
      setOpenSlug(sorted[0].slug);
    }
  }, [activeSlug, sorted, openSlug]);

  const selectProducer = (slug) => {
    setOpenSlug(slug);

    if (slug !== activeSlug)
      navigate(`/cranes/producers/${encodeURIComponent(slug)}`);
  };

  return (
    <aside className="w-full lg:w-1/4 lg:max-w-sm h-auto lg:h-screen max-h-[70vh] lg:max-h-none bg-white border-r border-r-black/20 overflow-y-auto lg:overflow-y-hidden transition-all">
      <ul className="p-4 pt-6 sm:pt-8 lg:pt-10 space-y-2">
        {sorted.map(({ name, slug, models }) => (
          <li
            key={slug}
            className="pb-3 border-b border-b-black/10 ml-0 sm:ml-4 lg:ml-8"
          >
            <button
              onClick={() => selectProducer(slug)}
              className="w-full flex justify-between items-center text-left py-2"
            >
              <span
                className={`cursor-pointer text-base sm:text-lg tracking-wider ${
                  openSlug === slug ? "text-red-600" : ""
                }`}
              >
                {name} ({models.length})
              </span>
              <span className="ml-2 shrink-0 scale-125 transform sm:scale-150">
                {openSlug === slug ? "–" : "+"}
              </span>
            </button>

            {openSlug === slug && (
              <ul className="mt-2 space-y-4 sm:space-y-5">
                {(models || []).filter(Boolean).map((model, index) => {
                  const craneId = model?.id || model?._id;
                  const label = model?.label || `Model ${index + 1}`;

                  return (
                    <li
                      key={craneId || `${slug}-${index}`}
                      className="text-sm cursor-pointer text-black/70"
                    >
                      {craneId ? (
                        <Link
                          to={`/cranes/${craneId}`}
                          className="hover:text-red-600 transition-colors"
                        >
                          {label}
                        </Link>
                      ) : (
                        <span>{label}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProducersSidebar;
