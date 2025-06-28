import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import HeroSection from "../components/HeroSection";
import TopProducers from "../components/TopProducers";
import Services from "../components/Services";
import LastAddedCranes from "../components/LastAddedCranes";
import InformationSection from "../components/InformationSection";
import Footer from "../components/Footer";

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
      <HeroSection />
      <main className="relative z-20 bg-white">
        <TopProducers topProducers={topProducers} />
        <Services />
        <LastAddedCranes recentCranes={recentCranes} />
        <InformationSection />
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
