import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function useHomeCranes() {
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/cranes`);
        setCranes(data);
      } catch (err) {
        console.error("Failed to load cranes", err);
        setError("Failed to load cranes.");
      } finally {
        setLoading(false);
      }
    };

    fetchCranes();
  }, []);

  const recentCranes = useMemo(() => {
    return [...cranes]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);
  }, [cranes]);

  const allProducers = useMemo(() => {
    const counts = cranes.reduce((acc, { producer }) => {
      if (!producer) return acc;
      acc[producer] = (acc[producer] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
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
