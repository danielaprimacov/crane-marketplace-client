import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function getOwnerId(crane) {
  if (!crane?.owner) return null;

  if (typeof crane.owner === "string") {
    return crane.owner;
  }

  return crane.owner._id || null;
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

function getCraneModel(crane) {
  return [
    crane.seriesCode,
    crane.capacityClassNumber ? `${crane.capacityClassNumber}t` : "",
    crane.variantRevision?.trim(),
  ]
    .filter(Boolean)
    .join(" ");
}

function InitialsBadge({ name = "" }) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-orange-200 text-xl font-semibold text-orange-700">
      {initials}
    </div>
  );
}

function CraneCard({ crane }) {
  const imageUrl = getImageUrl(crane);
  const model = getCraneModel(crane);

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/cranes/${crane._id}`} className="block">
        <div className="h-40 w-full overflow-hidden bg-gray-100 sm:h-44">
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
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          {crane.title || "Untitled crane"}
        </h3>

        <p className="mt-1 min-h-[2.5rem] text-sm text-gray-500">
          {model || "Model details not available"}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to={`/cranes/${crane._id}`}
            className="inline-flex justify-center rounded-lg border border-red-600 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            View
          </Link>

          <Link
            to={`/cranes/edit/${crane._id}`}
            className="inline-flex justify-center rounded-lg border border-green-600 px-3 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            Edit
          </Link>
        </div>
      </div>
    </article>
  );
}

function ProfilePage() {
  const { user, isLoading } = useContext(AuthContext);

  const [myCranes, setMyCranes] = useState([]);
  const [loadingCranes, setLoadingCranes] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user?._id) {
      setLoadingCranes(false);
      setMyCranes([]);
      return;
    }

    const controller = new AbortController();

    const fetchMyCranes = async () => {
      setLoadingCranes(true);
      setError("");

      try {
        const storedToken = localStorage.getItem("authToken");

        if (!storedToken) {
          setError("You are not authorized to view your cranes.");
          return;
        }

        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          signal: controller.signal,
        });

        const safeCranes = Array.isArray(data) ? data : [];

        const owned = safeCranes.filter(
          (crane) => getOwnerId(crane) === user._id
        );

        setMyCranes(owned);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Could not load your cranes:", err);
        setError("Could not load your cranes.");
      } finally {
        if (!controller.signal.aborted) {
          setLoadingCranes(false);
        }
      }
    };
    fetchMyCranes();

    return () => {
      controller.abort();
    };
  }, [isLoading, user?._id]);

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
          Loading profile…
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
          You must be logged in to view your profile.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-10 pt-16">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-6 sm:px-6 md:flex-row md:items-center lg:px-8">
          <InitialsBadge name={user.name} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-semibold text-gray-900 sm:text-3xl">
              {user.name || "User"}
            </h1>
            <p className="mt-1 break-all text-sm text-gray-500 sm:text-base">
              {user.email || "No email provided"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="inline-flex w-full items-center bg-red-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition hover:bg-red-500 sm:w-auto"
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* My Cranes Section */}
      <section className="mt-10 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">
              Account
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-gray-900">
              My Cranes
            </h2>
          </div>
          <p className="text-sm text-gray-500">
            {myCranes.length} crane{myCranes.length !== 1 ? "s" : ""} connected
            to your account.
          </p>
        </div>
        {loadingCranes ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
            Loading your cranes…
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        ) : myCranes.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              No cranes added yet
            </h3>

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
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myCranes.map((crane) => (
              <CraneCard key={crane._id} crane={crane} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProfilePage;
