import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddInquiryForm from "../components/forms/inquiry/AddInquiryForm";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import { craneApi } from "../services/craneApi";

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
        const data = await craneApi.getById(craneId, {
          signal: controller.signal,
        });
        setCrane(data);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Could not load crane details:", err);

        setError(
          err?.response?.data?.message || "Could not load crane details."
        );
        setCrane(null);
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
        <LoadingState
          type="cranes"
          title="Loading crane details..."
          message="We are loading the crane information for your inquiry."
          fullPage
        />
      </main>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Inquiry unavailable"
        message={error}
        actionTo="/cranes"
        actionLabel="Back to cranes"
        fullPage
      />
    );
  }

  if (!crane) {
    return (
      <ErrorState
        title="Crane not found"
        message="The crane could not be found or is no longer available."
        actionTo="/cranes"
        actionLabel="Back to cranes"
        fullPage
      />
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
