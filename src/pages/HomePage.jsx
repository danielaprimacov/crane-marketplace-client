import HeroSection from "../components/home/HeroSection";
import AllProducers from "../components/home/AllProducers";
import Services from "../components/home/Services";
import LastAddedCranes from "../components/cranes/LastAddedCranes";
import InformationSection from "../components/home/InformationSection";
import OurClients from "../components/home/OurClients";

import { useProducers } from "../hooks/useProducers";
import useHomeCranes from "../hooks/useHomeCranes";

function HomePage() {
  const { producers } = useProducers();
  const { recentCranes, allProducers } = useHomeCranes();

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
