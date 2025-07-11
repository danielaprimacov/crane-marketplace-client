import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProducersSidebar({ producers, activeSlug }) {
  const [openSlug, setOpenSlug] = useState(
    activeSlug || producers[0]?.slug || ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (activeSlug) {
      setOpenSlug(activeSlug);
    }
  }, [activeSlug]);

  const selectProducer = (slug) => {
    setOpenSlug(slug);
    navigate(`/cranes/producers/${slug}`);
  };

  const sorted = useMemo(
    () =>
      [...producers].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      ),
    [producers]
  );

  return (
    <aside className="top-0 left-0 h-screen w-1/4 max-w-sm bg-white border-r border-r-black/20 overflow-y-hidden hover:overflow-y-auto transition-all">
      <ul className="p-4 space-y-2 pt-10">
        {sorted.map(({ name, slug, models }) => (
          <li key={slug} className="ml-8 pb-3 border-b border-b-black/10">
            <button
              onClick={() => selectProducer(slug)}
              className="w-full flex justify-between items-center text-left py-2"
            >
              <span
                className={`cursor-pointer text-lg tracking-wider ${
                  openSlug === slug ? "text-red-600" : ""
                }`}
              >
                {name} ({models.length})
              </span>
              <span className="ml-2 transform scale-150">
                {openSlug === slug ? "–" : "+"}
              </span>
            </button>

            {openSlug === slug && (
              <ul className="mt-2 space-y-5">
                {models.map(({ id, label }) => (
                  <li key={id} className="text-sm cursor-pointer text-black/70">
                    <Link to={`/cranes/${id}`}>{label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default ProducersSidebar;
