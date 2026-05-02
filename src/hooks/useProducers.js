import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import { slugify } from "../utils/helpers";

const API_URL = import.meta.env.VITE_API_URL;

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
        const { data } = await axios.get(`${API_URL}/cranes`, {
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
    const map = {};

    cranes.forEach((c) => {
      if (!c.producer) return;

      const name = c.producer.trim();
      const slug = slugify(name);

      if (!map[slug]) map[slug] = { name, slug, models: [] };
      map[slug].models.push(c);
    });
    // single, consistent sort:
    return Object.values(map).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
  }, [cranes]);

  return { producers, cranes, loading, error };
}
