import { useMemo } from "react";

import HeroSection from "../components/home/HeroSection";
import AllProducers from "../components/home/AllProducers";
import Services from "../components/home/Services";
import LastAddedCranes from "../components/cranes/LastAddedCranes";
import InformationSection from "../components/home/InformationSection";
import OurClients from "../components/home/OurClients";

import useHomeCranes from "../hooks/useHomeCranes";
import { slugify } from "../utils/helpers";

function HomePage() {
  const { recentCranes, allProducers } = useHomeCranes();

  const producers = useMemo(() => {
    const safeProducers = Array.isArray(allProducers) ? allProducers : [];

    return safeProducers.map((producer) => ({
      name: producer,
      slug: slugify(producer),
    }));
  }, [allProducers]);

  return (
    <>
      <HeroSection producers={producers} />
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
