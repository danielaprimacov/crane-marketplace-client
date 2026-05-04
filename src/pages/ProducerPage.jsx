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

function getCranePrice(crane) {
  if (crane.status === "for sale") {
    return Number(crane.salePrice) || 0;
  }

  if (crane.status === "for rent") {
    return Number(crane.rentPrice?.amount) || 0;
  }

  return 0;
}

function getCraneModel(crane) {
  return [
    crane.seriesCode,
    crane.capacityClassNumber ? `${crane.capacityClassNumber}t` : "",
    crane.variantRevision?.trim(),
  ]
    .filter(Boolean)
    .join(" ");
}

function getImageUrl(crane) {
  if (!Array.isArray(crane.images) || crane.images.length === 0) {
    return null;
  }

  const firstImage = crane.images[0];

  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.url || firstImage?.secure_url || null;
}

function formatStatus(status) {
  if (!status) return "Unknown";

  if (status === "for sale") return "For Sale";
  if (status === "for rent") return "For Rent";

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function matchesRange(value, min, max) {
  const hasMin = min !== "";
  const hasMax = max !== "";

  if (!hasMin && !hasMax) return true;
  if (value == null || Number.isNaN(Number(value))) return false;

  const numericValue = Number(value);

  return (
    numericValue >= (hasMin ? Number(min) : -Infinity) &&
    numericValue <= (hasMax ? Number(max) : Infinity)
  );
}

function LoadingState() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
        Loading cranes…
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
        {message}
      </div>
    </div>
  );
}

function StaticFilterValue({ label, value, suffix = "" }) {
  return (
    <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700">
      {label}: {value}
      {suffix}
    </div>
  );
}

function CraneCard({ crane }) {
  const model = getCraneModel(crane);
  const imageUrl = getImageUrl(crane);

  return (
    <Link
      to={`/cranes/${crane._id}`}
      className="group overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-52 w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageUrl}
            alt={crane.title || model || "Crane"}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(event) => {
              console.log("Image failed:", event.currentTarget.src);
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 font-medium text-black">
          {crane.title || "Untitled crane"}
        </h2>

        <p className="mt-1 min-h-[2.5rem] text-sm text-gray-500">
          {model || "Model details not available"}
        </p>

        <div className="mt-4 flex items-start justify-between gap-3">
          <span className="text-sm font-bold uppercase tracking-wide text-black">
            {formatStatus(crane.status)}
          </span>

          <span className="text-right text-sm font-semibold text-red-600">
            {formatPrice(crane.price)}
            {crane.status === "for rent" && crane.rentPrice?.interval
              ? ` / ${crane.rentPrice.interval}`
              : ""}
          </span>
        </div>
      </div>
    </Link>
  );
}

function ProducerPage() {
  const { producerSlug } = useParams();
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCranes = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await axios.get(`${API_URL}/cranes`, {
          signal: controller.signal,
        });

        const safeData = Array.isArray(data) ? data : [];

        const normalizedCranes = safeData.map((crane) => ({
          ...crane,
          price: getCranePrice(crane),
        }));

        setCranes(normalizedCranes);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Unable to load cranes:", err);
        setError("Unable to load cranes.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCranes();

    return () => {
      controller.abort();
    };
  }, []);

  // group all cranes by producer for the sidebar
  const groupedProducers = useMemo(() => {
    const byProducer = cranes.reduce((acc, crane) => {
      if (!crane.producer) return acc;

      acc[crane.producer] = acc[crane.producer] || [];
      acc[crane.producer].push(crane);

      return acc;
    }, {});

    return Object.entries(byProducer)
      .map(([name, list]) => {
        const models = list.map((crane, index) => {
          const label =
            getCraneModel(crane) || crane.title || `Model ${index + 1}`;

          return { id: crane._id, label };
        });
        return { name, slug: slugify(name), models };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [cranes]);

  const activeGroup = useMemo(() => {
    return groupedProducers.find((group) => group.slug === producerSlug);
  }, [groupedProducers, producerSlug]);

  const producerCranes = useMemo(() => {
    if (!activeGroup) return [];

    return cranes.filter((crane) => crane.producer === activeGroup.name);
  }, [cranes, activeGroup]);

  const myCranes = useMemo(() => {
    if (!activeGroup) return [];
    return cranes.filter((c) => c.producer === activeGroup.name);
  }, [cranes, activeGroup]);

  const [minCap, maxCap] = useMemo(
    () => getMinMax(producerCranes, (c) => c.capacity ?? 0),
    [producerCranes]
  );

  const [minH, maxH] = useMemo(
    () => getMinMax(producerCranes, (c) => c.height ?? 0),
    [producerCranes]
  );

  const [minR, maxR] = useMemo(
    () => getMinMax(producerCranes, (c) => c.radius ?? 0),
    [producerCranes]
  );

  const [minP, maxP] = useMemo(
    () => getMinMax(producerCranes, (c) => c.price ?? 0),
    [producerCranes]
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

  const statusOptions = useMemo(() => {
    return Array.from(
      new Set(producerCranes.map((c) => c.status).filter(Boolean))
    ).map((value) => ({
      value,
      label: formatStatus(value),
    }));
  }, [producerCranes]);

  const filteredCranes = useMemo(() => {
    const searchTerm = filters.search.trim().toLowerCase();

    return producerCranes.filter((crane) => {
      const searchableText = [
        crane.title,
        crane.description,
        crane.seriesCode,
        crane.capacityClassNumber ? `${crane.capacityClassNumber}t` : "",
        crane.variantRevision,
        crane.producer,
        crane.location,
        crane.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (searchTerm && !searchableText.includes(searchTerm)) {
        return false;
      }

      if (
        !matchesRange(crane.capacity, filters.capacityMin, filters.capacityMax)
      )
        return false;

      if (!matchesRange(crane.height, filters.heightMin, filters.heightMax))
        return false;

      if (!matchesRange(crane.radius, filters.radiusMin, filters.radiusMax))
        return false;

      if (!matchesRange(crane.price, filters.priceMin, filters.priceMax))
        return false;

      if (filters.status && crane.status !== filters.status) return false;

      return true;
    });
  }, [producerCranes, filters]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

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

  const applyCapacity = ([min, max]) => {
    setFilters((prev) => ({
      ...prev,
      capacityMin: min,
      capacityMax: max,
    }));
  };

  const applyHeight = ([min, max]) => {
    setFilters((prev) => ({
      ...prev,
      heightMin: min,
      heightMax: max,
    }));
  };

  const applyRadius = ([min, max]) => {
    setFilters((prev) => ({
      ...prev,
      radiusMin: min,
      radiusMax: max,
    }));
  };

  const applyPrice = ([min, max]) => {
    setFilters((prev) => ({
      ...prev,
      priceMin: min,
      priceMax: max,
    }));
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!activeGroup) {
    return <ErrorState message={`Unknown producer "${producerSlug}".`} />;
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pt-24 pb-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
        {/* navigation panel */}
        <div className="self-start lg:sticky lg:top-24">
          <ProducersSidebar
            producers={groupedProducers}
            activeSlug={producerSlug}
          />
        </div>

        {/* content section */}
        <main className="min-w-0">
          {producerCranes.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-sm text-gray-600 sm:text-base">
                No cranes found for “{activeGroup.name}”.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
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
                      {producerCranes.length} crane
                      {producerCranes.length !== 1 ? "s" : ""}
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
                  disabled={!hasActiveFilters}
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
                  <StaticFilterValue
                    label="Capacity"
                    value={minCap}
                    suffix=" t"
                  />
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
                  <StaticFilterValue label="Height" value={minH} suffix=" m" />
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
                  <StaticFilterValue label="Radius" value={minR} suffix=" m" />
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
                  <StaticFilterValue label="Price" value={formatPrice(minP)} />
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
              {filteredCranes.length === 0 ? (
                <p className="mt-8 text-center text-sm text-gray-600 sm:text-base">
                  {hasActiveFilters
                    ? "No cranes match those filters."
                    : "No cranes available."}
                </p>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredCranes.map((crane) => (
                    <CraneCard key={crane._id} crane={crane} />
                  ))}
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
