import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import TopProducers from "../components/AllProducers";
import Services from "../components/Services";
import LastAddedCranes from "../components/LastAddedCranes";
import InformationSection from "../components/InformationSection";

const API_URL = "http://localhost:5005";

function HomePage() {
  const [cranes, setCranes] = useState([]);
  const [recentCranes, setRecentCranes] = useState([]);

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/cranes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // sort newest first
        const recent = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setCranes(data);
        setRecentCranes(recent);
      } catch (err) {
        console.error("Failed to load cranes", err);
      }
    };
    fetchCranes();
  }, []);

  const allProducers = useMemo(() => {
    // count how many cranes per producer
    const counts = cranes.reduce((acc, { producer }) => {
      if (!producer) return acc;
      acc[producer] = (acc[producer] || 0) + 1;
      return acc;
    }, {});

    // turn into [producer, count] pairs, sort by count, then extract just the producer names
    return Object.entries(counts)
      .sort(([, aCount], [, bCount]) => bCount - aCount) // highest-count first
      .map(([producer]) => producer);
  }, [cranes]);

  return (
    <>
      <HeroSection />
      <main className="relative z-20 bg-white">
        <TopProducers allProducers={allProducers} />
        <Services />
        <LastAddedCranes recentCranes={recentCranes} />
        <InformationSection />
      </main>
    </>
  );
}

export default HomePage;
