import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { slugify } from "../utils/helpers";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export function useProducers() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${API_URL}/cranes`)
      .then(({ data }) => setCranes(data))
      .catch(() => setError("Could not load data."))
      .finally(() => setLoading(false));
  }, [location.pathname]);

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

  return { producers, loading, error };
}
