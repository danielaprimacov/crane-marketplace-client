import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AddInquiryForm from "../components/forms/inquiry/AddInquiryForm";
import LoadingState from "../components/ui/LoadingState";

const API_URL = import.meta.env.VITE_API_URL;

function NewInquiryPage() {
  const { craneId } = useParams();

  const [crane, setCrane] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!craneId) {
      setLoading(false);
      setError("Missing crane id.");
      return;
    }

    const controller = new AbortController();

    const fetchCrane = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API_URL}/cranes/${craneId}`, {
          signal: controller.signal,
        });
        setCrane(data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;
        console.error("Could not load crane details:", err);
        setError("Could not load crane details.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCrane();

    return () => {
      controller.abort();
    };
  }, [craneId]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <LoadingState />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <h1 className="text-lg font-semibold text-red-700">
            Inquiry unavailable
          </h1>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            to="/cranes"
            className="mt-5 inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Back to cranes
          </Link>
        </div>
      </main>
    );
  }

  if (!crane) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
          Crane not found.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">
          Crane inquiry
        </p>

        <h1 className="mt-2 border-b border-red-600 pb-4 text-xl font-semibold uppercase tracking-wide text-gray-900 sm:text-2xl">
          Send Inquiry
        </h1>

        <p className="mt-4 text-sm text-gray-600 sm:text-base">
          Request details for{" "}
          <span className="font-medium text-gray-900">
            {crane.title || crane.model || "this crane"}
          </span>
          .
        </p>
      </header>

      <AddInquiryForm craneId={craneId} crane={crane} />
    </main>
  );
}

export default NewInquiryPage;
