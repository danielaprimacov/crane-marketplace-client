import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import ProducersSidebar from "../components/cranes/ProducersSidebar";
import FilterDropDown from "../components/ui/FilterDropDown";
import RangeDropDown from "../components/ui/RangeDropDown";

import { slugify, formatPrice, getMinMax } from "../utils/helpers";

const API_URL = import.meta.env.VITE_API_URL;

const INITIAL_FILTERS = {
  capacityMin: "",
  capacityMax: "",
  heightMin: "",
  heightMax: "",
  radiusMin: "",
  radiusMax: "",
  priceMin: "",
  priceMax: "",
  status: "",
  search: "",
};

function ProducerPage() {
  const { producerSlug } = useParams();
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/cranes`);
        const withPrice = data.map((c) => ({
          ...c,
          price:
            c.status === "for sale"
              ? c.salePrice ?? 0
              : c.rentPrice?.amount ?? 0,
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
        const label = [
          c.seriesCode,
          c.capacityClassNumber ? `${c.capacityClassNumber}t` : "",
          c.variantRevision?.trim(),
        ]
          .filter(Boolean)
          .join(" ");
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

  const [minCap, maxCap] = useMemo(
    () => getMinMax(myCranes, (c) => c.capacity ?? 0),
    [myCranes]
  );

  const [minH, maxH] = useMemo(
    () => getMinMax(myCranes, (c) => c.height ?? 0),
    [myCranes]
  );

  const [minR, maxR] = useMemo(
    () => getMinMax(myCranes, (c) => c.radius ?? 0),
    [myCranes]
  );

  const [minP, maxP] = useMemo(
    () => getMinMax(myCranes, (c) => c.price ?? 0),
    [myCranes]
  );

  const [capRange, setCapRange] = useState([minCap, maxCap]);
  const [hRange, setHRange] = useState([minH, maxH]);
  const [rRange, setRRange] = useState([minR, maxR]);
  const [pRange, setPRange] = useState([minP, maxP]);

  useEffect(() => {
    setCapRange([minCap, maxCap]);
    setHRange([minH, maxH]);
    setRRange([minR, maxR]);
    setPRange([minP, maxP]);
  }, [producerSlug, minCap, maxCap, minH, maxH, minR, maxR, minP, maxP]);

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
    const searchTerm = filters.search.trim().toLowerCase();

    const matchesRange = (value, min, max) => {
      const hasMin = min !== "";
      const hasMax = max !== "";

      if (!hasMin && !hasMax) return true;
      if (value == null || Number.isNaN(Number(value))) return false;

      const numericValue = Number(value);

      return (
        numericValue >= (hasMin ? Number(min) : -Infinity) &&
        numericValue <= (hasMax ? Number(max) : Infinity)
      );
    };

    return myCranes.filter((c) => {
      const modelText = [
        c.seriesCode,
        c.capacityClassNumber ? `${c.capacityClassNumber}t` : "",
        c.variantRevision,
        c.producer,
        c.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const textOk =
        !searchTerm ||
        (c.title || "").toLowerCase().includes(searchTerm) ||
        (c.description || "").toLowerCase().includes(searchTerm) ||
        modelText.includes(searchTerm);

      if (!matchesRange(c.capacity, filters.capacityMin, filters.capacityMax))
        return false;

      if (!matchesRange(c.height, filters.heightMin, filters.heightMax))
        return false;

      if (!matchesRange(c.radius, filters.radiusMin, filters.radiusMax))
        return false;

      if (!matchesRange(c.price, filters.priceMin, filters.priceMax))
        return false;

      if (filters.status && c.status !== filters.status) return false;

      return textOk;
    });
  }, [myCranes, filters]);
  const hasAny = Object.values(filters).some((v) => v !== "");
  const displayList = filteredCranes;

  // Reset all filters
  const resetAllFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCapRange([minCap, maxCap]);
    setHRange([minH, maxH]);
    setRRange([minR, maxR]);
    setPRange([minP, maxP]);
  };

  useEffect(() => {
    setFilters(INITIAL_FILTERS);
  }, [producerSlug]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!activeGroup) {
    return (
      <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <p className="text-red-600">Unknown producer “{producerSlug}”.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* navigation panel */}
        <div className="self-start lg:sticky lg:top-10">
          <ProducersSidebar producers={groupCranes} activeSlug={producerSlug} />
        </div>

        {/* content section */}
        <main className="min-w-0">
          {myCranes.length === 0 ? (
            <div className="bg-white p-6 sm:p-8">
              <p className="text-sm text-gray-600 sm:text-base">
                No cranes found for “{producerSlug}”.
              </p>
            </div>
          ) : (
            <div className="bg-white p-4 sm:p-6 lg:p-8">
              {/* SECTION HEADER */}
              <div className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:pb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                    Producer
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-wide text-black sm:text-3xl">
                    {activeGroup.name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                    <span>
                      {myCranes.length} crane{myCranes.length !== 1 ? "s" : ""}
                    </span>
                    {statusOptions.length > 0 && (
                      <span>
                        {statusOptions.map((s) => s.label).join(" · ")}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 cursor-pointer transition hover:bg-red-50 sm:w-auto"
                >
                  Reset all filters
                </button>
              </div>

              {/* FILTER TOOLBAR */}
              <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
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
                  <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
                    Capacity: {minCap} t
                  </div>
                )}

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
                  <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
                    Height: {minH} m
                  </div>
                )}

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
                  <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
                    Radius: {minR} m
                  </div>
                )}

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
                  <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
                    Price: €{minP}
                  </div>
                )}

                <FilterDropDown
                  label="Status"
                  options={statusOptions}
                  value={filters.status}
                  onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
                />

                <div className="relative w-full sm:max-w-xs">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, search: e.target.value }))
                    }
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 pr-9 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/10"
                  />
                  <svg
                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.853,22.131l-4.958-4.941c1.363-1.573,2.075-3.811,2.129-6.707-.105-6.067-3.482-9.43-9.515-9.469C4.398,1.053,1,4.553,1,10.483c0,6.049,3.313,9.45,9.515,9.487,2.871-.017,5.098-.711,6.674-2.074l4.959,4.943c.306,.275,.609,.097,.707,0,.194-.196,.194-.512-.002-.707Zm-12.338-3.161c-5.622-.033-8.407-2.807-8.515-8.478,.104-5.669,2.89-8.442,8.509-8.478,5.553,.036,8.418,2.891,8.515,8.468-.104,5.678-2.89,8.454-8.509,8.487Z" />
                  </svg>
                </div>
              </div>

              {/* CONTENT */}
              {displayList.length === 0 ? (
                <p className="mt-8 text-center text-sm text-gray-600 sm:text-base">
                  {hasAny
                    ? "No cranes match those filters."
                    : "No cranes available."}
                </p>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                      <Link
                        to={`/cranes/${c._id}`}
                        key={c._id}
                        className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="h-52 w-full overflow-hidden bg-gray-100">
                          {bgUrl ? (
                            <img
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              src={bgUrl}
                              alt={c.title}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100" />
                          )}
                        </div>

                        <div className="p-4">
                          <div className="font-medium text-black">
                            {c.title}
                          </div>
                          <p className="mt-1 min-h-[2.5rem] text-sm text-gray-500">
                            {model}
                          </p>

                          <div className="mt-4 flex items-start justify-between gap-3">
                            <span className="text-sm font-bold uppercase tracking-wide text-black">
                              {c.status === "for sale"
                                ? "For Sale"
                                : c.status === "for rent"
                                ? "For Rent"
                                : c.status}
                            </span>

                            <span className="text-right text-sm font-semibold text-red-600">
                              {formatPrice(c.price)}
                              {c.status === "for rent" && c.rentPrice?.interval
                                ? ` / ${c.rentPrice.interval}`
                                : ""}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProducerPage;
