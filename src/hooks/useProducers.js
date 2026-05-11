import { useEffect, useState, useMemo } from "react";

import { craneApi } from "../services/craneApi";
import { slugify } from "../utils/helpers";

export function useProducers() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();

    const fetchCranes = async () => {
      setLoading(true);
      setError("");

      try {
        const data = awaitcraneApi.getAll({
          signal: controller.signal,
        });

        const safeCranes = Array.isArray(data) ? data : [];

        setCranes(safeCranes);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Could not load producers:", err);
        setError("Could not load data.");
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

  const producers = useMemo(() => {
    const producersMap = {};

    cranes.forEach((crane) => {
      if (!crane.producer) return;

      const name = crane.producer.trim();
      const slug = slugify(name);

      if (!producersMap[slug]) producersMap[slug] = { name, slug, models: [] };
      producersMap[slug].models.push(c);
    });
    // single, consistent sort:
    return Object.values(producersMap).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }, [cranes]);

  return { producers, cranes, loading, error };
}
