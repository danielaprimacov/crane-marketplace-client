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
        const label = rev
          ? `${c.seriesCode} ${c.capacityClassNumber}t ${rev}`
          : `${c.seriesCode} ${c.capacityClassNumber}t`;
        return { id: c._id, label };
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
      <main className="flex-1 p-6">
        {myCranes.length === 0 ? (
          <p>No cranes found for “{producerSlug}.”</p>
        ) : (
            <div className="mt-10 ml-10">
              
              
              <div className="mb-5">Filtering options</div>
              
              
              
              
              
              <div className="flex flex-wrap gap-5">
              {myCranes.map((c) => {
                const model = [
                  c.seriesCode,
                  c.capacityClassNumber,
                  c.variantRevision,
                ]
                  .filter(Boolean)
                  .join(" ");

                const bgUrl =
                  Array.isArray(c.images) && c.images.length > 0
                    ? c.images[0]
                    : null;
                return (
                  <div className="w-72 h-72 mr-5 rounded-md shadow-md">
                    <div>
                      <div className="w-full h-44 overflow-hidden rounded-t">
                        {bgUrl ? (
                          <div
                            className="w-full h-full bg-cover bg-center transform transition-transform duration-200 hover:scale-105"
                            style={{ backgroundImage: `url(${bgUrl})` }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100" />
                        )}
                      </div>
                      <div className="ml-2 mt-2">
                        <Link
                          key={c._id}
                          to={`/cranes/${c._id}`}
                          className="font-medium hover:underline"
                        >
                          {c.title}
                        </Link>
                        <p className="text-gray-500 pb-2">{model}</p>
                      </div>
                      <div className="py-2 text-right">
                        {c.status === "for sale" ? (
                          <span className="p-2 font-bold tracking-wider">
                            For Sale
                          </span>
                        ) : (
                          <span className="p-2 font-bold tracking-wider">
                            For Rent
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProducerPage;
