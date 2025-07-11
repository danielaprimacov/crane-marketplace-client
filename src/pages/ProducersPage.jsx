import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProducersSidebar from "../components/ProducersSidebar";

const API_URL = import.meta.env.VITE_API_URL;

import { slugify } from "../utils/helpers";

function ProducersPage() {
  const [cranes, setCranes] = useState([]);
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getCranes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/cranes`);

        const unique = Array.from(
          new Set(data.map((c) => c.producer).filter(Boolean))
        );
        setCranes(data);
        setProducers(unique);
      } catch (err) {
        console.error("Failed to fetch cranes:", err);
        setError("Could not load data.");
      } finally {
        setLoading(false);
      }
    };

    getCranes();
  }, []);

  const groupCranes = useMemo(() => {
    return producers.map((producer) => {
      const slug = slugify(producer);
      const models = cranes
        .filter((c) => c.producer === producer)
        .map((c) => {
          // seriesCode + variantRevision
          const rev = c.variantRevision?.trim();
          return rev ? `${c.seriesCode} ${rev}` : c.seriesCode;
        });
      return { name: producer, slug, models };
    });
  }, [cranes, producers]);

  if (loading) return <p>Loading producers…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-20 mx-5">
      {/* Producer sidebar */}
      <div>
        <ProducersSidebar producers={groupCranes} />

        <div></div>
      </div>
    </div>
  );
}

export default ProducersPage;
