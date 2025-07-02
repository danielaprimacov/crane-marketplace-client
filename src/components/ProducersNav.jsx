import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ProducersNav() {
  const [cranes, setCranes] = useState([]);
  const [openSubnav, setOpenSubnav] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const getCranes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCranes(data); // data is an array of { producer, /* other fields */ }
      } catch (err) {
        console.error("Failed to fetch cranes:", err);
      }
    };
    getCranes();
  }, []);

  // derive a sorted, unique list of producer names
  const uniqueProducers = useMemo(() => {
    return Array.from(new Set(cranes.map((c) => c.producer).filter(Boolean)));
  }, [cranes]);

  // Called when pointer enters the LI or the fly-out itself:
  const handleMouseEnter = (producer) => {
    // cancel any pending close
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenSubnav(producer);
  };

  // Called when pointer leaves the LI or the fly-out itself:
  const handleMouseLeave = () => {
    // schedule a close in 300ms (adjust as you like)
    closeTimer.current = window.setTimeout(() => {
      setOpenSubnav(null);
      closeTimer.current = null;
    }, 300);
  };

  const itemsByProducer = useMemo(() => {
    return cranes.reduce((acc, crane) => {
      if (!crane.producer) return acc;
      acc[crane.producer] = acc[crane.producer] || [];
      acc[crane.producer].push(crane);
      return acc;
    }, {});
  }, [cranes]);

  return (
    <div className="relative w-full ml-4 overflow-visible">
      <ul className="flex items-center gap-4 overflow-x-auto">
        {uniqueProducers.map((producer) => (
          <li
            key={producer}
            className="relative py-4 group transition-all duration-200 ease-out hover:border-b hover:border-b-red-600"
            onMouseEnter={() => handleMouseEnter(producer)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="#"
              className="text-sm uppercase font-medium text-black whitespace-nowrap transition-colors duration-200 ease-out group-hover:text-red-600"
            >
              {producer}
            </Link>

            {openSubnav === producer && (
              <div className="fixed inset-0 top-16 bottom-0 bg-white/30 backdrop-blur-sm z-30 pointer-events-none">
                <div
                  className="w-full p-5 shadow-lg transform scale-y-100 origin-top  transition-transform duration-200 ease-out pointer-events-auto overflow-auto"
                  onMouseEnter={() => handleMouseEnter(producer)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className="space-y-4">
                    {itemsByProducer[producer].map((crane) => (
                      <li key={crane._id} className="text-sm">
                        <Link
                          to={`/cranes/${crane._id}`}
                          className="block hover:bg-gray-100 p-2 rounded"
                        >
                          {crane.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProducersNav;
