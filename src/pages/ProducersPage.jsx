import ProducersSidebar from "../components/cranes/ProducersSidebar";

import { useProducers } from "../hooks/useProducers";

function ProducersPage() {
  const { producers, loading, error } = useProducers();

  if (loading) return <p>Loading producers…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-20 mx-5">
      {/* Producer sidebar */}
      <div>
        <ProducersSidebar producers={producers} />
      </div>
    </div>
  );
}

export default ProducersPage;
