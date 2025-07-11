import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import AllProducers from "../components/AllProducers";
import Services from "../components/Services";
import LastAddedCranes from "../components/LastAddedCranes";
import InformationSection from "../components/InformationSection";
import OurClients from "../components/OurClients";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const [cranes, setCranes] = useState([]);
  const [recentCranes, setRecentCranes] = useState([]);

  useEffect(() => {
    const fetchCranes = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/cranes`);
        // sort newest first
        const recent = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
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
        <AllProducers allProducers={allProducers} />
        <Services />
        <LastAddedCranes recentCranes={recentCranes} />
        <OurClients />
        <InformationSection />
      </main>
    </>
  );
}

export default HomePage;
