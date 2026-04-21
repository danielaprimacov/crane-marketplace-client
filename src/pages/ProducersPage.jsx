import ProducersSidebar from "../components/cranes/ProducersSidebar";

import { useProducers } from "../hooks/useProducers";

function ProducersPage() {
  const { producers, loading, error } = useProducers();

  if (loading)
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <p>Loading producers…</p>
      </div>
    );
  if (error)
    return (
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
      <ProducersSidebar producers={producers} />
    </div>
  );
}

export default ProducersPage;
