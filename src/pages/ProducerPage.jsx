import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProducersSidebar from "../components/ProducersSidebar";

const API_URL = "http://localhost:5005";

import { slugify } from "../utils/helpers";

function ProducerPage() {
  const { producerSlug } = useParams();
  const [cranes, setCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCranes(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load cranes.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // group all cranes by producer for the sidebar
  const groupCranes = useMemo(() => {
    const byProducer = {};
    cranes.forEach((c) => {
      if (!c.producer) return;
      byProducer[c.producer] = byProducer[c.producer] || [];
      byProducer[c.producer].push(c);
    });
    return Object.entries(byProducer).map(([name, list]) => {
      const slug = slugify(name);
      const models = list.map((c) => {
        const rev = c.variantRevision?.trim();
        return rev
          ? `${c.seriesCode} ${c.capacityClassNumber}t ${rev}`
          : `${c.seriesCode} ${c.capacityClassNumber}t`;
      });
      return { name, slug, models };
    });
  }, [cranes]);

  const activeGroup = groupCranes.find((g) => g.slug === producerSlug);

  const myCranes = useMemo(() => {
    if (!activeGroup) return [];
    return cranes.filter((c) => c.producer === activeGroup.name);
  }, [cranes, activeGroup]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!activeGroup) {
    return <p className="text-red-600">Unknown producer “{producerSlug}”.</p>;
  }

  return (
    <div className="flex mt-15 mx-5">
      {/* Sidebar with ALL producers */}
      <ProducersSidebar producers={groupCranes} activeSlug={producerSlug} />

      {/* Main content: list of this producer's cranes */}
      <main className="flex-1 p-6 ml-4">
        <h1 className="text-2xl font-bold mb-4">{activeGroup.name}</h1>

        {myCranes.length === 0 ? (
          <p>No cranes found for “{producerSlug}.”</p>
        ) : (
          <ul className="space-y-4">
            {myCranes.map((c) => {
              const model = [
                c.seriesCode,
                c.capacityClassNumber,
                c.variantRevision,
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={c._id} className="border p-4 rounded">
                  <Link to={`/cranes/${c._id}`} className="font-medium">
                    {model}
                  </Link>
                  <p className="text-gray-500">{c.title}</p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

export default ProducerPage;
