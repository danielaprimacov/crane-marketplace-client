import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

import ArrowIcon from "./ArrowIcon";

function ProducersNav({ openSubnav, handleMouseEnter, handleMouseLeave }) {
  const [cranes, setCranes] = useState([]);

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
            className="
              relative py-4 group border-b-2 border-transparent 
              hover:border-red-600 transition-colors duration-200
            "
            onMouseEnter={() => handleMouseEnter(producer)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="#"
              className="
                text-sm uppercase font-medium text-black 
                transition-colors duration-200 
                group-hover:text-red-600
              "
            >
              {producer}
            </Link>
          </li>
        ))}
      </ul>

      {openSubnav && (
        <div className="fixed inset-x-0 top-16 bottom-0 bg-white/30 backdrop-blur-sm z-30">
          <div
            className="w-full p-5 shadow-lg bg-white overflow-auto"
            onMouseEnter={() => handleMouseEnter(openSubnav)}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="space-y-4 mb-10 mt-2">
              <li className="group flex items-center gap-3 font-medium pl-10 text-xl tracking-wider">
                <Link
                  to="#"
                  className="pb-1 text-black transition-colors duration-200 group-hover:text-red-600"
                >
                  {openSubnav}
                </Link>
                <ArrowIcon className="h-4 w-4 stroke-current text-black transition-colors duration-200 group-hover:text-red-600" />
              </li>

              <li className="pl-10 py-3">
                <Link
                  to="#"
                  className="text-gray-500 text-sm hover:text-red-600 transition-colors duration-200"
                >
                  All Cranes
                </Link>
              </li>
              <div className="w-200 pl-10 grid grid-cols-2 gap-x-4 gap-y-8 justify-items-start">
                {itemsByProducer[openSubnav].slice(0, 4).map((crane) => {
                  const model = [
                    crane.seriesCode,
                    crane.capacityClassNumber,
                    crane.variantRevision,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  const firstImage = crane.images?.[0];

                  return (
                    <Link
                      to={`/cranes/${crane._id}`}
                      key={crane._id}
                      className="group flex gap-3 items-start"
                    >
                      <div className="w-32 h-24 overflow-hidden mb-2">
                        <img
                          src={firstImage}
                          alt={model}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="text-sm">
                        <p>{model}</p>
                        <span className="text-gray-500">{crane.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProducersNav;
