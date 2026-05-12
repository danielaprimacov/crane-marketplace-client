import { useEffect, useMemo, useState } from "react";

import { craneApi } from "../services/craneApi";

function sortByNewest(a, b) {
  const dateA = new Date(a?.createdAt || 0).getTime();
  const dateB = new Date(b?.createdAt || 0).getTime();

  return dateB - dateA;
}

function getProducerName(producer) {
  return typeof producer === "string" ? producer.trim() : "";
}

function useHomeCranes() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCranes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await craneApi.getAll({
          signal: controller.signal,
        });

        const safeCranes = Array.isArray(data) ? data : [];

        setCranes(safeCranes);
      } catch (error) {
        if (error.code === "ERR_CANCELED") return;

        console.error("Failed to load cranes:", error);

        setError(error?.response?.data?.message || "Failed to load cranes.");

        setCranes([]);
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

  const recentCranes = useMemo(() => {
    return [...cranes].sort(sortByNewest).slice(0, 8);
  }, [cranes]);

  const allProducers = useMemo(() => {
    const producerCounts = cranes.reduce((acc, crane) => {
      const producer = getProducerName(crane?.producer);

      if (!producer) return acc;

      acc[producer] = (acc[producer] || 0) + 1;

      return acc;
    }, {});

    return Object.entries(producerCounts)
      .sort(([producerA, countA], [producerB, countB]) => {
        if (countB !== countA) {
          return countB - countA;
        }

        return producerA.localeCompare(producerB, undefined, {
          sensitivity: "base",
        });
      })
      .map(([producer]) => producer);
  }, [cranes]);

  return {
    cranes,
    recentCranes,
    allProducers,
    loading,
    error,
  };
}

export default useHomeCranes;
