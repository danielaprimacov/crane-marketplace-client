import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import ProducersSidebar from "../components/ProducersSidebar";
import FilterDropDown from "../components/FilterDropDown";
import RangeDropDown from "../components/RangeDropDown";

const API_URL = import.meta.env.VITE_API_URL;
import { slugify } from "../utils/helpers";

function ProducerPage() {
  const { producerSlug } = useParams();
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState({
    capacityMin: "",
    capacityMax: "",
    heightMin: "",
    heightMax: "",
    radiusMin: "",
    radiusMax: "",
    priceMin: "",
    priceMax: "",
    status: "",
    location: "",
    search: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/cranes`);
        const withPrice = data.map((c) => ({
          ...c,
          price:
            c.status === "for sale" ? c.salePrice : c.rentPrice?.amount ?? 0,
        }));
        setCranes(withPrice);
      } catch (err) {
        console.error(err);
        setError("Unable to load cranes.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // group all cranes by producer for the sidebar
  const groupCranes = useMemo(() => {
    const byProducer = {};
    cranes.forEach((c) => {
      if (!c.producer) return;
      byProducer[c.producer] = byProducer[c.producer] || [];
      byProducer[c.producer].push(c);
    });
    return Object.entries(byProducer).map(([name, list]) => {
      const slug = slugify(name);
      const models = list.map((c) => {
        const rev = c.variantRevision?.trim();
        const label = rev
          ? `${c.seriesCode} ${c.capacityClassNumber}t ${rev}`
          : `${c.seriesCode} ${c.capacityClassNumber}t`;
        return { id: c._id, label };
      });
      return { name, slug, models };
    });
  }, [cranes]);

  const activeGroup = groupCranes.find((g) => g.slug === producerSlug);

  const myCranes = useMemo(() => {
    if (!activeGroup) return [];
    return cranes.filter((c) => c.producer === activeGroup.name);
  }, [cranes, activeGroup]);

  const [minCap, maxCap] = useMemo(() => {
    if (!myCranes.length) return [0, 0];
    const arr = myCranes.map((c) => c.capacity || 0);
    return [Math.min(...arr), Math.max(...arr)];
  }, [myCranes]);

  const [minH, maxH] = useMemo(() => {
    if (!myCranes.length) return [0, 0];
    const arr = myCranes.map((c) => c.height || 0);
    return [Math.min(...arr), Math.max(...arr)];
  }, [myCranes]);

  const [minR, maxR] = useMemo(() => {
    if (!myCranes.length) return [0, 0];
    const arr = myCranes.map((c) => c.radius || 0);
    return [Math.min(...arr), Math.max(...arr)];
  }, [myCranes]);

  const [minP, maxP] = useMemo(() => {
    if (!myCranes.length) return [0, 0];
    const arr = myCranes.map((c) => c.price || 0);
    return [Math.min(...arr), Math.max(...arr)];
  }, [myCranes]);

  const [capRange, setCapRange] = useState([minCap, maxCap]);
  const [hRange, setHRange] = useState([minH, maxH]);
  const [rRange, setRRange] = useState([minR, maxR]);
  const [pRange, setPRange] = useState([minP, maxP]);

  useEffect(() => setCapRange([minCap, maxCap]), [minCap, maxCap]);
  useEffect(() => setHRange([minH, maxH]), [minH, maxH]);
  useEffect(() => setRRange([minR, maxR]), [minR, maxR]);
  useEffect(() => setPRange([minP, maxP]), [minP, maxP]);

  const applyCapacity = ([a, b]) =>
    setFilters((f) => ({ ...f, capacityMin: a, capacityMax: b }));
  const applyHeight = ([a, b]) =>
    setFilters((f) => ({ ...f, heightMin: a, heightMax: b }));
  const applyRadius = ([a, b]) =>
    setFilters((f) => ({ ...f, radiusMin: a, radiusMax: b }));
  const applyPrice = ([a, b]) =>
    setFilters((f) => ({ ...f, priceMin: a, priceMax: b }));

  const statusOptions = useMemo(() => {
    return Array.from(
      new Set(myCranes.map((c) => c.status).filter(Boolean))
    ).map((value) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
    }));
  }, [myCranes]);

  const filteredCranes = useMemo(() => {
    return myCranes.filter((c) => {
      const txtOk =
        !filters.search ||
        c.title.toLowerCase().includes(filters.search) ||
        (c.description || "").toLowerCase().includes(filters.search);
      const inRange = (val, min, max) =>
        val >= (min !== "" ? +min : -Infinity) &&
        val <= (max !== "" ? +max : +Infinity);

      if (!inRange(c.capacity, filters.capacityMin, filters.capacityMax))
        return false;
      if (!inRange(c.height, filters.heightMin, filters.heightMax))
        return false;
      if (!inRange(c.radius, filters.radiusMin, filters.radiusMax))
        return false;
      if (!inRange(c.price, filters.priceMin, filters.priceMax)) return false;
      if (filters.status && c.status !== filters.status) return false;
      if (filters.location && c.location !== filters.location) return false;
      return txtOk;
    });
  }, [myCranes, filters]);

  const hasAny = Object.values(filters).some((v) => v !== "");
  const displayList = hasAny ? filteredCranes : myCranes;

  // Reset all filters
  const resetAllFilters = () => {
    setFilters({
      capacityMin: "",
      capacityMax: "",
      heightMin: "",
      heightMax: "",
      radiusMin: "",
      radiusMax: "",
      priceMin: "",
      priceMax: "",
      status: "",
      location: "",
      search: "",
    });
    setCapRange([minCap, maxCap]);
    setHRange([minH, maxH]);
    setRRange([minR, maxR]);
    setPRange([minP, maxP]);
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!activeGroup)
    return <p className="text-red-600">Unknown producer “{producerSlug}”.</p>;

  return (
    <div className="flex mt-15 mx-5">
      <ProducersSidebar producers={groupCranes} activeSlug={producerSlug} />
      <main className="flex-1 p-6">
        {myCranes.length === 0 ? (
          <p>No cranes found for “{producerSlug}.”</p>
        ) : (
          <div className="mt-10 ml-10">
            {/* Reset all filters button */}
            <div className="mb-2 text-right">
              <button
                onClick={resetAllFilters}
                className="text-sm text-red-600 hover:underline"
              >
                Reset all filters
              </button>
            </div>
            {/* Filter controls */}
            <div className="mb-5 flex flex-wrap gap-4 items-center">
              {/* Capacity */}
              {minCap < maxCap ? (
                <RangeDropDown
                  label="Capacity (t)"
                  min={minCap}
                  max={maxCap}
                  step={1}
                  value={capRange}
                  onChange={setCapRange}
                  onApply={applyCapacity}
                />
              ) : (
                <div className="px-4 py-2 bg-gray-100 rounded">
                  Capacity: {minCap} t
                </div>
              )}

              {/* Height */}
              {minH < maxH ? (
                <RangeDropDown
                  label="Height (m)"
                  min={minH}
                  max={maxH}
                  step={1}
                  value={hRange}
                  onChange={setHRange}
                  onApply={applyHeight}
                />
              ) : (
                <div className="px-4 py-2 bg-gray-100 rounded">
                  Height: {minH} m
                </div>
              )}

              {/* Radius */}
              {minR < maxR ? (
                <RangeDropDown
                  label="Radius (m)"
                  min={minR}
                  max={maxR}
                  step={1}
                  value={rRange}
                  onChange={setRRange}
                  onApply={applyRadius}
                />
              ) : (
                <div className="px-4 py-2 bg-gray-100 rounded">
                  Radius: {minR} m
                </div>
              )}

              {/* Price */}
              {minP < maxP ? (
                <RangeDropDown
                  label="Price"
                  min={minP}
                  max={maxP}
                  step={1}
                  value={pRange}
                  onChange={setPRange}
                  onApply={applyPrice}
                />
              ) : (
                <div className="px-4 py-2 bg-gray-100 rounded">
                  Price: €{minP}
                </div>
              )}

              <FilterDropDown
                label="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
              />

              {/* Text search */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                  }
                  className="border border-gray-400 px-3 py-1 rounded pr-8 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/40"
                />
                <svg
                  className="w-4 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.853,22.131l-4.958-4.941c1.363-1.573,2.075-3.811,2.129-6.707-.105-6.067-3.482-9.43-9.515-9.469C4.398,1.053,1,4.553,1,10.483c0,6.049,3.313,9.45,9.515,9.487,2.871-.017,5.098-.711,6.674-2.074l4.959,4.943c.306,.275,.609,.097,.707,0,.194-.196,.194-.512-.002-.707Zm-12.338-3.161c-5.622-.033-8.407-2.807-8.515-8.478,.104-5.669,2.89-8.442,8.509-8.478,5.553,.036,8.418,2.891,8.515,8.468-.104,5.678-2.89,8.454-8.509,8.487Z" />
                </svg>
              </div>
            </div>

            {displayList.length === 0 ? (
              <p className="mt-6 text-center">
                {hasAny
                  ? "No cranes match those filters."
                  : "No cranes available."}
              </p>
            ) : (
              <div className="flex flex-wrap gap-5">
                {displayList.map((c) => {
                  const model = [
                    c.seriesCode,
                    c.capacityClassNumber,
                    c.variantRevision,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  const bgUrl =
                    Array.isArray(c.images) && c.images.length > 0
                      ? c.images[0]
                      : null;
                  return (
                    <div
                      key={c._id}
                      className="w-72 h-72 rounded-md shadow-md overflow-hidden"
                    >
                      <div className="w-full h-44 overflow-hidden rounded-t-md">
                        {bgUrl ? (
                          <div
                            className="w-full h-full bg-cover bg-center transform transition-transform duration-200 hover:scale-105"
                            style={{ backgroundImage: `url(${bgUrl})` }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>
                      <div className="ml-2 mt-2">
                        <Link
                          to={`/cranes/${c._id}`}
                          className="font-medium hover:underline"
                        >
                          {c.title}
                        </Link>
                        <p className="text-gray-500 pb-2">{model}</p>
                      </div>
                      <div className="py-2 text-right">
                        <span className="p-2 font-bold tracking-wider">
                          {c.status === "for sale" ? "For Sale" : "For Rent"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProducerPage;
