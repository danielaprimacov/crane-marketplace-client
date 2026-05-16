import { useCallback, useEffect, useState } from "react";

import { craneApi } from "../services/craneApi";

function useCraneDetails(craneId) {
  const [crane, setCrane] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCrane = useCallback(
    async (signal) => {
      const invalidCraneId =
        !craneId || craneId === "undefined" || craneId === "null";

      if (invalidCraneId) {
        setCrane(null);
        setLoading(false);
        setError("Crane id is missing.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const craneData = await craneApi.getById(craneId, { signal });

        if (signal?.aborted) return;

        setCrane(craneData);
      } catch (err) {
        const isCanceled =
          err?.code === "ERR_CANCELED" || err?.name === "CanceledError";

        if (isCanceled) {
          return;
        }

        console.error("Failed to fetch crane:", err);
        setError("Failed to load crane details.");
        setCrane(null);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [craneId]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchCrane(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchCrane]);

  return {
    crane,
    loading,
    error,
    refetchCrane: () => fetchCrane(),
  };
}

export default useCraneDetails;
