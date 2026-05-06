import { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

import ArrowIcon from "../components/ui/ArrowIcon";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

const API_URL = import.meta.env.VITE_API_URL;

function getOwnerId(crane) {
  if (!crane?.owner) return null;

  if (typeof crane.owner === "string") {
    return crane.owner;
  }

  return crane.owner._id || null;
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

function EmptyState() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        No cranes added yet
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        You have not added any cranes to your account yet.
      </p>
    </div>
  );
}

function CraneCard({ crane }) {
  const model = getCraneModel(crane);
  const imageUrl = getImageUrl(crane);

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/cranes/${crane._id}`} className="block">
        <div className="h-52 w-full overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={crane.title || model || "Crane"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link
          to={`/cranes/${crane._id}`}
          className="line-clamp-2 font-medium text-gray-900 transition hover:text-red-600"
        >
          {crane.title || "Untitled crane"}
        </Link>

        <p className="mt-1 min-h-[2.5rem] text-sm text-gray-500">
          {model || "Model details not available"}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
            {crane.status || "Unknown"}
          </span>

          <Link
            to={`/cranes/${crane._id}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-red-600"
          >
            <span>View details</span>
            <ArrowIcon className="h-2.5 w-2.5 stroke-current transition group-hover:stroke-red-600" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function UserCranesPage() {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user?._id;

  useEffect(() => {
    if (isLoading) return;

    // don’t try to load until we know we’re logged in & have a user
    if (!isLoggedIn || !userId) {
      setLoading(false);
      setCranes([]);
      return;
    }

    const controller = new AbortController();

    const fetchMyCranes = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("You are not authorized to view your cranes.");
          return;
        }

        const { data: allCranes } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        const safeCranes = Array.isArray(allCranes) ? allCranes : [];

        setCranes(safeCranes);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Failed to fetch user’s cranes:", err);
        setError("Could not load your cranes. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMyCranes();

    return () => {
      controller.abort();
    };
  }, [isLoading, isLoggedIn, userId]);

  const myCranes = useMemo(() => {
    if (!userId) return [];

    return cranes.filter((crane) => getOwnerId(crane) === userId);
  }, [cranes, userId]);

  if (isLoading || loading) {
    return (
      <LoadingState
        type="cranes"
        title="Loading cranes..."
        message="We are loading the cranes connected to your account."
        fullPage
      />
    );
  }

  if (error) {
    return <ErrorState message={error} fullPage />;
  }

  if (!isLoggedIn) {
    return (
      <ErrorState
        message="You must be logged in to view your cranes."
        actionTo="/login"
        actionLabel="Go to login"
        fullPage
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">
            Account
          </p>

          <h1 className="text-2xl font-bold mb-6 tracking-widest">My Cranes</h1>

          <p className="mt-2 text-sm text-gray-500">
            {myCranes.length} crane{myCranes.length !== 1 ? "s" : ""} connected
            to your account.
          </p>
        </div>
      </header>

      {myCranes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {myCranes.map((c) => (
            <CraneCard key={c._id} crane={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCranesPage;
