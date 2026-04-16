function CraneSpecsGrid({ crane }) {
  const specs = [
    ["Class Cap. (t)", crane.capacityClassNumber],
    ["Max Cap. (t)", crane.capacity],
    ["Max Hgt. (m)", crane.height],
    ["Max Rng. (m)", crane.radius],
    ["Variant", crane.variantRevision || "–"],
  ];

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 text-sm text-gray-600">
      {specs.map(([label, value]) => (
        <div key={label}>
          <dt className="uppercase tracking-wide">{label}</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default CraneSpecsGrid;
