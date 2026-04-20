function CraneReadonlySpecs({ form }) {
  const items = [
    ["Producer", form.producer],
    ["Series Code", form.seriesCode],
    ["Class Capacity (t)", form.capacityClassNumber],
    ["Max Capacity (t)", form.capacity || "—"],
    ["Max Height (m)", form.height],
    ["Variant / Revision", form.variantRevision || "—"],
    ["Max Radius (m)", form.radius],
  ];

  return (
    <section className="rounded-2xl border border-black/10 bg-gray-50 p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
        Crane Specs
      </h2>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
        {items.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-wide text-gray-500">
              {label}
            </dt>
            <dd className="mt-1 font-medium text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default CraneReadonlySpecs;
