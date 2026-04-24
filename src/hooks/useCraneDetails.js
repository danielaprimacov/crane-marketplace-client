import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function useCraneDetails(craneId) {
  const [crane, setCrane] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCrane = useCallback(async () => {
    if (!craneId) return;

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/cranes/${craneId}`);
      setCrane(response.data);
    } catch (err) {
      console.error("Failed to fetch crane:", err);
      setError("Failed to load crane details.");
      setCrane(null);
    } finally {
      setLoading(false);
    }
  }, [craneId]);

  useEffect(() => {
    fetchCrane();
  }, [fetchCrane]);

  return {
    crane,
    loading,
    error,
    refetchCrane: fetchCrane,
  };
}

export default useCraneDetails;
