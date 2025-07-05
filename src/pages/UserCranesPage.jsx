import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth.context";

import ArrowIcon from "../components/ArrowIcon";

const API_URL = "http://localhost:5005";

function UserCranesPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [myCranes, setMyCranes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // don’t try to load until we know we’re logged in & have a user
    if (!isLoggedIn || !user?._id) {
      setLoading(false);
      return;
    }

    const fetchMyCranes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data: allCranes } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // filter client‐side for the current user’s cranes:
        const mine = allCranes.filter((c) => c.owner === user._id);
        setMyCranes(mine);
      } catch (err) {
        console.error("Failed to fetch user’s cranes:", err);
        setError("Could not load your cranes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCranes();
  }, [isLoggedIn, user]);

  if (loading) return <p className="mt-20 text-center">Loading your cranes…</p>;
  if (error) return <p className="mt-20 text-center text-red-600">{error}</p>;

  return (
    <div className="mt-20 mx-5">
      <h1 className="text-2xl font-bold mb-6 tracking-widest">My Cranes</h1>

      {myCranes.length === 0 ? (
        <p>You haven’t added any cranes yet.</p>
      ) : (
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
              <div
                key={c._id}
                className="w-72 h-72 rounded-md shadow-md overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-44 overflow-hidden rounded-t-md">
                  {bgUrl ? (
                    <div
                      className="w-full h-full bg-cover bg-center transform transition-transform duration-200 hover:scale-105"
                      style={{ backgroundImage: `url(${bgUrl})` }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>

                {/* Title + Model */}
                <div className="ml-2 mt-2">
                  <Link
                    to={`/cranes/${c._id}`}
                    className="font-medium hover:underline"
                  >
                    {c.title}
                  </Link>
                  <p className="text-gray-500 pb-2">{model}</p>
                </div>
                <div className="flex justify-center">
                  <Link
                    to={`/cranes/${c._id}`}
                    className="group flex items-center gap-2 mt-2 text-gray-700 transition-colors duration-300 hover:text-red-600"
                  >
                    <span className="text-md">View all information</span>
                    <ArrowIcon className="w-2 h-2 mt-1 stroke-current transition-colors duration-300 group-hover:stroke-red-600" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserCranesPage;
