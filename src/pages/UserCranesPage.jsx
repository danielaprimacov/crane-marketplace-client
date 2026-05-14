import { useContext, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { craneApi } from "../services/craneApi";

import ArrowIcon from "../components/ui/ArrowIcon";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import { getCraneId, getCraneModel, getImageUrl } from "../utils/craneHelpers";

function formatStatus(status) {
  if (!status) return "Unknown";

  if (status === "for sale") return "For Sale";
  if (status === "for rent") return "For Rent";

  return status;
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

      <Link
        to="/cranes/new"
        className="mt-5 inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
      >
        Add a new crane
      </Link>
    </div>
  );
}

function CraneCard({ crane }) {
  const craneId = getCraneId(crane);
  const model = getCraneModel(crane);
  const imageUrl = getImageUrl(crane);

  if (!craneId) return null;

  return (
    <article className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/cranes/${craneId}`} className="block">
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
          to={`/cranes/${craneId}`}
          className="line-clamp-2 font-medium text-gray-900 transition hover:text-red-600"
        >
          {crane.title || "Untitled crane"}
        </Link>

        <p className="mt-1 min-h-[2.5rem] text-sm text-gray-500">
          {model || "Model details not available"}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
            {formatStatus(crane.status)}
          </span>

          <Link
            to={`/cranes/${craneId}`}
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
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyCranes = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await craneApi.getMine({ signal });
      const safeCranes = Array.isArray(data) ? data : [];

      setCranes(safeCranes);
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;

      console.error("Failed to fetch user cranes:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Could not load your cranes. Please try again."
      );

      setCranes([]);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      setCranes([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    fetchMyCranes(controller.signal);

    return () => {
      controller.abort();
    };
  }, [isLoading, isLoggedIn, fetchMyCranes]);

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
    return (
      <ErrorState
        title="Could not load your cranes"
        message={error}
        onRetry={() => fetchMyCranes()}
        actionLabel="Reload cranes"
        fullPage
      />
    );
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
            {cranes.length} crane{cranes.length !== 1 ? "s" : ""} connected to
            your account.
          </p>
        </div>

        <Link
          to="/cranes/new"
          className="inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:w-auto"
        >
          Add a new crane
        </Link>
      </header>

      {cranes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cranes.map((crane) => {
            const craneId = getCraneId(crane);

            return <CraneCard key={craneId} crane={crane} />;
          })}
        </div>
      )}
    </div>
  );
}

export default UserCranesPage;
