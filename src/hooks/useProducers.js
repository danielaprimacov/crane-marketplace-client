import { useEffect, useState, useMemo, useCallback } from "react";

import { craneApi } from "../services/craneApi";
import { slugify } from "../utils/helpers";
import { CRANES_UPDATED_EVENT } from "../constants/events";

export function useProducers() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCranes = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await craneApi.getAll({ signal });
      const safeCranes = Array.isArray(data) ? data : [];

      setCranes(safeCranes);
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;

      console.error("Could not load producers:", error);
      setError("Could not load data.");
      setCranes([]);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchCranes(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchCranes]);

  useEffect(() => {
    const handleCranesUpdated = () => {
      fetchCranes();
    };

    window.addEventListener(CRANES_UPDATED_EVENT, handleCranesUpdated);

    return () => {
      window.removeEventListener(CRANES_UPDATED_EVENT, handleCranesUpdated);
    };
  }, [fetchCranes]);

  const producers = useMemo(() => {
    const map = {};

    cranes.forEach((crane) => {
      if (!crane?.producer) return;

      const name = crane.producer.trim();
      const slug = slugify(name);

      if (!map[slug]) {
        map[slug] = {
          name,
          slug,
          models: [],
        };
      }

      map[slug].models.push(crane);
    });

    return Object.values(map).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }, [cranes]);

  return {
    producers,
    cranes,
    loading,
    error,
    refetch: fetchCranes,
  };
}
