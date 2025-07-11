import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [myCranes, setMyCranes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchMyCranes = async () => {
      const storedToken = localStorage.getItem("authToken");
      try {
        const { data: allCranes } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        const owned = allCranes.filter((c) => {
          const ownerId = typeof c.owner === "string" ? c.owner : c.owner._id;
          return ownerId === user._id;
        });
        setMyCranes(owned);
      } catch (err) {
        console.error("Could not load your cranes:", err);
      }
    };
    fetchMyCranes();
  }, [user]);

  if (!user) return <p className="p-8 text-center">Loading profile…</p>;

  function InitialsBadge({ name }) {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center text-xl font-semibold text-orange-700">
        {initials}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center gap-6">
          <InitialsBadge name={user.name} />
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={() => navigate("/profile/edit")}
            className="ml-auto cursor-pointer bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* My Cranes Section */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <div className="flex flex-col items-center justify-between mb-4 ">
          <h2 className="text-2xl font-semibold mr-auto pl-3">My Cranes</h2>
          <section className="mt-12">
            {myCranes.length === 0 ? (
              <p className="text-gray-500">You haven’t added any cranes yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCranes.map((c) => (
                  <div
                    key={c._id}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                  >
                    {c.images?.[0] && (
                      <img
                        src={c.images[0]}
                        alt={c.title}
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-lg">{c.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {c.seriesCode} · {c.capacityClassNumber}t
                      </p>
                      <div className="mt-4 flex justify-between space-x-4">
                        <Link
                          to={`/cranes/${c._id}`}
                          className="text-red-600 hover:underline text-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/cranes/edit/${c._id}`}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
