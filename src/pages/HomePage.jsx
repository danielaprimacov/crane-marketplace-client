import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoIntro from "../components/VideoIntro";

const API_URL = "http://localhost:5005";

function HomePage() {
  const [cranes, setCranes] = useState([]);

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCranes(data);
      } catch (err) {
        console.error("Failed to load cranes", err);
      }
    };
    fetchCranes();
  }, []);

  const topProducers = useMemo(() => {
    const counts = cranes.reduce((acc, { producer }) => {
      if (!producer) return acc;
      acc[producer] = (acc[producer] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .slice(0, 4)
      .map(([prod]) => prod);
  }, [cranes]);

  return (
    <>
      <div className="relative w-full h-auto overflow-hidden ">
        <VideoIntro />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <p className="text-white uppercase text-2xl md:text-4xl lg:text-5xl tracking-tighter [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)]">
            KranHub presents
          </p>
          <p className="mt-2 text-white uppercase text-center text-4xl md:text-6xl lg:text-7xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.6)] tracking-wide">
            The Art of Precision Lifting
          </p>
          <Link to="">
            <button className="m-5 h-15 w-50 bg-white/50 cursor-pointer text-xl uppercase text-center rounded hover:bg-black/30 hover:text-white transition duration-400 ease-in-out">
              Learn more
            </button>
          </Link>
        </div>
      </div>
      <main className="relative z-20 bg-white">
        {/* Producers */}
        <div className="flex p-4 justify-evenly items-center">
          {topProducers.map((prod) => (
            <Link
              to=""
              key={prod}
              className="
              px-4 py-2 w-[20rem] border border-gray-200 rounded bg-white text-m font-medium uppercase text-center tracking-wide whitespace-nowrap
              cursor-pointer transition duration-300 transform hover:text-black/200 hover:scale-105 hover:shadow-md

            "
            >
              {prod}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage;
